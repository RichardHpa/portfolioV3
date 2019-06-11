<?php

namespace App\Http\Controllers;

use Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Intervention\Image\ImageManager;

use App\Project;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $projects = Project::all();
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
            $result =  'ERROR, something went wrong with validation';
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
        //Need to Crop to thumbnail size

        $project = Project::create([
            'project_name' => $request->project_name,
            'project_description' => $request->project_description,
            'project_bio' => $request->project_bio,
            'project_image' => $imageName,

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
    public function update(Request $request, $id)
    {
        //
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
        // unlink("./images/uploads/thumbnails/$imageName.jpg");
        $project->delete();
        return 'success';
    }
}
