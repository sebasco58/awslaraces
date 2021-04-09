<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title></title>
  <style>
    .container{
      border: 2px solid #D4E6F1;
      border-radius: 20px;
    }
    *{
      text-align: center;
      color: black;
    }
  </style>
</head>
<body>
<div class="container">
  <h1>
    Bienvenido a la plataforma de Comité y Evaluación
  </h1>
  <h3>
    Datos de ingreso al aplicativo
  </h3>
  <p>Usuario : <strong>{{ $email['name']}}</strong></p>
  <p>Correo : <strong>{{ $email['email']}}</strong></p>
  <p>Contraseña : <strong>{{ $email['password']}}</strong></p>
  <p>Le recordamos un buen uso de la plataforma. Muchas Gracias</p>
</div>
</body>
</html>