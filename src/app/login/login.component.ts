import { Component, OnInit,  } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {


  mensaje: String = "prueba";
  prueba: string = "Ingrese un nombre";
  mostrar: boolean =false;
  user: any= {};
  usuarioInvalido: boolean=false;


 constructor(private http: HttpClient) { }

  ngOnInit(): void {
    localStorage.clear()
  }

 mostrarMensaje(){
    this.mostrar = !this.mostrar;
  }

    formulariologin(){
      let formularioValido : any = document.getElementById("loginForm");
      if(formularioValido.reportValidity()){
        this.servicioLogin().subscribe(
          (respuesta:any)=> this.login(respuesta)
        )
      }
    }

    login(res:any){
    console.log(JSON.parse(JSON.stringify(res)))
    console.log(res[0].idUsuario)
      let res1:any=res[0];
      console.log(res1[0].idUsuario)
      if(res1[0].idUsuario >= 1){
        console.log(JSON.stringify(res));
        localStorage.setItem("user",JSON.stringify(res));
         location.href="/home";
      }
      else if(res=="e"){
        alert("No hay comunicación con el servidor!!")
      }
      else{
        this.usuarioInvalido=true;
        console.log("simon que no")
      }
    }


    crearUsuario(){
      location.href="/user-creation";
    }

    servicioLogin() {
        var httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
        }

      return this.http.post<any>("http://localhost:4042/login/user", this.user, httpOptions).pipe(
        catchError(e => "e")
      )
    }

    validar(){
      if (this.user.idUsuario == "admin" && this.user.contrasenia == "admin") {
        location.href = "/admin";
      }else{
        this.formulariologin();
      }
    }

    createuser(user:any){
      localStorage.setItem("user",JSON.stringify(user));
      location.href="/user-creation";
    }

}
