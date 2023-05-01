import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Carro } from "../carro";
import { map, Observable } from "rxjs";
import { SharedService } from '../shared.service';
import { AES } from "crypto-js";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpCarrosService {

  private url: string =  `${environment.BACK_END_URL}:${environment.BACK_END_PORTA}/carros`;
  private urlInfo: string = `${environment.BACK_END_URL}:${environment.BACK_END_PORTA}/info`;
  private auth: string = '';
 
  constructor(private http: HttpClient, private sharedService: SharedService) {  }

  // INFO DE UM CARRO
  public info(placa: string): Observable<string> {
    const encryptionKey = environment.CHAVE_CRIPTOGRAFIA;
    const encryptedUser = AES.encrypt(this.sharedService.idUser.toString(), encryptionKey.toString());
    this.auth = this.sharedService.token + '.' + encryptedUser;
    const headers = new HttpHeaders({
      'Authorization': this.auth,
    });    
    return this.http.get<any>(this.urlInfo + '/' + placa,  { headers: headers });
  } 
  
  // LISTAR TODOS OS CARROS
  public listar(): Observable<Carro[]> {
    const encryptionKey = environment.CHAVE_CRIPTOGRAFIA;
    const encryptedUser = AES.encrypt(this.sharedService.idUser.toString(), encryptionKey.toString());
    this.auth = this.sharedService.token + '.' + encryptedUser;
    const headers = new HttpHeaders({
      'Authorization': this.auth,
    });
    return this.http.get<Carro[]>(this.url, { headers: headers });
  }     

  // BUSCAR UM CARRO
  public buscar(nome: string): Observable<Carro | null> {
    const encryptionKey = environment.CHAVE_CRIPTOGRAFIA;
    const encryptedUser = AES.encrypt(this.sharedService.idUser.toString(), encryptionKey.toString());
    this.auth = this.sharedService.token + '.' + encryptedUser;
    const headers = new HttpHeaders({
      'Authorization': this.auth,
    });
    return this.http.get<Carro[]>(this.url, { headers: headers, params: {nome: nome}}).pipe(map(it => it.length >= 1 ? it[0] : null));
  }    

  // INSERIR UM NOVO CARRO 
  public inserir(carro: Carro): Observable<Carro> {
    const encryptionKey = environment.CHAVE_CRIPTOGRAFIA;
    const encryptedUser = AES.encrypt(this.sharedService.idUser.toString(), encryptionKey.toString());
    this.auth = this.sharedService.token + '.' + encryptedUser;
    const headers = new HttpHeaders({
      'Authorization': this.auth,
    });
    return this.http.post<Carro>(this.url, carro, { headers: headers });
  }

  // EXCLUIR UM CARRO
  public excluir(carro: Carro):Observable<Carro> {
    const encryptionKey = environment.CHAVE_CRIPTOGRAFIA;
    const encryptedUser = AES.encrypt(this.sharedService.idUser.toString(), encryptionKey.toString());
    this.auth = this.sharedService.token + '.' + encryptedUser;
    const headers = new HttpHeaders({
      'Authorization': this.auth,
    });
    return this.http.delete<Carro>(this.url + '/' + carro.id, { headers: headers });
  }

  // EDITAR UM CARRO
  public editar(carro: Carro): Observable<Carro> {
    const encryptionKey = environment.CHAVE_CRIPTOGRAFIA;
    const encryptedUser = AES.encrypt(this.sharedService.idUser.toString(), encryptionKey.toString());
    this.auth = this.sharedService.token + '.' + encryptedUser;
    const headers = new HttpHeaders({
      'Authorization': this.auth,
    });
    return this.http.patch<Carro>(this.url + '/' + carro.id, carro, { headers: headers });
  }     

}
