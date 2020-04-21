import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
export const routes = [
    { path: '', component: LoginComponent, pathMatch: 'full' }
];
let LoginModule = class LoginModule {
};
LoginModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            RouterModule.forChild(routes)
        ],
        declarations: [LoginComponent]
    })
], LoginModule);
export { LoginModule };
//# sourceMappingURL=login.module.js.map