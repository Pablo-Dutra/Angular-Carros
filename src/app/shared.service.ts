import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  // RECARREGAR O MENU DEPOIS DO LOGIN
  private reloadSubject = new BehaviorSubject<boolean>(false);
  reloadMenu$ = this.reloadSubject.asObservable();
  reloadMenu() {
    this.reloadSubject.next(true);
  }  

  public token: any;
  public user: any;
  public idUser: any;
  public logado: boolean;
  public isAdmin: boolean;

  constructor() { 
    this.token = '';
    this.user = '';
    this.idUser = '';
    this.logado = false;
    this.isAdmin = false;
  }
}
