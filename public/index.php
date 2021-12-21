<?php

require_once '../src/vendor/autoload.php';

$c = new MongoDB\Client('mongodb://mongo:mongopass@mongo');
$db = $c->mongodb;

$jsonData = file_get_contents('parkingCollection.json');
$data = json_decode($jsonData);

$collections = $db->listCollections();
$collectionNames = [];
foreach ($collections as $collection) {
    $collectionNames[] = $collection->getName();
}
$exists = in_array('parkingCollection', $collectionNames);

if (!($exists))
{
    $db->createCollection('parkingCollection');

    $db->selectCollection('parkingCollection')->insertMany($data);
}

$parkings = $db->parkingCollection->find();


if(is_null($parkings)){
    print "no data";
    die();
}

foreach ($parkings as $parking) {
    $datas[] = $parking;
}

print_r(json_encode($datas));

include 'index.html';
?>


