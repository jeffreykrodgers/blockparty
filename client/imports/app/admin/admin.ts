import { Component, OnInit } from "@angular/core";
import template from "./admin.html";
import style from "./admin.scss";
import {MenuService} from "./services/menu.service";
import {Router} from "@angular/router";
import {Meteor} from "meteor/meteor";

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

    constructor(private _menuService: MenuService,
                private router: Router) {
        this._menuService.toggleSidebar.subscribe(() => {
            this.open = !this.open
        });
    }

    ngOnInit() {
        console.log(Meteor.userId());
        if (!Meteor.userId()) {
            this.router.navigate(['/admin/auth']);
        }
    };

    ngAfterViewInit() {

    }
}