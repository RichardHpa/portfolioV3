<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Invoices extends Model
{
    protected $fillable = ['company_name', 'invoice_number', 'hours_charged', 'hourly_rate', 'total_charged', 'invoice_due'];
}
