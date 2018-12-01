<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use JD\Cloudder\Facades\Cloudder;

class ImageController extends Controller
{
    public function delete(Request $request){
        Cloudder::destroyImages([$request->project_image], ['invalidate' => TRUE]);
        return "deleted";
    }
}
