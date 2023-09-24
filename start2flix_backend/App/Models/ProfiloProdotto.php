<?php

namespace App\Entities;

use App\core\App;

class ProfiloProdotto
{
  public static function selectAll()
  {
    return App::get('database')->selectAll('profiloProdotto');
  }

  public static function create($fkProdottoId, $fkProfiloId)
  {
    return App::get('database')->create('profiloProdotto', [
      'fkUtenteId' => $fkProfiloId,
      'fkProdottoId' => $fkProdottoId
    ]);
  }

  public static function delete($prodottoId, $profiloId)
  {
    return App::get('database')->deleteWhere('profiloProdotto', ['fkdProfiloId' => $profiloId, 'fkProdottoId' => $prodottoId]);
  }
}
