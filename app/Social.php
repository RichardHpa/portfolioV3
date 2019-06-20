<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Social extends Model
{
    protected $fillable = ['order', 'social_name', 'social_link', 'social_icon'];
}
