<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FormationProgramTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('formation_program_types')->insert([
            [
                'id'=>1,
                'name'=>'Formación complementaria',
                'elective_months'=>0,
                'practice_months'=>0,
            ],
            [
                'id'=>2,
                'name'=>'Operario',
                'elective_months'=>3,
                'practice_months'=>3,
            ],
            [
                'id'=>3,
                'name'=>'Auxiliar',
                'elective_months'=>3,
                'practice_months'=>3,
            ],
            [
                'id'=>4,
                'name'=>'Técnico',
                'elective_months'=>6,
                'practice_months'=>6,
            ],
            [
                'id'=>5,
                'name'=>'Tecnólogo',
                'elective_months'=>18,
                'practice_months'=>6,
            ],
            [
                'id'=>6,
                'name'=>'Esp. Tecnológica',
                'elective_months'=>6,
                'practice_months'=>0,
            ],
        ]);
    }
}
