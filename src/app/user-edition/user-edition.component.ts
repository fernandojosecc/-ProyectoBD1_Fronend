import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-user-edition',
  templateUrl: './user-edition.component.html',
  styleUrls: ['./user-edition.component.css']
})
export class UserEditionComponent implements OnInit {
  users:any={};
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.users = localStorage.getItem("user");
    this.users = JSON.parse(this.users);
    this.users = this.users[0];
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
    return this.http.post<any>("http://localhost:4042/user/modify", this.users, httpOptions).pipe(
      catchError(e=>"e")
    )
  }

  confirmCreation(res:any){
    if(res=="e"){
    }else{
    this.users = {};
    alert("Usuario: "+res.user+" editado con exito, por favor autenticate de nuevo")
      localStorage.setItem("user", JSON.stringify(res))
    location.href=""
  }
  }
}
