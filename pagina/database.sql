CREATE DATABASE IF NOT EXISTS `laferrere_db` 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE `laferrere_db`;

-- 2. Crear la tabla para tu página de artículos
CREATE TABLE IF NOT EXISTS `articulos` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `nombre` VARCHAR(100) NOT NULL,
    `categoria` VARCHAR(50) NOT NULL,
    `precio` DECIMAL(10, 2) NOT NULL,
    `imagen_url` VARCHAR(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Crear la tabla de usuarios (para login, compras y asociarse)
CREATE TABLE IF NOT EXISTS `usuarios` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `nombre_completo` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL UNIQUE,
    `password_hash` VARCHAR(255) NOT NULL,
    `es_socio` TINYINT(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Insertar algunos artículos iniciales para probar la tienda
INSERT INTO `articulos` (`nombre`, `categoria`, `precio`, `imagen_url`) VALUES
('Camiseta Titular Laferrere', 'remera', 25000.00, 'img/camiseta_titular.png'),
('Pantalon Corto Negro', 'pantalon', 15000.00, 'img/pantalon_corto.png'),
('Short Verde de Entrenamiento', 'short', 12000.00, 'img/short_verde.png');