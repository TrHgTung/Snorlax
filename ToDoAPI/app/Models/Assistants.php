<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Assistants extends Model
{
    use HasFactory;
    protected $fillable = [
        'assist_id',
        'job_id',
        'character_id',
        'is_shiny',
    ];
    public $timestamps = false;
   
}
