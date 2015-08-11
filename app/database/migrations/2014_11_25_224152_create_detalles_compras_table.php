<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDetallesComprasTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('detalles_compras',function($table) {
            $table->increments('id');

            $table->integer('cantidad');            
            $table->double('precio',6,2);
            $table->integer('descuento');
            $table->integer('compra_id')->unsigned();
            $table->integer('laboratorio_id')->unsigned();
            $table->integer('producto_farmacia_id')->unsigned();
            
            $table->softDeletes();
            $table->timestamps();
        });
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('detalles_compras');
	}

}
