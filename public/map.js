function initialize()
{
    let mapProp = {
        center:new google.maps.LatLng(48.68663079063300, 6.1794564225121),
        zoom:12,
        mapTypeId:google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
}

function getMarker(latLong, contentString, couleur, text){
    return new google.maps.Marker({
        position: latLong,
        map: map,
        content: contentString,
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: couleur,
            fillOpacity: .9,
            scale: 10,
            strokeWeight: 1
        },
        label: {
            color: 'white',
            text: text
        }
    });
}

function position(lat, long, nom, adresse, places, capacite, couleur, text)
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

    google.maps.event.addListener(getMarker(latLong, contentString, couleur, text), "click", function(){
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
                for (let i = 0; i < 21; i++){
                    if (parkings[i]["COMMUNE"] === "Essey"){
                        position(
                            parkings[i]["geometry"]["y"],
                            parkings[i]["geometry"]["x"],
                            parkings[i]["NOM"],
                            parkings[i]["ADRESSE"],
                            parkings[i]["PLACES"],
                            parkings[i]["CAPACITE"],
                            "red", "1"
                        );
                    }else if (parkings[i]["COMMUNE"] === "Vandoeuvre"){
                        position(
                            parkings[i]["geometry"]["y"],
                            parkings[i]["geometry"]["x"],
                            parkings[i]["NOM"],
                            parkings[i]["ADRESSE"],
                            parkings[i]["PLACES"],
                            parkings[i]["CAPACITE"],
                            "pruple", "1"
                        );
                    }
                }
            });
        }
    }
    xmlhttp.open('GET', 'index.php', false);
    xmlhttp.send();
}

getListParkings();