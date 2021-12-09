<?php

require_once '../src/vendor/autoload.php';

$c = new MongoDB\Client('mongodb://mongo.db');
$db = $c->geoservices;
$features = $db->features->find([], []);

if(is_null($features)){
    print "no data";
    die();
}

$cursor = $db->selectCollection('features')->find();
$geometrys = [];
foreach ($cursor as $document) {
    $geometry[] = json_encode($document);
}
print_r(json_encode($geometry));




$html = <<<END
    <!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>MongoDB</title>
    <script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCCfld0seEmoVxj0ZRr7AAT_206D96d2QU"></script>
</head>
<body>
<div id="googleMap" style="width:100%;height:700px;"></div>
<script>
    function initialize() {
        let mapProp = {
            center:new google.maps.LatLng(48.68663079063300, 6.1794564225121),
            zoom:12,
            mapTypeId:google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
    }
    
    
    function position(lat, lng, nom, adresse, places, capacite){
        let myLatLng = {lat: lat, lng: lng};
        let popup = new google.maps.InfoWindow();
  
        const contentString =
        '<div id="content">' +
            '<div id="siteNotice"></div>' +
            "<h1 id='firstHeading' class='firstHeading'>" + nom + "</h1>" +
            '<div id="bodyContent">' +
                "<p>" +
                    "ADRESSE: " + adresse + "</br>" +
                    "PLACES: " + places + "</br>" +
                    "CAPACITE: " + capacite + "</br>" +
                "</p>" +
            "</div>" +
        "</div>";
        
        let marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            content: contentString
        });
        google.maps.event.addListener(marker, "click", function(){
            popup.setContent(this.content);
            popup.open(map, this);
        });
    }
    
    
    function getListeLocal(){
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4) {
                let listeLocal = this.responseText.split("<!DOCTYPE html>")[0]
                initialize()
                JSON.parse(listeLocal).forEach(local => {
                    position(
                        parseFloat(JSON.parse(local)["geometry"]["y"]), 
                        parseFloat(JSON.parse(local)["geometry"]["x"]), 
                        JSON.parse(local)["attributes"]["NOM"], 
                        JSON.parse(local)["attributes"]["ADRESSE"],
                        JSON.parse(local)["attributes"]["PLACES"],
                        JSON.parse(local)["attributes"]["CAPACITE"])
                })
            }
        }
        xmlhttp.open('GET', 'index.php', false);
        xmlhttp.send();
    }
    
    getListeLocal()

</script>
</body>
</html>
END;
echo $html;
?>


