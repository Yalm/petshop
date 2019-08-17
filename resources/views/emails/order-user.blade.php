@component('mail::message')
# Hola

Se ha realizado un nuevo pedido.

@component('mail::button', ['url' => url("admin/orders/$order->id/edit")  ])
Ver Pedido
@endcomponent

Saludos,<br>
{{ config('app.name') }}
@endcomponent
