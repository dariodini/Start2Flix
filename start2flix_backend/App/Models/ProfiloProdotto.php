<?php

namespace App\Entities;

use App\core\App;

class ProfiloProdotto
{
  public static function selectAll()
  {
    return App::get('database')->selectAll('profiloProdotto');
  }

  public static function create($fkProdottoId, $fkProfiloId, $type)
  {
    return App::get('database')->create('profiloProdotto', [
      'fkProfiloId' => $fkProfiloId,
      'fkProdottoId' => $fkProdottoId,
      'type' => $type,
    ]);
  }

  public static function exist($fkProdottoId, $fkProfiloId)
  {
    return App::get('database')->selectWhere('profiloProdotto', [
      'fkProdottoId' => $fkProdottoId,
      'fkProfiloId' => $fkProfiloId,
    ]);
  }

  public static function delete($prodottoId, $profiloId)
  {
    return App::get('database')->deleteWhere('profiloProdotto', ['fkProfiloId' => $profiloId, 'fkProdottoId' => $prodottoId]);
  }
}
