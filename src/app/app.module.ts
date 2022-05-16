import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { LogComponent } from './component/log/log.component';
import { LogFormComponent } from './component/log-form/log-form.component';
import { LogService } from './services/log.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, NavbarComponent, LogComponent, LogFormComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [LogService],
  bootstrap: [AppComponent],
})
export class AppModule {}
