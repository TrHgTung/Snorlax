<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Jobs;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Carbon\Carbon;

class JobsController extends Controller
{
    public function GetAllJobs(){
        // $jobs = Jobs::all(); // for testing API
        $userId = auth()->user()->user_id;

        $getJobsByUsrId = Jobs::where('user_id', $userId)->get();

        return response([
            'result' => $getJobsByUsrId,
        ], 200);
    }

    public function AddJob(Request $req){
        $randNum = (string)rand(1111,9999);
        $userId = (string)auth()->user()->user_id;
        $updateModifiedDate = (string)Carbon::now()->toDateString();
        $jobIdInit = 'JOB'.str_replace('-','', $updateModifiedDate).$randNum.$userId;

        $req->validate([
            //'job_id' => 'required',
            //'user_id' => 'required',
            'content' => 'required',
            'priority_level' => 'required',
            'deadline' => 'required',
            //'last_modified' => 'required',
        ]);

        $data = $req->all();
        $data['job_id'] = $jobIdInit;
        $data['user_id'] = $userId;
        $data['last_modified'] = $updateModifiedDate;
            
        return Jobs::create($data);
    }

    // public function JobDetails($id){ // for testing API
    //     return Jobs::find($id);
    // } 

    public function Update(Request $req, $id){
        $updateModifiedDate = (string)Carbon::now()->toDateString();

        $userId = (string)auth()->user()->user_id;
        $getJobsAuthorized = Jobs::where('user_id', $userId)->get(); // chỉ lấy những job có userId được authorized
        $staticUsrId = (string)$getJobsAuthorized->user_id;

        if (!$getJobsAuthorized) {
            return response()->json(['error' => 'Không tìm thấy'], 404);
        }
        else if($staticUsrId == $userId){
            // $req->validate([ // khong can require
            //     //'job_id' => 'sometimes|required',
            //     'content' => 'sometimes|required',
            //     'priority_level' => 'sometimes|required',
            //     'deadline' => 'sometimes|required',
            //     //'last_modified' => 'sometimes|required',
            // ]); 
            
            $data = $req->all();
            //$data['user_id'] = $userId;
            $data['last_modified'] = $updateModifiedDate;
    
            $getJobsAuthorized->update($data);
            
            return response()->json($data, 200);
           
        }
        else{
            return response()->json([
                'message' => 'Thao tác bị chặn, bạn không đủ quyền (Not Authorized)',
            ], 401);
        }
        //  echo $getJobsAuthorized;
        //  return;
        
    }

    public function Destroy($id){
        return Jobs::destroy($id);
    }

}
