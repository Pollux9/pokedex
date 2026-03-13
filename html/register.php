<?php
include "config.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    // HASH PASSWORD (CRITICAL)
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    $stmt = mysqli_prepare(
        $conn,
        "INSERT INTO users (username, email, password)
         VALUES (?, ?, ?)"
    );

    mysqli_stmt_bind_param($stmt, "sss",
        $username,
        $email,
        $hashedPassword
    );

    if (mysqli_stmt_execute($stmt)) {
        echo "Account created!";
    } else {
        echo "Error: username or email may already exist.";
    }
}
?>

<form method="POST">
    <input name="username" placeholder="Username" required><br>
    <input name="email" type="email" placeholder="Email" required><br>
    <input name="password" type="password" placeholder="Password" required><br>
    <button type="submit">Register</button>
</form>