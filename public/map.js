function initialize()
{
    let mapProp = {
        center:new google.maps.LatLng(48.68663079063300, 6.1794564225121),
        zoom:12,
        mapTypeId:google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
}


function position(lat, long, nom, adresse, places, capacite)
{
    let latLong = {lat: lat, lng: long};
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

    let marker = new google.maps.Marker ({
        position: latLong,
        map: map,
        content: contentString
    });

    google.maps.event.addListener(marker, "click", function(){
        popup.setContent(this.content);
        popup.open(map, this);
    });
}


function getListParkings()
{
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4) {
            let listParkings = this.responseText.split("<!DOCTYPE html>")[0];
            initialize();

            JSON.parse(listParkings).forEach(parkings => {
                position(
                    parkings["geometry"]["y"],
                    parkings["geometry"]["x"],
                    parkings["attributes"]["NOM"],
                    parkings["attributes"]["ADRESSE"],
                    parkings["attributes"]["PLACES"],
                    parkings["attributes"]["CAPACITE"]);
            });
        }
    }
    xmlhttp.open('GET', 'index.php', false);
    xmlhttp.send();
}

getListParkings();