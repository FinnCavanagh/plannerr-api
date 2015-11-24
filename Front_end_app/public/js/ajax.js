$(init);

function init(){
//functions to trigger on initialize
}

function checkLoginState(){
//check a token to confirm logged in or out
}

function loggedInState(){
//set view for logged in
}

function loggedOutState(){
//set view for logged out
}

function getGroups(){
  return ajaxRequest("get", "localhost:3000/api/groups", null, displayGroup)
  return $.each(data.groups, function(/place we will have the group page/, group){
    //chuck in the group stuff
    getActivities()
  })
//get users current groups
}

function showUsersGroups() {
//user profile and activity feed, show all user groups
}

function submitForm(){
//post or put a form
}

function getActivities(){
//get a groups activities
}

function displayActivities(){
//diaplay group activities underneth group header
}

function getUsers(){
//get all users
}

function displayUsers(data){
//to show friends list
}



function displayGroup(data){

//to show current group
}

function voteOnActivity(){
//user vote on activity
}

function commentOn(){
//add comment to activity
}

function instantMessage(){
//trigger instant message app
}

function displayErrors(data){
//show any errors that come up on the app
}

function authenticationSuccessful(data) {
//set the token

}

function setRequestHeader(xhr, settings) {
//for the token so we can see things that require a token
}

function ajaxRequest(method, url, data, callback) {
  return $.ajax({
    method: method,
    url: url,
    data: data,
    beforeSend: setRequestHeader,
  }).done(function(data){
    callback(data);
  }).fail(function(data) {
    displayErrors(data.responseJSON.message);
  });
}