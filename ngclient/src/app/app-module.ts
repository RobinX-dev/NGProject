import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { DetailsComponent } from "./details/details";
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    App
    // ❌ Remove DetailsComponent here (because it's standalone)
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
    // ✅ Import standalone DetailsComponent here if needed globally
    // DetailsComponent
    ,
    DetailsComponent,
    HttpClientModule
],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [App]
})
export class AppModule { }
