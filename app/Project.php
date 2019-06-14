<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = ['order', 'project_name', 'project_description', 'project_image', 'project_bio'];
}
