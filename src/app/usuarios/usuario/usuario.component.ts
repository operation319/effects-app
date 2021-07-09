import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import { cargarUsuario } from 'src/app/store/actions';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: [
  ]
})
export class UsuarioComponent implements OnInit {

  usuario: Usuario;
  error: any;
  loading: boolean;

  constructor( private router: ActivatedRoute,
               private store: Store<AppState> ) { }

  ngOnInit(): void {

    this.store.select('usuario').subscribe( ({ user, loading, error }) => {
      this.usuario = user;
      this.loading = loading;
      this.error = error;
    } );

    this.router.params.subscribe( ({ id }) => {
      this.store.dispatch( cargarUsuario({ id }) );
    });

  }

}
