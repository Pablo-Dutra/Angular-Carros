import { Component, OnInit } from '@angular/core';
import { HttpUsuariosService } from '../adm-users/http-usuarios.service';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})


export class TestsComponent implements OnInit {
  
  public usuario: string = '';
  public senha: string = ''; 
  public resposta: any = null;
  public retorno: number = 0;

  public usuarioAtual: string = '';
  public senhaAtual: string = ''; 
  public senhaNova: string = ''; 
  public respostaTroca: any = null;

  isAdmin: boolean = false;

  constructor(private httpUsuariosService: HttpUsuariosService, private sharedService: SharedService) { 
    this.isAdmin = this.sharedService.isAdmin;
  }

  ngOnInit(): void { 

  }

  enviar(){
    this.httpUsuariosService.enviarSenha(this.usuario,this.senha).subscribe((res)=>{  
      this.resposta = JSON.stringify(res);
      if(res[0]){
        if(res[0].usuario == this.usuario){
          this.retorno = 1;
        }else{
          this.retorno = 2;
        }
        console.log(this.resposta[0].usuario);
      }else{
        this.retorno = 2;
      }
    })
  }
  trocar(){
    this.httpUsuariosService.trocarSenha(this.usuarioAtual,this.senhaAtual,this.senhaNova).subscribe((res)=>{  
      this.respostaTroca = JSON.stringify(res);
    })
  }
}

