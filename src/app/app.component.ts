import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpCarrosService } from 'src/app/services/http-carros.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {  
  
  dtOptions: DataTables.Settings = { 
    //dom: 'Blfrtip',
    paging: true,
    "lengthMenu": [[10, 50, 100, -1],[10, 50, 100, "Todos"]],
    "language": { "url": "assets/datatables.Portuguese.txt" }    
  }; 
  dtTrigger: Subject<any> = new Subject(); 

  todosCarros: any = [];  

  constructor(private httpCarrosService: HttpCarrosService) { }
  ngOnInit() {
    this.httpCarrosService.listar().subscribe((response: any) => {
      this.todosCarros = response;
      this.dtTrigger.next('');
    });
  }

  ngOnDestroy(): void {
      this.dtTrigger.unsubscribe();
  }
}