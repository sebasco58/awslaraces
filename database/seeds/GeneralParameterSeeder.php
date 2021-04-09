<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GeneralParameterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('general_parameters')->insert([
            [
                'id'=>1,
                'name'=>'Nombre del centro de formación',
                'content'=>'Centro de Procesos Industriales y Construcción'
            ],
            [
                'id'=>2,
                'name'=>'Lugar',
                'content'=>'Sala de juntas'
            ]
        ]);
    }
}
