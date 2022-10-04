const geolocations = document.querySelectorAll("#geolocation");
for (let geolocation of geolocations) {
    const ip = "";
    const XMLHttp = new XMLHttpRequest();

    XMLHttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var json = JSON.parse(this.responseText);

            geolocation.innerHTML = json.country;

        }
    };
    XMLHttp.open("GET", "https://ipwhois.app/json/" + ip, true);
    XMLHttp.send();
}