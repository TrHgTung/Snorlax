<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('jobs', function (Blueprint $table) {
            $table->id();
            $table->string('job_id');
            $table->string('user_id');
            $table->string('assist_id');
            $table->string('content');
            $table->string('priority_level');
            $table->string('deadline');
            $table->string('last_modified');
            $table->string('status');
        });

        Schema::create('assistants', function (Blueprint $table) {
            $table->id();
            $table->string('assist_id');
            $table->string('job_id');
            $table->string('character_id');
            $table->string('is_shiny');
        });

        Schema::create('characters', function (Blueprint $table) {
            $table->id();
            $table->string('character_id');
            $table->string('character_name');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
