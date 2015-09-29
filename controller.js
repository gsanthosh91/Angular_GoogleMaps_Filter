var dpApp = angular.module('dpApp', []);
// Unique Filter
       dpApp.filter('unique', function() {
           return function(collection, keyname) {
              var output = [], 
              keys = [];
              angular.forEach(collection, function(item) {
                  var key = item[keyname];
                  if(keys.indexOf(key) === -1) {
                      keys.push(key);
                      output.push(item);
                  }
              });
              return output;
           };
        });
        
// Unique Filter 

(function() {
'use strict';

/**
 * Main Controller
 */

angular
  .module('dpApp')
  .controller('MainController', Controller);

   
    
function Controller($scope){
	var dp = this;
    var cities;
    $scope.dum=[];
    
        $scope.data=[{"hid":43,"hname":"Gandhi Nursing Home","haddress":"A, Chandra Apartment, Mandpeshwar Road,Near Ram Mandhir\r\n","harea":"Mandpeshwar-Borivali West","hcity":"Mumbai","hemergency":null,"hpincode":"400103","hstate":"Maharashtra","hphone":"+(91)-22-61618927","hestd":"1988","hrating":"3.9","hlatitude":"19.237842","hlongitude":"72.854338","htimings":"Mon-Sun: 12:00AM-11:59PM"},{"hid":47,"hname":"Madhu Polyclinic And Nursing Home","haddress":"Mini Apartment, Jungle Mangal Road,Opposite Sarvodaya Nagar\r\n","harea":"Bhandup West","hcity":"Mumbai","hemergency":"  +91-9833032120","hpincode":"400078","hstate":"Maharashtra","hphone":"+(91)-22-61428866","hestd":"1987","hrating":"4","hlatitude":"19.148256","hlongitude":"72.93425","htimings":"Mon-Sun: 12:00AM-11:59PM","hfaci":{"1":{"title":"dermatology","icon":"icon-i-dermatology"},"2":{"title":"pathology","icon":"icon-i-pathology"},"5":{"title":"ear-nose-throat","icon":"icon-i-ear-nose-throat"},"9":{"title":"pediatrics","icon":"icon-i-pediatrics"}}},{"hid":48,"hname":"Sunridges Speciality Hospital","haddress":"17, Sunflower Navyug, V L Mehta Road,Jvpd Scheme, Near Mithibai College\r\n","harea":"Vile Parle West","hcity":"Mumbai","hemergency":null,"hpincode":"400056","hstate":"Maharashtra","hphone":"+(91)-22-67732247","hestd":"2014","hrating":"3.5","hlatitude":"19.102925","hlongitude":"72.834808","htimings":"Mon-Sun: 12:00AM-11:59PM"},{"hid":49,"hname":"Sunita Hospital","haddress":"Nirman Vihar Society, Rajmata Jijabai Road,Near Pump House\r\n","harea":"Andheri East","hcity":"Mumbai","hemergency":null,"hpincode":"400093","hstate":"Maharashtra","hphone":"+(91)-22-61635047","hestd":"1984","hrating":"4","hlatitude":"19.1292371","hlongitude":"72.8603035","htimings":"Mon-Sun: 12:00AM-11:59PM"},{"hid":50,"hname":"Varun Hospital","haddress":"Gandhi Society, Rajmata Jijabai Road","harea":"Andheri East","hcity":"Mumbai","hemergency":null,"hpincode":"400093","hstate":"Maharashtra","hphone":"+(91)-22-61635827","hestd":"1994","hrating":"3","hlatitude":"19.1252371","hlongitude":"72.8602435","htimings":"Mon-Sun: 12:00AM-11:59PM"}];
    
     
        // Filter
        $scope.pincodeIncludes = [];
        
        $scope.includePincode = function(hpincode) {
            
            var i = $.inArray(hpincode, $scope.pincodeIncludes);
            if (i > -1) {
                $scope.pincodeIncludes.splice(i, 1);
            } else {
                $scope.pincodeIncludes.push(hpincode);
            }
           
            dp.mapFilter();
        }
        
        
        $scope.Filter = function(value) {
            if ($scope.pincodeIncludes.length > 0) {
                if ($.inArray(value.hpincode, $scope.pincodeIncludes) < 0)
                    return;
            }
            return value;
        }// Filter
        
        
        // Map Filter
        dp.mapFilter = function() {
            $scope.dum=[];
            for(var k=0;k<$scope.pincodeIncludes.length;k++){
                for (var j=0; j < $scope.data.length; j++) {
                   if ($scope.data[j].hpincode == $scope.pincodeIncludes[k]) {
                        $scope.dum.push($scope.data[j])
                    }
                }
            }
            dp.map();
        }// Map Filter

        
        // View Google Map
		dp.map = function() {
            if($scope.dum!=''){
                cities=$scope.dum;
            }else{
                cities=$scope.data;
            }
            // Center point
            var bound = new google.maps.LatLngBounds();
            for (i = 0; i < cities.length; i++) {
              bound.extend( new google.maps.LatLng(cities[i]["hlatitude"], cities[i]["hlongitude"]) );

            }// Center point
            
            var i;
            var mapOptions = {
                zoom: 10,
                center: bound.getCenter(),
                
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }

            $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

            $scope.markers = [];

            var infoWindow = new google.maps.InfoWindow();
            
            var createMarker = function (info){
                
                var marker = new google.maps.Marker({
                    map: $scope.map,
                   // console.log(info.lat);
                    position: new google.maps.LatLng(info.hlatitude, info.hlongitude),
                    title: info.hname
                });
                marker.content = '<div class="infoWindowContent">' + info.harea + '</div>';

                google.maps.event.addListener(marker, 'click', function(){
                    infoWindow.setContent('<h4>' + marker.title + '</h4>' + marker.content);
                    infoWindow.open($scope.map, marker);
                });

                $scope.markers.push(marker);

            }  

            for (i = 0; i < cities.length; i++){
                createMarker(cities[i]);
                
            }

            $scope.openInfoWindow = function(e, selectedMarker){
                e.preventDefault();
                google.maps.event.trigger(selectedMarker, 'click');
            }
            

		};
    
    
    
}
    
    

})();
