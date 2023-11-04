<?php

namespace App\Controllers;

use App\Entities\Profilo;
use App\Entities\ProfiloProdotto;
use App\core\Response;

class ApiProfiloProdottoController
{
  public static function addProductToProfileList()
  {
    $prodottoId = $_REQUEST['prodottoId'];
    session_start();

    if ((isset($_SESSION['profile']))) {
      $profiloId = $_SESSION['profile']->id;
      if (Profilo::exists($profiloId)) {
        if (!empty($prodottoId)) {
          if (!ProfiloProdotto::exist($prodottoId, $profiloId)) {
            ProfiloProdotto::create($prodottoId, $profiloId);
            Response::json("Prodotto {$prodottoId} aggiunto con successo", 201);
          } else {
            Response::json('Prodotto gia presente nella tua lista', 400);
          }
        } else {
          Response::json("Inserisci i campi necessari", 400);
        }
      } else {
        Response::json('Seleziona il profilo prima!', 401);
      }
    }
  }

  public function deleteProductToProfileList()
  {
    $profiloId = $_REQUEST['profiloId'];
    $prodottoId = $_REQUEST['prodottoId'];

    ProfiloProdotto::delete($prodottoId, $profiloId);
    Response::json("Prodotto con ID: {$prodottoId} eliminato dalla lista", 200);
  }
}
