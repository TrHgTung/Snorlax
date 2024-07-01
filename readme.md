<h1>Snorlax - Một ứng dụng Lời nhắc cơ bản với Laravel và ReactJS</h1>
<h2>GIỚI THIỆU</h2>

<h6>Phiên bản: 1.0</h6>
<p>Một ứng dụng API-CSR nhằm lưu lại các lời nhắc cho nhiều người dùng </p>
<img src="./GioiThieu.jpg">

    - Chủ thể: Người dùng
    - Kiến trúc phần mềm: Layered Architecture - Client-Side Rendering

<h2>CÁC CÔNG NGHỆ NỔI BẬT</h2>
1. <b> Laravel </b>: <br>
- Tài liệu: https://laravel.com/ <br>
- Tham khảo: ChatGPT (https://chat.openai.com/), StackOverFlow (https://stackoverflow.com/), Laracasts (https://laracasts.com/) <br><br>
2. <b> ReactJS</b>: <br>
- Tài liệu: https://react.dev/learn <br>
- Trang chủ: https://react.dev/ <br>
- Tham khảo: ChatGPT (https://chat.openai.com/), StackOverFlow (https://stackoverflow.com/)<br><br>

<h2>CÁC TÍNH NĂNG NỔI BẬT</h2>
<h4>Phía Người dùng:</h4>
1. Đăng nhập, đăng ký, đăng xuất (Sử dụng Bearer Token để xác thực và Sanctum Laravel để lưu phiên đăng nhập người dùng)<br>
2. Viết lời nhắc và chọn nhân vật trợ thủ cho riêng mình.

<h2>YÊU CẦU TRƯỚC KHI CÀI ĐẶT SOURCE</h2>

1. Trên máy tính (Test/Dev/Server) đã cài đặt XAMPP (có sẵn MySQL, PHP, Apache, ....) và NodeJS <br>

2. Kiểm tra PHP đã cài đặt chưa. Mở Command line: chạy lệnh `php --version` , yêu cầu phiên bản PHP phải lớn hơn 8.2 <br>

   > Nếu chạy lệnh `php --version` trả về lỗi, hãy tự tìm cách để thiết lập biến môi trường Windows cho PHP (Gợi ý từ khóa: set environment variable for windows)<br> > <br>Tương tự kiểm tra với NodeJS bằng lệnh `node -v`

3. Đã cài đặt Composer (https://getcomposer.org/download/). Composer khi cài đặt phải nhận phiên bản PHP đang có trên máy <br>

<h2>CÁCH CÀI ĐẶT SOURCE</h2>

<h4>Với source Laravel:</h4>
0. Terminal/Command Line: trỏ tới source Laravel với lệnh `cd ToDoAPI` <br>
1. Chạy XAMPP với quyền admin, khởi động 2 dịch vụ: Apache và MySQL <br>
2. Thực hiện `git clone` source về, trong hệ quản trị CSDL MySQL (PHPMyAdmin : truy cập bằng trình duyệt với địa chỉ: 127.0.0.1:80/phpmyadmin) -> tạo 1 CSDL mới, đặt tên gì cũng được (VD: todoapi)<br>
3. Mở command line: cd <tên thư mục chứa source>, chạy lệnh `composer update` (nếu ko được thì `composer install`) <br>
4. Copy file .env.example thành 1 file mới, và đổi tên file mới này thành .env <br>
5. Mở file .env mới tạo, tìm tới dòng DB_DATABASE=project và thay thế 'project' thành tên cơ sở dữ liệu được tạo trong MySQL (webdatxe)<br>
6. Chạy lệnh `php artisan key:generate` để tạo khóa truy cập cho localhost (Laravel) <br>
7. Chạy lệnh `php artisan migrate` để ánh xạ từ model lên cơ sở dữ liệu MySQL. Nếu lỗi xảy ra, hãy migrate file `2024_05_10_060200_update_database.php` trong thư mục BackupDB vào MySQL. <br>
   > (Kiểm tra dữ liệu trong CSDL) - Nếu sử dụng cách thức migrate vào CSDL, hãy vào MySQL để thêm một vài dữ liệu test. - Còn nếu import file backup thì không cần <br>
8. Chạy lệnh `php artisan serve --port 4401`. Lúc này ứng dụng sẽ chạy trên 127.0.0.1:4401, mở trình duyệt và truy cập bằng địa chỉ này <br>

<h4>Với source ReactJS:</h4>
1. Chạy lệnh `cd ReactJS\my-app`<br>
2. Chạy lệnh `npm install`<br>

<h2>CÁCH CHẠY SOURCE</h2>
<h4>Với source Laravel:</h4>
1. Chạy Xampp với quyền admin, khởi động 2 dịch vụ: Apache và MySQL <br>
2. Chạy lệnh `php artisan serve --port 4401`. Lúc này ứng dụng sẽ chạy trên 127.0.0.1:4401, mở trình duyệt và truy cập bằng địa chỉ này <br>

<h4>Với source ReactJS:</h4>
1. Chạy lệnh `npm start`<br>
2. Truy cập trong trình duyệt: http://127.0.0.1:3000<br><br>

> 127.0.0.1 chính là địa chỉ localhost<br>

<h2>CÁC LỖI PHÁT SINH</h2>

- Lỗi 419: Nếu phát sinh lỗi 419 khi các bạn kiểm thử bằng các công cụ test API (Postman / BurpSuite / JMeter / ...): Hãy thêm 2 dòng này vào cuối file .env của source Laravel (pass lỗi 419 CSRF)

`SESSION_DOMAIN=localhost
SANCTUM_STATEFUL_DOMAINS=localhost`
<br>

- Lỗi hiển thị hình ảnh: Hãy tự chuẩn bị hình ảnh trong thư mục `.\ReactJS\my-app\public\assets\assistant_zone\***.png` <br>

Gợi ý các tên file còn thiếu: Snorlax_0.png; Snorlax_1.png <br><br>

<h3>LIÊN HỆ VÀ DONATE</h3>
<p>Các bạn nếu thích dự án này, mong muốn có thêm tính năng mới (mở rộng dự án) hoặc chỉ đơn giản là muốn donate cho tôi ☕☕☕; hãy liên hệ với tôi qua Telegram: <i>@trhgtung</i> hoặc comment tại video bất kỳ với nội dung bạn mong muốn trên kênh Youtube: <a href="https://www.youtube.com/@TungSupport">@TungSupport</a></p>
<p>Xin cảm ơn! 😍😍😍</p>

<h3>NẾU CÓ LỖI KHÁC XẢY RA / MUỐN ĐÓNG GÓP</h3>
<p>- Các bạn muốn báo cáo lỗi: Hãy vào phần `Issues`</p>
<p>- Các bạn muốn đóng góp thêm tính năng: Hãy vào phần `Pull requests`</p>
<p>- Các bạn muốn báo cáo lỗi và tự sửa lỗi đó luôn: Thì làm như 2 mục trên 😆😆😆 và các bạn quá tuyệt vời 😎😎😎</p>

> <i>Tại sao dự án có tên là Snorlax</i>? <br><br>
>
> ... Đây là tên của một loài Pokémon ít hoạt động<br><br>
