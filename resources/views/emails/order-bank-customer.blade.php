@component('mail::message')
# Solo nos falta tu pago

Gracias por compar en {{ config('app.name') }}.Recuerda que tienes 24 horas para pagar tu pedido con tu código de pago CIP: {{$cip}}

@component('mail::table')
| Producto      | Cantidad     | Precio  |
| ------------- |:-------------:| --------:|
@foreach($order->products as $product)
| {{ $product->name }} | {{$product->pivot->quantity}}  | S/{{$product->price}} |
@endforeach
@endcomponent

@component('mail::button', ['url' => env('CLIENT_URL') . '/profile/orders/' . $order->id  ])
Ver mi Pedido
@endcomponent

Saludos,<br>
{{ config('app.name') }}
@endcomponent
