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
            let nbNancy = 0;
            let nbEssey = 0;
            let nbVandoeuvre = 0;
            let nbTomblaine = 0;
            JSON.parse(listParkings).forEach(parkings => {
                let couleur = 'red';
                let text = '2';

                    if (parkings["COMMUNE"] === "Nancy")
                    {
                        nbNancy++;
                    } else if (parkings["COMMUNE"] === "Essey") {
                        nbEssey++;
                    } else if (parkings["COMMUNE"] === "Vandoeuvre") {
                        nbVandoeuvre++;
                    } else if (parkings["COMMUNE"] === "Tomblaine") {
                        nbTomblaine++;
                    }

                let communes = parkings["COMMUNE"];
                switch (communes)
                {
                    case "Essey":
                        for (let i = 1; i <= nbEssey; i++)
                        {
                            couleur = 'dodgerblue';
                            text = i.toString();
                        }
                        break;
                    case "Vandoeuvre":
                        for (let i = 1; i <= nbVandoeuvre; i++)
                        {
                            couleur = 'mediumpurple';
                            text = i.toString();
                        }
                        break;
                    case "Nancy":
                        for (let i = 1; i <= nbNancy; i++)
                        {
                            couleur = 'gold';
                            text = i.toString();
                        }
                        break;
                    case "Tomblaine":
                        for (let i = 1; i <= nbTomblaine; i++)
                        {
                            couleur = 'mediumseagreen';
                            text = i.toString();
                        }
                        break;
                }

                position(
                    parkings["geometry"]["y"],
                    parkings["geometry"]["x"],
                    parkings["NOM"],
                    parkings["ADRESSE"],
                    parkings["PLACES"],
                    parkings["CAPACITE"],
                    couleur,
                    text
                );
                /*for (let i = 0; i < 21; i++)
                {
                    if(parkings[i]["COMMUNE"] === "Nancy")
                    {
                        total++;
                    }
                    else if(parkings[i]["COMMUNE"] === "Essey")
                    {
                        total++;
                    }
                    else if(parkings[i]["COMMUNE"] === "Vandoeuvre")
                    {
                        total++;
                    }
                    else if(parkings[i]["COMMUNE"] === "Tomblaine")
                    {
                        total++;
                    }

                    let communes = parkings[i]["COMMUNE"];
                    switch (communes)
                    {
                        case "Essey":
                            for (let i = 1; i <= total; i++)
                            {
                                couleur = 'dodgerblue';
                                text = i.toString();
                            }
                            break;
                        case "Vandoeuvre":
                            for (let i = 1; i <= total; i++)
                            {
                                couleur = 'mediumpurple';
                                text = i.toString();
                            }
                            break;
                        case "Nancy":
                            for (let i = 1; i <= total; i++)
                            {
                                couleur = 'gold';
                                text = i.toString();
                            }
                            break;
                        case "Tomblaine":
                            for (let i = 1; i <= total; i++)
                            {
                                couleur = 'mediumseagreen';
                                text = i.toString();
                            }
                            break;
                    }

                    position(
                        parkings[i]["geometry"]["y"],
                        parkings[i]["geometry"]["x"],
                        parkings[i]["NOM"],
                        parkings[i]["ADRESSE"],
                        parkings[i]["PLACES"],
                        parkings[i]["CAPACITE"],
                        couleur,
                        text
                    );
                }*/
            });
        }
    }
    xmlhttp.open('GET', 'index.php', false);
    xmlhttp.send();
}

getListParkings();