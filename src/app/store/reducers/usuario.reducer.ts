import { createReducer, on } from '@ngrx/store';
import { cargarUsuario, cargarUsuarioSuccess, cargarUsuarioError } from '../actions';
import { Usuario } from '../../models/usuario.model';

export interface UsuarioState {
    id: string;
    user: Usuario;
    loaded: boolean;
    loading: boolean;
    error: any;
}

export const UsuarioInitialState: UsuarioState = {
  id     : null,
  user   : null,
  loaded : false,
  loading: false,
  error  : null
};


const _UsuarioReducer = createReducer( UsuarioInitialState,

    on( cargarUsuario, (state, { id }) => ({
      ...state,
      loading: true,
      id
     })),

    on( cargarUsuarioSuccess, (state, { usuario }) => ({
      ...state,
       loading: false,
       loaded: true,
       user: {...usuario}
     })),

    on( cargarUsuarioError, (state, { payload }) => ({
      ...state,
       loading: false,
       loaded: false,
       error: {
         url: payload.url,
         name: payload.name,
         message: payload.message
       }
     })),


);


// tslint:disable-next-line: typedef
export function UsuarioReducer(state, action) {
    return _UsuarioReducer(state, action);
}
