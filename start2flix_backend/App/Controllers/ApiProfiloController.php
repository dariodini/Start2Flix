<?php

namespace App\Controllers;

use App\Entities\Profilo;
use App\core\Response;

class ApiProfiloController
{
  public function setProfile()
  {
    $profile = json_decode($_REQUEST['profile'] ?? null);
    if ($profile !== null) {
      if (Profilo::exists($profile->id)) {
        $_SESSION['profile'] = Profilo::selectById($profile->id)[0];
        Response::json('Profilo settato con successo!', 200);
      } else {
        Response::json("Il profilo non esiste!", 401);
      }
    } else {
      Response::json("Inserisci l'ID del profilo!", 401);
    }
  }

  public function addNewProfile()
  {
    $utenteId = $_REQUEST['utenteId'];
    $nome = $_REQUEST['nome'];
    $image = $_REQUEST['image'];

    if (!empty($utenteId) && !empty($nome) && !empty($image)) {
      Profilo::create($utenteId, $nome, $image);
      Response::json("Profilo {$nome} creato con successo", 201);
    } else {
      Response::json("Inserisci tutti i campi necessari", 400);
    }
  }

  public function updateProfile()
  {
    $id = $_REQUEST['id'] ?? null;
    $nome = $_REQUEST['nome'] ?? null;
    $image = $_REQUEST['image'] ?? null;

    if (Profilo::exists($id)) {
      $profilo = Profilo::selectById($id)[0];

      if ($nome !== null) {
        $profilo->nome = $nome;
      }
      if ($image !== null) {
        $profilo->image = (int)$image;
      }

      Profilo::update($profilo->fkUtenteId, $profilo->nome, $profilo->image, $id);

      Response::json("Profilo con ID: {$id} aggiornato", 200);
    } else {
      Response::json("Inserisci un valido ID per aggiornare un Profilo", 400);
    }
  }

  public function deleteProfile()
  {
    $id = $_REQUEST['id'] ?? null;

    if (Profilo::exists($id)) {
      Profilo::delete($id);
      Response::json("Profilo con ID: {$id} eliminato", 200);
    } else {
      Response::json("Inserisci un ID valido", 404);
    }
  }

  public function getProducts()
  {
    session_start();

    if (isset($_SESSION["profile"])) {
      $profiloId = $_SESSION['profile']->id;

      if (Profilo::exists($profiloId)) {
        $products = Profilo::selectAllProducts($profiloId);
        Response::json($products, 200);
      } else {
        Response::json("Profilo con ID: {$profiloId} non trovato", 404);
      }
    } else {
      Response::json("Utente non loggato!", 401);
    }
  }
  public function getProfileById()
  {
    session_start();

    $id = $_REQUEST['id'] ?? null;

    if (!empty($id)) {
      if (isset($_SESSION["user"])) {
        Response::json(Profilo::selectById($id)[0], 200);
      } else {
        Response::json("Utente non loggato!", 401);
      }
    } else {
      Response::json("Inserisci tutti i campi necessari", 400);
    }
  }
}
