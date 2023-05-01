import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from './usuario';
import { map, Observable } from "rxjs";
import { SharedService } from 'src/app/shared.service';
import { AES } from "crypto-js";
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HttpUsuariosService {

  private url: string =  `${environment.BACK_END_URL}:${environment.BACK_END_PORTA}`;
  private auth: string = '';

  constructor(private http: HttpClient, private sharedService: SharedService) { }

  // LISTAR TODOS OS USUARIOS
  public listarUsuarios(): Observable<Usuario[]> {
    const encryptionKey = environment.CHAVE_CRIPTOGRAFIA;
    const encryptedUser = AES.encrypt(this.sharedService.idUser.toString(), encryptionKey.toString());
    this.auth = this.sharedService.token + '.' + encryptedUser;
    const headers = new HttpHeaders({
      'Authorization': this.auth,
    });  
    return this.http.get<Usuario[]>(this.url + '/usuarios', { headers: headers });
  }     
  // LISTAR TODOS OS LOGS
  public logs(): Observable<any> {
    const encryptionKey = environment.CHAVE_CRIPTOGRAFIA;
    const encryptedUser = AES.encrypt(this.sharedService.idUser.toString(), encryptionKey.toString());
    this.auth = this.sharedService.token + '.' + encryptedUser;
    const headers = new HttpHeaders({
      'Authorization': this.auth,
    });  
    return this.http.get<any>(this.url + '/logs', { headers: headers });
  }     
 
  // BUSCAR UM USUÁRIO
  public buscar(token: string): Observable<any | null> {
    const encryptionKey = environment.CHAVE_CRIPTOGRAFIA;
    const encryptedUser = AES.encrypt(this.sharedService.idUser.toString(), encryptionKey.toString());
    this.auth = this.sharedService.token + '.' + encryptedUser;
    const headers = new HttpHeaders({
      'Authorization': this.auth,
    });
    return this.http.get<any>(this.url + '/usuario/' + token,  { headers: headers });
  }   
  
  // TESTES
  public enviarSenha(usuario: string, senha: string): Observable<any> {
    let dadosUsuario = {
      usuario: usuario,
      senha: senha,
    }
    return this.http.post<any>(this.url + '/injectBuscaUsuario', dadosUsuario);
  }    
  public trocarSenha(usuarioAtual: string, senhaAtual: string, senhaNova: string): Observable<any> {
    let dadosUsuario = {
      usuarioAtual: usuarioAtual,
      senhaAtual: senhaAtual,
      senhaNova: senhaNova
    }
    return this.http.post<any>(this.url + '/injectEditaUsuario', dadosUsuario);
  }    

}
