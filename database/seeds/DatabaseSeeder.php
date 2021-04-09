<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            PermissionSeeder::class,
            RoleSeeder::class,
            UserSeeder::class,
            SanctionSeeder::class,
            FormativeMeasureSeeder::class,
            CommitteeSessionStateSeeder::class,
            NoveltyTypeSeeder::class,
            InfringementTypeSeeder::class,
            InfringementClassificationSeeder::class,
            GeneralParameterSeeder::class,
            RolesAndPermissionsSeeder::class,
            FormationProgramTypeSeeder::class,
            FormationProgramSeeder::class,
            ModalitySeeder::class,
            // GroupSeeder::class,
            ContractTypeSeeder::class,
            PositionSeeder::class,
            FormativeMeasureResponsibleSeeder::class,
        ]);
    }
}
