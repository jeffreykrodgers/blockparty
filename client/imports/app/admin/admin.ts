import { Component, OnInit } from "@angular/core";
import template from "./admin.html";
import style from "./admin.scss";
import {MenuService} from "./services/menu.service";

@Component({
    selector: "admin",
    host: {
        class: 'admin',
    },
    template,
    styles: [ style ]
})

export class AdminView implements OnInit {
    open: boolean;

    constructor(private _menuService: MenuService) {
        this._menuService.toggleSidebar.subscribe(() => {
            this.open = !this.open
        });
    }

    ngOnInit() {

    };
}