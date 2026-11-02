<?php
// Iniciamos el sistema de sesiones de PHP al principio del archivo
session_start();
require_once __DIR__ . '/conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email    = trim($_POST['email']);
    $password = $_POST['password'];

    // Buscamos al usuario por su email
    $stmt = $pdo->prepare("SELECT * FROM usuarios WHERE email = ?");
    $stmt->execute([$email]);
    $usuario = $stmt->fetch();

    // Comparamos el hash almacenado con el password ingresado
    if ($usuario && password_verify($password, $usuario['password_hash'])) {
        // Guardamos los datos de sesión para recordar quién está navegando
        $_SESSION['usuario_id']     = $usuario['id'];
        $_SESSION['usuario_nombre'] = $usuario['nombre_completo'];
        $_SESSION['es_socio']       = $usuario['es_socio'];

        header("Location: articulos.php"); // Redirige automáticamente a la tienda
        exit;
    } else {
        echo "Credenciales incorrectas.";
    }
}
?>