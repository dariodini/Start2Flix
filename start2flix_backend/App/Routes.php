<?php

$router->post('api/utente', 'ApiUtenteController@addNewUtente');
$router->post('api/utente/login', 'ApiUtenteController@loginUtente');
$router->put('api/utente', 'ApiUtenteController@updateUtente');
$router->delete('api/utente', 'ApiUtenteController@deleteUtente');
$router->get('api/utente/profili', 'ApiUtenteController@getProfiles');


$router->post('api/utente/profilo', 'ApiProfiloController@addNewProfile');
$router->put('api/utente/profilo', 'ApiProfiloController@updateProfile');
$router->delete('api/utente/profilo', 'ApiProfiloController@deleteProfile');
$router->get('api/profilo/get-products', 'ApiProfiloController@getProducts');


$router->post('api/profilo/add-product', 'ApiProfiloProdottoController@addProductToProfileList');
$router->delete('api/profilo/remove-product', 'ApiProfiloProdottoController@deleteProductToProfileList');