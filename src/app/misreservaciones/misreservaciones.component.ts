import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError} from "rxjs/operators";

@Component({
  selector: 'app-misreservaciones',
  templateUrl: './misreservaciones.component.html',
  styleUrls: ['./misreservaciones.component.css']
})
export class MisreservacionesComponent implements OnInit {
  user:any={}
  user01: any={}
  user02: any={}
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
  reservaciones:any = []

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.user = localStorage.getItem("user");
    this.user = JSON.parse(this.user);
    this.nameUser = this.user[0].user;
    this.menus = this.user[0]
    this.menus = this.menus[0].rolUsuarioMenuList
    this.user01 = this.user[0]
    this.user02 = this.user01[0]
    this.llamaEncomienda(this.user02.personaList[0].idPersona)
    console.log(this.user02.personaList[0].idPersona)
    /*if(){

    }*/

    for(let menu of this.menus){
      /*console.log(menu)*/
      switch (menu.idMenu){
        case 1:this.menu1 =true; break;
        case 2: this.menu2 =true; break
        case 3: this.menu3 =true; break
        case 4: this.menu4 =true; break
      }
    }
  }

  llamaEncomienda(idPersona:any){
    this.consultarEncomiendas(idPersona).subscribe(
      (respuesta:any) => this.RecibioRespuesta(respuesta)
    )
  }

  consultarEncomiendas(idPersona: any){
    var httpOptions={
      headers:new HttpHeaders({
        'Content-Type':'application/json'

      })
    }
    return this.http.get<any>("http://localhost:4042/encomiendas/consultas/" + idPersona, httpOptions).pipe(
      catchError(e=>"Error al realizar el el /findOne")
    )
  }

  RecibioRespuesta(res:any){
    console.log(res)
    this.reservaciones = res
  }
}
