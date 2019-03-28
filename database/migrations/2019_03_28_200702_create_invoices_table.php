<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateInvoicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('invoices', function (Blueprint $table) {
            $table->increments('id')->unsigned();
            $table->string('company_name');
            $table->string('invoice_number');
            $table->decimal('hours_charged', 8, 2);
            $table->decimal('hourly_rate', 8, 2);
            $table->decimal('total_charged', 8, 2);
            $table->dateTime('invoice_due');
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
        Schema::dropIfExists('invoices');
    }
}
