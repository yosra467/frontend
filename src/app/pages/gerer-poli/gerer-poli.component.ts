import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GererPolitiqueService } from './gerer-politique.service';
import { MenuService } from 'src/app/theme/components/menu/menu.service';
import { Politique } from './gerer-politique.model'; 
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { IMultiSelectSettings, IMultiSelectTexts, IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../login/login.service';
import { AppHoraireService } from '../app-horaire/appHoraire.service';
import { ApplicationHoraire } from '../app-horaire/appHoraire.model';

@Component({
  selector: 'app-gerer-poli',
  templateUrl: './gerer-poli.component.html',
  styleUrls: ['./gerer-poli.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ GererPolitiqueService, MenuService ]
})
export class GererPoliComponent implements OnInit {
  public menuItems:Array<any>;  
  //public searchText: string;
  public selectedItem: any={};
  public politiques=[];
  public poli:Politique;
  public p:any;
  public type:string = 'list';
  public modalRef: NgbModalRef;
  public form:FormGroup;
  public isCollapsed: boolean=true;
  public appHoraire=[];
  

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
              public gererPoliService:GererPolitiqueService,
              public menuService:MenuService,
              public modalService:NgbModal,
              public loginService : LoginService,
              public appHoraireService: AppHoraireService) {
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
    this.getAllPolitique();
    this.form=this.fb.group({
      id:null,
      nom:null
    })
  }

  public getAllPolitique(): void{
    let token=localStorage.getItem("token");
    this.gererPoliService.getAllPolitique(token).subscribe(
      (result: Politique[])=> {this.politiques=result; },
      (error)=> {console.log(error)}
    );
  }

  public addPolitique(poli:Politique){
    let token = localStorage.getItem("token");
    this.gererPoliService.addPolitique(poli,token).subscribe(
      politiques => {this.getAllPolitique(),
              this.toastr.success('Politique added successfully')},
      error=>this.toastr.error('Error !!')
      );
  }

  public  updatePolitique(id, poli:Politique){
    let token = localStorage.getItem("token");
    this.gererPoliService.updatePolitique(id,poli, token).subscribe(
      politiques => {this.getAllPolitique();
              this.toastr.success('Politique updated successfully')},
      error=>this.toastr.error('Error !!')
      );
  }

  public  deletePolitique(poli:Politique){
    let token = localStorage.getItem("token");
    this.gererPoliService.deletePolitique(poli.id, token).subscribe(
      result => {this.getAllPolitique();
                this.toastr.success('Politique deleted successfully')},
      error=> this.toastr.error('Error !!')
    );
  }

  public getAllAppHoraire (): void{
    let token =localStorage.getItem("token");
    this.appHoraireService.getAllAppHoraire(token).subscribe(
      (result: ApplicationHoraire[])=>{this.appHoraire=result;},
      (error)=>{console.log(error)}
    )
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

  public assignMenuItemsToUser(poli, id){  
    let token = localStorage.getItem("Authorization");
    this.updatePolitique(id,poli);
    sessionStorage.setItem('userMenuItems', JSON.stringify(poli.menuIds));
    this.toastr.success('Please, logout and login to see result.', 'Successfully assigned !');
  }
  
  public openModal(modalContent, polit) {
  
    if(polit){
      this.poli = polit;
      this.form.setValue(polit); 
    } 
    else{
      this.poli =new Politique(); 
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

  public onSubmit(poli:Politique):void {
    let token = localStorage.getItem("Authorization");
    if (this.form.valid) {
      if(poli.id){
        this.updatePolitique(poli.id, poli);
      }
      else{
        this.addPolitique(poli);
      }      
      this.modalRef.close();    
    }
  }

  isResponsable_rh(){
    return this.loginService.isResponsable_rh();
  }
}

