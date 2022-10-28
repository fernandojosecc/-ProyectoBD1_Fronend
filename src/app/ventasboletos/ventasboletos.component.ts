import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-ventasboletos',
  templateUrl: './ventasboletos.component.html',
  styleUrls: ['./ventasboletos.component.css']
})
export class VentasboletosComponent implements OnInit {
  boleto:any=[];
  boleto01:any=[];
  boleto02:any=[];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {

    this.getChat()

    console.log(this.boleto)
  }
  getChat(){
    this.consultaServicio().subscribe(
      (respuesta:any) => this.validaRespuesta(respuesta)
    )
  }

  consultaServicio(){
    var httpOptions={
      headers:new HttpHeaders({
        'Content-Type':'application/json'

      })
    }
    return this.http.get<any>("http://localhost:4042/consulta/boletos", httpOptions).pipe(
      catchError(e=>"Error al realizar el el /findOne")
    )
  }

  validaRespuesta(res:any){
    localStorage.setItem("boleto",JSON.stringify(res))
    this.boleto = localStorage.getItem("boleto");
    this.boleto = JSON.parse(this.boleto);
    this.boleto01 = this.boleto[0];
    this.boleto02 =this.boleto[1];
    console.log(this.boleto)
  }

  crearBoleto(){
    this.crearBoletoRequest().subscribe(
      (respuesta: any) => this.crearBoletoResponse(respuesta)
    )
  }

  // Crear boleto
  crearBoletoRequest() {

    console.log("Creacion de reservación")
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.post<any>("http://localhost:4042/crear/boleto", httpOptions).pipe(
      catchError(e => "e")
    )
  }
  crearBoletoResponse(res: any) {
    console.log(res + " aqui va el res ")

    if (res == "e" || res == null) {
      alert("No hay comunicación con el servidor!!")
    } else if (res != null) {
      // ok

      res = JSON.parse(JSON.stringify(res))
      console.log(res)
      alert("Se creo el numero de boleto: " + res.idBoleto +" con el codigo de boleto: "+res.numero_Boleto)
      this.getChat()
    }
  }

}
