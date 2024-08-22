<?php
header('Access-Control-Allow-Origin: *'); // Adjust this to be more restrictive as needed
header('Content-type: application/json');


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Read data directly from $_POST instead of parsing JSON
    $name = htmlspecialchars(isset($_POST['name']) ? $_POST['name'] : '');
    $email = htmlspecialchars(isset($_POST['email']) ? $_POST['email'] : '');
    $subject = htmlspecialchars(isset($_POST['subject']) ? $_POST['subject'] : '');
    $message = htmlspecialchars(isset($_POST['message']) ? $_POST['message'] : '');
    $isChecked = htmlspecialchars(isset($_POST['isChecked']) ? $_POST['isChecked'] : '');
    
    $to = 'armin.vndg@gmail.com'; // Target email address
    $additionalEmail = 'am.vendeg@gmail.com'; // Additional recipient

    $body = <<<EOD
<html>
<body>
<table width="100%" cellspacing="0" cellpadding="0" style="border: none;">
  <tr>
      <td align="center">
          <table width="600" style="border: 1px solid #eeeeee" cellspacing="0" cellpadding="10">
              <tr>
                  <td style="background-color: rgba(29, 30, 31, 0.4); text-align: center; padding: 20px; color: #e3e4e4; font-family: 'Consolas', sans-serif; font-size: 22px;">
                      WATTSON Üzenet
                  </td>
              </tr>
              <tr>
                <td style="background: rgba(29, 30, 31, 0.4); color: darkcyan; font-family: 'Roboto',sans-serif; padding: 20px;">
                  <p>Honlapodról érkezett egy újabb megkeresés:</p>
                  <p><strong>Küldő:</strong> $name </p>
                  <p><strong>Email:</strong> $email </p>
                  <p><strong>Tárgy:</strong> $subject </p>
                  <p><strong>Üzenet:</strong> $message </p>
                  <p><strong>Adatkezelés elfogadva:</strong> $isChecked </p>
                </td>
              </tr>
             
              <tr>
                  <td style="height: 60px; background-color: rgba(29, 30, 31, 0.4); text-align: center; font-family: 'Consolas', sans-serif; font-size: 16px;">
                      &copy; 2024 Ármin Vndg | WATTSON
                  </td>
              </tr>
          </table>
      </td>
  </tr>
</table>
</body>
</html>
EOD;

    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: armin.vndg@gmail.com" . "\r\n";
    $headers .= "Cc: $additionalEmail" . "\r\n"; // Add Cc header to send to additional recipient

     // Send email
     $sendMailResult = mail($to, $subject, $body, $headers);
     if ($sendMailResult) {
         echo json_encode(["success" => true, "message" => "Mail Sent Successfully"]);
     } else {
         echo json_encode(["success" => false, "message" => "Mail Sending Failed!"]);
     }
 } else {
     echo json_encode(["success" => false, "message" => "No POST request"]);
 }
?>
