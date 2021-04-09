<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PositionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('positions')->insert([
            [
                'id'=>1,
                'name'=>'Administrativo',
                'type'=>'Administrativo'
            ],
            [
                'id'=>2,
                'name'=>'Administrativo contratista',
                'type'=>'Administrativo'
            ],
            [
                'id'=>3,
                'name'=>'Administrativo contratista - Abogada',
                'type'=>'Administrativo'
            ],
            [
                'id'=>4,
                'name'=>'Administrativo contratista - Articulada',
                'type'=>'Administrativo'
            ],
            [
                'id'=>5,
                'name'=>'Administrativo contratista - competencias laborales',
                'type'=>'Administrativo'
            ],
            [
                'id'=>6,
                'name'=>'Administrativo contratista - Laboratorio Metrología',
                'type'=>'Administrativo'
            ],
            [
                'id'=>7,
                'name'=>'Administrativo contratista - Tecnoparque',
                'type'=>'Administrativo'
            ],
            [
                'id'=>8,
                'name'=>'Administrativo de carrera administrativa',
                'type'=>'Administrativo'
            ],
            [
                'id'=>9,
                'name'=>'Administrativo ENI Escuela Nacional de Instructores',
                'type'=>'Administrativo'
            ],
            [
                'id'=>10,
                'name'=>'Administrativo Planta temporal',
                'type'=>'Administrativo'
            ],
            [
                'id'=>11,
                'name'=>'Apoyo Biblioteca',
                'type'=>'Apoyo'
            ],
            [
                'id'=>12,
                'name'=>'Apoyo Bienestar al aprendiz',
                'type'=>'Apoyo'
            ],
            [
                'id'=>13,
                'name'=>'Apoyo Certificación laboral',
                'type'=>'Apoyo'
            ],
            [
                'id'=>14,
                'name'=>'Apoyo Sennova',
                'type'=>'Apoyo'
            ],
            [
                'id'=>15,
                'name'=>'Apoyo Subdirección. Onbase',
                'type'=>'Apoyo'
            ],
            [
                'id'=>16,
                'name'=>'Apoyo Tecnoparque',
                'type'=>'Apoyo'
            ],
            [
                'id'=>17,
                'name'=>'Instructor contratista',
                'type'=>'Instructor'
            ],
            [
                'id'=>18,
                'name'=>'Instructor contratista - Articulada',
                'type'=>'Instructor'
            ],
            [
                'id'=>19,
                'name'=>'Instructor contratista - Desplazados',
                'type'=>'Instructor'
            ],
            [
                'id'=>20,
                'name'=>'Instructor contratista - TSA',
                'type'=>'Instructor'
            ],
            [
                'id'=>21,
                'name'=>'Instructor contratista - virtual',
                'type'=>'Instructor'
            ],
            [
                'id'=>22,
                'name'=>'Instructor de carrera administrativa',
                'type'=>'Instructor'
            ],
            [
                'id'=>23,
                'name'=>'Instructor Planta temporal',
                'type'=>'Instructor'
            ],
            [
                'id'=>24,
                'name'=>'Instructor provisional',
                'type'=>'Instructor'
            ],
            [
                'id'=>25,
                'name'=>'Subdirector de Centro',
                'type'=>'Subdirector'
            ],
        ]);
    }
}
