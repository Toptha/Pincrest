<?php
function uploadImage($file, $targetDir) {
    $targetFile = $targetDir . basename($file['name']);
    $imageFileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));
    $check = getimagesize($file['tmp_name']);
    if ($check !== false && in_array($imageFileType, ['jpg', 'png', 'jpeg', 'gif'])) {
        if (move_uploaded_file($file['tmp_name'], $targetFile)) {
            return "The file " . basename($file['name']) . " has been uploaded.";
        } else {
            return "Sorry, there was an error uploading your file.";
        }
    } else {
        return "File is not an image.";
    }
}

$target_dir = "C:\Users\preet\OneDrive\Documents\Uploads";
$uploadMessage = "";
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['image'])) {
    $uploadMessage = uploadImage($_FILES['image'], $target_dir);
}
?>
<html>
<head>
    <title>Pincrest</title>
    <style>
        :root {
            --primary-color: #e60023;
            --background-color: #111;
            --text-color: #fff;
            --card-color: #222;
        }
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: var(--background-color);
            color: var(--text-color);
            line-height: 1.6;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        header {
            text-align: center;
            margin-bottom: 30px;
        }
        h1 {
            font-size: 3rem;
            margin-bottom: 10px;
            color: var(--primary-color);
        }
        .upload-form {
            background-color: var(--card-color);
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 30px;
            text-align: center;
        }
        .upload-form input[type="file"] {
            margin-bottom: 10px;
            width: 100%;
            padding: 10px;
            border: none;
            background-color: var(--background-color);
            color: var(--text-color);
            border-radius: 4px;
        }
        .upload-form button {
            background-color: var(--primary-color);
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }
        .upload-form button:hover {
            background-color: #d50020;
        }
        .upload-message {
            margin-bottom: 20px;
            color: #4CAF50;
            text-align: center;
        }
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 20px;
        }
        .grid-item {
            background-color: var(--card-color);
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease;
        }
        .grid-item:hover {
            transform: translateY(-5px);
        }
        .grid-item img {
            width: 100%;
            height: 250px;
            object-fit: cover;
        }
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px;
            background-color: #1a1a1a;
        }
        .logo-title {
            display: flex;
            align-items: center;
        }
        .logo-title img {
            height: 40px;
            margin-right: 10px;
        }
        .logo-title h1 {
            margin: 0;
            font-size: 24px;
        }
        .header nav a {
            margin-left: 20px;
            font-weight: bold;
        }
        a{
            color: red;
            text-decoration: none;
        }
        nav a{
            color: red;
            transition: color 0.3s ease;
        }
        nav a:hover{
            color: maroon;
        }
    </style>
</head>
<body>
<div class="header">
        <div class="logo-title">
            <img src="logo.jpg" alt="Pinterest logo">
            <h1>Pincrest</h1>
        </div>
        <nav>
            <a href="http://localhost/domain.php">Create</a>
            <a href="index.html">Explore</a>
            <a href="genre.html">Genres</a>
            <a href="main-signup.html">Login</a>
        </nav>
    </div>
    <div class="container">
        <header>
            <h1>Pincrest</h1>
        </header>
        <?php if (!empty($uploadMessage)): ?>
            <p class="upload-message"><?php echo $uploadMessage; ?></p>
        <?php endif; ?>
        <form class="upload-form" action="" method="POST" enctype="multipart/form-data">
            <input type="file" name="image" accept="image/*" required>
            <button type="submit">Upload Image</button>
        </form>
        <div class="grid">
            <?php
            if (is_dir($target_dir)) {
                $images = scandir($target_dir);
                foreach ($images as $image) {
                    if ($image != '.' && $image != '..') {
                        echo '<div class="grid-item"><img src="' . $target_dir . $image . '" alt="Image"></div>';
                    }
                }
            }
            ?>
        </div>
    </div>
    <script src="dom.js"></script>
</body>
</html>