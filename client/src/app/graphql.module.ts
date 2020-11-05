import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { HttpHeaders } from '@angular/common/http';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClient, InMemoryCache, split } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
// import { AuthService } from '@auth0/auth0-angular';

import { environment } from '../environments/environment';

function createApollo(
  httpLink: HttpLink,
  // auth: AuthService
): any {
  const http = httpLink.create({
    uri: environment.API_BASE_URL,
    // headers: new HttpHeaders({
    //   Authorization: `Bearer ${localStorage.getItem('accessToken') || auth.getAccessTokenSilently()}`,
    // }),
  });

  const ws = new WebSocketLink({
    uri: environment.API_WS_BASE_URL,
    options: {
      reconnect: true,
      // connectionParams: {
      //    headers: {
      //     Authorization: `Bearer ${localStorage.getItem('accessToken') || auth.getAccessTokenSilently()}`,
      //    }
      // }
    }
  });

  const link = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    ws,
    http,
  );

  return {
    link,
    cache: new InMemoryCache(),
  };
}

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [
        HttpLink,
        // AuthService,
      ],
    },
  ],
})
export class GraphQLModule {}
