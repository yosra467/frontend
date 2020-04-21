import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GererRoleService } from './gerer-role.service';
import { MenuService } from 'src/app/theme/components/menu/menu.service';
import { Role } from './gerer-role.model';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IMultiSelectSettings, IMultiSelectTexts, IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-gerer-role',
  templateUrl: './gerer-role.component.html',
  styleUrls: ['./gerer-role.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ GererRoleService, MenuService ]
})
export class GererRoleComponent implements OnInit {
public menuItems:Array<any>;  
//public searchText: string;
public selectedItem: any={};
public roles=[];
public role:Role;
public p:any;
public type:string = 'list';
public modalRef: NgbModalRef;
public form:FormGroup;
public isCollapsed: boolean=true;


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
              public toastr:ToastrService,
              public gererRoleService:GererRoleService,
              public menuService:MenuService,
              public modalService:NgbModal,
              public loginService : LoginService) {
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
    this.getAllRole();
    this.form=this.fb.group({
      id:null,
      nom:null
    })
  }
  public getAllRole(): void{
    let token=localStorage.getItem("token");
    this.gererRoleService.getAllRole(token).subscribe(
      (result: Role[])=> {this.roles=result; },
      (error)=> {console.log(error)}
    );
  }

  public addRole(role:Role){
    let token = localStorage.getItem("token");
    this.gererRoleService.addRole(role,token).subscribe(
      roles => {this.getAllRole(),
              this.toastr.success('Role added successfully')},
      error=>this.toastr.error('Error !!')
      );
  }

  public  updateRole(id, role:Role){
    let token = localStorage.getItem("token");
    this.gererRoleService.updateRole(id,role, token).subscribe(
      roles => {this.getAllRole();
              this.toastr.success('Role updated successfully')},
      error=>this.toastr.error('Error !!')
      );
  }

  public  deleteRole(role:Role){
    let token = localStorage.getItem("token");
    this.gererRoleService.deleteRole(role.id, token).subscribe(
      result => {this.getAllRole();
                this.toastr.success('Role deleted successfully')},
      error=> this.toastr.error('Error !!')
    );
  }

  public toggle(type){
    this.type = type;
    this.isCollapsed=!this.isCollapsed;
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

  public assignMenuItemsToUser(role, id){  
    let token = localStorage.getItem("Authorization");
    this.updateRole(id,role);
    sessionStorage.setItem('userMenuItems', JSON.stringify(role.menuIds));
    this.toastr.success('Please, logout and login to see result.', 'Successfully assigned !');
  }
  
  public openModal(modalContent, rolee) {
  
    if(rolee){
      this.role= rolee;
      this.form.setValue(rolee); 
    } 
    else{
      this.role =new Role(); 
    }   
    this.modalRef = this.modalService.open(modalContent, { container: '.app' });
    
    this.modalRef.result.then((result) => {
      this.form.reset();
    }, (reason) => {
      this.form.reset();
    });
  } 

  public closeModal(){
    this.modalRef.close();
  } 

  public onSubmit(role:Role):void {
    let token = localStorage.getItem("Authorization");
    if (this.form.valid) {
      if(role.id){
        this.updateRole(role.id, role);
      }
      else{
        this.addRole(role);
      }      
      this.modalRef.close();    
    }
  }

  isResponsable_rh(){
    return this.loginService.isResponsable_rh();
  }

}



