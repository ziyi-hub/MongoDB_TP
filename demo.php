<?php
    $html = <<<END
    <!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCCfld0seEmoVxj0ZRr7AAT_206D96d2QU"></script>
</head>
<body>
<div id="googleMap" style="width:100%;height:700px;"></div>
<script>
    function initialize() {
        let mapProp = {
            center:new google.maps.LatLng(48.684457, 6.163311),
            zoom:15,
            mapTypeId:google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

        let myLatLng = {lat: 48.684457, lng: 6.163311};
        let marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
        });

        let myLatLng2 = {lat: 50.684457, lng: 7.163311};
        let marker2 = new google.maps.Marker({
            position: myLatLng2,
            map: map,
        });

    }

    google.maps.event.addDomListener(window, 'load', initialize);

/*
    function listeLocal(){
        JSON.parse(listeLocal).forEach(local => {
            listeContaminee.push(local)
        })
        //console.log(listeContaminee)
        listeContaminee.forEach(local => {
            position(parseFloat(local.longitude), parseFloat(local.latitude))
        })
    }


    function initialize() {
        let mapProp = {
            center: new google.maps.LatLng(48.679628, 6.158803),
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
    }
    google.maps.event.addDomListener(window, 'load', initialize);
*/
</script>
</body>
</html>
END;
    echo $html;
?>
