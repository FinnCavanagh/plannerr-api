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
function showPage() {
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

function getGroup(){
//get users current group
}

function displayGroup(data){
//to show current group
}

function displayErrors(data){

}

function authenticationSuccessful(data) {
//set the token
}

function setRequestHeader(xhr, settings) {
//for the token
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