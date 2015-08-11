<?php
     
use Faker\Factory as Faker;
     
class FarmaciasTableSeeder extends Seeder {
     
    public function run()
    {

        $faker = Faker::create();

        // General
        Farmacia::create(array(
            "nombre"        => "Admon",
            "direccion"     => $faker->address,
            "telefono"      => $faker->phoneNumber,
            "web"           => $faker->domainName,
            "email"         => $faker->email,
            "activa"        => true,
            "municipio_id"  => $faker->numberBetween(1,200)
        ));

        // Farmacia
        Farmacia::create(array(
            "nombre"        => "San Nicolas",
            "direccion"     => $faker->address,
            "telefono"      => $faker->phoneNumber,
            "web"           => $faker->domainName,
            "email"         => $faker->email,
            "activa"        => true,
            "municipio_id"  => $faker->numberBetween(1,200)
        ));
    }
     
}