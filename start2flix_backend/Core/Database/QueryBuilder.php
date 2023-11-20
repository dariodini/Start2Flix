<?php

namespace App\Core\Database;

use PDO;

class QueryBuilder
{
  protected $pdo;

  public function __construct($pdo)
  {
    $this->pdo = $pdo;
  }

  public function selectAll($table)
  {
    $statement = $this->pdo->prepare("select * from {$table}");

    $statement->execute();

    return $statement->fetchAll(PDO::FETCH_CLASS);
  }

  public function create($table, $parameters): void
  {
    $columns = implode(', ', array_keys($parameters));
    $values = ':' . implode(', :', array_keys($parameters));

    $sql = "INSERT INTO $table ($columns) VALUES ($values)";

    try {
      $statement = $this->pdo->prepare($sql);
      $statement->execute($parameters);
    } catch (\Exception $e) {
      echo "An error occurred while executing the query. Try later.";
    }
  }


  public function update($table, $parameters): void
  {
    $columns = [];
    $id = $parameters['id'];

    foreach ($parameters as $key => $value) {
      if ($key !== 'id') {
        $columns[] = $key . ' = :' . $key;
      }
    }

    $sql = sprintf(
      'UPDATE %s SET %s WHERE id = :id',
      $table,
      implode(', ', $columns)
    );

    try {
      $statement = $this->pdo->prepare($sql);
      $statement->bindValue(':id', $id);
      unset($parameters['id']);

      foreach ($parameters as $key => $value) {
        $statement->bindValue($key, $value);
      }

      $statement->execute();
    } catch (\Exception $e) {
      echo "An error occurred while executing the query. Try later.";
    }
  }

  public function delete($table, $parameters): void
  {
    $id = $parameters['id'];


    $sql = sprintf(
      'DELETE FROM %s WHERE id = :id',
      $table
    );

    try {
      $statement = $this->pdo->prepare($sql);
      $statement->bindValue(':id', $id);
      $statement->execute();
    } catch (\Exception $e) {
      echo "An error occurred while executing the query. Try later.";
    }
  }

  public function selectById($table, $id)
  {
    $statement = $this->pdo->prepare("SELECT * FROM {$table} WHERE id = :id");
    $statement->bindValue(':id', $id);
    $statement->execute();

    return $statement->fetch(PDO::FETCH_OBJ);
  }

  public function selectWhere($table, $conditions)
  {
    $sqlConditions = [];

    foreach ($conditions as $column => $value) {
      $sqlConditions[] = "$column = :$column";
    }

    $sql = "SELECT * FROM {$table} WHERE " . implode(' AND ', $sqlConditions);

    try {
      $statement = $this->pdo->prepare($sql);

      foreach ($conditions as $column => $value) {
        $statement->bindValue($column, $value);
      }

      $statement->execute();

      return $statement->fetchAll(PDO::FETCH_CLASS);
    } catch (\Exception $e) {
      echo "An error occurred while executing the query. Try later.";
      return [];
    }
  }

  public function deleteWhere($table, $conditions)
  {
    $sqlConditions = [];

    foreach ($conditions as $column => $value) {
      $sqlConditions[] = "$column = :$column";
    }

    $sql = "DELETE FROM {$table} WHERE " . implode(' AND ', $sqlConditions);

    try {
      $statement = $this->pdo->prepare($sql);

      foreach ($conditions as $column => $value) {
        $statement->bindValue($column, $value);
      }

      $statement->execute();
    } catch (\Exception $e) {
      echo "An error occurred while executing the query. Try later.";
      return [];
    }
  }

  public function login($email, $password)
  {
    $user = $this->selectWhere('utente', ['email' => $email]);
    if (!empty($user) && password_verify($password, $user[0]->password)) {
      return $user[0];
    }
    return null;
  }

  public function selectFieldsById($table, $fields, $userId)
  {
    $selectFields = implode(', ', $fields);
    $sql = "SELECT $selectFields FROM $table WHERE id = :id";

    try {
      $statement = $this->pdo->prepare($sql);
      $statement->bindValue(':id', $userId);
      $statement->execute();

      return $statement->fetch(PDO::FETCH_OBJ);
    } catch (\Exception $e) {
      echo "An error occurred while executing the query. Try later.";
      return null;
    }
  }
}
