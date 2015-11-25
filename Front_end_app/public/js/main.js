$(function(){

  // Facebook login
  var $fbLogin = $('.fb-login');
  var $fbLogout = $('.fb-logout');

  // initialize facebook 
  FB.init({
    appId      : '1389788894661209', //process.env.PLANNERR_FACEBOOK_API_KEY,
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.2' // use version 2.2
  });

  // 
  initMap();
  initAutocomplete();

  function checkLoginStatus(res) {
    if(res.status === 'connected') {
        
      var access_token = res.authResponse.accessToken;
      var facebook_id = res.authResponse.userID;
      
      FB.api('/me?fields=email,first_name,last_name,picture,friends', function(res) {
        console.info("FB callback", res);

        var data = res;

        data.access_token = access_token;
        data.facebook_id = facebook_id;
        data.profile_picture = res.picture.data.url;

        // do this with you ajaxRequest function
        // callback function is gonna be authenticationSuccessfull, which will set the token
        return ajaxRequest("POST", 'http://localhost:3000/api/auth/facebook', data, authenticationSuccessful);
        // $.post('http://localhost:3000/api/auth/facebook', data)
        //   .then(function(res) {
        //     // TODO: put token in AJAX request header
        //     console.log(res);
        //   });

      });
      $('.fb-logout').removeClass('hidden');
      $('.fb-login').addClass('hidden');
    }
    else {

      // TODO: remove token from AJAX request header
      removeToken();
      $('.fb-logout').addClass('hidden');
      $('.fb-login').removeClass('hidden');
    }

  }

  // start frontend login for facebook
  FB.getLoginStatus(function(res) {
    checkLoginStatus(res);
  });

  $fbLogin.on('click', function() {
    event.preventDefault();
    FB.login(function(res) {
      checkLoginStatus(res);
    }, { scope: 'public_profile,email,user_friends' });
  })

  $fbLogout.on('click', function() {
    event.preventDefault();
    FB.logout(function(res) {
      checkLoginStatus(res);
    });
  });
  // end frontend login for facebook

  //////////////////////////
  // Google Maps Function //
  //////////////////////////


  // This example adds a search box to a map, using the Google Place Autocomplete
  // feature. People can enter geographical searches. The search box will return a
  // pick list containing a mix of places and predicted search terms.

  function initAutocomplete() {
   var map = new google.maps.Map(document.getElementById('map'), {
     center: {lat: -33.8688, lng: 151.2195},
     zoom: 13,
     mapTypeId: google.maps.MapTypeId.ROADMAP
   });

   // Create the search box and link it to the UI element.
   var input = document.getElementById('pac-input');
   var searchBox = new google.maps.places.SearchBox(input);
   map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

   // Bias the SearchBox results towards current map's viewport.
   map.addListener('bounds_changed', function() {
     searchBox.setBounds(map.getBounds());
   });

   var markers = [];
   // [START region_getplaces]
   // Listen for the event fired when the user selects a prediction and retrieve
   // more details for that place.
   searchBox.addListener('places_changed', function() {
     var places = searchBox.getPlaces();

     if (places.length == 0) {
       return;
     }

     // Clear out the old markers.
     markers.forEach(function(marker) {
       marker.setMap(null);
     });
     markers = [];

     // For each place, get the icon, name and location.
     var bounds = new google.maps.LatLngBounds();
     places.forEach(function(place) {
       var icon = {
         url: place.icon,
         size: new google.maps.Size(71, 71),
         origin: new google.maps.Point(0, 0),
         anchor: new google.maps.Point(17, 34),
         scaledSize: new google.maps.Size(25, 25)
       };

       // Create a marker for each place.
       markers.push(new google.maps.Marker({
         map: map,
         icon: icon,
         title: place.name,
         position: place.geometry.location
       }));

       if (place.geometry.viewport) {
         // Only geocodes have viewport.
         bounds.union(place.geometry.viewport);
       } else {
         bounds.extend(place.geometry.location);
       }
     });
     map.fitBounds(bounds);
   });
   // [END region_getplaces]
  }

  function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -33.866, lng: 151.196},
      zoom: 15
    });

    var infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);

    service.getDetails({
      placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4'
    }, function(place, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });
        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
            'Place ID: ' + place.place_id + '<br>' +
            place.formatted_address + '</div>');
          infowindow.open(map, this);
        });
      }
    });
  }
});






