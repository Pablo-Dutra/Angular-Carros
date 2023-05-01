import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})


export class MenuComponent implements OnInit {

  public nomeUsuario: string;
  public logado: boolean;

  constructor(private sharedService: SharedService) { 
    this.nomeUsuario = '';
    this.logado = false;
  }


  async ngOnInit() {    
    this.sharedService.reloadMenu$.subscribe(() => {
      this.reloadMenu(); // Chame o método responsável por recarregar o menu
    });  

  }

  reloadMenu() {
    this.nomeUsuario = this.sharedService.user.name;
    this.logado = this.sharedService.logado;
  }  

  loginGitHub() {
    const GITHUB_URL = 'https://github.com/login/oauth/authorize';
    const params = {
      response_type: 'code',
      scope: 'user public_repo',
      client_id: environment.CLIENT_ID,
      redirect_uri: `${environment.FRONT_END_URL}:${environment.FRONT_END_PORTA}`
    };
    const queryStrings = new URLSearchParams(params).toString();
    const authURL = `${GITHUB_URL}?${queryStrings}`;
    window.location.href = authURL;
  };  
 
}

