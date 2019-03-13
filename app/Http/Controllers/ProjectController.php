<?php

namespace App\Http\Controllers;

use App\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Intervention\Image\ImageManager;

class ProjectController extends Controller
{

    public function index()
    {
        $projects = Project::all();

        return $projects->toJson();
    }


    public function store(Request $request)
    {

        // die($request);
        // die($request['file']);
        $manager = new ImageManager();
        // $base=base64_decode($request['file']);
        $heroImage = $manager->make($request['file']);
        $heroImage->save('images/heroImages/test.jpg', 100);
        die('done');
        // $validatedData = $request->validate([
        //     'project_name' => 'required',
        //     'project_description' => 'required',
        // ]);
        //
        // $imageName = uniqid();
        //
        // $project = Project::create([
        //     'project_name' => $validatedData['project_name'],
        //     'project_description' => $validatedData['project_description'],
        //     'project_image' => $imageName
        // ]);
        //
        // $result = array(
        //     'message' => 'Project Created',
        //     'image_name' => $imageName
        // );
        // return response()->json($result);
    }

    public function show($id)
    {
        $project = Project::where('id', '=', $id)->firstOrFail();
        return $project->toJson();
    }

    public function delete(Request $request){
        $project = Project::findOrFail($request->id);
        $project->delete();
        return 'success';
    }
}
