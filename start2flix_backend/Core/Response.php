<?php

namespace App\core;

class Response
{
  public static function json($data, $statusCode)
  {
    http_response_code($statusCode);
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: http://localhost:5173');
    header('Access-Control-Allow-Credentials: true');
    echo json_encode($data);
    exit();
  }
}
