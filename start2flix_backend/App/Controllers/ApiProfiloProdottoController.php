<?php

namespace App\Controllers;

use App\Entities\Profilo;
use App\Entities\ProfiloProdotto;
use App\core\Response;

class ApiProfiloProdottoController
{
  public static function addProductToProfileList()
  {
    $profiloId = $_REQUEST['profiloId'];
    $prodottoId = $_REQUEST['prodottoId'];

    if (Profilo::exists($profiloId)) {
      if (!empty($prodottoId)) {
        ProfiloProdotto::create($prodottoId, $profiloId);
        Response::json("Prodotto {$prodottoId} aggiunto con successo", 201);
      } else {
        Response::json("Inserisci i campi necessari", 400);
      }
    }
  }

  public function deleteProduct()
  {
    $profiloId = $_REQUEST['profiloId'];
    $prodottoId = $_REQUEST['prodottoId'];

    ProfiloProdotto::delete($profiloId, $prodottoId);
    Response::json("Prodotto con ID: {$prodottoId} eliminato dalla lista", 200);
  }
}
