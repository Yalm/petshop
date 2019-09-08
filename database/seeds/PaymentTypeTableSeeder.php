<?php

use Illuminate\Database\Seeder;
use App\PaymentType;

class PaymentTypeTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        PaymentType::create([
            'name' => 'Tarjeta de crédito',
            'text_user' => 'Tarjeta de crédito o débito | Visa, Mastercard y más!',
            'md_icon' => 'credit_card'
        ]);

        PaymentType::create([
            'name' => 'Déposito bancario',
            'text_user' => 'Banca por Internet o Dépositos Bancarios',
            'md_icon' => 'credit_card'
        ]);

        PaymentType::create([
            'name' => 'Manual',
            'text_user' => 'Pago Manual',
            'md_icon' => 'attach_money'
        ]);
    }
}
