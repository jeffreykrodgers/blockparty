import {Component, OnInit} from "@angular/core";
import template from "./adminContent.html";
import style from "./adminContent.scss";
import {WeddingService} from "../../../common/services/wedding.service";
import {Observable} from "rxjs/Observable";
import {WeddingDB} from "../../../../../../both/models/wedding.model";

import * as moment from 'moment';
import {MenuService} from "../../services/menu.service";

@Component({
    selector: "adminContent",
    host: {
        class: 'adminContent',
    },
    template,
    styles: [style]
})

export class AdminContentView implements OnInit {
    weddingData: Observable<WeddingDB[]>;
    weddingId: string;

    spouses: object[];
    date: any;
    guests: object[];
    tables: object[];
    meals: object[];
    venues: object[];
    moment: any;

    constructor(private _weddingService: WeddingService,
                private _menuService: MenuService) {
        this.weddingData = this._weddingService.getWedding({}).zone();
        this.moment = moment;
    }

    ngOnInit() {
        this.weddingData.subscribe(wedding => {
            this.weddingId = wedding[0]._id;
            this.date = moment(wedding[0].date).format('dddd, MMMM Do YYYY [at] h:mm a');
            this.spouses = wedding[0].spouses;
            this.guests = wedding[0].guests;
            this.tables = wedding[0].tables;
            this.meals = wedding[0].meals;
            this.venues = wedding[0].venues;
        });
    }

    toggleMenu() {
        this._menuService.toggleSidebar.emit();
    }
}