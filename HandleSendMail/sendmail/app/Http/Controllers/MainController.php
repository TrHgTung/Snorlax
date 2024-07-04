<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MailHistory;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class MainController extends Controller
{
    public function HandleMail(Request $req){
        $data = array();

        $data['mail_id'] = 'MAIL'.rand(1111,9999);
        $data['email'] = $req->email;
        $data['deadline'] = $req->deadline;
        $data['assistant'] = $req->assistant;
        
        $getName =  explode('@', $req->email);
        $data['username'] = $getName[0];

        $data['time_sent'] = Carbon::now()->format('Y-m-d');

        // send mail
        $mail = new PHPMailer(true);

        try {
            // HÃY THAY THẾ CÁC VỊ TRÍ BỊ ẨN ******* THÀNH ĐỊA CHỈ E-MAIL CỦA BẠN VÀ PASSWORD SMTP
            //Server settings
            $mail->CharSet = "UTF-8";
            $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
            $mail->isSMTP();                                            //Send using SMTP
            $mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
            $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
            $mail->Username   = '******@gmail.com';                     //SMTP username
            $mail->Password   = '*************';                               //SMTP password
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
            $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
        
            //Recipients
            $mail->setFrom('*****@gmail.com', 'System');
            $mail->addAddress($req->email, $getName[0]);     //Add a recipient
        
            //Attachments
           // $mail->addAttachment('/public/attachments/'.$req->assistant.'.jpg', 'new.jpg');    //Optional name
        
            //Content
            $mail->isHTML(true);                                  //Set email format to HTML
            $mail->Subject = 'Lời nhắc từ '.$req->assistant;
            $mail->Body    = 'Bạn đang có lời nhắc sắp trễ hạn, cụ thể là trong hôm nay. Hãy kiểm tra lại ứng dụng Lời nhắc!';
        
            $mail->send();

            // MailHistory::create($data);  // eloquent
            DB::table('mailhistory')->insert($data);  // query builder
            
            return response->json([
                'message' => 'The mail has been sent successfully'
            ]);
        } catch (Exception $e) {
            return response->json([
                'error' => 'Loi server mail'
            ]);
        }
    }
}
