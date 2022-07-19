import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Empresa } from '../models/empresas.model';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {
  public url: String = 'http://localhost:4500/api';
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json')
  public identidad;
  public token;
  constructor(public _http: HttpClient) { }

  login(empresa, Token = null): Observable<any>{
    if(Token != null){
      empresa.Token = Token;
    }

    let params = JSON.stringify(empresa);

    return this._http.post(this.url + '/login', params, {headers: this.headersVariable});
  }

  obtenerToken(){
    var token2 = localStorage.getItem("token")
    if(token2 != undefined){
      this.token = token2;
    }else{
      this.token = null
    }

    return this.token;
  }

  obtenerIdentidad(){
    var identidad2 = JSON.parse(localStorage.getItem("identidad"));
    if(identidad2 != undefined){
      this.identidad = identidad2;
    }else{
      this.identidad = null
    }

    return this.identidad;
  }

  obtenerEmpresa(token): Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', token)

    return this._http.get(this.url + '/empresas', {headers: headersToken})
  }

  agregarEmpresa(empresaModel: Empresa): Observable<any>{
    let parametros = JSON.stringify(empresaModel)

    return this._http.post(this.url + '/registrarEmpresa', parametros, {headers: this.headersVariable})
  }

  eliminarEmpresa(id : String, token): Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', token)

    return this._http.delete(this.url + '/eliminarEmpresa/' + id, {headers: headersToken})

  }
}
