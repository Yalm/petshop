<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class CustomerOrderNotification extends Notification implements ShouldQueue
{
    use Queueable;
    public $order;
    public $method;
    public $cip;
    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($order,$method,$cip)
    {
        $this->order = $order;
        $this->method = $method;
        $this->cip = $cip;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
                    ->from('ventas@petshop.com')
                    ->subject('Detalles de su pedido')
                    ->markdown($this->method == 'bank_deposit' ?  'emails.order-bank-customer':'emails.order-customer',
                        ['order' => $this->order,'cip' => $this->cip]);
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
