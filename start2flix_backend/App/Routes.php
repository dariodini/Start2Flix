<?php

$router->post('api/utente', 'ApiUtenteController@addNewUtente');
$router->post('api/utente/login', 'ApiUtenteController@loginUtente');
$router->get('api/utente/logout', 'ApiUtenteController@logoutUtente');
$router->put('api/utente', 'ApiUtenteController@updateUtente');
$router->delete('api/utente', 'ApiUtenteController@deleteUtente');
$router->get('api/utente/stato', 'ApiUtenteController@statoUtente');
$router->get('api/utente/profili', 'ApiUtenteController@getProfiles');
$router->get('api/utente/informazioni', 'ApiUtenteController@informazioniUtente');
$router->post('api/utente/aggiorna-informazioni', 'ApiUtenteController@updateUtente');
$router->post('api/utente/profilo/set', 'ApiProfiloController@setProfile');


$router->post('api/utente/profilo', 'ApiProfiloController@addNewProfile');
$router->post('api/utente/profilo/aggiorna-informazioni', 'ApiProfiloController@updateProfile');
$router->delete('api/utente/profilo', 'ApiProfiloController@deleteProfile');
$router->get('api/profilo/get-products', 'ApiProfiloController@getProducts');
$router->post('api/utente/get-profilo', 'ApiProfiloController@getProfileById');


$router->post('api/profilo/add-product', 'ApiProfiloProdottoController@addProductToProfileList');
$router->post('api/profilo/remove-product', 'ApiProfiloProdottoController@deleteProductToProfileList');
$router->post('api/profilo/check-product', 'ApiProfiloProdottoController@checkProductInList');
