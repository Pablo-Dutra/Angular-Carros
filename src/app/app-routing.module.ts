import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCarroComponent } from './crud/add-carro/add-carro.component';
import { LstCarroComponent } from './crud/lst-carro/lst-carro.component';
import { InicioComponent } from './templates/inicio/inicio.component';
import { ProfileComponent } from './templates/profile/profile.component';
import { AdmUsersComponent } from './templates/adm-users/adm-users.component';
import { TestsComponent } from './templates/tests/tests.component';


const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'adicionar', component: AddCarroComponent },
  { path: 'listar', component: LstCarroComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'adm', component: AdmUsersComponent },
  { path: 'tests', component: TestsComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
