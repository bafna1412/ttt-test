import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AskUserComponent } from './ask-user/ask-user.component';
import { DisplayWordsComponent } from './display-words/display-words.component';

@NgModule({
  declarations: [
    AppComponent,
    AskUserComponent,
    DisplayWordsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
