import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpresasService } from 'src/app/services/empresas.service';
import { Empresa } from '../../models/empresas.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [EmpresasService]
})
export class LoginComponent implements OnInit {
  public empresaModel: Empresa;

  constructor(
    private _empresasService: EmpresasService,
    private _router: Router
    ) {

    this.empresaModel = new Empresa(
      "",
      "",
      "",
      "",
      ""
    );

  }

  ngOnInit(): void {
  }

  getToken(){
    this._empresasService.login(this.empresaModel, "true").subscribe(
      (response) =>{
        console.log(response);
        localStorage.setItem("token", response.token)
      },
      (error)=>{
        console.log(<any>error);

      }
    )
  }

  login(){
    this._empresasService.login(this.empresaModel).subscribe(
      (response)=>{
        this.getToken();
        localStorage.setItem("identidad", JSON.stringify(response.empresa))
        console.log(response);

        this._router.navigate(['/pagina-inicio'])
      },
      (error)=>{
        console.log(<any>error);
      }
    )
  }

}
