import * as tslib_1 from "tslib";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG = {
    suppressScrollX: true
};
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { AgmCoreModule } from '@agm/core';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ToastrModule } from 'ngx-toastr';
import { PipesModule } from './theme/pipes/pipes.module';
import { routing } from './app.routing';
import { AppSettings } from './app.settings';
import { AppComponent } from './app.component';
import { PagesComponent } from './pages/pages.component';
import { HeaderComponent } from './theme/components/header/header.component';
import { FooterComponent } from './theme/components/footer/footer.component';
import { SidebarComponent } from './theme/components/sidebar/sidebar.component';
import { VerticalMenuComponent } from './theme/components/menu/vertical-menu/vertical-menu.component';
import { HorizontalMenuComponent } from './theme/components/menu/horizontal-menu/horizontal-menu.component';
import { BreadcrumbComponent } from './theme/components/breadcrumb/breadcrumb.component';
import { BackTopComponent } from './theme/components/back-top/back-top.component';
import { FullScreenComponent } from './theme/components/fullscreen/fullscreen.component';
import { ApplicationsComponent } from './theme/components/applications/applications.component';
import { MessagesComponent } from './theme/components/messages/messages.component';
import { UserMenuComponent } from './theme/components/user-menu/user-menu.component';
import { FlagsMenuComponent } from './theme/components/flags-menu/flags-menu.component';
import { SideChatComponent } from './theme/components/side-chat/side-chat.component';
import { FavoritesComponent } from './theme/components/favorites/favorites.component';
import { BlankComponent } from './pages/blank/blank.component';
import { SearchComponent } from './pages/search/search.component';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { DxDataGridModule, DxSelectBoxModule, DxCheckBoxModule, DxListModule, DxDropDownBoxModule, DxTreeViewModule, DxTagBoxModule, DxTemplateModule, DxDropDownButtonModule, DxToolbarModule, DxButtonModule } from 'devextreme-angular';
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    NgModule({
        imports: [
            BrowserModule,
            BrowserAnimationsModule,
            FormsModule,
            PerfectScrollbarModule,
            NgbModule,
            MultiselectDropdownModule,
            AgmCoreModule.forRoot({
                apiKey: 'AIzaSyAAYi6itRZ0rPgI76O3I83BhhzZHIgMwPg'
            }),
            CalendarModule.forRoot({
                provide: DateAdapter,
                useFactory: adapterFactory
            }),
            ToastrModule.forRoot(),
            PipesModule,
            routing,
            DxDataGridModule,
            DxSelectBoxModule,
            DxCheckBoxModule,
            DxListModule,
            DxDropDownBoxModule,
            DxTreeViewModule,
            DxTagBoxModule,
            DxTemplateModule,
            DxDropDownButtonModule,
            DxToolbarModule,
            DxButtonModule
        ],
        declarations: [
            AppComponent,
            PagesComponent,
            HeaderComponent,
            FooterComponent,
            SidebarComponent,
            VerticalMenuComponent,
            HorizontalMenuComponent,
            BreadcrumbComponent,
            BackTopComponent,
            FullScreenComponent,
            ApplicationsComponent,
            MessagesComponent,
            UserMenuComponent,
            FlagsMenuComponent,
            SideChatComponent,
            FavoritesComponent,
            BlankComponent,
            SearchComponent,
            NotFoundComponent
        ],
        providers: [
            AppSettings,
            { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG }
        ],
        bootstrap: [AppComponent]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map