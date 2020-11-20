import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AuthModule } from '@auth0/auth0-angular';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { GraphQLModule } from './graphql.module';
import { LaunchListComponent } from './launch-list/launch-list.component';

const {
  AUTH0_DOMAIN,
  AUTH0_CLIENT_ID,
} = environment;

@NgModule({
  declarations: [
    AppComponent,
    LaunchListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    AuthModule.forRoot({
      domain: AUTH0_DOMAIN,
      clientId: AUTH0_CLIENT_ID,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
