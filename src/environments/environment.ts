export const environment = {
  production: false,
  apiurl: "https://unify-dev-api.azurewebsites.net/",
  filepath: "http://unify-dev-api.azurewebsites.net/files/",
  minDate: new Date(1900, 0, 2),
  maxDate: new Date(2101, 0, 1),
  keys: { gmap: "AIzaSyDHeYh5YZ8uNZiQM7XHK-AbVDAX8zIihcU" },
  fileSizeLimit: 1024,
  appEPK: "FSPO0rMS1nMdCifAIzaSyDHeYh5YZ8uNZiQM7XHKZY6mCrsiAU0SOtS",
  creditCardKey: "123456$#@$^@1ERF",
  currentUD: "123456$#@$^@1xxx",
  hideCaptcha: true,
  encryptp: '123456$#@$^@1ERF',
  socialGoogleId: '767734843872-c44n20h5e222284hvc5713tdhq3b94kq.apps.googleusercontent.com',
  socialFacebookId: '1069724486808487'
};

export const OAuthSettings = {
  appId: "9f3bbe95-d892-475d-8b7f-1a54703ce651",
  scopes: ["user.read", "calendars.read", "tasks.read"],
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
