$(init);

var currentUser = null;

function init(){
  $("#container").on("submit", ".submit-group-form", submitGroupForm);
  $(".add-new-group").on("click", newGroupForm);
  $(".view-profile-page").on("click", renderUserProfileView);
  // Gareth Adding activity render
  $("#container").on("click", ".add-activity", newActivityForm);
  // End Gareth Adding Activity render

}

function renderUserProfileView(){
  event.preventDefault();
  console.log("rendering view profile");
  Views.render("/templates/user_page.html", null, "#container");
}

function checkIfAdmin(){
//checks to see if  a user is admin
}

function checkLoginState(){
  if (getToken()) {
    return loggedInState();
  } else {
    return loggedOutState();
  }
}
//check a token to confirm logged in or out

function loggedInState(){
  //maybe slap this on the page
  console.log("you logged in");
  var profile_picture = localStorage.getItem("profile_picture");
  $('.nav-wrapper img').attr('src', profile_picture);

  // getUsersGroups();
  ///THIS IS IMPORTANT 4 GERRY
  console.log(currentUser);
  // var currentUser = 

//set view for logged in
}

function loggedOutState(){
  console.log("logged out")

//set view for logged out
}

// gareth added newActivityForm function
function newActivityForm(){
  event.preventDefault();
  Views.render("/templates/add_activity.html", null, "#container");
}

function newGroupForm(){
  event.preventDefault();
  Views.render("/templates/add_group.html", null, "#container");
}

function onGroupCreate(){
  event.preventDefault();
  ajaxRequest("POST", 'http://localhost:3000/api/groups', data, authenticationSuccessful);
}

// function getUsersGroups(){
//   console.log("getUsersGroups user is ", currentUser)
//   groups = currentUser.groups
//   groups = ["56548159eb7d5b97dcafcf7e", "565AJHFDGJH9eb7d5bafcf7e", 1,3, 5, "finn", "adam"]
//   console.log("groups before overidding values", groups)
//   for(var i=0; i< groups.length; i++){

//     // ajaxRequest("get", "http://localhost:3000/api/users/" + currentUser._id, data.group, );

//     // 1.http://localhost:3000/groups?ids=hj123b4jh32b4j3h24,b234k3b4jh2b234h,jk32h4kj32h4k3j2h4,23j4hl23h4kj32h4j23l
//     //2.using the key (groups[i]) which will return the id for a specific group
//     // we need to make an ajax call to the server to get the group data
//     // once the ajax call returns the data, we have an object for a group instead of just an id
//     // we need to replace the id in the array groups by the object corresponding to this id
//     groups[i] = data
//   }
//   console.log("groups after overidding values", groups)

//   currentUser.groups = groups


//   ///THIS IS IMPORTANT 4 GERRY
// // window.getUsersGroups = getUsersGroups;
//   // groups.populate('groups');
//   console.log(groups);
//   // return ajaxRequest("get", "http://localhost:3000/api/groups", null, showUsersGroups)

// //get users current groups
// }

function showUsersGroups(data) {
  console.log("users group")

  //chuck in the activity and profile stuff
  // return $.each(data.groups, function(index, group){
  //   $.groups
  // })
  // show all user groups using underscore rendering
}

function submitGroupForm(){
    event.preventDefault();
    console.log("here please");
    var method = $(this).attr("method");
    var url    = "http://localhost:3000/api" + $(this).attr("action");
    var data   = $(this).serialize();



    ajaxRequest(method, url, data, displayCurrentGroup);
    // console.log(data);
    // console.log(currentUser.groups);
    // // currentUser.groups.push(data._id);
    // console.log(currentUser.groups);
}

function submitActivityForm(){
  event.preventDefault();
  console.log("logging button click for activity");

}

function getAppFriends(){

}

function addUsersToGroup(){

}

function getActivities(){
//get a groups activities
}

function displayActivities(data){
//diaplay group activities underneth group header
}

function getUsersInGroup(){
//get all friends in group
}

function displayUsersInGroup(data){
//to show friends inside group
}

function getCurrentGroup(){
  return ajaxRequest("get", "http://localhost:3000/api/groups", null, function(){
    
  })
}


function displayCurrentGroup(data){
  
  //display group info
  console.log(data)
  getActivities()
}

function voteOnActivity(){
//user vote on activity
//click once for vote, twice to cancel
}

function commentOn(){
//add comment to activity
}

function instantMessageOn(){
//trigger instant message app
}

function instantMessageOff(){

}

function displayErrors(data){
//show any errors that come up on the app
}

function authenticationSuccessful(data) {
  currentUser = data.user;
  localStorage.setItem("profile_picture", data.user.profile_picture);
  localStorage.setItem("first_name", data.user.first_name);

  setToken(data.token);
  checkLoginState();
}

function setRequestHeader(xhr, settings) {
//for the token so we can see things that require a token
  var token = getToken();
  if(token) xhr.setRequestHeader('Authorization', 'Bearer ' + token);
}

function setToken(token) {
  return localStorage.setItem("token", token);
}

function getToken() {
  return localStorage.getItem("token");
}

function removeToken() {
  localStorage.clear();
}

function ajaxRequest(method, url, data, callback) {
  return $.ajax({
    method: method,
    url: url,
    data: data,
    beforeSend: setRequestHeader
  }).done(function(data){
    console.log("ajaxRequestReturn", data);
    callback(data);
  }).fail(function(data) {
    displayErrors(data.responseJSON.message);
  });
}