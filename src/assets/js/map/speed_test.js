/**
 * @fileoverview This demo is used for MarkerClusterer. It will show 100 markers
 * using MarkerClusterer and count the time to show the difference between using
 * MarkerClusterer and without MarkerClusterer.
 * @author Luke Mahe (v2 author: Xiaoxi Wu)
 */

function $(element) {
  return document.getElementById(element);
}

var speedTest = {};

speedTest.pics = null;
speedTest.map = null;
speedTest.markerClusterer = null;
speedTest.markers = [];
speedTest.infoWindow = null;

speedTest.init = function () {
  var latlng = new google.maps.LatLng(55.91, 6.38);
  var options = {
    'zoom': 4,
    'center': latlng,
    'mapTypeId': google.maps.MapTypeId.ROADMAP
  };

  speedTest.map = new google.maps.Map($('map'), options);
  speedTest.pics = data.photos;

  var useGmm = document.getElementById('usegmm');
  google.maps.event.addDomListener(useGmm, 'click', speedTest.change);

  var numMarkers = document.getElementById('nummarkers');
  google.maps.event.addDomListener(numMarkers, 'change', speedTest.change);

  speedTest.infoWindow = new google.maps.InfoWindow();

  speedTest.showMarkers();
};

speedTest.showMarkers = function () {
  speedTest.markers = [];

  var type = 1;
  if ($('usegmm').checked) {
    type = 0;
  }

  if (speedTest.markerClusterer) {
    speedTest.markerClusterer.clearMarkers();
  }

  var panel = $('markerlist');
  panel.innerHTML = '';
  var numMarkers = $('nummarkers').value;

  for (var i = 0; i < numMarkers; i++) {
    var titleText = speedTest.pics[i].photo_title;
    if (titleText === '') {
      titleText = 'No title';
    }

    var item = document.createElement('DIV');
    var title = document.createElement('A');
    title.href = '#';
    title.className = 'title';
    title.innerHTML = titleText;

    item.appendChild(title);
    panel.appendChild(item);


    var latLng = new google.maps.LatLng(speedTest.pics[i].latitude,
      speedTest.pics[i].longitude);

    var imageUrl = 'assets/img/map-icons/pin.png';
    var markerImage = new google.maps.MarkerImage(imageUrl,
      new google.maps.Size(24, 32));

    var marker = new google.maps.Marker({
      'position': latLng,
      'icon': markerImage
    });

    var fn = speedTest.markerClickFunction(speedTest.pics[i], latLng);
    google.maps.event.addListener(marker, 'click', fn);
    google.maps.event.addDomListener(title, 'click', fn);
    speedTest.markers.push(marker);
  }

  window.setTimeout(speedTest.time, 0);
};

speedTest.markerClickFunction = function (pic, latlng) {
  return function (e) {
    e.cancelBubble = true;
    e.returnValue = false;
    if (e.stopPropagation) {
      e.stopPropagation();
      e.preventDefault();
    }
    var title = pic.photo_title;
    var url = pic.photo_url;
    var fileurl = pic.photo_file_url;

    /*        var infoHtml = '<div class="info"><h3>' + title +
            '</h3><div class="info-body">' +
            '<a href="' + url + '" target="_blank"><img src="' +
            fileurl + '" class="info-img"/></a></div>' +
            '<a href="http://www.panoramio.com/" target="_blank">' +
            '<img src="http://maps.google.com/intl/en_ALL/mapfiles/' +
            'iw_panoramio.png"/></a><br/>' +
            '<a href="' + pic.owner_url + '" target="_blank">' + pic.owner_name +
            '</a></div></div>'; */
    var infoHtml = '<div class="listing-item info"> <div class="img-holder"> <span class="offer">save 49% </span> <img src="' +
      fileurl + '" class="info-img"/> <div class="rate-like centering justify-content-between"> <div class="rating"> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="far fa-star"></i> <i class="far fa-star"></i> </div><a class="likes" href="#"> <i class="far fa-heart"></i>18 </a> </div></div><div class="list-content p-2"> <h5 class="mb-1 mt-3">' + title +
      '</h5> <ul class="ctg-info2 pt-2 mt-2 d-flex justify-content-between flex-wrap"> <li class="mt-1"> <a href="#"> <i class="fa fa-map-marker-alt mr-2"></i>San Francisco</a> </li><li class="mt-1"> <a href="#"> <i class="fa fa-phone mr-2"></i>0123-456-789</a> </li></ul> </div></div>';



    speedTest.infoWindow.setContent(infoHtml);
    speedTest.infoWindow.setPosition(latlng);
    speedTest.infoWindow.open(speedTest.map);
  };
};

speedTest.clear = function () {
  $('timetaken').innerHTML = 'cleaning...';
  for (var i = 0, marker; marker = speedTest.markers[i]; i++) {
    marker.setMap(null);
  }
};

speedTest.change = function () {
  speedTest.clear();
  speedTest.showMarkers();
};

speedTest.time = function () {
  $('timetaken').innerHTML = 'timing...';
  var start = new Date();
  if ($('usegmm').checked) {
    speedTest.markerClusterer = new MarkerClusterer(speedTest.map, speedTest.markers, {
      imagePath: 'assets/img/map-icons/m'
    });
  } else {
    for (var i = 0, marker; marker = speedTest.markers[i]; i++) {
      marker.setMap(speedTest.map);
    }
  }

  var end = new Date();
  $('timetaken').innerHTML = end - start;
};