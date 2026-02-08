function getBathVal(){
    var uiBath = document.getElementsByName('uiBath');
    for (var i in uiBath){
        if(uiBath[i].checked){
            return parseInt(i)+1
        }
    }
    return -1;
}

function getBHKVal(){
    var uiBHK = document.getElementsByName('uiBHK');
    for (var i in uiBHK){
        if(uiBHK[i].checked){
            return parseInt(i)+1
        }
    }
    return -1;
}


function onClickedEstimatePrice(){
    console.log("Estimate Price Button Clicked")
    var sqft = document.getElementById('uiSqft');
    var bhk = getBHKVal();
    var bathrooms = getBathVal();
    var location = document.getElementById('uiLocations');
    var estPrice = document.getElementById('uiEstimatedPrice');

    var url = "http://127.0.0.1:5000/predict_home_price";

    $.post(url, {
        total_sqft: parseFloat(sqft.value),
        bhk : bhk,
        bath : bathrooms,
        location : location.value
    },function(data, status){
        console.log(data.estimated_price);
        estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + " Lack</h2>";
        console.log(status);
    });
}

function onPageLoad(){
    console.log("document loaded");
    var url = "http://127.0.0.1:5000/get_location_names";
    $.get(url, function(data, status){
        console.log("got response for get_location_names request");
        if(data){
            var locations = data.locations;
            var uiLocations = document.getElementById("uiLocations");
            $('#uiLocations').empty();
            for (var i in locations){
                var opt = new Option(locations[i]);
                $('#uiLocations').append(opt);
            }
        }
    });
}
window.onload = onPageLoad;