<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FormationProgramSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('formation_programs')->insert([
            [
                'id'=>1,
                'code'=>'228106 V102',
                'name'=>'Análisis y Desarrollo de Sistemas de Información',
                'formation_program_type_id'=>5, // Tecnólogo
            ],
            [
                'id'=>2,
                'code'=>'935175 V1',
                'name'=>'Confección industrial de Ropa Exterior',
                'formation_program_type_id'=>2, // Operario
            ],
            [
                'id'=>3,
                'code'=>'836114 V1',
                'name'=>'Construcción de Edificaciones',
                'formation_program_type_id'=>4, // Técnico
            ],
            [
                'id'=>4,
                'code'=>'836222 V1',
                'name'=>'Construcción de Vias',
                'formation_program_type_id'=>4, // Técnico
            ],
            [
                'id'=>5,
                'code'=>'223118 V1',
                'name'=>'Construcción',
                'formation_program_type_id'=>5, // Tecnólogo
            ],
            [
                'id'=>6,
                'code'=>'836221 V1',
                'name'=>'Construcción de Estructuras en Concreto',
                'formation_program_type_id'=>2, // Operario
            ],
            [
                'id'=>7,
                'code'=>'821225 V2',
                'name'=>'Construcción y Montaje de Instalaciones Eléctricas',
                'formation_program_type_id'=>4, // Técnico
            ],
            [
                'id'=>8,
                'code'=>'935502 V2',
                'name'=>'Control de calidad en confeccion',
                'formation_program_type_id'=>4, // Técnico
            ],
            [
                'id'=>9,
                'code'=>'225210 V2',
                'name'=>'Desarrollo Gráfico en Proyectos de Arquitectura e Ingeniería',
                'formation_program_type_id'=>5, // Tecnólogo
            ],
            [
                'id'=>10,
                'code'=>'225208 V1',
                'name'=>'Dibujo Arquitectonico',
                'formation_program_type_id'=>4, // Técnico
            ],
            [
                'id'=>11,
                'code'=>'225117 V1',
                'name'=>'Diseño de Productos Industriales',
                'formation_program_type_id'=>5, // Tecnólogo
            ],
            [
                'id'=>12,
                'code'=>'513303 V1',
                'name'=>'Ejecucion musical con instrumentos funcionales',
                'formation_program_type_id'=>4, // Técnico
            ],
            [
                'id'=>13,
                'code'=>'821222 V3',
                'name'=>'Electricidad Industrial',
                'formation_program_type_id'=>5, // Tecnólogo
            ],
            [
                'id'=>14,
                'code'=>'821222 V4',
                'name'=>'Electricidad Industrial',
                'formation_program_type_id'=>5, // Tecnólogo
            ],
            [
                'id'=>15,
                'code'=>'835105 V100',
                'name'=>'Enchapado',
                'formation_program_type_id'=>3, // Auxiliar
            ],
            [
                'id'=>16,
                'code'=>'939202 V1',
                'name'=>'Fabricación de Muebles Contemporáneos y Modulares',
                'formation_program_type_id'=>4, // Técnico
            ],
            [
                'id'=>17,
                'code'=>'961209 V1',
                'name'=>'Fabricación de Productos Metálicos Soldados',
                'formation_program_type_id'=>3, // Auxiliar
            ],
            [
                'id'=>18,
                'code'=>'221115 V1',
                'name'=>'Gestión en Laboratorios de Ensayo y Calibracion',
                'formation_program_type_id'=>6, // Esp.Tecnológica
            ],
            [
                'id'=>19,
                'code'=>'122128 V1',
                'name'=>'Gestión Integrada de la Calidad, Medio Ambiente Seguridad y Salud Ocupacional',
                'formation_program_type_id'=>5, // Tecnólogo
            ],
            [
                'id'=>20,
                'code'=>'217219 V1',
                'name'=>'Gestión y Seguridad de base de datos',
                'formation_program_type_id'=>6, // Esp.Tecnológica
            ],
            [
                'id'=>21,
                'code'=>'832221 V2',
                'name'=>'Instalaciones Electricas Residenciales',
                'formation_program_type_id'=>4, // Técnico
            ],
            [
                'id'=>22,
                'code'=>'832235 V1',
                'name'=>'Instalaciones Eléctricas para Viviendas',
                'formation_program_type_id'=>2, // Operario
            ],
            [
                'id'=>23,
                'code'=>'836121 V1',
                'name'=>'Mamposteria',
                'formation_program_type_id'=>2, // Operario
            ],
            [
                'id'=>24,
                'code'=>'838314 V1',
                'name'=>'Mantenimiento de las Motocicletas',
                'formation_program_type_id'=>4, // Técnico
            ],
            [
                'id'=>25,
                'code'=>'837151 V1',
                'name'=>'Mantenimiento de maquinas de confeccion industrial',
                'formation_program_type_id'=>4, // Técnico
            ],
            [
                'id'=>26,
                'code'=>'838104 V102',
                'name'=>'Mantenimiento de Motores Diesel',
                'formation_program_type_id'=>4, // Técnico
            ],
            [
                'id'=>27,
                'code'=>'838105 V100',
                'name'=>'Mantenimiento de Motores Gasolina y Gas',
                'formation_program_type_id'=>4, // Técnico
            ],
            [
                'id'=>28,
                'code'=>'223201 V100',
                'name'=>'Mantenimiento Electromecánico Industrial',
                'formation_program_type_id'=>5, // Tecnólogo
            ],
            [
                'id'=>29,
                'code'=>'838201 V100',
                'name'=>'Mantenimiento Eléctrico y Electrónico de Automotores',
                'formation_program_type_id'=>4, // Técnico
            ],
            [
                'id'=>30,
                'code'=>'223219 V102',
                'name'=>'Mantenimiento Mecatrónico de Automotores',
                'formation_program_type_id'=>5, // Tecnólogo
            ],
            [
                'id'=>31,
                'code'=>'821609 V1',
                'name'=>'Mantenimiento Mecánico Industrial',
                'formation_program_type_id'=>5, // Tecnólogo
            ],
            [
                'id'=>32,
                'code'=>'836130 V1',
                'name'=>'Mantenimiento y Reparación de Edificaciones',
                'formation_program_type_id'=>4, // Técnico
            ],
            [
                'id'=>33,
                'code'=>'941106 V1',
                'name'=>'Mecanizado en torno y fresadora convencional',
                'formation_program_type_id'=>4, // Técnico
            ],
            [
                'id'=>34,
                'code'=>'837126 V101',
                'name'=>'Mecánico de Maquinaria Industrial',
                'formation_program_type_id'=>4, // Técnico
            ],
            [
                'id'=>35,
                'code'=>'217111 V1',
                'name'=>'Metodologias de calidad para el desarrollo de software',
                'formation_program_type_id'=>6, // Esp.Tecnológica
            ],
            [
                'id'=>36,
                'code'=>'832336 V1',
                'name'=>'Montaje y Mantenimiento de Redes Aéreas de Distribución de Energía Eléctrica',
                'formation_program_type_id'=>4, // Técnico
            ],
            [
                'id'=>37,
                'code'=>'524504 V102',
                'name'=>'Patronaje Industrial de Prendas de Vestir',
                'formation_program_type_id'=>4, // Técnico
            ],
            [
                'id'=>38,
                'code'=>'836607 V1',
                'name'=>'Revestimiento de Pintura Arquitectónica',
                'formation_program_type_id'=>4, // Técnico
            ],
            [
                'id'=>39,
                'code'=>'834257 V1',
                'name'=>'Soldadura de productos metalicos (platina)',
                'formation_program_type_id'=>4, // Técnico
            ],
            [
                'id'=>40,
                'code'=>'834258 V1',
                'name'=>'Soldadura de Productos Metálicos en Platina',
                'formation_program_type_id'=>4, // Técnico
            ],
            [
                'id'=>41,
                'code'=>'821202 V1',
                'name'=>'Supervisión de Redes de Distribución de Energía Eléctrica',
                'formation_program_type_id'=>5, // Tecnólogo
            ],
            [
                'id'=>42,
                'code'=>'933106 V100',
                'name'=>'Tabajador de la Madera',
                'formation_program_type_id'=>3, // Auxiliar
            ],
            [
                'id'=>43,
                'code'=>'935240 V102',
                'name'=>'Trazo y Corte Confección Industrial',
                'formation_program_type_id'=>4, // Técnico
            ],
        ]);
    }
}
