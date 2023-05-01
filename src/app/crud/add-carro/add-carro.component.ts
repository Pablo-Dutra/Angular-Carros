import { Component, OnInit } from '@angular/core';
import { Carro } from '../../carro'
import { HttpCarrosService } from '../../services/http-carros.service'
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-add-carro',
  templateUrl: './add-carro.component.html',
  styleUrls: ['./add-carro.component.css']
})
export class AddCarroComponent implements OnInit {
  
  public classeCarroNome: string;
  public classeCarroMarca: string;
  public classeCarroModelo: string;
  public classeCarroAno: string;
  public classeCarroKm: string;
  public classeCarroFotos: string;
  public classeCarroStatus: string;
  public classeCarroPlaca: string;

  public carro: Carro;
  public resposta: boolean = false;  

  public opcoes: string[] = ['disponível', 'indisponível'];
  public selecionado: string; 

  public idUsuario: number;

  constructor(private HttpCarrosService: HttpCarrosService, private sharedService: SharedService) { 
    this.idUsuario =  this.sharedService.user.id;

    this.classeCarroNome = "form-control";
    this.classeCarroMarca = "form-control";
    this.classeCarroModelo = "form-control"; 
    this.classeCarroAno = "form-control"; 
    this.classeCarroKm = "form-control"; 
    this.classeCarroFotos = "form-control";  
    this.classeCarroPlaca = "form-control";  
    this.classeCarroStatus = "form-control";  
    this.selecionado = '';

    this.carro = { 
      nome: '',
      marca: '',
      modelo: '',
      ano: 0,
      km: 0,
      fotos: '',
      status: '',
      responsavel: this.idUsuario,   
      placa: ''  
    };
}

  ngOnInit(): void { 
    this.carro.responsavel = this.idUsuario;
  }

  // FUNÇÃO DE VALIDAÇÃO DOS CAMPOS
  validarCampos():boolean {
    
    let camposValidos:boolean = true;

    if(this.carro.nome === '') {
      camposValidos = false;
      this.classeCarroNome = "form-control is-invalid";
    } else {
      this.classeCarroNome = "form-control is-valid";
    }
    if(this.carro.modelo === '') {
      camposValidos = false;
      this.classeCarroModelo = "form-control is-invalid";
    } else {
      this.classeCarroModelo = "form-control is-valid";
    }

    if(this.carro.marca === '') {
      camposValidos = false;
      this.classeCarroMarca = "form-control is-invalid";
    } else {
      this.classeCarroMarca = "form-control is-valid";
    }
    if(this.carro.ano == 0) {
      camposValidos = false;
      this.classeCarroAno = "form-control is-invalid";
    } else {
      this.classeCarroAno = "form-control is-valid";
    }

    if(this.carro.km == 0) {
      camposValidos = false;
      this.classeCarroKm = "form-control is-invalid";
    } else {
      this.classeCarroKm = "form-control is-valid";
    }
    if(this.carro.fotos === '') {
      camposValidos = false;
      this.classeCarroFotos = "form-control is-invalid";
    } else {
      this.classeCarroFotos = "form-control is-valid";
    }

    if(this.carro.status === '') {
      camposValidos = false;
      this.classeCarroStatus = "form-control is-invalid";
    } else {
      this.classeCarroStatus = "form-control is-valid";
    }
    if(this.carro.placa === '') {
      camposValidos = false;
      this.classeCarroPlaca = "form-control is-invalid";
    } else {
      this.classeCarroPlaca = "form-control is-valid";
    }

    if(!camposValidos) {
      return false;
    }else{
      return true;
    }
  }

  // FUNÇÃO PARA CADASTRAR
  public gravar():void{
    if(this.validarCampos()){
      this.HttpCarrosService.inserir(this.carro).subscribe((res)=>{  
        this.resposta = true;
      })
    }
  }

}
