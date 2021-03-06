<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return view('welcome');
// });

Route::get('/', 'HomeController@index');
Route::get('/project/{clean_url}', 'ProjectController@single');

Auth::routes();
Route::get('/logout', 'Auth\LoginController@logout');
Route::view('admin/{path?}/{sub?}/{id?}', 'admin')->middleware(['web', 'auth']);

Route::get('/serverInfo', function () {
    phpinfo();
});
