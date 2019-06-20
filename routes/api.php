<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('projects', 'ProjectController@index');
Route::post('projects', 'ProjectController@store');
Route::post('projects/edit', 'ProjectController@update');
Route::post('projects/delete', 'ProjectController@destroy');
Route::post('projects/reorder', 'ProjectController@reorder');
Route::get('projects/{id}', 'ProjectController@show');

Route::get('socials', 'SocialController@index');
Route::post('socials', 'SocialController@store');
