import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  user:any={};
  chat : any = {}
  SMS:any
  SMS2:any
  newSMS:any={}
  messages:any = {}
  subject = new Subject<any>()
  nameUser = 'DIBOY1'
  nameUser2 = 'CCACERES2'

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.cargarChats();
  }

  cargarChats(){
    this.user = localStorage.getItem("user");
    this.user = JSON.parse(this.user);
    this.nameUser = this.user[0].user;
    this.chat = localStorage.getItem("chat")
    this.chat = JSON.parse(this.chat)
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

  signOff(){
    localStorage.clear()
    location.href="#"
  }
}
