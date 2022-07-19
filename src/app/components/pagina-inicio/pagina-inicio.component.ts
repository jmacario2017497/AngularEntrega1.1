import { Component, OnInit } from '@angular/core';
import { EmpresasService } from 'src/app/services/empresas.service';
import { Empresa } from 'src/app/models/empresas.model'

@Component({
  selector: 'app-pagina-inicio',
  templateUrl: './pagina-inicio.component.html',
  styleUrls: ['./pagina-inicio.component.scss'],
  providers: [ EmpresasService ]
})
export class PaginaInicioComponent implements OnInit {
  public token;

  public empresaModelGet: Empresa;
  public empresaModelPost: Empresa;

  constructor(private _empresaService: EmpresasService) {
    this.empresaModelPost = new Empresa('','','','','');
    this.token = this._empresaService.obtenerToken()
  }

  ngOnInit(): void {
    this.getEmpresa();
  }

  getEmpresa(){
    this._empresaService.obtenerEmpresa(this.token).subscribe(
      (response)=>{
        this.empresaModelGet = response.Empresa;
        console.log(this.empresaModelGet);
      },
      (error)=>{
        console.log(<any>error);
      }
    )
  }

  postEmpresa(){
    this._empresaService.agregarEmpresa(this.empresaModelPost).subscribe(
      (response)=>{
        console.log(response)
        this.getEmpresa();
      },
      (error)=>{
        console.log(<any>error)
      }
    )
  }

  deleteEmpresa(idEmpresa){
    this._empresaService.eliminarEmpresa(idEmpresa, this.token).subscribe(
      (response)=>{
        console.log(response);
        this.getEmpresa();
      },
      (error)=>{
        console.log(<any>error)
      }
    )
  }

}
