import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { Client } from '@microsoft/microsoft-graph-client';
import { resolve } from 'dns';
import * as moment from 'moment';

import { OAuthSettings } from '../../environments/environment';
import { microsoftUser, Event, DateTimeTimeZone } from '../models/site-map.model';
import { microsoftOauthSignIn } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class OAuthService {
  public authenticated: boolean;
  public user: microsoftUser;

  constructor(
    private msalService: MsalService) {

    this.authenticated = this.msalService.getAccount() != null;
    this.getUser().then((user) => {this.user = user});
  }


  // Prompt the user to sign in and
  // grant consent to the requested permission scopes
  async signIn(){
    let result = await this.msalService.loginPopup(OAuthSettings)
      .catch((reason) => {
        console.error("Login failed", reason);
      });

    if (result) {
      this.authenticated = true;
      this.user = await this.getUser();
      return this.user;
    }
  }

  async microsoftSignIn(){
    let result = await this.msalService.loginPopup(microsoftOauthSignIn)
      .catch((reason) => {
        console.error("Login failed", reason);
      });

    if (result) {
      this.authenticated = true;
      this.user = await this.getUser();
      return this.user;
    }
  }

  // Sign out
  signOut(): void {
    this.msalService.logout();
    this.user = null;
    this.authenticated = false;
  }

  // Silently request an access token
  async getAccessToken(): Promise<string> {
    let result = await this.msalService.acquireTokenSilent(OAuthSettings)
      .catch((reason) => {
     //   this.alertsService.add('Get token failed', JSON.stringify(reason, null, 2));
      });

    if (result) {
      return result.accessToken;
    }
    return null;
  }

  // <getUserSnippet>
  private async getUser(): Promise<microsoftUser> {
    if (!this.authenticated) return null;

    let graphClient = Client.init({
      // Initialize the Graph client with an auth
      // provider that requests the token from the
      // auth service
      authProvider: async(done) => {
        let token = await this.getAccessToken()
          .catch((reason) => {
            done(reason, null);
          });

        if (token)
        {
          done(null, token);
        } else {
          done("Could not get an access token", null);
        }
      }
    });

    // Get the user from Graph (GET /me)
    let graphUser = await graphClient.api('/me').get();

    let user = new microsoftUser();
    user.displayName = graphUser.displayName;
    // Prefer the mail property, but fall back to userPrincipalName
    user.email = graphUser.mail || graphUser.userPrincipalName;
    user.id  = graphUser.id;
    user.firstName = graphUser.givenName;
    user.lastName = graphUser.surname;
    return user;
  }

  // </getUserSnippet>

}