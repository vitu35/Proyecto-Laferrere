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

