import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpUsuariosService } from './http-usuarios.service';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { SharedService } from '../../shared.service';
import { Usuario } from './usuario'

@Component({
  selector: 'app-adm-users',
  templateUrl: './adm-users.component.html',
  styleUrls: ['./adm-users.component.css']
})
export class AdmUsersComponent implements OnInit, OnDestroy {

  public mostraAdm: boolean;

  closeResult: string = '';
  closed: boolean = false;

  dtOptions: DataTables.Settings = { 
    dom: 'Blfrtip',
    paging: true,
    "lengthMenu": [[10, 50, 100, -1],[10, 50, 100, "Todos"]],
    "language": { "url": "assets/datatables.Portuguese.txt" }    
  }; 
  dtTrigger: Subject<any> = new Subject(); 

  todosUsuarios: any = [];    
  idUsuario: null;
  isAdmin: boolean = false;
  logs: any = null;

  public usuario: Usuario;
  public usuarioSelecionado: Usuario;
  public infoGitUser: any;

  constructor(private httpUsuariosService: HttpUsuariosService, private modalService: NgbModal, private router: Router, private sharedService: SharedService, private sanitizer: DomSanitizer) { 
    this.idUsuario =  this.sharedService.user.id;
    this.isAdmin = this.sharedService.isAdmin;

    this.mostraAdm = this.sharedService.logado;

    this.usuario = { 
      idUser: 0,
      nome: '',
      admin: false,
      token: '',
      horario: '',
      ip: '',
    };
    this.usuarioSelecionado = { 
      idUser: 0,
      nome: '',    
      admin: false,        
      token: '',
      horario: '',
      ip: '',
    };
  }  

  ngOnInit() {
    this.mostraAdm = this.sharedService.logado;
    this.httpUsuariosService.listarUsuarios().subscribe((response: any) => {
      this.todosUsuarios = response;
      this.dtTrigger.next('');   
    });
    this.httpUsuariosService.logs().subscribe((response: any) => {
      this.logs = response; 
      console.log(response);
    });
  }

  ngOnDestroy(): void {
      this.dtTrigger.unsubscribe();
  }  

  // INFO DO USUÁRIO
  openModalInfo(content: any, token: string){
    this.infoUsuario(token);
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `${result}`;
      this.closed = true;
    }, (reason) => {
      this.closeResult = `${this.getDismissReason(reason)}`;
      this.closed = true;
    });
  }
  
  infoUsuario(token: string):void {
    this.httpUsuariosService.buscar(token).subscribe((res)=>{
      this.infoGitUser = res;
    });  
  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'Você cancelou a operação apertando ESC.';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'Você cancelou a operação clicando fora da janela.';
    } else {
      return  `${reason}`;
    }
  }  

}


