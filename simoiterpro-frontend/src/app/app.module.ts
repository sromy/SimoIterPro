import { BrowserModule } from '@angular/platform-browser';
import { NgModule,  APP_INITIALIZER } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { KeycloakService, KeycloakAngularModule } from 'keycloak-angular';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown'
import {CollapseModule} from 'ngx-bootstrap/collapse'
import {TooltipModule} from 'ngx-bootstrap/tooltip'
import {ModalModule} from 'ngx-bootstrap/modal'

import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

export function kcInitializer(keycloak: KeycloakService): () => Promise<any> {

  return (): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try {
        await keycloak.init({
          config: environment.keycloak,
          initOptions: {
            onLoad: 'login-required',
            promiseType: "native", 
            checkLoginIframe: false
          },
          enableBearerInterceptor: true
        });
        resolve();
      } catch (error) {
        console.log("Error thrown in init "+error);
        reject(error);
      }
    });
  };            

}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    KeycloakAngularModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(), 
    BsDropdownModule.forRoot()
  ],
  providers: [{ provide: APP_INITIALIZER, useFactory: kcInitializer, multi: true, deps: [KeycloakService] }],
  bootstrap: [AppComponent]
})
export class AppModule { }
