<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ContractTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('contract_types')->insert([
            [
                'id'=>1,
                'name'=>'Carrera Administrativa'
            ],
            [
                'id'=>2,
                'name'=>'Contratista'
            ],
            [
                'id'=>3,
                'name'=>'Libre nombramiento y remoción'
            ],
            [
                'id'=>4,
                'name'=>'Planta Temporal'
            ],
            [
                'id'=>5,
                'name'=>'Provisional'
            ],
        ]);
    }
}
