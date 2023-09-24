<?php

namespace App\Controllers;

use App\Entities\Utente;
use App\core\Response;

class ApiUtenteController
{
  public static function addNewUtente()
  {
    $nome = $_REQUEST['nome'];
    $cognome = $_REQUEST['cognome'];
    $sesso = $_REQUEST['sesso'];
    $telefono = $_REQUEST['telefono'];
    $email = $_REQUEST['email'];
    $password = $_REQUEST['password'];

    if (
      !empty($nome) &&
      !empty($cognome) &&
      !empty($sesso) &&
      !empty($telefono) &&
      !empty($email) &&
      !empty($password)
    ) {
      Utente::create($nome, $cognome, $sesso, $telefono, $email, $password);
      Response::json("{$nome} {$cognome} creato con successo", 201);
    } else {
      Response::json("Inserisci tutti i campi necessari", 400);
    }
  }

  public function updateUtente()
  {
    $nome = $_REQUEST['nome'] ?? null;
    $cognome = $_REQUEST['cognome'] ?? null;
    $sesso = $_REQUEST['sesso'] ?? null;
    $telefono = $_REQUEST['telefono'] ?? null;
    $email = $_REQUEST['email'] ?? null;
    $password = $_REQUEST['password'] ?? null;
    $id = $_REQUEST['id'] ?? null;

    if (Utente::exists($id)) {
      $utente = Utente::selectById($id);

      if ($nome !== null) {
        $utente->nome = $nome;
      }
      if ($cognome !== null) {
        $utente->cognome = $cognome;
      }
      if ($sesso !== null) {
        $utente->sesso = $sesso;
      }
      if ($telefono !== null) {
        $utente->telefono = $telefono;
      }
      if ($email !== null) {
        $utente->email = $email;
      }
      if ($password !== null) {
        $utente->password = $password;
      }

      Utente::update($utente->nome, $utente->cognome, $utente->sesso, $utente->telefono, $utente->email, $utente->password, $utente->utenteId);

      Response::json("Utente con ID: {$id} aggiornato", 200);
    } else {
      Response::json("Inserisci un valido ID per aggiornare un Utente", 400);
    }
  }

  public function deleteUtente()
  {
    $id = $_REQUEST['id'];

    if (Utente::exists($id)) {
      Utente::delete($id);
      Response::json("Utente con ID: {$id} eliminato", 200);
    } else {
      Response::json("Inserisci un ID valido", 404);
    }
  }

  public function getProfiles()
  {
    $id = $_REQUEST['id'];

    if (Utente::exists($id)) {
      $profiles = Utente::selectAllProfile($id);
      Response::json($profiles, 200);
    } else {
      Response::json("Utente con ID: {$id} non trovato", 404);
    }
  }
}
