import { Component, OnInit } from '@angular/core';
import{ AppHoraireService} from './appHoraire.service';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-app-horaire',
  templateUrl: './app-horaire.component.html',
  styleUrls: ['./app-horaire.component.scss'],
  providers:[AppHoraireService]
})
export class AppHoraireComponent implements OnInit {
  public appHoraire=[];

  constructor(private fb :FormBuilder,
              private toastr: ToastrService,
              private appHorService: AppHoraireService,
              private loginService: LoginService) {}

  ngOnInit() {
  }

}
