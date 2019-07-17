<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Intervention\Image\ImageManager;

use App\Media;

class MediaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $media = Media::all();
        return $media->toJson();
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

        $media = Media::create([
            'media_name' => $imageName,
        ]);

        $result = array(
            'message' => 'success',
            'mediaInfo' => $media
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
        $media = Media::where('id', '=', $id)->firstOrFail();
        return $media->toJson();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
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
    public function destroy($id)
    {
        //
    }
}
