import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
var firebase = require("firebase");

Accounts.onCreateUser((options, user) => {
  const userToCreate = user;
  if (options.profile) userToCreate.profile = options.profile;
  return userToCreate;
});


Accounts.onLogin(() => {
  const ACCESS_TOKEN = Meteor.user().services.instagram.accessToken;

  const API_ENDPOINT = `https://api.instagram.com/v1/users/self/media/recent/?access_token=${ACCESS_TOKEN}`;

  initFirebase();

  var result = Meteor.http.get(API_ENDPOINT, {timeout:30000});

  if(result.statusCode==200) {
				var respJson = JSON.parse(result.content);
				console.log("response received.");

				storeMetadata(respJson.data);
			} else {
				console.log("Response issue: ", result.statusCode);
				var errorJson = JSON.parse(result.content);
				throw new Meteor.Error(result.statusCode, errorJson.error);
			}
});

function initFirebase(){
  var config = {
    apiKey: "",
    authDomain: "thousand-words-22536.firebaseapp.com",
    databaseURL: "https://thousand-words-22536.firebaseio.com",
    projectId: "thousand-words-22536",
    storageBucket: "thousand-words-22536.appspot.com",
    messagingSenderId: "846922175347"
  };
  if(!firebase.apps.length)
    firebase.initializeApp(config);
}

function storeMetadata(data){
  var database = firebase.database();
  for(var i=0; i<data.length;i++){
    var photo = data[i];
    if(photo.location != null){
    database.ref('LatLong/' + photo.user.id).set({
      latitude: photo.location.latitude,
      longitude: photo.location.longitude,
      url: photo.images.standard_resolution.url
    });
  }
}


}
