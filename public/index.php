<?php

require_once '../src/vendor/autoload.php';

$c = new MongoDB\Client('mongodb://mongo:mongopass@mongo');
$db = $c->mongodb;

$url = file_get_contents('https://geoservices.grand-nancy.org/arcgis/rest/services/public/VOIRIE_Parking/MapServer/0/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=nom%2Cadresse%2Cplaces%2Ccapacite&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentsOnly=false&datumTransformation=&parameterValues=&rangeValues=&f=pjson');
$data = json_decode($url);
//$db->createCollection('parkingCollection');

$collections = $db->listCollections();
$collectionNames = [];
foreach ($collections as $collection) {
    $collectionNames[] = $collection->getName();
}
$exists = in_array('parkingCollection', $collectionNames);

if (!($exists))
{
    $db->createCollection('parkingCollection');

    $db->selectCollection('parkingCollection')->insertOne($data);
}

$parkings = $db->parkingCollection->find();

if(is_null($parkings)){
    print "no data";
    die();
}

foreach ($parkings as $parking) {
    $feature = $parking->features;
}

print_r(json_encode($feature));

include 'index.html';
?>


