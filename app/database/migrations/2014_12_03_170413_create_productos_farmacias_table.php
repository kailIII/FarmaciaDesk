<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductosFarmaciasTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
        Schema::create('productos_farmacias',function($table){
            $table->increments('id');

            $table->integer('cantidad');
            $table->integer('minimo');
            $table->double('precio',6,2);
            $table->string('codigo',20);
            $table->integer('producto_id')->unsigned();
            $table->integer('farmacia_id')->unsigned();
			
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
		Schema::drop('productos_farmacias');
	}

}
