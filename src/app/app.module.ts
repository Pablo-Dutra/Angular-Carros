import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DataTablesModule } from 'angular-datatables';
import { HttpClientModule } from '@angular/common/http';
import { LstCarroComponent } from './crud/lst-carro/lst-carro.component';
import { AddCarroComponent } from './crud/add-carro/add-carro.component';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from './templates/menu/menu.component';
import { RodapeComponent } from './templates/rodape/rodape.component';
import { InicioComponent } from './templates/inicio/inicio.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfileComponent } from './templates/profile/profile.component';
import { AdmUsersComponent } from './templates/adm-users/adm-users.component';
import { TestsComponent } from './templates/tests/tests.component';

@NgModule({
  declarations: [
    AppComponent,
    LstCarroComponent,
    AddCarroComponent,
    MenuComponent,
    RodapeComponent,
    InicioComponent,
    ProfileComponent,
    AdmUsersComponent,
    TestsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule,
    HttpClientModule,  
    FormsModule,  
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
