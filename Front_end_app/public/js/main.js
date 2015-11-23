



// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function testAPI() {
  console.log('Welcome!  Fetching your information.... ');
  FB.api('/me', function(response) {
    console.log('Successful login for: ' + response.name);
    document.getElementById('status').innerHTML =
      'Thanks for logging in, ' + response.name + '!';
  });
}


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

  function checkLoginStatus(res) {
    if(res.status === 'connected') {
      $('.fb-logout').removeClass('hidden');
      $('.fb-login').addClass('hidden');
    }
    else {
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

});





