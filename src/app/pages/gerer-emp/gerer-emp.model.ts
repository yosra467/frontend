import { Politique } from '../gerer-poli/gerer-politique.model';
import { Role } from '../gerer-role/gerer-role.model';

export class user {
    id: number;
    prenom: string;
    nom: string; 
    gender: string;
    email: string;
    password: string; 
    politique: Politique;
    departement: Departement;
    role :Role; 
    //profile: UserProfile;
    //work: UserWork;
    //settings: UserSettings;
    //menuIds: number[];//  =>   for create ngModel multiselect
}

  /*export class Politique{
    id : number;
    nom : string;
  }*/
  export class Departement{
    id : number;
    deptName : string;
  }
  /*export class Role{
    id : number;
    role : string;
  }*/
  /*export class UserProfile {  
      //prenom
    name: string;
    //nom
    surname: string;  
    gender: string;
    image: string;
  }
  
  export class UserWork
    departement: string;
    politique: string;
    role :string;
  }

  export class UserSettings{
    isActive: boolean;
    isDeleted: boolean;
    registrationDate: Date;
    joinedDate: Date;
  }*/
