<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ModalitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('modalities')->insert([
            [
                'id'=>1,
                'name'=>'ART. MEDIA',
            ],
            [
                'id'=>2,
                'name'=>'DIURNO',
            ],
            [
                'id'=>3,
                'name'=>'DUAL',
            ],
            [
                'id'=>4,
                'name'=>'MIXTA',
            ],
            [
                'id'=>5,
                'name'=>'NOCTURNO',
            ],
            [
                'id'=>6,
                'name'=>'TARDE',
            ],
            [
                'id'=>7,
                'name'=>'VIRTUAL',
            ],
        ]);
    }
}
