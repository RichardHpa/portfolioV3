<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = ['order', 'project_name', 'clean_url', 'project_description', 'project_image', 'project_bio', 'github_link', 'website_url'];
}
