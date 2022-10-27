import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-misreservaciones',
  templateUrl: './misreservaciones.component.html',
  styleUrls: ['./misreservaciones.component.css']
})
export class MisreservacionesComponent implements OnInit {
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

  constructor() { }

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
  }

}
