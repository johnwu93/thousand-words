import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import * as firebase from 'firebase';

const GMAPS_KEY = 'AIzaSyB5iietztYKIpB-vD81e0mCpAgofaIayHY';

Accounts.onCreateUser((options, user) => {
  const userToCreate = user;
  if (options.profile) userToCreate.profile = options.profile;
  return userToCreate;
});

const storeMetadata = (data) => {
  const database = firebase.database();
  data.forEach((photo) => {
    if (photo.location != null) {
      const img = {};
      img.id = photo.id;
      img.latitude = photo.location.latitude;
      img.longitude = photo.location.longitude;
      img.url = photo.images.standard_resolution.url;
      img.name = photo.location.name;
      img.caption = photo.caption.text;
      database.ref(`LatLong/${Meteor.userId()}/${img.id}`).transaction((current) => {
        if (current === null) {
          return {
            latitude: img.latitude,
            longitude: img.longitude,
            url: img.url,
            // category:img['category'],
            name: img.name,
            caption: img.caption,
          };
        }
      }, (error, committed, snapshot) => {
        if (error) {
          console.log('Transaction failed abnormally!', error);
        } else if (!committed) {
          console.log('We aborted the transaction (because ada already exists).');
        } else {
          console.log('User ada added!');
        }
      });

      // console.log(img['name']);
      // console.log(img);
      // Screw promises
      // var result = Meteor.http.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${img['latitude']},${img['longitude']}&rankby=distance&keyword=${img['name']}&key=${GMAPS_KEY}`, {timeout:30000});
      // if(result.statusCode==200) {
    	// 			var myJson = JSON.parse(result.content);
      //       console.log(myJson.results);
      // }
    	// 		 else {
    	// 			console.log("Response issue: ", result.statusCode);
    	// 			var errorJson = JSON.parse(result.content);
    	// 			throw new Meteor.Error(result.statusCode, errorJson.error);
    	// 		}
    }
  });
};

Accounts.onLogin(() => {
  const ACCESS_TOKEN = Meteor.user().services.instagram.accessToken;
  const API_ENDPOINT = `https://api.instagram.com/v1/users/self/media/recent/?access_token=${ACCESS_TOKEN}`;

  const result = Meteor.http.get(API_ENDPOINT, { timeout: 30000 });

  if (result.statusCode === 200) {
    const respJson = JSON.parse(result.content);
    console.log('response received.');

    storeMetadata(respJson.data);
  } else {
    console.log('Response issue: ', result.statusCode);
    const errorJson = JSON.parse(result.content);
    throw new Meteor.Error(result.statusCode, errorJson.error);
  }
});
