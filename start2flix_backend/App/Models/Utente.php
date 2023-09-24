<?php

namespace App\Entities;

use App\core\App;

class Utente
{
  public static function selectAll()
  {
    return App::get('database')->selectAll('utente');
  }

  public static function create($nome, $cognome, $sesso, $telefono, $email, $password)
  {
    return App::get('database')->create('utente', [
      'nome' => $nome,
      'cognome' => $cognome,
      'sesso' => $sesso,
      'telefono' => $telefono,
      'email' => $email,
      'password' => $password,
    ]);
  }

  public static function update($nome, $cognome, $sesso, $telefono, $email, $password, $utenteId)
  {
    return App::get('database')->update('utente', [
      'nome' => $nome,
      'cognome' => $cognome,
      'sesso' => $sesso,
      'telefono' => $telefono,
      'email' => $email,
      'password' => $password,
      'id' => $utenteId
    ]);
  }

  public static function delete($utenteId)
  {
    return App::get('database')->delete('utente', ['id' => $utenteId]);
  }

  public static function exists($utenteId)
  {
    $utenti = self::selectAll();

    foreach ($utenti as $utente) {
      if ($utente->id == $utenteId) {
        return true;
      }
    }
    return false;
  }

  public static function selectById($utenteId)
  {
    $conditions = ['id' => $utenteId];
    return App::get('database')->selectWhere('utente', $conditions);
  }


  public static function selectAllProfile($idUtente)
  {
    $conditions = ['fkUtenteId' => $idUtente];
    return App::get('database')->selectWhere('profilo', $conditions);
  }
}