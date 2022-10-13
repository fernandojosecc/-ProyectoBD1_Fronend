import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-user-creation',
  templateUrl: './user-creation.component.html',
  styleUrls: ['./user-creation.component.css']
})
export class UserCreationComponent implements OnInit {
  users:any={};
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }

  consult(){
    location.href="/";
  }

  createAccount(){
    let validForm : any = document.getElementById("form");
    if(validForm.reportValidity()){
      this.createService().subscribe(
        (response:any)=>this.confirmCreation(response)
      )
    }
  }
  createService(){
    var httpOptions={
      headers:new HttpHeaders({
        'Content-Type':'application/json'
      })
    }
    return this.http.post<any>("http://localhost:4042/user/add", this.users, httpOptions).pipe(
      catchError(e=>"e")
    )
  }

  confirmCreation(res:any){
    if(res=="e"){
      console.log("Error peticion");
    }else{
    this.users = {};
    alert("Bienvenido! su nuevo usuario es: "+res.user)
      localStorage.setItem("user", JSON.stringify(res))
    location.href=""
  }
  }
}
