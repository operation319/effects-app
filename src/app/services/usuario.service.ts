import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url = 'https://reqres.in/api';

  constructor( private http: HttpClient ) { }

  getUsers(): any {
   return this.http.get(`${ this.url }/users?per_page=6`)
          .pipe(
            // tslint:disable-next-line: no-string-literal
            map( resp => resp ['data'])
          );
  }


  getUserById( id: string ): any {
    return this.http.get(`${ this.url }/users/${ id }`)
           .pipe(
             // tslint:disable-next-line: no-string-literal
             map( resp => resp ['data'])
           );
   }

}
