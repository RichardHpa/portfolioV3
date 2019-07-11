<?php

namespace App\Http\Controllers;

use Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Intervention\Image\ImageManager;

use App\Project;
use App\Social;

class ProjectController extends Controller
{

    public function __construct()
    {
        // $this->middleware('auth');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $projects = Project::orderBy('order')->get();
        return $projects->toJson();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    public function reorder(Request $request){
        $projects = json_decode($request['projects']);
        foreach($projects as $key=>$project){
            $updatingProject = Project::where('id', '=', $project->id)->firstOrFail();
            $updatingProject->order = null;
            $updatingProject->save();
        }
        foreach($projects as $key=>$project){
            $updatingProject = Project::where('id', '=', $project->id)->firstOrFail();
            $updatingProject->order = $key+1;
            $updatingProject->save();
        }
        return 'success';
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'project_name' => 'required|min:10|max:100',
            'project_description' => 'required|min:10',
            'project_bio' => 'required|min:10',
            'file' => 'required'
        ]);
        if ($validator->fails()) {
            $result =  'Validation Error';
        }
        $manager = new ImageManager();
        $heroImage = $manager->make($request['file']);
        $imageName = uniqid();
        $folder = 'images/uploads/heroImages';
        if( ! is_dir($folder)){
            mkdir($folder, 0777, true);
        }
        $heroImage->save($folder.'/'.$imageName.'.jpg', 100);

        $thumbFolder = 'images/uploads/thumbnails';
        if( ! is_dir($thumbFolder)){
            mkdir($thumbFolder, 0777, true);
        }
        $thumbnailImage = $manager->make($request['file']);
        $thumbnailImage->resize(600, null, function($constraint){
            $constraint->aspectRatio();
            $constraint->upsize();
        });
        $thumbnailImage->save($thumbFolder.'/'.$imageName.'.jpg', 100);

        $projectCount = Project::all()->count();

        $cleanUrl = strtolower(str_replace(' ', '_', $request->project_name));

        $project = Project::create([
            'order' => $projectCount+1,
            'project_name' => $request->project_name,
            'clean_url' => $cleanUrl,
            'project_description' => $request->project_description,
            'project_bio' => $request->project_bio,
            'project_image' => $imageName,
            'github_link' => $request->project_github,
            'website_url' => $request->project_link
        ]);

        $result = array(
            'message' => 'success',
            'projectID' => $project->id
        );

        return response()->json($result);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $project = Project::where('id', '=', $id)->firstOrFail();
        return $project->toJson();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $project = Project::where('id', '=', $id)->firstOrFail();
        return $project->toJson();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        // Project::query()->update(['github_link' => 8]);
        $project = Project::where('id', '=', $request->project_id)->firstOrFail();
        $validator = Validator::make($request->all(), [
            'project_name' => 'required|min:10|max:100',
            'project_description' => 'required|min:10',
            'project_bio' => 'required|min:10'
        ]);
        if ($validator->fails()) {
            $result = 'Validation Error';
        }

        if($request->updateImage == true){
            $imageName = $project->project_image;
            unlink("./images/uploads/heroImages/$imageName.jpg");
            unlink("./images/uploads/thumbnails/$imageName.jpg");
            $manager = new ImageManager();
            $heroImage = $manager->make($request['file']);
            $imageName = uniqid();
            $folder = 'images/uploads/heroImages';
            $heroImage->save($folder.'/'.$imageName.'.jpg', 100);

            $thumbFolder = 'images/uploads/thumbnails';
            $thumbnailImage = $manager->make($request['file']);
            $thumbnailImage->resize(600, null, function($constraint){
                $constraint->aspectRatio();
                $constraint->upsize();
            });
            $thumbnailImage->save($thumbFolder.'/'.$imageName.'.jpg', 100);
            $project->project_image = $imageName;
        }
        $cleanUrl = strtolower(str_replace(' ', '_', $request->project_name));


        $project->project_name = $request->project_name;
        $project->clean_url = $cleanUrl;
        $project->project_description = $request->project_description;
        $project->project_bio = $request->project_bio;
        $project->github_link = $request->project_github;
        $project->website_url = $request->project_link;

        $project->save();

        $result = array(
            'message' => 'success',
            'projectID' => $project->id
        );

        return response()->json($result);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $project = Project::findOrFail($request->id);
        $imageName = $project->project_image;
        unlink("./images/uploads/heroImages/$imageName.jpg");
        unlink("./images/uploads/thumbnails/$imageName.jpg");
        $project->delete();
        return 'success';
    }

    public function single($id){
        $project = Project::where('clean_url', '=', $id)->firstOrFail();
        $socials = Social::where('social_link', '!=', '')->orderBy('order')->get();
        return view('front/singleProject', compact('project', 'socials'));
    }
}
