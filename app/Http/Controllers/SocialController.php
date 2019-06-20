<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Social;

class SocialController extends Controller
{

    public function __construct()
    {

    }

    public function index(){
        $socials = Social::orderBy('order')->get();
        return $socials->toJson();
    }

    public function store(Request $request){
        $allSocials = json_decode($request['socials']);
        $socialCount = Social::all()->count();

        foreach($allSocials as $key=>$social){
            if(isset($social->id)){
                $socialAccount = Social::findOrFail($social->id);
                $socialAccount->social_icon = $social->social_icon;
                $socialAccount->social_link = $social->social_link;
                $socialAccount->save();
            } else {
                $socialCount++;
                $socialAccount = Social::create([
                    'order' => $socialCount,
                    'social_name' => $social->social_name,
                    'social_link' => $social->social_link,
                    'social_icon' => $social->social_icon
                ]);
            }
        }

        $result = array(
            'message' => 'success'
        );

        $socialResult = Social::all();
        return response()->json($socialResult);

    }
}
