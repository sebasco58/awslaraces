<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class MessageSend extends Mailable
{
    use Queueable, SerializesModels;
    public $email;
    public $subject = "Bienvenido a CES";
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($email)
    {
      $this->email = $email;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
      return $this->view('emails.message-send')
                  ->with($this->email);
    }
}
