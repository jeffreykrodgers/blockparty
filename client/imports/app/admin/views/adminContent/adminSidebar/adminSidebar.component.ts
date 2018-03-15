import {Component, OnInit} from "@angular/core";
import template from "./adminSidebar.component.html";
import style from "./adminSidebar.component.scss";
import {Observable} from "rxjs/Observable";
import {WeddingDB} from "../../../../../../../both/models/wedding.model";
import {WeddingService} from "../../../../common/services/wedding.service";

import * as moment from 'moment';
import {ActivatedRoute, Router} from "@angular/router";
import {MenuService} from "../../../services/menu.service";
import {ModalService} from "../../../services/modals.service";

declare let $: any;

@Component({
    selector: "adminSidebar",
    host: {
        class: 'adminSidebar',
    },
    template,
    styles: [style]
})

export class admin_SidebarComponent implements OnInit {
    weddingData: Observable<WeddingDB[]>;
    weddingId: string;

    spouses: object[];
    date: any;

    links: any[];

    open: boolean;

    constructor(private _weddingService: WeddingService,
                private _modalService: ModalService,
                private router: Router,
                private _route: ActivatedRoute,
                private _menuService: MenuService) {

        this.weddingData = this._weddingService.getWedding({}).zone();
        this.links = [{
                text: 'Event',
                slug: '/admin/dashboard',
                icon: 'dashboard'
            },
            {
                text: 'Website',
                slug: '/rsvp/',
                icon: 'language',
                target: '_blank'

            }
        ];

        Meteor.settings.public.activeModules.forEach((module) => {
            if (!module.disabled) {
                let link = {
                    text: module.text,
                    slug: module.slug,
                    icon: module.matIcon,
                };

                this.links.push(link);
            }
        });

        Meteor.settings.public.activeModules.forEach((module) => {
            if (module.disabled) {
                let link = {
                    text: module.text,
                    slug: module.slug,
                    icon: module.matIcon,
                    disabled: true
                };

                this.links.push(link);
            }
        });

    }

    ngOnInit() {
        this.weddingData.subscribe(wedding => {
            this.weddingId = wedding[0]._id;
            this.date = moment(wedding[0].date).format('dddd, MMMM Do YYYY [at] h:mm a');
            this.spouses = wedding[0].spouses;
        });
    }

    getTarget(target) {
        return target ? target : '_self';
    }

    toggleMenu() {
        this.open = !this.open;
    }

    toggleSidebar() {
        this._menuService.toggleSidebar.emit();
    }

    logout() {
        Meteor.logout(() => {
            this.router.navigate(['/login']);
        });
    }
}