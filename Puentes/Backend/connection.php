<?php
$host = "localhost";
$user = "u123456789_admin"; // El usuario que creaste en hPanel
$pass = "TuPasswordSeguro";
$db   = "u123456789_basedatos";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Importante para que PHP acepte peticiones de tu JS si están en subdominios distintos
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
?>