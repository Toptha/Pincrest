<?php
session_start();
header('Content-Type: application/json');
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "domain";

$conn = new mysqli($servername, $username, $password, $dbname);
if($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Connection failed"]));
}

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = filter_input(INPUT_POST, 'username', FILTER_SANITIZE_STRING);
    $password = $_POST['password'];
    
    if(empty($username) || empty($password)) {
        die(json_encode(["success" => false, "message" => "Username and password are required"]));
    }
    
    $stmt = $conn->prepare("SELECT id, username, password FROM users WHERE username = ?");
    if(!$stmt) {
        die(json_encode(["success" => false, "message" => "Prepare failed"]));
    }
    
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if($result->num_rows === 1) {
        $user = $result->fetch_assoc();
        if(password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];
            $_SESSION['logged_in'] = true;
            header("Location:index.html");
        } else {
            echo json_encode(["success" => false, "message" => "Invalid password"]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "User not found"]);
    }
    $stmt->close();
}
$conn->close();
?>