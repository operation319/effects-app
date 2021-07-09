import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';

import * as usuariosActions from '../actions';
import { UsuarioService } from '../../services/usuario.service';
import { of } from 'rxjs';
import { Usuario } from '../../models/usuario.model';




@Injectable()
export class UsuarioEffects {

    constructor(
      private actions$: Actions,
      private usuarioService: UsuarioService
    ){}

  cargarUsuario$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType( usuariosActions.cargarUsuario ),
      mergeMap(
        ( action ) => this.usuarioService.getUserById( action.id )
        .pipe(
          map( (user: Usuario) => usuariosActions.cargarUsuarioSuccess({ usuario: user } )),
          catchError( err => of( usuariosActions.cargarUsuarioError({ payload: err }) ) )
        )
      )
     );
  });
}
