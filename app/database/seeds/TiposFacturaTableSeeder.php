<?php

class TiposFacturaTableSeeder extends Seeder 
{
    public function run() 
    {
        
        TipoFactura::create(array(
            "nombre" => "Ticket",
            "inicio" => "1",
            "fin" => "100",
            "farmacia_id" => "2"
        ));
        TipoFactura::create(array(
            "nombre" => "Factura",
            "inicio" => "1",
            "fin" => "100",
            "farmacia_id" => "2"
        ));
        TipoFactura::create(array(
            "nombre" => "Credito",
            "inicio" => "1",
            "fin" => "100",
            "farmacia_id" => "2"
        ));            

    }
}