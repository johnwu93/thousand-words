import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import * as firebase from 'firebase';
import * as stringSimilarity from 'string-similarity';

const GMAPS_KEY = 'AIzaSyBy0WPDISV691KJqlyuZboQpbaakOx2jiY';

Accounts.onCreateUser((options, user) => {
  const userToCreate = user;
  if (options.profile) userToCreate.profile = options.profile;
  userToCreate.profile.shortenUrl = Math.random().toString(36).slice(-5);
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

      database.ref(`LatLong/${Meteor.userId()}/${img.id}`).once('value').then((snapshot) => {
        if (snapshot.val() == null) {
          Meteor.http.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${img.latitude},${img.longitude}&radius=50&key=${GMAPS_KEY}`, { timeout: 30000 }, (error, result) => {
            if (!error && result.statusCode === 200) {
              const myJson = JSON.parse(result.content);

              const arr = [];
              myJson.results.forEach((iter) => {
                arr.push(iter.name);
              });

              const matches = stringSimilarity.findBestMatch(img.name, arr);
              const bestMatch = matches.bestMatch.target;
              myJson.results.forEach((iter) => {
                if (iter.name === bestMatch) {
                  img.category = iter.types;
                }
              });

              database.ref(`LatLong/${Meteor.userId()}/${img.id}`).set({
                latitude: img.latitude,
                longitude: img.longitude,
                url: img.url,
                category: img.category,
                name: img.name,
                caption: img.caption,
              });
            }
          });
        }
      });
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
