<?php

namespace App\Controllers;

use App\Entities\Profilo;
use App\core\Response;

class ApiProfiloController
{
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
    $nome = $_REQUEST['nome'] ?? null;
    $image = $_REQUEST['image'] ?? null;
    $id = $_REQUEST['id'] ?? null;

    if (Profilo::exists($id)) {
      $profilo = Profilo::selectById($id);

      if ($nome !== null) {
        $profilo->nome = $nome;
      }
      if ($image !== null) {
        $profilo->image = (int)$image;
      }

      Profilo::update($profilo->fkUtenteId, $profilo->nome, $profilo->image, $profilo->profiloId);

      Response::json("Profilo con ID: {$id} aggiornato", 200);
    } else {
      Response::json("Inserisci un valido ID per aggiornare un Profilo", 400);
    }
  }

  public function deleteProfile()
  {
    $id = $_REQUEST['id'];

    if (Profilo::exists($id)) {
      Profilo::delete($id);
      Response::json("Profilo con ID: {$id} eliminato", 200);
    } else {
      Response::json("Inserisci un ID valido", 404);
    }
  }

  public function getProducts()
  {
    $id = $_REQUEST['id'];

    if (Profilo::exists($id)) {
      $products = Profilo::selectAllProducts($id);
      Response::json($products, 200);
    } else {
      Response::json("Profilo con ID: {$id} non trovato", 404);
    }
  }
}
