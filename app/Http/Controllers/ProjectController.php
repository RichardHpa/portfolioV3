<?php

namespace App\Http\Controllers;

use App\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'project_name' => 'required',
            'project_description' => 'required',
        ]);

        $imageName = uniqid();

        $project = Project::create([
            'project_name' => $validatedData['project_name'],
            'project_description' => $validatedData['project_description'],
            'project_image' => $imageName
        ]);

        $result = array(
            'message' => 'Project Created',
            'image_name' => $imageName
        );
        return response()->json($result);
    }
}
