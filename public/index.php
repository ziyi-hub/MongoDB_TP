<?php

require_once '../src/vendor/autoload.php';

$c = new MongoDB\Client('mongodb://mongo.db');
echo "connected <br>";

$db = $c->catalogue;

$features = $db->features->find([], []);

if(is_null($features)){
    print "no data";
    die();
}

foreach ($features as $feature){
    print $feature->NOM ;
}

