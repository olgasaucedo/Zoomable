//alert("Hello! I am an alert box!!");

  // DOM element where the Timeline will be attached
var container = document.getElementById('visualization');

var events = [];
events = [
    {id: 0, 
      content: '', 
      start: '2017-11-09 20:05', 
      group: 'default',
      icontype: 'airport', 
      latLng: {lat: 25.795865, lng: -80.28704570000002}
    },
    {id: 1, 
      content: 'Swiss 55 MIA to ZRH', 
      title: 'Swiss 55 MIA to ZRH', 
      start: '2017-11-09 20:05', 
      end: '2017-11-10 11:00', 
      group: 'default',
      latLng: {lat: 47.451542, lng: 8.564572}, 
      icontype: 'airport', 
      flightPlanCoordinates: [{lat: 25.795865, lng: -80.28704570000002}, {lat: 47.451542, lng: 8.564572}]
    },
    {id: 2, 
      content: 'Swiss 146 ZRH to DEL', 
      title: 'Swiss 146 ZRH to DEL', 
      start: '2017-11-10 12:40', 
      end: '2017-11-11 00:45', 
      group: 'default',
      latLng: {lat: 28.556160, lng: 77.100281}, 
      icontype: 'airport', 
      flightPlanCoordinates: [{lat: 47.451542, lng: 8.564572}, {lat: 28.556160, lng: 77.100281}]
    },
    {id: 3, 
      content: 'Grand Godwin Hotel', 
      start: '2017-11-11 03:15', 
      end: '2017-11-14 12:00', 
      group: 'Hotels',
      latLng: {lat: 28.6459, lng: 77.2153}, 
      icontype: 'hotel'
    },
    {id: 4, 
      content:'', 
      start: '2017-11-11 08:00', 
      group: 'default',
      latLng: {lat: 28.5889, lng: 77.2535}, 
      icontype: 'train'
    },
    {id: 5, 
      content: 'Nizzamuddin to Agra Cantt on Gatimaan Express', 
      title: 'Nizzamuddin to Agra Cantt on Gatimaan Express', 
      start: '2017-11-11 08:00', 
      end: '2017-11-11 09:50', 
      group: 'default',
      latLng: {lat: 27.1578, lng: 77.9899}, 
      icontype: 'train', 
      flightPlanCoordinates: [{lat: 28.5889, lng: 77.2535}, {lat: 27.1578, lng: 77.9899}]
    },
    {id: 6, 
      content: 'Agra Cantt Station to Taj Mahal', 
      title: 'Agra Cantt Station to Taj Mahal', 
      start: '2017-11-11 9:51', 
      end: '2017-11-11 10:50', 
      group: 'default',
      latLng: {lat: 27.1750, lng: 78.0422}, 
      flightPlanCoordinates: [{lat: 27.1578, lng: 77.9899}, {lat: 27.1750, lng: 78.0422}]
    },
    {id: 7, 
      content: 'Taj Mahal', 
      title: 'Taj Mahal', 
      start: '2017-11-11 10:51', 
      end: '2017-11-11 13:30', 
      group: 'default',
      latLng: {lat: 27.1750, lng: 78.0422}, 
      icontype: 'landmark'
    },
    {id: 8, 
      content: 'Agra Fort', 
      title: 'Agra Fort', 
      start: '2017-11-11 14:30', 
      end: '2017-11-11 17:00', 
      group: 'default',
      latLng: {lat: 27.1795, lng: 78.0211},
      icontype: 'landmark'
    },
    {id: 9, 
      content: 'Agra Cantt Station to Nizzamuddin on Gatimaan Express', 
      title: 'Agra Cantt Station to Nizzamuddin on Gatimaan Express', 
      start: '2017-11-11 17:50', 
      end: '2017-11-11 19:40', 
      group: 'default',
      latLng: {lat: 27.1578, lng: 77.9899},
      flightPlanCoordinates: [{lat: 27.1578, lng: 77.9899}, {lat: 28.5889, lng: 77.2535}]
    },
    {id: 10, 
      content: 'IndiGo DEL to JAI on ', 
      title: 'IndiGo DEL to JAI on ', 
      start: '2017-11-12 07:20', 
      end:'2017-11-12 08:10', 
      group: 'default',
      latLng: {lat: 26.8282, lng: 75.8059},
      icontype: 'airport',
      flightPlanCoordinates: [{lat: 28.556160, lng: 77.100281}, {lat: 26.8282, lng: 75.8059}]
    },
    {id: 11, 
      content: 'Leela Ambience Hotel', 
      start: '2017-11-14 12:00', 
      end: '2017-11-17 12:00', 
      group: 'Hotels',
      latLng: {lat: 28.5055, lng: 77.0966},
      icontype: 'hotel'
    }
  ];

   var groups = new vis.DataSet([
    {id: 'default', content: 'Activities'},
    {id: 'Hotels', content: 'Hotels'}
  ]);

  // Create a DataSet (allows two way data-binding)
var items = new vis.DataSet(events);

  // Configuration for the Timeline
var options = {
  stack: false,
  margin: 20,
  tooltip: {
      followMouse: true,
      overflowMethod: 'cap'
    }};


// Create a Timeline
var timeline = new vis.Timeline(container, items, options, groups);

var map;
var markers = [];
var polylines = [];


// Create a map 
function initMap() {
//var uluru = {lat: -25.363, lng: 131.044};
  var mapOptions = {
    zoom: 4,
    //center: uluru
    center: events[0].latLng
  };

  map = new google.maps.Map(document.getElementById('map'), mapOptions)

  for (var i = 0; i < events.length; i++) {
    markers[i] = new google.maps.Marker({
      position: events[i].latLng,
      icon: normalIcon(i),
      map: map,
      title: events[i].title
    });
    attachMarkerID(i, markers[i]);
  }

  for (var i = 0; i < events.length; i++) {
    polylines[i] = new google.maps.Polyline({
      path: events[i].flightPlanCoordinates,
      geodesic: true,
      strokeColor: '#003d78',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });
  polylines[i].setMap(map);
  }


}

// Add listener to markers, select event on timeline and send marker ID to highlight marker.
function attachMarkerID(id, marker) {
    marker.addListener('click', function() {
        timeline.setSelection(id);
        highlightEvent(id);
   });
}

// Highlight marker when event is selected.
timeline.on('select', function(properties) {
    var ind = properties.items;
  highlightEvent(ind);
});


function highlightEvent(index) {
  
  map.panTo(events[index].latLng);
  
  for (var j = 0; j < markers.length; j++) {
    
    if (j == index) {
      //alert('index: ' + index + 'typeof index: ' + typeof index + '\nj: ' + j + 'typeof j: ' + typeof j);
      polylines[j].setOptions({strokeColor: '62b2ff', strokeWeight: 5});
      markers[j].setIcon(highlightedIcon(j));
    }
    else {

      polylines[j].setOptions({strokeColor: '#003d78', strokeWeight: 2});
      markers[j].setIcon(normalIcon(j));
    }
  }
}

function highlightedIcon(ind) {
  return 'images\\' + events[ind].icontype + 'HighlightedIcon.png'
  }

function normalIcon(ind) {
  return 'images\\' + events[ind].icontype + 'NormalIcon.png'
  }


document.getElementById('zoomIn').onclick    = function () {
timeline.zoomIn( 0.4); };
document.getElementById('zoomOut').onclick   = function () {
timeline.zoomOut( 0.4); };