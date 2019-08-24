@component('mail::message')
# Muchas Gracias

Gracias por comprar en nuestra tienda. A continuación se muestra su recibo y enlace para ver su pedido.

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