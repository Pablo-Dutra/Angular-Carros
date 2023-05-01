import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})

export class InicioComponent implements OnInit {

  public boasVindas: string;
  public nomeUsuario: string;
  public mostraBotao: boolean;
 
  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute, private sharedService: SharedService) { 
    this.boasVindas = '';
    this.nomeUsuario = '';
    this.mostraBotao = true;
  }

  async ngOnInit() {
    const code = this.route.snapshot.queryParamMap.get('code');
    if (code) {
      try {
        const response = await this.http.post<any>(`${environment.BACK_END_URL}:${environment.BACK_END_PORTA}/login`, { code }).toPromise();
        const user = response.usuario;
        this.sharedService.user = user;
        const accessToken = response.chave;
        const accessUser = response.idUser;
        const isAdmin = response.isAdmin;
        this.sharedService.token = accessToken;
        this.sharedService.idUser = accessUser;
        this.sharedService.isAdmin = isAdmin;
      } catch (error) {
        console.log('Erro: ' + JSON.stringify(error));
      }
    }
    this.nomeUsuario = this.sharedService.user.name;
    if(this.nomeUsuario !== undefined){
      this.boasVindas = 'Seja bem vindo, ' + this.nomeUsuario;
      this.mostraBotao = false;
      this.sharedService.logado = true;
    }
    // RECARREGAR O MENU DEPOIS QUE EFETUOU LOGIN
    this.reloadMenu();
  }

  reloadMenu() {
    this.sharedService.reloadMenu();
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

  logoutGitHub() {
    try {
      localStorage.removeItem('githubToken');
      this.router.navigate(['/']);      
    } catch (error) {
      console.log('Erro: ' + error);
    }
  }

}




