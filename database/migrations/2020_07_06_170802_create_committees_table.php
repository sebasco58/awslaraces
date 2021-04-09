<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCommitteesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('committees', function (Blueprint $table) {
            $table->id();
            $table->string('record_number')->unique();
            $table->date('date');
            $table->string('subdirector_name');
            $table->string('coordinador_name');
            $table->time('start_hour');
            $table->time('end_hour')->nullable();
            $table->longText('place')->nullable();
            $table->string('formation_center');
            $table->longText('assistants')->nullable();
            $table->boolean('quorum')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('committees');
    }
}
