<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Jobs extends Model
{
    use HasFactory;
    protected $fillable = [
        'job_id',
        'user_id',
        'content',
        'priority_level',
        'deadline',
        'last_modified',
    ];
    public $timestamps = false;
}
