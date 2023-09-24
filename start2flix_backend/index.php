<?php

require 'vendor/autoload.php';
require 'core/bootstrap.php';

use App\Core\{Router, Request};

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

Router::load('App/Routes.php')
  ->direct(Request::uri(), Request::method());
