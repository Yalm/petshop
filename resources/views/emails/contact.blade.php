@component('mail::message')
# Hola

Se ha enviado un nuevo mensaje de contáctanos de {{$customer}}.<br>

{{$message}}

Saludos,<br>
{{ config('app.name') }}
@endcomponent
