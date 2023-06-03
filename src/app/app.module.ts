import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PanelModule } from './panel/panel.module';
import { AuthModule } from './auth/auth.module';
import { MaterialModule } from './material/material.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptInterceptor } from './auth/intercept.interceptor';
import { JwtModule } from '@auth0/angular-jwt';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PanelModule,
    AuthModule,
    MaterialModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        }
      }
    })
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: InterceptInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
