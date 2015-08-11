<?php
 
use Faker\Factory as Faker;
 
class LaboratoriosTableSeeder extends Seeder {
 
    public function run()
    {
        $faker = Faker::create();
        for($i = 1; $i <= 5 ; $i++)
        {
            $laboratorio = new Laboratorio;

            $laboratorio->nombre     	= $faker->company;
            $laboratorio->vencimiento   = $faker->numberBetween(20,30);;
            $laboratorio->farmacia_id   = "2"; 
            $laboratorio->save();
           
        }
    }
 
}