<?php 
function input($data) {  //input
    $data=trim($data);
    $data=stripslashes($data);
    $data=htmlspecialchars($data);
    return $data;
}
if ($_SERVER["REQUEST_METHOD"]=="POST") {              //post
    $username=input($_POST["username"]);
    $email=input($_POST["email"]);
    $password=$_POST["password"];
    $errors=[];
    if(strlen($username)<3) {
        $errors[]="Username must be at least 3 characters long.";
    }
    if(!filter_var($email,FILTER_VALIDATE_EMAIL)) {
        $errors[]="Invalid email format.";
    }
    if(strlen($password)<8) {
        $errors[]="Password must be at least 8 characters long.";
    }
    if(empty($errors)) {
        echo "<h2>Signup Successful!</h2>";
        echo "<p>Username: $username</p>";
        echo "<p>Email: $email</p>";
        echo "<p>Password: [HIDDEN]</p>";
    }else {
        echo "<h2>Signup Failed</h2>";
        foreach($errors as $error) {
            echo "<p style='color: red;'>$error</p>";
        }
    }
}
?>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pincrest Signup</title>
    <link rel="stylesheet" href="signup.css" >
</head>
<body>
    <div class="page-wrapper">
        <div class="title">
            <h1>Pincrest</h1>
        </div>
        <div class="container">
            <div class="signup-box">
                <h2>Sign Up</h2>
                <form id="signupForm" action="signup.php" method="post">
                    <div class="input-group">
                        <input type="text" id="username" name="username" required placeholder=" ">
                        <label for="username">Username</label>
                    </div>
                    <div class="input-group">
                        <input type="email" id="email" name="email" required placeholder=" ">
                        <label for="email">Email</label>
                    </div>
                    <div class="input-group">
                        <input type="password" id="password" name="password" required placeholder=" ">
                        <label for="password">Password</label>
                        <button type="button" id="togglePassword" class="toggle-password">👁️‍🗨️</button>
                    </div>
                    <button type="submit">Sign Up</button>
                </form>
                <div id="error-message" class="error-message"></div>
                <br>
                <?php 
    echo "<p><a href='prac.html' style='color: #e60023;'>Already an Existing user?</a></p>";
    echo "<br>";
    echo "<p><a href='LAB3.html' style='color: #e60023;'>Home</a></p>";
    ?>
            </div>
        </div>
    </div>
    <script src="signup.js"></script>
    
</body>

</html>