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
    public function GetAllJobs(){ // get all jobs but by a specific user (auth requested)
        // $jobs = Jobs::all(); 
        $userId = auth()->user()->user_id;

        $getJobsByUsrId = Jobs::where('user_id', $userId)->where('status', '1')->get();

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
        $data['status'] = '1';
            
        return Jobs::create($data);
    }

    // public function JobDetails($id){ // for testing API
    //     return Jobs::find($id);
    // } 

    public function Update(Request $req, $id){
        $updateModifiedDate = (string)Carbon::now()->toDateString();

        $userId = (string)auth()->user()->user_id;
        $getJobsAuthorized = Jobs::where('user_id', $userId)->where('status', '1')->where('id', $id)->first(); // chỉ lấy những job có userId được authorized

        if (!$getJobsAuthorized) {
            return response()->json(['error' => 'Không tìm thấy'], 404);
        }
        else if($getJobsAuthorized){
            $data = $req->all();
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
    
    public function Finish(Request $req, $id){
        $updateModifiedDate = (string)Carbon::now()->toDateString();

        $userId = (string)auth()->user()->user_id;
        $getJobsAuthorized = Jobs::where('user_id', $userId)->where('status', '1')->where('id', $id)->first(); // chỉ lấy những job có userId được authorized

        if (!$getJobsAuthorized) {
            return response()->json(['error' => 'Không tìm thấy'], 404);
        }
        else if($getJobsAuthorized){
            //$data = $req->all();
            $data['status'] = '0';
    
            $getJobsAuthorized->update($data);
            
            return response()->json($data, 200);
        }
        else{
            return response()->json([
                'message' => 'Thao tác bị chặn, bạn không đủ quyền (Not Authorized)',
            ], 401);
        }
    }

    // public function Destroy($id){ // for testing API
    //     return Jobs::destroy($id);
    // }

    public function XemCacJobsDaHoanThanh(){ // get all jobs but by a specific user (auth requested)
        // $jobs = Jobs::all(); // for testing API
        $userId = auth()->user()->user_id;

        // $getJobsByUsrId = Jobs::where('user_id', $userId)->where('status', '0')->get();
        $getJobsByUsrId = Jobs::where('user_id', $userId)->get();

        return response([
            'result' => $getJobsByUsrId,
        ], 200);
    }

}
