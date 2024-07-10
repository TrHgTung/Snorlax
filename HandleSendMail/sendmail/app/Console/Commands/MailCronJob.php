<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use App\Mail\NotificationCronMail;

class MailCronJob extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'send:mail-cron';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle(Request $req)
    {
        $getUserMail = DB::table('mailhistory')->pluck('email');
        // for($i = 0; $i <= count($getUserMail); $i++){
        //     Mail::to($getUserMail[$i])->send(new NotificationCronMail());
        // }

        foreach ($getUserMail as $email) {
            // Gửi email đến từng địa chỉ email
            Mail::to($email)->send(new NotificationCronMail());
        }
        $this->info('Emails sent successfully!');
        
        return;
    }
}
