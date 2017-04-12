'use strict';
//Function to intialise maps and add some style features to maps
function initialiseMaps(){
    var styles = [
          {
            featureType: 'water',
            stylers: [
              { color: '#19a0d8' }
            ]
          },{
            featureType: 'administrative',
            elementType: 'labels.text.stroke',
            stylers: [
              { color: '#ffffff' },
              { weight: 6 }
            ]
          },{
            featureType: 'administrative',
            elementType: 'labels.text.fill',
            stylers: [
              { color: '#e85113' }
            ]
          },{
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [
              { color: '#efe9e4' },
              { lightness: -40 }
            ]
          },{
            featureType: 'transit.station',
            stylers: [
              { weight: 9 },
              { hue: '#e85113' }
            ]
          },{
            featureType: 'road.highway',
            elementType: 'labels.icon',
            stylers: [
              { visibility: 'off' }
            ]
          },{
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [
              { lightness: 100 }
            ]
          },{
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [
              { lightness: -100 }
            ]
          },{
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [
              { visibility: 'on' },
              { color: '#f0e4d3' }
            ]
          },{
            featureType: 'road.highway',
            elementType: 'geometry.fill',
            stylers: [
              { color: '#efe9e4' },
              { lightness: -25 }
            ]
          }
        ];

    //Initialising maps
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        styles: styles,
        center: {
            lat: 41.280825,
            lng: -81.567812
        }
    });
}

//Function to change the color of the marker
function makeMarkerIcon(markerColor) {
    var markerImage = new google.maps.MarkerImage(
        'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
        '|40|_|%E2%80%A2',
        new google.maps.Size(21, 34),
        new google.maps.Point(0, 0),
        new google.maps.Point(10, 34),
        new google.maps.Size(21,34));
    return markerImage;
}

//Creating an array for declaring the locations and their latlong postion.
var PlacesArray = [{
        placeName: 'Case Western Reserve University',
        latitude: 41.5044196,
        longitude: -81.6108489,
        imageUrl: 'images/cwru.jpg'
    },
    {
        placeName: 'Kent State University',
        latitude: 41.149063,
        longitude: -81.341465,
        imageUrl: 'images/Kent.png'
    },

    {
        placeName: 'Cleveland State University',
        latitude: 41.502141,
        longitude: -81.679395,
        imageUrl: 'images/csu.png'

    },
    {
        placeName: 'Reserve Square Apartments',
        latitude: 41.503269,
        longitude: -81.684903,
        imageUrl: 'images/rs.png'

    },
    {
        placeName: 'Hollypark Apartments',
        latitude: 41.152924,
        longitude: -81.332074,
        imageUrl: 'images/hp.png'
    },
    {
        placeName: 'Wright State University',
        latitude: 39.782632,
        longitude: -84.061449,
        imageUrl: 'images/wsu.jpg'
    },
    {
        placeName: 'Bombay Chaat',
        latitude:  41.501208,
        longitude: -81.675758,
        imageUrl: 'images/bc_img.png'
    },
    {
        placeName: 'Buffalo Wild Wings',
        latitude:  41.153577,
        longitude: -81.356707,
        imageUrl: 'images/bww_img.png'
    },
    {
        placeName: 'Tower City - Cleveland',
        latitude:  41.49764,
        longitude: -81.693946,
        imageUrl: 'images/tower_city.jpg'
    },
    {
        placeName: 'Solon Cinemas',
        latitude:  41.39195,
        longitude: -81.463373,
        imageUrl: 'images/solon_img.jpg'
    },
    {
        placeName: 'University of Akron',
        latitude:  41.07576,
        longitude: -81.511388,
        imageUrl: 'images/akron_img.png'
    },
    {
        placeName: 'Beachwood Mall - Cleveland',
        latitude:  41.498427,
        longitude: -81.49406 ,
        imageUrl: 'images/beachwood_mall.jpg'
    },
    {
        placeName: 'Edgewater Beach',
        latitude:  41.488015,
        longitude: -81.741439,
        imageUrl: 'images/edgewater_beach.jpeg'
    },
    {
        placeName: 'Cuyahoga Valley National Park',
        latitude:  41.280825,
        longitude: -81.567812,
        imageUrl: 'images/cuyahoga_park.jpeg'
    },
    {
        placeName: 'Horseshoe Casion - Cleveland',
        latitude:  41.497845,
        longitude: -81.691793,
        imageUrl: 'images/casino.jpg'
    },
    {
        placeName: 'Playhouse Square - Cleveland',
        latitude:  41.501277,
        longitude: -81.680726,
        imageUrl: 'images/playhouse_square.jpg'
    },
    {
        placeName: 'Southpark Mall - Cleveland',
        latitude:  41.308457,
        longitude: -81.820255,
        imageUrl: 'images/southpark_mall.png'
    },
    {
        placeName: 'Crocker Park - Cleveland',
        latitude:  41.460703,
        longitude: -81.952127,
        imageUrl: 'images/crocker_park.jpeg'
    },
];

//Declaring global variable and initilising the Foursquare API settings.
var map;
var Identifier = "BJ5E4SHVPVG224L3PIAT1EJHT3K5ZLGXW5M450PTOZUH0BOO";
var SecretKey = "1RN4SWNB2QFRPPQAXBOJJRHT1EUA3BE21R35TWUYFMK4L141";

//Function to set up the view model.
function appEntry() {
    ko.applyBindings(new ApplicationModel());
}

//Function to display error message if map fails to load.
function onTracingError() {
    alert("Error while loading google maps. Reload your page and try again.");
}

//Function for view model.
function ApplicationModel() {
    var self = this;
    this.placesList = ko.observableArray([]);
    this.searchTerm = ko.observable("");
    initialiseMaps();

    PlacesArray.forEach(function(locationItem) {
        self.placesList.push(new Location(locationItem));
    });
    //Function to get the list of location in the viewmodel.
    this.sortedList = ko.computed(function() {
        var searchInput = self.searchTerm().toLowerCase();
        if (!searchInput) {
            self.placesList().forEach(function(locationItem) {
                locationItem.visible(true);
            });
            return self.placesList();
        } else {
            return ko.utils.arrayFilter(self.placesList(), function(locationItem) {
                var givenName = locationItem.placeName.toLowerCase();
                var isMatch = (givenName.search(searchInput) >= 0);
                locationItem.visible(isMatch);
                return isMatch;
            });
        }
    }, self);

    this.mapElem = document.getElementById('map');
}

//Function to get the declared location and its details on the map
var Location = function(placeItem) {
    var self = this;
    var defaultIcon = makeMarkerIcon('0091ff');
    var highlightedIcon = makeMarkerIcon('FFFF24');
    this.placeName = placeItem.placeName;
    this.latitude = placeItem.latitude;
    this.longitude = placeItem.longitude;
    this.imageUrl = placeItem.imageUrl;
    this.webURL = "";
    this.streetName = "";
    this.cityName = "";
    this.visible = ko.observable(true);
    
    //Foursquare URL settings referenced from the official website
    //LINK: https://developer.foursquare.com/overview/auth
    var URLString = 'https://api.foursquare.com/v2/venues/search?ll=' + this.latitude + ',' + this.longitude + '&client_id=' + Identifier + '&client_secret=' + SecretKey + '&v=20170401' + '&query=' + this.placeName;
    //Function to get the location details 
    $.getJSON(URLString).done(function(data) {
        var results = data.response.venues[0];
        console.log(results);
        self.webURL = results.url;
        if (typeof self.webURL === 'undefined') {
            self.webURL = "";
        }
        self.streetName = results.location.formattedAddress[0];
        self.cityName = results.location.formattedAddress[1];
    }).fail(function() {
        alert("Error connecting to API.Try again!!");
    });

    this.contentTemplate = '<div class="info-window-content"><div class="title"><b>' + placeItem.placeName + "</b></div>" +
        '<div class="content"><a href="' + self.webURL + '">' + self.webURL + "</a></div>" +
        '<div class="content">' + self.streetName + "</div>" +
        '<div class="content">' + self.cityName + "</div>" 
    
    //Function to get the google maps display.
    this.infoWindow = new google.maps.InfoWindow({
        content: self.contentTemplate
    });
    
    //Function to initialise the google marker
    this.googlePointer = new google.maps.Marker({
        position: new google.maps.LatLng(placeItem.latitude, placeItem.longitude),
        map: map,
        icon: defaultIcon,
        title: placeItem.placeName
    });

    //Function to show the google pointer
    this.showgooglePointer = ko.computed(function() {
        if (this.visible() === true) {
            this.googlePointer.setMap(map);
        } else {
            this.googlePointer.setMap(null);
        }
        return true;
    }, this);

    //Function for getting the details of locations by click event listener.
    this.googlePointer.addListener('click', function() {
        self.contentTemplate =
            '<div class="info-window-content"><div class="card_title"><b>' + placeItem.placeName + "</b></div>" +
            '<img src=' + placeItem.imageUrl + ' class="card_img"></img>' 
            +'<div class="card_address"><i class="fa fa-home" style="margin-right:5px;color:black;"></i>' + self.streetName + "</div>" +
            '<div class="card_address">' + self.cityName + "</div>" 
            +'<div class="card_url"><i class="fa fa-globe" style="margin-right:5px;color:black;"></i><a href="' + self.webURL + '">' + self.webURL + "</a></div>";

        self.infoWindow.setContent(self.contentTemplate);

        self.infoWindow.open(map, this);
        
        //Animation for showing the marker.
        self.googlePointer.setAnimation(google.maps.Animation.DROP);

        setTimeout(function() {
            self.googlePointer.setAnimation(null);
        }, 2500);
        
        //Function to showing highlighted markers.
        self.googlePointer.addListener('mouseover', function() {
            this.setIcon(highlightedIcon);
        });
        self.googlePointer.addListener('mouseout', function() {
            this.setIcon(defaultIcon);
        });
    });

    this.clickEffect = function(place) {
        google.maps.event.trigger(self.googlePointer, 'click');
    };
};