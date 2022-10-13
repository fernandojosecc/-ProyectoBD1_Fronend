import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import { ajax } from 'rxjs/ajax';
import {catchError} from "rxjs/operators";

@Component({
  selector: 'app-pruebas',
  templateUrl: './pruebas.component.html',
  styleUrls: ['./pruebas.component.css']
})
export class PruebasComponent implements OnInit {
  idchannel:number =0
  messages:any = {}
  chat : any = {}
  subject = new Subject<any>()
  SMS:any
  SMS2:any
  newSMS:any={}
  nameUser = 'DIBOY1'
  nameUser2 = 'CCACERES2'


  constructor(private http:HttpClient){}


  ngOnInit(): void {

  this.cargar()

  }

  cargar(){
    this.chat = localStorage.getItem("chat")
    this.chat = JSON.parse(this.chat)
    this.idchannel = this.chat.idchannel
    this.messages = this.chat[0].messageList
    this.subject.subscribe(data =>{
      console.log('recibiendo: ' + JSON.stringify(data))
      this.messages.push(data)
    });
  }

  sendSMS1(){

    if(this.SMS == "" || this.SMS == " "){
    }
    else {
      var date = new Date()
      var month = date.getMonth() + 1
      this.newSMS = {
        date: date.getDate() + "/" + month + "/" + date.getFullYear(),
        time: date.getHours() + ":" + date.getMinutes(),
        userUser: "DIBOY1",
        message: this.SMS,
        channelIdchannel: this.chat[0].idchannel,
        userIdclient: 1
      }

      console.log(this.newSMS)
      this.SMS = ''
      this.subSMS()
    }
  }

  sendSMS2(){
    if(this.SMS == "" || this.SMS == " "){
    }
    else {
      var date = new Date()
      var month = date.getMonth() + 1
      this.newSMS = {
        date: date.getDate() + "/" + month + "/" + date.getFullYear(),
        time: date.getHours() + ":" + date.getMinutes(),
        userUser: "CCACERES2",
        message: this.SMS2,
        channelIdchannel: this.chat[0].idchannel,
        userIdclient: 2
      }

      console.log(this.newSMS)
      this.SMS2 = ''
      this.subSMS()
    }
  }

  subSMS(){
    this.saveSMS()

    this.subject.next(this.newSMS)
  }

  saveSMS(){
    this.serviceSaveSMS().subscribe(
      (response:any)=>this.confirmSaveSMS(response)
    )
  }

  serviceSaveSMS(){
    var httpOptions={
      headers:new HttpHeaders({
        'Content-Type':'application/json'
      })
    }
    return this.http.post<any>("http://localhost:4042/message/add", this.newSMS, httpOptions).pipe(
      catchError(e=>"e")
    )
  }

  confirmSaveSMS(res:any){
    console.log(res)
    if(res=="e"){
      console.log("Error al guardar sms");
    }
  }


}
