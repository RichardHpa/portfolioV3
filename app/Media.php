<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    protected $table = 'media_items';

    protected $fillable = ['media_name'];
}
