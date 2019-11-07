// координаты маркеров

var markersData = [
  {
    lat: 50.377257,     // Широта
    lng: 30.379448,    // Долгота
    name: "Info", // Произвольное название, которое будем выводить в информационном окне
    content: "<div class=\"map-info\">\n" +
        "        <p class=\"map-info-text\">Info</p>\n" +
        "    </div>"
  },
  {
    lat: 50.501415,
    lng: 30.500371,
    name: "Info",
    content: "<div class=\"map-info\">\n" +
        "        <p class=\"map-info-text\">Info</p>\n" +
        "    </div>"
  }
];


// координаты центров городов
var centerMaps = [
  {
    latX: 50.377257,
    latY: 30.379448
  },
  {
    latX: 50.501415,
    latY: 30.500371
  }
];
var InforObj = [];

var map, latLng, url, name, mark, marker, thisCenterX, thisCenterY, markers = [];
function initMap() {
  thisCenterX = centerMaps[0].latX;
  thisCenterY = centerMaps[0].latY;
  var centerLatLng = new google.maps.LatLng(thisCenterX, thisCenterY);
  var mapOptions = {
    center: centerLatLng,
    zoom: 12,
    scrollwheel: false,
    panControl: false,
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: true,
    streetViewControl: false,
    overviewMapControl: false,
    rotateControl: false,
    styles:
      [
        {
          "featureType": "administrative",
          "elementType": "all",
          "stylers": [
            {
              "saturation": "-100"
            }
          ]
        },
        {
          "featureType": "administrative.province",
          "elementType": "all",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "landscape",
          "elementType": "all",
          "stylers": [
            {
              "saturation": -100
            },
            {
              "lightness": 65
            },
            {
              "visibility": "on"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "all",
          "stylers": [
            {
              "saturation": -100
            },
            {
              "lightness": "50"
            },
            {
              "visibility": "simplified"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "all",
          "stylers": [
            {
              "saturation": "-100"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "all",
          "stylers": [
            {
              "visibility": "simplified"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "all",
          "stylers": [
            {
              "lightness": "30"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "all",
          "stylers": [
            {
              "lightness": "40"
            }
          ]
        },
        {
          "featureType": "transit",
          "elementType": "all",
          "stylers": [
            {
              "saturation": -100
            },
            {
              "visibility": "simplified"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#232d41"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels",
          "stylers": [
            {
              "lightness": -25
            },
            {
              "saturation": "-69"
            },
            {
              "color": "#232d41"
            },
            {
              "gamma": "2.63"
            }
          ]
        }
      ]
  };

  map = new google.maps.Map(document.getElementById("map"), mapOptions);
  // var topPosition = $('.map').position().top - $('.header').height();

  // Определяем границы видимой области карты в соответствии с положением маркеров
  var bounds = new google.maps.LatLngBounds();


  function addMarkerInfo() {
    for (var i = 0; i < markersData.length; i++) {
      var contentString = markersData[i].content ;
      var latLng = new google.maps.LatLng(markersData[i].lat, markersData[i].lng);
      const marker = new google.maps.Marker({
        position: latLng,
        map: map,
        icon: {
          url: 'img/pin.png',
          scaledSize: new google.maps.Size(40, 40)
        }

      });
      markers.push(marker);

      const infowindow = new google.maps.InfoWindow({
        content: contentString,
      });

      marker.addListener('click', function () {
        closeOtherInfo();
        infowindow.open(marker.get('map'), marker);
        InforObj[0] = infowindow;
        $('.gm-style-iw-t').removeClass('active');
        setTimeout(function(){
          $('.map-img').closest('.gm-style-iw-t').addClass('active');
        }, 100);
      });
    }
  }
  function closeOtherInfo() {
    if (InforObj.length > 0) {
      /* detach the info-window from the marker ... undocumented in the API docs */
      InforObj[0].set("marker", null);
      /* and close it */
      InforObj[0].close();
      /* blank the array */
      InforObj.length = 0;
    }
  }



  // Автоматически масштабируем карту так, чтобы все маркеры были в видимой области карты
  // map.fitBounds(bounds);
  var myoverlay = new google.maps.OverlayView();
  myoverlay.draw = function () {
    this.getPanes().markerLayer.id='markerLayer';
  };
  myoverlay.setMap(map);
  addMarkerInfo();
}
$('.map-zoom-minus').click(function(){
  map.setZoom(map.getZoom() - 1);
});
$('.map-zoom-plus').click(function(){
  map.setZoom(map.getZoom() + 1);
});

google.maps.event.addDomListener(window, "load", initMap);
