import {Component, OnInit} from "@angular/core";
import template from "./adminSidebar.component.html";
import style from "./adminSidebar.component.scss";
import {Observable} from "rxjs/Observable";
import {WeddingDB} from "../../../../../../../both/models/wedding.model";
import {WeddingService} from "../../../../common/services/wedding.service";

import * as moment from 'moment';
import {ActivatedRoute, Router} from "@angular/router";
import {MenuService} from "../../../services/menu.service";

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
                private router: Router,
                private _route: ActivatedRoute) {

        this.weddingData = this._weddingService.getWedding({}).zone();
        this.links = [{
                text: 'Dashboard',
                slug: '/admin/dashboard',
                icon: 'dashboard'
            },
            {
                text: 'Guests',
                slug: '/admin/guests',
                icon: 'person'
            },
            {
                text: 'Tables',
                slug: '/admin/tables',
                icon: 'people'
            },
            {
                text: 'Venues',
                slug: '/admin/venues',
                icon: 'location_on'
            },
            {
                text: 'Meals',
                slug: '/admin/meals',
                icon: 'local_dining'
            },
            // {
            //     text: 'Announements',
            //     slug: '/admin/announcements',
            //     icon: 'announcement'
            // },
        ]

    }

    ngOnInit() {
        this.weddingData.subscribe(wedding => {
            this.weddingId = wedding[0]._id;
            this.date = moment(wedding[0].date).format('dddd, MMMM Do YYYY [at] h:mm a');
            this.spouses = wedding[0].spouses;
        });
    }

    toggleMenu() {
        this.open = !this.open;
    }

    logout() {
        Meteor.logout(() => {
            this.router.navigate(['/login']);
        });
    }
}