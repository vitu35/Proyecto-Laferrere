<?php
require_once __DIR__ . '/conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = trim($_POST['nombre_completo']);
    $email  = trim($_POST['email']);
    $password = $_POST['password'];

    // Encriptación portable y segura de la contraseña antes de guardarla
    $password_encriptada = password_hash($password, PASSWORD_BCRYPT);

    try {
        $stmt = $pdo->prepare("INSERT INTO usuarios (nombre_completo, email, password_hash) VALUES (?, ?, ?)");
        $stmt->execute([$nombre, $email, $password_encriptada]);
        echo "Cuenta creada con éxito. Ya podés iniciar sesión.";
    } catch (\PDOException $e) {
        echo "El email ya se encuentra registrado.";
    }
}
?>