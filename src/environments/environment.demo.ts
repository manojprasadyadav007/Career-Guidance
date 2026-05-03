export const environment = {
  production: true,
  apiurl: "http://103.120.179.59/msmunifyapi/",
  filepath: "http://103.120.179.59/msmunifyapi/files/",
  minDate: new Date(1900, 0, 2),
  maxDate: new Date(2101, 0, 1),
  keys: { gmap: 'AIzaSyDHeYh5YZ8uNZiQM7XHK-AbVDAX8zIihcU' },
  fileSizeLimit: 4096,
  appEPK: "FSPO0rMS1nMdCifAIzaSyDHeYh5YZ8uNZiQM7XHKZY6mCrsiAU0SOtS",
  creditCardKey: '123456$#@$^@1ERF',
  encryptp: '123456$#@$^@1ERF',
  socialGoogleId: '648902920395-8hq48ejbq2af75ln2k61srcobbu88mlq.apps.googleusercontent.com',
  socialFacebookId: '1069724486808487'
}


export const OAuthSettings = {
  appId: '9f3bbe95-d892-475d-8b7f-1a54703ce651',
  scopes: [
    "user.read",
    "calendars.read",
    "tasks.read",
    "User.Read.All"
  ]
};

export const microsoftOauthSignIn = {
  appId: 'f6b93231-7f6d-4e5e-be8a-917e29731168',
  scopes: [
    "User.Read",
    "User.Read.All"
  ] 
};

export const linkedInCredentials = {
  clientId: "86qbwz32x2nyow",
  redirectUrl: "http://localhost:4200/signin"
};
