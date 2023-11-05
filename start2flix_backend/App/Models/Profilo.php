<?php

namespace App\Entities;

use App\core\App;

class Profilo
{
  public static function selectAll()
  {
    return App::get('database')->selectAll('profilo');
  }

  public static function create($fkUtenteId, $nome, $image)
  {
    return App::get('database')->create('profilo', [
      'fkUtenteId' => $fkUtenteId,
      'nome' => $nome,
      'image' => $image,
    ]);
  }

  public static function update($fkUtenteId, $nome, $image, $profiloId)
  {
    return App::get('database')->update('profilo', [
      'fkUtenteId' => $fkUtenteId,
      'nome' => $nome,
      'image' => $image,
      'profiloId' => $profiloId
    ]);
  }

  public static function delete($profiloId)
  {
    return App::get('database')->delete('profilo', ['id' => $profiloId]);
  }

  public static function exists($profiloId)
  {
    if (!isset($_SESSION)) {
      session_start();
    }
    if (isset($_SESSION['user'])) {
      $idUtente = $_SESSION['user']->id;
      $profiliUtente = Utente::selectAllProfile($idUtente);
      foreach ($profiliUtente as $profilo) {
        if ($profilo->id == $profiloId) {
          return true;
        }
      }
      return false;
    }
  }

  public static function selectById($profiloId)
  {
    $conditions = ['id' => $profiloId];
    return App::get('database')->selectWhere('profilo', $conditions);
  }

  public static function selectAllProducts($profiloId)
  {
    $conditions = ['fkProfiloId' => $profiloId];
    return App::get('database')->selectWhere('profiloProdotto', $conditions);
  }
}
