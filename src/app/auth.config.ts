import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
    // Url of the Identity Provider
    // issuer: 'https://steyer-identity-server.azurewebsites.net/identity',
    issuer: 'https://idsvr4.azurewebsites.net',
    userinfoEndpoint: 'https://idsvr4.azurewebsites.net/connect/userinfo',

    // URL of the SPA to redirect the user to after login
    redirectUri: window.location.origin + '/success',

    // The SPA's id. The SPA is registerd with this id at the auth-server
    // clientId: 'server.code',
    clientId: 'spa',

    // Just needed if your auth server demands a secret. In general, this
    // is a sign that the auth server is not configured with SPAs in mind
    // and it might not enforce further best practices vital for security
    // such applications.
    // dummyClientSecret: 'secret',

    responseType: 'code',

    // set the scope for the permissions the client should request
    // The first four are defined by OIDC.
    // Important: Request offline_access to get a refresh token
    scope: 'openid profile email offline_access',

    showDebugInformation: true,
};