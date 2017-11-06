import {Component, OnInit} from "@angular/core";
import template from "./guests.view.html";
import style from "./guests.view.scss";
import {WeddingService} from "../../../services/wedding.service";
import {Observable} from "rxjs/Observable";
import {WeddingDB} from "../../../../../../both/models/wedding.model";
import {ModalService} from "../modals/modals.service";

@Component({
    selector: "guests",
    host: {
        class: 'guests',
    },
    template,
    styles: [style]
})

export class GuestsView implements OnInit {
    weddingData: Observable<WeddingDB[]>;

    guests: object[];
    tables: object[];

    constructor(private _weddingService: WeddingService,
                private _modalService: ModalService) {
        this.weddingData = this._weddingService.getWedding({}).zone();
    }

    ngOnInit() {
        this.weddingData.subscribe(wedding => {
            this.guests = wedding[0].guests;
            this.tables = wedding[0].tables;
        });
    }
}