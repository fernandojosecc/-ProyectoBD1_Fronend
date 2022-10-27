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
  user:any={};
  nameUser = ""
  chats:any = []
  allChats:any = []
  value = 0
  channel :any={}
  newChannel :any={}
  menus:any = []
  menu1:boolean = false
  menu2:boolean = false
  menu3:boolean = false
  menu4:boolean = false

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.user = localStorage.getItem("user");
    this.user = JSON.parse(this.user);
    this.nameUser = this.user[0].user;

    this.menus = this.user[0]
    this.menus = this.menus[0].rolUsuarioMenuList
    console.log(this.user)
    console.log(this.menus)

    /*if(){

    }*/

    for(let menu of this.menus){
      console.log(menu)
      switch (menu.idMenu){
        case 1:this.menu1 =true; break;
        case 2: this.menu2 =true; break
        case 3: this.menu3 =true; break
        case 4: this.menu4 =true; break
      }
    }

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
