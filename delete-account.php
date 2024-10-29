<?php
$servername="localhost";
$username="root";
$password="";
$dbname="domain";
$conn=new mysqli($servername,$username,$password,$dbname);
if($conn->connect_error){
    die("Connection failed:".$conn->connect_error);
}
if($_SERVER['REQUEST_METHOD']=='POST'){
    $email=filter_input(INPUT_POST,'email',FILTER_SANITIZE_EMAIL);
    $password=$_POST['password'];
    if(empty($email)||empty($password)){
        die("All fields are required");
    }
    $stmt=$conn->prepare("SELECT password FROM users WHERE email=?");
    $stmt->bind_param("s",$email);
    $stmt->execute();
    $result=$stmt->get_result();
    if($result->num_rows===1){
        $user=$result->fetch_assoc();
        if(password_verify($password,$user['password'])){
            $delete_stmt=$conn->prepare("DELETE FROM users WHERE email=?");
            $delete_stmt->bind_param("s",$email);
            
            if($delete_stmt->execute()){
                header("Location:main-signup.html");
                exit();
            }else{
                echo "Error deleting account:".$delete_stmt->error;
            }
            $delete_stmt->close();
        }else{
            echo "Invalid password";
        }
    }else{
        echo "Account not found";
    }
    $stmt->close();
}
$conn->close();
?>
