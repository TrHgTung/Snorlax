<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Jobs;

class JobsController extends Controller
{
    public function GetAllJobs(){
        return Jobs::all();
    }
}
