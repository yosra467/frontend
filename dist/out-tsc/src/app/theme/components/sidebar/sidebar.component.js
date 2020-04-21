import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation } from '@angular/core';
import { AppSettings } from '../../../app.settings';
import { MenuService } from '../menu/menu.service';
let SidebarComponent = class SidebarComponent {
    constructor(appSettings, menuService) {
        this.appSettings = appSettings;
        this.menuService = menuService;
        this.settings = this.appSettings.settings;
        this.menuItems = this.menuService.getVerticalMenuItems();
    }
    ngOnInit() {
        if (sessionStorage["userMenuItems"]) {
            let ids = JSON.parse(sessionStorage.getItem("userMenuItems"));
            let newArr = [];
            ids.forEach(id => {
                let newMenuItem = this.menuItems.filter(mail => mail.id == id);
                newArr.push(newMenuItem[0]);
            });
            this.menuItems = newArr;
        }
    }
    closeSubMenus() {
        let menu = document.querySelector("#menu0");
        for (let i = 0; i < menu.children.length; i++) {
            let child = menu.children[i].children[1];
            if (child) {
                if (child.classList.contains('show')) {
                    child.classList.remove('show');
                    menu.children[i].children[0].classList.add('collapsed');
                }
            }
        }
    }
};
SidebarComponent = tslib_1.__decorate([
    Component({
        selector: 'app-sidebar',
        templateUrl: './sidebar.component.html',
        styleUrls: ['./sidebar.component.scss'],
        encapsulation: ViewEncapsulation.None,
        providers: [MenuService]
    }),
    tslib_1.__metadata("design:paramtypes", [AppSettings, MenuService])
], SidebarComponent);
export { SidebarComponent };
//# sourceMappingURL=sidebar.component.js.map