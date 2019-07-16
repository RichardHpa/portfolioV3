<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

use App\Project;

class AddLinkUrlToProjects extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->string('clean_url')->nullable()->unique()->after("project_name");
        });

        $projects = Project::orderBy('order')->get();
        foreach ($projects as $project) {
            $project->clean_url = strtolower(str_replace(' ', '_', $project->project_name));
            $project->save();
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->dropColumn('clean_url');
        });
    }
}
