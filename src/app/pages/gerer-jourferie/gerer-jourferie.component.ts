import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuService } from 'src/app/theme/components/menu/menu.service';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';

import { LoginService } from '../login/login.service';
import { GererPolitiqueService } from '../gerer-poli/gerer-politique.service';
import { Politique } from '../gerer-poli/gerer-politique.model';
import { jourferie } from './gerer-jourferie.model';
import {GererJourferieService} from './gerer-jourferie.service';


@Component({
  selector: 'app-gerer-jourferie',
  templateUrl: './gerer-jourferie.component.html',
  styleUrls: ['./gerer-jourferie.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [GererJourferieService, MenuService]
})
export class GererJourferieComponent implements OnInit {
  public menuItems: Array<any>;
  public selectedItem: any = {};
  public jourferies = [];
  public jourferie: jourferie;
  public politiques = [];
  public poli:Politique;
  public p: any;
  public type: string = 'list';
  public modalRef: NgbModalRef;
  public form: FormGroup;
  public Date = [];
  public dateSelected: String;
  public nom = [];
  public nomSelected: String;

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
    defaultTitle: 'Select menu items for jourferie',
    allSelected: 'All selected',
  };

  public menuSelectOptions: IMultiSelectOption[] = [];
  constructor(public fb: FormBuilder,
    public toastrService: ToastrService,
    public gererjourferieService: GererJourferieService,
    public menuService: MenuService,
    public modalService: NgbModal,
    private loginService: LoginService,
    private gererPoliService: GererPolitiqueService,
  ) {
    this.menuItems = this.menuService.getVerticalMenuItems();
    this.menuItems.forEach(item => {
      let menu = {
        id: item.id,
        name: item.title
      }
      this.menuSelectOptions.push(menu);
    })
  }

  ngOnInit() {
    this.getAllJour();
    this.getAllPolitique();
    this.form = this.fb.group({
      nom: null,
      date: null,
      politique: null,

    })
  }
  public getAllJour(): void {
    let token = localStorage.getItem("token");
    this.gererjourferieService.getAllJour(token).subscribe(
      (result: jourferie[]) => {
        this.jourferies = result;
      },
      (error) => {
        console.log(error)
      }
    );
  }

  public getAllPolitique(): void{
    let token=localStorage.getItem("token");
    this.gererPoliService.getAllPolitique(token).subscribe(
      (result: Politique[])=> {this.politiques=result; },
      (error)=> {console.log(error)}
    );
  }

  public addJour(jour: jourferie) {
    let token = localStorage.getItem("token");
   
    this.gererjourferieService.addJour(jour, token).subscribe(
      jourferies => {
        this.getAllJour(),
          this.toastrService.success('jourferie added successfully')
      },
      error => this.toastrService.error('Error !!')
    );
  }

  public updateJour(id, jour: jourferie) {
    let token = localStorage.getItem("token");
    this.gererjourferieService.updateJour(jour, id, token).subscribe(
      jourferie => {
        this.getAllJour();
        this.toastrService.success('Jour Ferie updated successfully')
      },
      error => this.toastrService.error('Error !!')
    );
  }
  public deleteJour(id) {
    console.log(id);
    let token = localStorage.getItem("token");
    this.gererjourferieService.deleteJour(id, token).subscribe(
      result => {
        this.getAllJour();
        this.toastrService.success('Jour Ferie deleted successfully')
      },
      error => this.toastrService.error('Error !!')
    );
  }

  public toggle(type) {
    this.type = type;
  }

  public openMenuAssign(event) {
    let parent = event.target.parentNode;
    while (parent) {
      parent = parent.parentNode;
      if (parent.classList.contains('content')) {
        parent.classList.add('flipped');
        parent.parentNode.parentNode.classList.add('z-index-1');
        break;
      }
    }
  }
  public closeMenuAssign(event) {
    let parent = event.target.parentNode;
    while (parent) {
      parent = parent.parentNode;
      if (parent.classList.contains('content')) {
        parent.classList.remove('flipped');
        parent.parentNode.parentNode.classList.remove('z-index-1');
        break;
      }
    }
  }

  public assignMenuItemsToUser(jour, id) {
    let token = localStorage.getItem("Authorization");
    this.updateJour(id, jour);
    sessionStorage.setItem('userMenuItems', JSON.stringify(jour.menuIds));
    this.toastrService.success('Please, logout and login to see result.', 'Successfully assigned !');
  }
  public openModal(modalContent, jour) {

    if (jour) {
      this.jourferie = jour;
      this.form.setValue(jour);
      this.poli = jour.politique;

    } 
    else {
      this.jourferie = new jourferie();
    }
    this.modalRef = this.modalService.open(modalContent, { container: '.app' });

    this.modalRef.result.then((result) => {
      this.form.reset();

      this.poli = null;
      this.nomSelected = null;
      this.dateSelected = null;
    }, (reason) => {
      this.form.reset();

      this.poli = null;
      this.nomSelected = null;
      this.dateSelected = null;
    });
  }
  public openModall(modalContentUpdate, jourferie) {

    if (jourferie) {
      this.jourferie = jourferie;
      this.form.setValue(jourferie);

      this.poli = jourferie.politique;


    }
    else {
      this.jourferie = new jourferie();
    }
    this.modalRef = this.modalService.open(modalContentUpdate, { container: '.app' });

    this.modalRef.result.then((result) => {
      this.form.reset();

      this.poli= null;
      this.nomSelected = null;
      this.dateSelected = null;
    }, (reason) => {
      this.form.reset();

      this.poli = null;
      this.nomSelected = null;
      this.dateSelected = null;
    });
  }

  public closeModal() {
    this.modalRef.close();
  }

  public onSubmit(jour: jourferie): void {
    let token = localStorage.getItem("Authorization");
    if (this.form.valid) {
      if (jour.id) {
        this.updateJour(jour.id, jour);
      }
      else {
        const objectPoli=this.politiques.find (x=>x.id==jour.politique)
         const jourf= new jourferie();
         jourf.id=null;
         jourf.nom=jour.nom;
         jourf.date=jour.date;
         jourf.politique=objectPoli;
         console.log(jour);
         

        this.addJour(jourf);
      }
      this.modalRef.close();
    }
  }

  isResponsable_rh() {
    return this.loginService.isResponsable_rh();
  }
















}
