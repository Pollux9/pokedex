<?php
include "config.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $username = $_POST['username'];
    $password = $_POST['password'];

    $stmt = mysqli_prepare(
        $conn,
        "SELECT id, password FROM users WHERE username = ?"
    );

    mysqli_stmt_bind_param($stmt, "s", $username);
    mysqli_stmt_execute($stmt);

    $result = mysqli_stmt_get_result($stmt);
    $user = mysqli_fetch_assoc($result);

    if ($user && password_verify($password, $user['password'])) {

        // LOGIN SUCCESS
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['username'] = $username;

        header("Location: dashboard.php");
        exit();
    } else {
        echo "Invalid login.";
    }
}
?>

<form method="POST">
    <input name="username" required placeholder="Username"><br>
    <input name="password" type="password" required placeholder="Password"><br>
    <button type="submit">Login</button>
</form>