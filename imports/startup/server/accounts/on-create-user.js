import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Accounts.onCreateUser((options, user) => {
  const userToCreate = user;
  if (options.profile) userToCreate.profile = options.profile;
  return userToCreate;
});


Accounts.onLogin(() => {
  const ACCESS_TOKEN = Meteor.user().services.instagram.accessToken;
  const API_ENDPOINT = `https://api.instagram.com/v1/users/self/media/recent/?access_token=${ACCESS_TOKEN}`;

  // TODO:
  // Make Instagram API request
  // Process and Store data to Firebase
});
