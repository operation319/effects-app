import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';

import * as usuariosActions from '../actions/usuarios.actions';
import { UsuarioService } from '../../services/usuario.service';
import { of } from 'rxjs';
import { Usuario } from '../../models/usuario.model';




@Injectable()
export class UsuariosEffects {

    constructor(
      private actions$: Actions,
      private usuarioService: UsuarioService
    ){}

  cargarUsuarios$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType( usuariosActions.cargarUsuarios ),
      mergeMap(
        () => this.usuarioService.getUsers()
        .pipe(
          map( (users: Usuario[]) => usuariosActions.cargarUsuariosSuccess({ usuarios: users } )),
          catchError( err => of( usuariosActions.cargarUsuariosError({ payload: err }) ) )
        )
      )
     );
  });
}
