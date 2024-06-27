<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class CharacterSeedData extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // DB::table('characters')->insert([
        //     'character_id' => 'POKE1',
        //     'character_name' => 'Snorlax',
        // ]);
        DB::table('characters')->insert([
            'character_id' => 'POKE2',
            'character_name' => 'Snorlax',
        ]);
        DB::table('characters')->insert([
            'character_id' => 'POKE3',
            'character_name' => 'Leafeon',
        ]);
        DB::table('characters')->insert([
            'character_id' => 'POKE4',
            'character_name' => 'Lucario',
        ]);
        // DB::table('characters')->insert([
        //     'character_id' => 'POKE5',
        //     'character_name' => 'Snorlax',
        // ]);
        // DB::table('characters')->insert([
        //     'character_id' => 'POKE6',
        //     'character_name' => 'Snorlax',
        // ]);
        // DB::table('characters')->insert([
        //     'character_id' => 'POKE7',
        //     'character_name' => 'Snorlax',
        // ]);
        // DB::table('characters')->insert([
        //     'character_id' => 'POKE8',
        //     'character_name' => 'Snorlax',
        // ]);
        // DB::table('characters')->insert([
        //     'character_id' => 'POKE9',
        //     'character_name' => 'Snorlax',
        // ]);
        // DB::table('characters')->insert([
        //     'character_id' => 'POKE10',
        //     'character_name' => 'Snorlax',
        // ]);
        
    }
}
