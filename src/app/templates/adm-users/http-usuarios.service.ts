import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from './usuario';
import { Observable } from "rxjs";
import { SharedService } from 'src/app/shared.service';
import { AES } from "crypto-js";
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HttpUsuariosService {

  private url: string =  `${environment.BACK_END_URL}:${environment.BACK_END_PORTA}`;
  private auth: string = '';
  private apiUrl = 'http://localhost:3000/logs';

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
  public logs(url: string): Observable<any> {
    const encryptionKey = environment.CHAVE_CRIPTOGRAFIA;
    const encryptedUser = AES.encrypt(this.sharedService.idUser.toString(), encryptionKey.toString());
    this.auth = this.sharedService.token + '.' + encryptedUser;
    const headers = new HttpHeaders({
      'Authorization': this.auth,
    });  
    return this.http.get<any>(url, { headers: headers });
  }     

  public getCSV(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
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

}
