<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableProducts extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name',300);
            $table->decimal('price',8,2);
            $table->string('cover',100);
            $table->smallInteger('stock')->default(0);
            $table->text('description')->nullable();
            $table->string('url',191)->unique();
            $table->string('short_description',400)->nullable();

            $table->integer('category_id')->unsigned();
            $table->foreign('category_id')->references('id')->on('categories');

            $table->integer('color_id')->nullable()->unsigned();
            $table->foreign('color_id')->references('id')->on('colors');

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
        Schema::dropIfExists('products');
    }
}
