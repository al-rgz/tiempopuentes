<?php
include 'connection.php'; // Reutilizamos tu conexión

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['email']) && isset($data['password'])) {
    $email = $data['email'];

    // Encriptamos la contraseña antes de guardarla
    $pass = password_hash($data['password'], PASSWORD_BCRYPT);

    // Verificamos si el usuario o email ya existen
    $check = $conn->prepare("SELECT id FROM usuarios WHERE email = ?");
    $check->bind_param("ss", $email, $password);
    $check->execute();
    $resCheck = $check->get_result();

    if ($resCheck->num_rows > 0) {
        echo json_encode(["success" => false, "message" => "El usuario o email ya están registrados"]);
    } else {
        // Insertamos el nuevo usuario
        $stmt = $conn->prepare("INSERT INTO usuarios (email, password) VALUES (?, ?)");
        $stmt->bind_param("ss", $email, $pass);

        if ($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "Registro exitoso"]);
        } else {
            echo json_encode(["success" => false, "message" => "Error al registrar: " . $conn->error]);
        }
    }
}
?>