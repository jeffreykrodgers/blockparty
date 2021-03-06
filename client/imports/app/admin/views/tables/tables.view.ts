import {Component, OnInit} from "@angular/core";
import template from "./tables.view.html";
import style from "./tables.view.scss";
import {WeddingService} from "../../../common/services/wedding.service";
import {Observable} from "rxjs/Observable";
import {WeddingDB} from "../../../../../../both/models/wedding.model";
import {ModalService} from "../../services/modals.service";
import {animateFactory} from 'ng2-animate';

@Component({
    selector: "tables",
    host: {
        class: 'tables',
    },
    template,
    styles: [style],
    animations: [animateFactory(300, 100, 'ease-in')]
})

export class TablesView implements OnInit {
    weddingData: Observable<WeddingDB[]>;

    guests: object[];
    tables: object[];
    meals: object[];
    weddingId: string;

    constructor(private _weddingService: WeddingService,
                private _modalService: ModalService) {
        this.weddingData = this._weddingService.getWedding({}).zone();
    }

    ngOnInit() {
        this.weddingData.subscribe(wedding => {
            this.weddingId = wedding[0]._id;
            this.guests = wedding[0].guests;
            this.tables = wedding[0].tables;
            this.meals = wedding[0].meals;
        });
    }

    getTableGuests(table) {
        let guests = this.guests.filter((guest:any) => table.guests.indexOf(guest._id) > -1);
        return guests;
    }

    updateSeats() {
        Meteor.call('updateItem', this.weddingId, 'Table', this.tables);
    }
}