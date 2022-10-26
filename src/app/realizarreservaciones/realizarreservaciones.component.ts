import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-realizarreservaciones',
  templateUrl: './realizarreservaciones.component.html',
  styleUrls: ['./realizarreservaciones.component.css']
})
export class RealizarreservacionesComponent implements OnInit {
  viajes:any=[];
  viajes01:any=[];
  viajes02:any=[];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getChat()


    console.log(this.viajes02)

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
    return this.http.get<any>("http://localhost:4042/viajes/consulta", httpOptions).pipe(
      catchError(e=>"Error al realizar el el /findOne")
    )
  }

  formatChatOne(res:any){
    localStorage.setItem("viajes",JSON.stringify(res))
    this.viajes = localStorage.getItem("viajes");
    this.viajes = JSON.parse(this.viajes);
    this.viajes01 = this.viajes[0];
    this.viajes02 =this.viajes[1];
    //location.href="http://localhost:4201/realizarreservaciones"
  }

  formatChat(res:any){
    this.viajes = JSON.stringify(res)
    this.viajes = JSON.parse(this.viajes)
  }

}
