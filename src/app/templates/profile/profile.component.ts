import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public mostraProfile: boolean;
  public nome: string;
  public avatar_url: string;
  public bio: string;
  public blog: string;
  public company: string;
  public id: string;
  public location: string;

  constructor(private sharedService: SharedService) { 
    this.nome = this.sharedService.user.name;
    this.avatar_url =  this.sharedService.user.avatar_url;
    this.bio =  this.sharedService.user.bio;
    this.blog =  this.sharedService.user.blog;
    this.company =  this.sharedService.user.company;
    this.id =  this.sharedService.user.id;
    this.location =  this.sharedService.user.location;
    this.mostraProfile = this.sharedService.logado;
  }

  async ngOnInit() {
    this.mostraProfile = this.sharedService.logado;
  }

}
