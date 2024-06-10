<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Jobs;

class JobsController extends Controller
{
    public function GetAllJobs(){
        $jobs = Jobs::all();

        return response([
            'result' => $jobs,
        ], 200);
    }

    public function AddJob(Request $req){
        $req->validate([
            'job_id' => 'required',
            'user_id' => 'required',
            'content' => 'required',
            'priority_level' => 'required',
            'deadline' => 'required',
            'last_modified' => 'required',
        ]);
            
        return Jobs::create($req->all());
    }

    public function JobDetails($id){
        return Jobs::find($id);
    }

    public function Update(Request $req, $id){
        $job = Jobs::find($id);

        $jobUpdt = Jobs::update([
            //'job_id' => $fields['job_id'],
            //'user_id' => $fields['user_id'],
            'content' => $fields['content'],
            'priority_level' => $fields['priority_level'],
            'deadline' => $fields['deadline'],
            'last_modified' => (string)Carbon::now()->toDateString(),
        ]);
        //$job->update($req->all());

        return $jobUpdt;
    }

    public function Destroy($id){
        return Jobs::destroy($id);
    }

}
