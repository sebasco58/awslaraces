<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GroupSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('groups')->insert([
            [
                'id'=>1,
                'name'=>'Nombre del centro de formación',
                'content'=>'Centro de Procesos Industriales y Construcción'
            ]
        ]);
    }
}
