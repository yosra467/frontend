import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'UserSearchPipe', pure: false })
export class UserSearchPipe implements PipeTransform {
  transform(value, args?): Array<any> {
    let searchText = new RegExp(args, 'ig');
    if (value) {
      return value.filter(user => {
        if (user.prenom) {
          return user.prenom.search(searchText) !== -1;
        }
        else{
          return user.nom.search(searchText) !== -1;
        }
      });
    }
  }
}