<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Invoices;

class InvoicesController extends Controller
{
    public function store(Request $request){
        $validatedData = $request->validate([
            'company_name' => 'required',
            'hours_worked' => 'required',
            'amount_charged' => 'required'
        ]);


    }
}
