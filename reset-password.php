<?php
$servername="localhost";
$username="root";
$password="";
$dbname="domain";
$conn=new mysqli($servername,$username,$password,$dbname);
if($conn->connect_error){
    die("Connection failed: ".$conn->connect_error);
}
if($_SERVER['REQUEST_METHOD']=='POST'){
    $email=filter_input(INPUT_POST,'email',FILTER_SANITIZE_EMAIL);
    $new_password=$_POST['new_password'];
    if(empty($email)||empty($new_password)){
        die("All fields are required");
    }
    if(!filter_var($email,FILTER_VALIDATE_EMAIL)){
        die("Invalid email format");
    }
    $hashed_password=password_hash($new_password,PASSWORD_DEFAULT);
    $stmt=$conn->prepare("UPDATE users SET password=? WHERE email=?");
    if(!$stmt){
        die("Prepare failed: ".$conn->error);
    }
    $stmt->bind_param("ss",$hashed_password,$email);
    if($stmt->execute()){
        header("Location: main-signup.html");
        exit();
    } else {
        echo "Error updating password: ".$stmt->error;
    }
    $stmt->close();
}
$conn->close();
?>
