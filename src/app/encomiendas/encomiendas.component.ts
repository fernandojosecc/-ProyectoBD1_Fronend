import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-encomiendas',
  templateUrl: './encomiendas.component.html',
  styleUrls: ['./encomiendas.component.css']
})
export class EncomiendasComponent implements OnInit {
  encomiendas:any=[];
  encomiendas01:any=[];
  encomiendas02:any=[];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getChat()


    console.log(this.encomiendas01)
  }
  getChat(){
    this.findChat().subscribe(
      (respuesta:any) => this.formatChatOne(respuesta)
    )
  }

  findChat(){
    var httpOptions={
      headers:new HttpHeaders({
        'Content-Type':'application/json'

      })
    }
    return this.http.get<any>("http://localhost:4042/encomiendas/consulta", httpOptions).pipe(
      catchError(e=>"Error al realizar el el /findOne")
    )
  }

  formatChatOne(res:any){
    localStorage.setItem("encomiendas",JSON.stringify(res))
    this.encomiendas = localStorage.getItem("encomiendas");
    this.encomiendas = JSON.parse(this.encomiendas);
    this.encomiendas01 = this.encomiendas[0];
    //location.href="http://localhost:4201/realizarreservaciones"
  }

  formatChat(res:any){
    this.encomiendas = JSON.stringify(res)
    this.encomiendas = JSON.parse(this.encomiendas)
  }

}
