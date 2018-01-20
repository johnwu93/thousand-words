import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
var firebase = require("firebase");
const GMAPS_KEY = '';

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
  var list = []
  var database = firebase.database();
  for(var i=0; i<data.length;i++){
    var photo = data[i];
    if(photo.location != null){
      var img = {};
      img['id'] = photo.id;
      img['latitude'] =  photo.location.latitude;
      img['longitude'] =  photo.location.longitude;
      img['url'] =  photo.images.standard_resolution.url;
      //Screw promises
      var result = Meteor.http.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${img['latitude']},${img['longitude']}&key=${GMAPS_KEY}`, {timeout:30000});
      if(result.statusCode==200) {
    				var myJson = JSON.parse(result.content);
            var placeId = myJson.results[0].place_id.toString();
            var response = Meteor.http.get(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${GMAPS_KEY}`, {timeout:30000});
            if(response.statusCode==200){
              var json = JSON.parse(result.content);
              img['cateogry'] = json.results[0].types);
              list.push(img);
            }
    			} else {
    				console.log("Response issue: ", result.statusCode);
    				var errorJson = JSON.parse(result.content);
    				throw new Meteor.Error(result.statusCode, errorJson.error);
    			}
    }
  }
  //Fix promise
  database.ref('LatLong/' + data[0].user.id).set({
    photos: list
  });
}
