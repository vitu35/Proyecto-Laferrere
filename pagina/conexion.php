<?php
// pagina/conexion.php

$host     = 'localhost';
$db_name  = 'laferrere_db'; // El nombre que le des a tu base de datos
$username = 'root';
$password = ''; // Vacío en XAMPP, 'root' en MAMP
$charset  = 'utf8mb4';

$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

$dsn = "mysql:host=$host;dbname=$db_name;charset=$charset";

try {
    $pdo = new PDO($dsn, $username, $password, $options);
} catch (\PDOException $e) {
    die("Error de conexión: " . $e->getMessage());
}

// CÓDIGO TEMPORAL DE PRUEBA (Borralo después)
if (isset($pdo)) {
    echo "<div style='background: #d4edda; color: #155724; padding: 15px; text-align: center; font-weight: bold;'>
            ¡Conexión exitosa! El archivo conexion.php está conectado correctamente a laferrere_db.
          </div>";
}