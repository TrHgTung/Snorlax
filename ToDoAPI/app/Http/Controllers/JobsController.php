<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Jobs;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Assistants;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class JobsController extends Controller
{
    public function GetAllJobs(){ // get all jobs but by a specific user (auth requested)
        // $jobs = Jobs::all(); 
        $userId = auth()->user()->user_id;

        $getJobsByUsrId = Jobs::where('user_id', $userId)->where('status', '1')->get();
        
        $getCharacterId = DB::table('jobs')
                            ->join('assistants', 'jobs.job_id', '=', 'assistants.job_id')
                            ->where('jobs.user_id', $userId)
                            ->where('jobs.status', '1')
                            ->select('assistants.character_id')
                            ->get();

        $checkPokemonShiny = DB::table('jobs')
                            ->join('assistants', 'jobs.job_id', '=', 'assistants.job_id')
                            ->where('jobs.user_id', $userId)
                            ->where('jobs.status', '1')
                            ->select('assistants.is_shiny')
                            ->get();

        $getPokemonName = DB::table('jobs')
                            ->join('assistants', 'jobs.job_id', '=', 'assistants.job_id')
                            ->join('characters', 'assistants.character_id', '=', 'characters.character_id')
                            ->where('jobs.user_id', $userId)
                            ->where('jobs.status', '1')
                            ->select('characters.character_name')
                            ->get();
                            
        $getDeadline = $getJobsByUsrId->select('deadline');

        // lay thoi gian thuc tren server
        $getRealtime = Carbon::now()->format('Y-m-d');

        // Xu ly chuoi du lieu deadline: VD chuyển [2024-12-12T12:12] thành [2024-12-12]
        $finalTime = null;
        $processDeadlineData = [];
        foreach($getDeadline as $gdl) {
            $processDeadline = substr($gdl['deadline'], 0, 10); 

            if ($processDeadline === $getRealtime) {
                $finalTime = $gdl['deadline'];
                break;
            }
            // $processDeadlineData[] = $processDeadline;
        }

        $verifyDeadline = '';
        if($finalTime){
            $verifyDeadline = '1';
        }
        else {
            $verifyDeadline = '0';
        }

        
        return response([
            'check_time' => $verifyDeadline,
            //'real_time' => $getRealtime,
            'get_pokemon_name' => $getPokemonName,
            'get_character_id' => $getCharacterId,
            'check_pokemon_shiny' => $checkPokemonShiny,
            'result' => $getJobsByUsrId,
            // 'con_cu' => $processData,
        ], 200);
    }

    public function AddJob(Request $req){

        // XỬ LÝ TRONG MODEL JOBS
        $randNum = (string)rand(1111,9999);
        $userId = (string)auth()->user()->user_id;
        $updateModifiedDate = (string)Carbon::now()->toDateString();
        $jobIdInit = 'JOB'.str_replace('-','', $updateModifiedDate).$randNum.$userId;

        $assistInput = $req->assist_id;
        $assistInputReal = 'POKE'.(string)$assistInput;

        $assistId = 'ASSIST'.str_replace('-','', $updateModifiedDate).$randNum.$userId.'_'.$assistInput;

        $req->validate([
            'content' => 'required',
            'priority_level' => 'required',
            'deadline' => 'required',
        ]);

        $data = $req->all();
        $data['job_id'] = $jobIdInit;
        $data['user_id'] = $userId;
        $data['assist_id'] = $assistId;
        $data['last_modified'] = $updateModifiedDate;
        $data['status'] = '1';

        Jobs::create($data);

        // XỬ LÝ TRONG MODEL ASSISTANTS
        $shinySpawn = rand(0,1);

        $data2['character_id'] = $assistInputReal; // id value nhap tu front end
        $data2['assist_id'] = $assistId;
        $data2['job_id'] = $jobIdInit;
        $data2['is_shiny'] = $shinySpawn; // randomize shiny

        Assistants::create($data2);
            
        return response()->json(
            [
                'author' => 'Hoang Tung',
                'message_response' => 'Thuc hien thanh cong',
                'add_job' => $data,
                'add_assistant' => $data2,
            ]
        );
    }

    public function JobDetails($id){ // for testing API
        $userId = auth()->user()->user_id;
        $getData = Jobs::find($id);

        $getCharacterId = DB::table('jobs')
                            ->join('assistants', 'jobs.job_id', '=', 'assistants.job_id')
                            ->where('jobs.user_id', $userId)
                            ->where('jobs.id', $id)
                            ->where('jobs.status', '1')
                            ->select('assistants.character_id')
                            ->get();

        $checkPokemonShiny = DB::table('jobs')
                            ->join('assistants', 'jobs.job_id', '=', 'assistants.job_id')
                            ->where('jobs.id', $id)
                            ->where('jobs.user_id', $userId)
                            ->where('jobs.status', '1')
                            ->select('assistants.is_shiny')
                            ->get();

        $getPokemonName = DB::table('jobs')
                            ->join('assistants', 'jobs.job_id', '=', 'assistants.job_id')
                            ->join('characters', 'assistants.character_id', '=', 'characters.character_id')
                            ->where('jobs.id', $id)
                            ->where('jobs.user_id', $userId)
                            ->where('jobs.status', '1')
                            ->select('characters.character_name')
                            ->get();

        // foreach($getPokemonName as $pokemon){
        //     if($pokemon->character_name === $id){
        //         $matchedPokemon = $pokemon->character_name;
        //         break;
        //     }
        // }

        if($userId == $getData->user_id){
            return response([
                'get_pokemon_name' => $getPokemonName,
                'get_character_id' => $getCharacterId,
                'check_pokemon_shiny' => $checkPokemonShiny,
                'result' => $getData,
            ], 200);
        }
        else{
            return response([
                'message' => 'Da co loi xay ra',
            ], 401);
        }
        
    } 

    public function Update(Request $req, $id){
        $updateModifiedDate = (string)Carbon::now()->toDateString();

        $userId = (string)auth()->user()->user_id;
        $getJobsAuthorized = Jobs::where('user_id', $userId)->where('status', '1')->where('id', $id)->first(); // chỉ lấy những job có userId được authorized

        if (!$getJobsAuthorized) {
            return response()->json(['error' => 'Khong tim thay'], 404);
        }
        else if($getJobsAuthorized){
            $data = $req->all();
            $data['last_modified'] = $updateModifiedDate;
    
            $getJobsAuthorized->update($data);
            
            return response()->json([
                'message' => 'Da cap nhat thong tin cho ID Task: '. $id
            ], 200);
           
        }
        else{
            return response()->json([
                'message' => 'Thao tac bi chan vi ban khong du quyen (Not Authorized)',
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
            
            return response()->json([
                'message' => 'Da danh dau hoan thanh cho ID Task: '. $id
            ], 200);
        }
        else{
            return response()->json([
                'message' => 'Thao tac bi chan vi ban khong du quyen (Not Authorized)',
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
