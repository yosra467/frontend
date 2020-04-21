import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { PagesComponent } from './pages/pages.component';
import { BlankComponent } from './pages/blank/blank.component';
import { SearchComponent } from './pages/search/search.component';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { TestComponent } from './test/test.component';
import { GererEmpComponent } from './pages/gerer-emp/gerer-emp.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { GererPoliComponent } from './pages/gerer-poli/gerer-poli.component';
import{GererJourferieComponent} from './pages/gerer-jourferie/gerer-jourferie.component';
export const routes: Routes = [
  {
    path: '', 
    component: PagesComponent,canActivate: [AuthGuard],
    children: [
      { path: '', loadChildren: './pages/dashboard/dashboard.module#DashboardModule' ,data: { breadcrumb: 'Dashboard' } },
      { path: 'gerer-emp', component: GererEmpComponent, data: { breadcrumb: 'Gérer les employés' } },
      //other components
      //{ path: 'membership', loadChildren: './pages/membership/membership.module#MembershipModule', data: { breadcrumb: 'Membership' } },
      { path: 'gerer-poli', component:GererPoliComponent , data: { breadcrumb: 'Gérer les politiques de travail' } },
      { path: 'gerer-jourferie', component:GererJourferieComponent , data: { breadcrumb: 'Gérer les jours fériés' } },
      { path: 'form-elements', loadChildren: './pages/form-elements/form-elements.module#FormElementsModule', data: { breadcrumb: 'Form Elements' } },
      { path: 'tables', loadChildren: './pages/tables/tables.module#TablesModule', data: { breadcrumb: 'Tables' } },
      { path: 'tools', loadChildren: './pages/tools/tools.module#ToolsModule', data: { breadcrumb: 'Tools' } },
      { path: 'calendar', loadChildren: './pages/calendar/app-calendar.module#AppCalendarModule', data: { breadcrumb: 'Calendar' } },
      { path: 'mailbox', loadChildren: './pages/mailbox/mailbox.module#MailboxModule', data: { breadcrumb: 'Mailbox' } },
      { path: 'maps', loadChildren: './pages/maps/maps.module#MapsModule', data: { breadcrumb: 'Maps' } },
      { path: 'charts', loadChildren: './pages/charts/charts.module#ChartsModule', data: { breadcrumb: 'Charts' } },
      { path: 'dynamic-menu', loadChildren: './pages/dynamic-menu/dynamic-menu.module#DynamicMenuModule', data: { breadcrumb: 'Dynamic Menu' } },
      { path: 'profile', loadChildren: './pages/profile/profile.module#ProfileModule', data: { breadcrumb: 'Profile' } },
      { path: 'blank', component: BlankComponent, data: { breadcrumb: 'Blank page' } },
      { path: 'search', component: SearchComponent, data: { breadcrumb: 'Search' } }
    ]
  },
  { path: 'login' ,component:LoginComponent },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterModule' },
  { path: '**', component: NotFoundComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
   //preloadingStrategy: PreloadAllModules,  // <- uncomment this line for disable lazy load
   //useHash: true
});
