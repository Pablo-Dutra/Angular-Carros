import { Component, OnInit, OnDestroy , ElementRef } from '@angular/core';
import { HttpCarrosService } from 'src/app/services/http-carros.service';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { Carro } from '../../carro'
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-lst-carro',
  templateUrl: './lst-carro.component.html',
  styleUrls: ['./lst-carro.component.css']
})
export class LstCarroComponent implements OnInit, OnDestroy {

  closeResult: string = '';
  closed: boolean = false;
  public informacoesCarro: any;
  public carroEditando: Carro = {
      nome: '',
      marca: '',
      modelo: '',
      ano: 0,
      km: 0,
      fotos: '',
      status: '',
      responsavel: 0,  
      placa: ''   
  }
  public carroExcluindo: Carro = {
      nome: '',
      marca: '',
      modelo: '',
      ano: 0,
      km: 0,
      fotos: '',
      status: '',
      responsavel: 0,  
      placa: ''   
  }

  public opcoes: string[] = ['disponível', 'indisponível'];
  public classeCarroNome: string;
  public classeCarroMarca: string;
  public carro: Carro;  
  public idUsuario: number;

  dtOptions: DataTables.Settings = { 
    //dom: 'Blfrtip',
    paging: true,
    "lengthMenu": [[10, 50, 100, -1],[10, 50, 100, "Todos"]],
    "language": { "url": "assets/datatables.Portuguese.txt" }    
  }; 
  dtTrigger: Subject<any> = new Subject(); 

  todosCarros: any = [];
  carrosComFiltro: any[] = [];   
  nomeUsuario: any = '';
  filtro: string = '';

  constructor(
    private httpCarrosService: HttpCarrosService, 
    private modalService: NgbModal, 
    private sharedService: SharedService, 
    private elementRef: ElementRef,
  ) { 

    this.classeCarroNome = "form-control";
    this.classeCarroMarca = "form-control";
    this.idUsuario =  this.sharedService.user.id;
    this.carro = { 
      nome: '',
      marca: '',
      modelo: '',
      ano: 0,
      km: 0,
      fotos: '',
      status: '',
      responsavel: 0,  
      placa: '',
    };
  }

  ngOnInit() {
    this.httpCarrosService.listar().subscribe((response: any) => {
      this.todosCarros = response;
      this.carrosComFiltro = response.slice(0, 8);
      this.dtTrigger.next('');     
    });
  }

  ngOnDestroy(): void {
      this.dtTrigger.unsubscribe();
  }

  // BUSCA PELOS CARROS
  filtrar():void {
    this.carrosComFiltro = [];
    for(let i=0; i < this.todosCarros.length; i++){
        if(this.todosCarros[i].nome.match(this.filtro)){
          this.carrosComFiltro.push(this.todosCarros[i])
      }
    }
  }  

  // EXCLUSÃO DE CARRO
  openModalDelete(content: any, carroSelecionado: Carro){
    this.carroExcluindo = carroSelecionado;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.excluirCarro(carroSelecionado);
      this.closeResult = `${result}`;
      this.closed = true;
    }, (reason) => {
      this.closeResult = `${this.getDismissReason(reason)}`;
      this.closed = true;
    });
  }

  excluirCarro(carro: Carro):void {
    this.httpCarrosService.excluir(carro).subscribe((res)=>{
      this.closeResult += ' carro excluído com sucesso.';
      this.closed = true;
      this.httpCarrosService.listar().subscribe((response: any) => {
        this.todosCarros = response;
        this.carrosComFiltro = response.slice(0, 8);
      });  
    });
    
  }
  
  // EDIÇÃO DE CARRO 
  openModalEdit(content: any, carroSelecionado: Carro){
    this.carroEditando = carroSelecionado;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.editarcarro(this.carroEditando);
      this.closeResult = `${result}`;
      this.closed = true;
    }, (reason) => {
      this.closeResult = `${this.getDismissReason(reason)}`;
      this.closed = true;
    });
  }

  editarcarro(carro: Carro):void {
    this.httpCarrosService.editar(carro).subscribe((res)=>{
      this.closeResult += ' carro editado com sucesso.';
      this.closed = true;
    });
  }

  // FOTOS DO CARRO
  openModalFotos(content: any, carroSelecionado: Carro){
    this.carroEditando = carroSelecionado;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `${result}`;
      this.closed = true;
    }, (reason) => {
      this.closeResult = `${this.getDismissReason(reason)}`;
      this.closed = true;
    });
  }

  // INFO DO CARRO
  openModalInfo(content: any, carroSelecionado: Carro){
    this.carroEditando = carroSelecionado;
    this.infocarro(this.carroEditando);
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `${result}`;
      this.closed = true;
    }, (reason) => {
      this.closeResult = `${this.getDismissReason(reason)}`;
      this.closed = true;
    });
  }

  infocarro(carro: Carro): any {
    this.httpCarrosService.info(carro.placa).subscribe((response: any) => {
      this.informacoesCarro = response;
    }); 
  } 

  // INFO DO VENDEDOR
  openModalVendedor(content: any, carroSelecionado: Carro){
    this.carroEditando = carroSelecionado;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `${result}`;
      this.closed = true;
    },(reason) => {
      this.closeResult = `${this.getDismissReason(reason)}`;
      this.closed = true;
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

  // NAVEGAR A PÁGINA ATÉ UM DETERMINADO PONTO
  scrollToSection(destino: string) {
    const section = this.elementRef.nativeElement.querySelector(destino);
    section.scrollIntoView({ 
      behavior: 'smooth' 
    });
  }

}