<?php

namespace App\Http\Controllers;

use Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Intervention\Image\ImageManager;

use App\Project;
use App\Social;
use App\Media;

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
        foreach ($projects as $project) {
            $media = Media::where('id', '=', $project->media_id)->firstOrFail();
            $project['project_image'] = $media->media_name;
        }
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

        $projectCount = Project::all()->count();

        $cleanUrl = strtolower(str_replace(' ', '_', $request->project_name));

        $project = Project::create([
            'order' => $projectCount+1,
            'project_name' => $request->project_name,
            'clean_url' => $cleanUrl,
            'project_description' => $request->project_description,
            'project_bio' => $request->project_bio,
            'media_id' => $request->image_id,
            'github_link' => $request->project_github,
            'website_url' => $request->project_link
        ]);

        // $sections = json_decode($request->sections);
        // foreach ($sections as $section) {
        //     $newSection = Section::create([
        //         'project_id' => $project->id,
        //         'section_content' => $section->text,
        //         'section_image' => $section->mediaID
        //     ]);
        // }

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
        $media = Media::where('id', '=', $project->media_id)->firstOrFail();
        $project['project_image'] = $media->media_name;
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
        $media = Media::where('id', '=', $project->media_id)->firstOrFail();
        $project['project_image'] = $media->media_name;
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
        // return response()->json($request);
        $project = Project::where('id', '=', $request->project_id)->firstOrFail();
        $validator = Validator::make($request->all(), [
            'project_name' => 'required|min:10|max:100',
            'project_description' => 'required|min:10',
            'project_bio' => 'required|min:10'
        ]);
        if ($validator->fails()) {
            $result = 'Validation Error';
        }

        $cleanUrl = strtolower(str_replace(' ', '_', $request->project_name));

        $project->project_name = $request->project_name;
        $project->clean_url = $cleanUrl;
        $project->project_description = $request->project_description;
        $project->project_bio = $request->project_bio;
        $project->public = $request->project_public;
        $project->media_id = $request->image_id;
        if($request->project_github === 'null'){
            $github = null;
        } else {
            $github = $request->project_github;
        }
        $project->github_link = $github;
        if($request->project_link === 'null'){
            $link = null;
        } else {
            $link = $request->project_link;
        }
        $project->website_url = $link;

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
        $project->delete();
        return 'success';
    }

    public function single($id){
        $project = Project::where('clean_url', '=', $id)->firstOrFail();
        if($project->public === 'yes'){
            $media = Media::where('id', '=', $project->media_id)->firstOrFail();
            $project['project_image'] = $media->media_name;
            $socials = Social::where('social_link', '!=', '')->orderBy('order')->get();


            return view('front/singleProject', compact('project', 'socials'));
        } else {
            abort(404);
        }

    }
}
