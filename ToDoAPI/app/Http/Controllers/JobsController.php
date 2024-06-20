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
        $userId = (string)auth()->user()->user_id;
        $req->validate([
            'job_id' => 'required',
            //'user_id' => 'required',
            'content' => 'required',
            'priority_level' => 'required',
            'deadline' => 'required',
            'last_modified' => 'required',
        ]);

        $data = $req->all();
        $data['user_id'] = $userId;
            
         return Jobs::create($data);
        //echo $userId;
        //return;
    }

    // public function JobDetails($id){ // for testing API
    //     return Jobs::find($id);
    // } 

    public function Update(Request $req, $id){
        $userId = (string)auth()->user()->user_id;
        $getJobsAuthorized = Jobs::where('user_id', $userId)->first(); // chỉ lấy những job có userId được authorized
        $staticUsrId = (string)$getJobsAuthorized->user_id;

        if (!$getJobsAuthorized) {
            return response()->json(['error' => 'Không tìm thấy'], 404);
        }
        else if($staticUsrId == $userId){
            $req->validate([
                'job_id' => 'sometimes|required',
                'content' => 'sometimes|required',
                'priority_level' => 'sometimes|required',
                'deadline' => 'sometimes|required',
                'last_modified' => 'sometimes|required',
            ]);
            
            $data = $req->all();
            $data['user_id'] = $userId;
    
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
