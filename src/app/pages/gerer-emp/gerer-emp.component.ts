import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuService } from 'src/app/theme/components/menu/menu.service';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators , FormControl, ReactiveFormsModule} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';
import { GererEmpService } from './gerer-emp.service';
import { user, Departement} from './gerer-emp.model';
import { LoginService } from '../login/login.service';
import { GererPolitiqueService } from '../gerer-poli/gerer-politique.service';
import { Politique } from '../gerer-poli/gerer-politique.model';
import { GererRoleService } from '../gerer-role/gerer-role.service';
import { Role } from '../gerer-role/gerer-role.model';


@Component({
  selector: 'app-gerer-emp',
  templateUrl: './gerer-emp.component.html',
  styleUrls: ['./gerer-emp.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ GererEmpService, MenuService ]

})
export class GererEmpComponent implements OnInit {

  public menuItems:Array<any>;  
  public searchText: string;
  public selectedItem: any={};
  public users=[];
  public user:user;
  public politique=[];
  public poliSelected:Politique; 
  public p:any;
  public type:string = 'list';
  public modalRef: NgbModalRef;
  public form:FormGroup;
  public gender = [];
  public genderOption:string;
  public roles=[];
  public roleSelected: Role;
  public dept=[];
  public deptSelected: Departement;

  public menuSelectSettings: IMultiSelectSettings = {
    enableSearch: true,
    checkedStyle: 'fontawesome',
    buttonClasses: 'btn btn-secondary btn-block',
    dynamicTitleMaxItems: 0,
    displayAllSelectedText: true,
    showCheckAll: true,
    showUncheckAll: true
  };
  public menuSelectTexts: IMultiSelectTexts = {
    checkAll: 'Select all',
    uncheckAll: 'Unselect all',
    checked: 'menu item selected',
    checkedPlural: 'menu items selected',
    searchPlaceholder: 'Find menu item...',
    defaultTitle: 'Select menu items for user',
    allSelected: 'All selected',
  };
  
  public menuSelectOptions: IMultiSelectOption[] = [];
  constructor(public fb:FormBuilder, 
              public toastrService: ToastrService,
              public gererEmpService:GererEmpService,
              public menuService:MenuService, 
              public modalService: NgbModal,
              private loginService: LoginService,
              private gererPoliService: GererPolitiqueService,
              private gererRoleService: GererRoleService) { 
      this.menuItems = this.menuService.getVerticalMenuItems();
      this.menuItems.forEach(item=>{
        let menu = { 
          id: item.id, 
          name: item.title
        }
        this.menuSelectOptions.push(menu);
      })
    }
    
  ngOnInit() {
    this.getAllUser(); 
    this.getAllPolitique();
    this.getAllRole();
    this.getAllDepartement();
    this.form = this.fb.group({
          idUser: null,
          prenom: null,
          nom: null,  
            //birthday: null,
          gender: null,
          email: [null, Validators.compose([Validators.required, Validators.email])],
          password: [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.pattern('[a-zA-z0-9]+')])],       
          politique: [],
          departement: [],
          role: []
    })
  }

  public getAllUser(): void{
    let token = localStorage.getItem("token");
    this.gererEmpService.getAllUser(token).subscribe( 
      (result: user[]) => {
        this.users = result;
      },
      (error)=> {
        console.log(error)
      }
    );    
  }

  public getAllPolitique():void{
    let token= localStorage.getItem("token");
    this.gererPoliService.getAllPolitique(token).subscribe(
      (result: Politique[])=> {this.politique=result;},
      (error)=>{console.log(error)}
    );
  }

  public getAllRole():void{
    let token= localStorage.getItem("token");
    this.gererRoleService.getAllRole(token).subscribe(
      (result: Role[])=> {this.roles=result;},
      (error)=>{console.log(error)}
    );
  }

  public getAllDepartement():void{
    let token= localStorage.getItem("token");
    this.gererEmpService.getAllDepartement(token).subscribe(
      (result: Departement[])=> {this.dept=result;},
      (error)=>{console.log(error)}
    );
  }

  public addUser(user:user){
    let token = localStorage.getItem("token");
    console.log(user);
    this.gererEmpService.addUser(user,token).subscribe(
      users => {this.getAllUser(),
              this.toastrService.success('User added successfully')},
      error=>this.toastrService.error('Error !!')
      );
  }

  public  updateUser(id, user:user){
    let token = localStorage.getItem("token");
    this.gererEmpService.updateUser(user,id, token).subscribe(
      user => {this.getAllUser();
              this.toastrService.success('User updated successfully')},
      error=>this.toastrService.error('Error !!')
      );
  }

  public  deleteUser(idUser){
    console.log(idUser)
    let token = localStorage.getItem("token");
    this.gererEmpService.deleteUser(idUser, token).subscribe(
      result => {this.getAllUser();
                this.toastrService.success('User deleted successfully')},
      error=> this.toastrService.error('Error !!')
    );
  }

  public toggle(type){
    this.type = type;
  }

  public openMenuAssign(event){
    let parent = event.target.parentNode;
    while (parent){
      parent = parent.parentNode;
      if(parent.classList.contains('content')){
        parent.classList.add('flipped');
        parent.parentNode.parentNode.classList.add('z-index-1');
        break;
      }
    }
  }

  public closeMenuAssign(event){
    let parent = event.target.parentNode;
    while (parent){
      parent = parent.parentNode;
      if(parent.classList.contains('content')){
        parent.classList.remove('flipped');
        parent.parentNode.parentNode.classList.remove('z-index-1');
        break;
      }
    }
  }

  public assignMenuItemsToUser(user, id){  
    let token = localStorage.getItem("Authorization");
    this.updateUser(id,user);
    sessionStorage.setItem('userMenuItems', JSON.stringify(user.menuIds));
    this.toastrService.success('Please, logout and login to see result.', 'Successfully assigned !');
  }
  
  public openModal(modalContent, userv) {
  
    if(userv){
      this.user = userv;
      this.form.setValue(userv); 
      this.genderOption = userv.gender; 
      this.poliSelected=userv.politique  ;
      this.roleSelected=userv.role;
      this.deptSelected=userv.departement;
    } 
    else{
      this.user =new user(); 
    }   
    this.modalRef = this.modalService.open(modalContent, { container: '.app' });
    
    this.modalRef.result.then((result) => {
      this.form.reset();
      this.genderOption = null;
      this.poliSelected=null;
      this.roleSelected=null;
      this.deptSelected=null;
    }, (reason) => {
      this.form.reset();
      this.genderOption = null;
      this.poliSelected=null;
      this.roleSelected=null;
      this.deptSelected=null;
    });
  } 
  public openModall(modalContentUpdate, userv) {
  
    if(userv){
      this.user = userv;
      this.form.setValue(userv); 
      this.genderOption = userv.gender; 
      this.poliSelected=userv.politique;
      this.roleSelected=userv.role;
      this.deptSelected=userv.departement;

    } 
    else{
      this.user =new user(); 
    }   
    this.modalRef = this.modalService.open(modalContentUpdate, { container: '.app' });
    
    this.modalRef.result.then((result) => {
      this.form.reset();
      this.genderOption = null;
      this.poliSelected=null;
      this.roleSelected=null;
      this.deptSelected=null;
    }, (reason) => {
      this.form.reset();
      this.genderOption = null;
      this.poliSelected=null;
      this.roleSelected=null;
      this.deptSelected=null;
    });
  } 

  public closeModal(){
    this.modalRef.close();
  } 

  public onSubmit(user:user):void {
    let token = localStorage.getItem("Authorization");
    if (this.form.valid) {
      if(user.id){
        this.updateUser(user.id, user);
      }
      else{
        this.addUser(user);
      }      
      this.modalRef.close();    
    }
  }

  isResponsable_rh(){
    return this.loginService.isResponsable_rh();
  }
}
