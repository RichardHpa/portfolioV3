<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

use App\Project;
use App\Media;

class AddImageIdToProjects extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->integer('media_id')->unsigned()->index()->nullable()->after('project_bio');
            $table->foreign('media_id')->references('id')->on('media_items');
        });

        $projects = Project::orderBy('order')->get();
        foreach ($projects as $project) {
            $media = Media::create([
                'media_name' => $project['project_image']
            ]);
            $project->media_id = $media->id;
            $project->save();
        }

        Schema::table('projects', function (Blueprint $table) {
             $table->dropColumn('project_image');
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->string('project_image', 100)->after('project_bio');
            $table->dropForeign(['media_id']);
            $table->dropColumn('media_id');
        });
    }
}
