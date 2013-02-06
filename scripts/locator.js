(function(){
    
    function getScript(url,callback){
        var head=document.getElementsByTagName('head')[0];
        var script= document.createElement('script');
        script.src=url;
        
        var done = false;
        script.onload=script.onreadystatechange = function(){
            if ( !done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete') ) {
                done=true;
                callback();
                script.onload = script.onreadystatechange = null;
                head.removeChild(script);
            }
        };
        head.appendChild(script);
    }
    
    
    getScript('//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js',function(){
        $.noConflict();
        jQuery(document).ready(function($) {
            
            
            $("#stockists").append("<div id='mapDiv'></div>");
            $("#mapDiv").height(400).width(600).css("float","right");
            
            $("#stockists").append("<input type='text' id='zipTextBox'/> <span id='zipLink'>Go!</span>");
            
            $.getScript('http://maps.googleapis.com/maps/api/js?key={G_API_KEY}&sensor=true&callback=initMaps');
            
            $('#zipLink').click(function(){
                var zip = $('#zipTextBox').val();
                geocoder.geocode( { 'address': zip}, function(results, status) {
                      if (status == google.maps.GeocoderStatus.OK) {
                        locMap.setCenter(results[0].geometry.location);
                        var marker = new google.maps.Marker({
                            map: locMap,
                            position: results[0].geometry.location
                        });
                      } else {
                        alert("Geocode was not successful for the following reason: " + status);
                      }
                });
            });
                
        });
        
    
    });
    
    
    
    
})()

var locMap, locData,geocoder,vendorMarkers;
locData = JSON.parse('{LOCATION_DATA}');


function initMaps(){
    vendorMarkers = new google.maps.MVCArray();
    geocoder = new google.maps.Geocoder();
    
    var mapLatLng = new google.maps.LatLng(35.941115, -86.827891);
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            mapLatLng = new google.maps.LatLng(position.coords.latitude,
                                         position.coords.longitude);

                
        });
    }
    var mapOptions = {
        zoom: 8,
        center: mapLatLng,
        mapTypeId: google.maps.MapTypeId.ROADMAP};

    locMap = new google.maps.Map(document.getElementById("mapDiv"), mapOptions);
    
    processLocations();
    
    google.maps.event.addListener(locMap, 'bounds_changed', processLocations);
}

function processLocations(){
    
    vendorMarkers.clear();
    //alert("loading");
    for (var i = 0; i < locData.length; i++){
        vendorMarkers[i] = new google.maps.Marker({map:locMap,position: new google.maps.LatLng(locData[i].lat,locData[i].long),title:locData[i].name});
    }
}

