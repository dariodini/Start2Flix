<?php

namespace App\Controllers;

use App\Entities\Utente;
use App\core\Response;

class ApiUtenteController
{
  public static function addNewUtente()
  {
    $nome = $_POST['nome'];
    $cognome = $_POST['cognome'];
    $sesso = $_POST['sesso'];
    $telefono = $_POST['telefono'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    if (!Utente::exists($email)) {
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
    } else {
      Response::json("Email inserita gia in uso", 409);
    }
  }

  public function updateUtente()
  {
    $nome = $_REQUEST['nome'] ?? null;
    $cognome = $_REQUEST['cognome'] ?? null;
    $sesso = $_REQUEST['sesso'] ?? null;
    $telefono = $_REQUEST['telefono'] ?? null;

    session_start();
    if (isset($_SESSION['user'])) {
      $utenteId = $_SESSION['user']->id;

      if (Utente::exists($utenteId)) {
        $utente = Utente::selectById($utenteId)[0];
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

        Utente::update($utente->nome, $utente->cognome, $utente->sesso, $utente->telefono, $utenteId);

        Response::json("Utente con ID: {$utenteId} aggiornato", 200);
      } else {
        Response::json("Inserisci un valido ID per aggiornare un Utente", 400);
      }
    } else {
      Response::json("Non sei loggato!", 400);
    }
  }

  public function deleteUtente()
  {
    $id = $_REQUEST['id'] ?? null;

    if (Utente::exists($id)) {
      Utente::delete($id);
      Response::json("Utente con ID: {$id} eliminato", 200);
    } else {
      Response::json("Inserisci un ID valido", 404);
    }
  }

  public function getProfiles()
  {
    session_start();

    if ((isset($_SESSION['user']))) {
      $id = $_SESSION['user']->id;

      if (Utente::exists($id)) {
        $profiles = Utente::selectAllProfile($id);
        Response::json($profiles, 200);
      } else {
        Response::json("Utente con ID: {$id} non trovato", 404);
      }
    } else {
      Response::json("Effettua l'accesso prima!", 401);
    }
  }

  public function loginUtente()
  {
    $email = $_REQUEST['email'] ?? null;
    $password = $_REQUEST['password'] ?? null;

    session_start();

    if ($email !== null && $password !== null) {
      $utente = Utente::login($email, $password);
      if ($utente !== null) {
        $_SESSION['user'] = $utente;
        Response::json($utente, 200);
      }
      Response::json("Email o password sono errati, riprovare", 401);
    }
    Response::json("Inserisci email e password validi", 400);
  }

  public function logoutUtente()
  {
    session_start();
    if (isset($_SESSION["user"])) {
      Response::json(Utente::logout(), 200);
    }
    Response::json("Non sei loggato", 400);
  }

  public function statoUtente()
  {
    session_start();

    if (isset($_SESSION["user"])) {
      if (isset($_SESSION["profile"])) {
        Response::json(["userId" => $_SESSION["user"]->id, "profileId" => $_SESSION['profile']->id], 200);
      } else {
        Response::json(["userId" => $_SESSION["user"]->id], 200);
      }
    } else {
      Response::json("Utente non loggato!", 401);
    }
  }

  public function informazioniUtente()
  {
    session_start();

    if (isset($_SESSION["user"])) {
      Response::json(Utente::informazioniUtente($_SESSION["user"]->id), 200);
    } else {
      Response::json("Utente non loggato!", 401);
    }
  }
}
