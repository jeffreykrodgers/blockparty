import {Component, OnInit} from "@angular/core";
import template from "./adminContent.html";
import style from "./adminContent.scss";
import {WeddingService} from "../../../services/wedding.service";
import {Observable} from "rxjs/Observable";
import {WeddingDB} from "../../../../../../both/models/wedding.model";

@Component({
    selector: "adminContent",
    host: {
        class: 'adminContent',
    },
    template,
    styles: [style]
})

export class AdminContentComponent implements OnInit {
    weddingData: Observable<WeddingDB[]>;

    weddingId: string;
    guests: object[];
    tables: object[];
    meals: object[];

    constructor(private _weddingService: WeddingService) {
        this.weddingData = this._weddingService.getWedding({}).zone();
    }

    ngOnInit() {
        this.weddingData.subscribe(wedding => {
            this.weddingId = wedding[0]._id;
            this.guests = wedding[0].guests;
            this.tables = wedding[0].tables;
            this.meals = wedding[0].meals;
        });
    };

    addItem() {

    };

    editItem(item) {

    };

    removeItem(item) {

    };

    hideModal(modal) {
        modal.hide();
    }
}