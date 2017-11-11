import {Component, OnInit} from "@angular/core";
import template from "./guests.view.html";
import style from "./guests.view.scss";
import {WeddingService} from "../../../common/services/wedding.service";
import {Observable} from "rxjs/Observable";
import {WeddingDB} from "../../../../../../both/models/wedding.model";
import {ModalService} from "../modals/modals.service";
import {animateFactory} from 'ng2-animate';

@Component({
    selector: "guests",
    host: {
        class: 'guests',
    },
    template,
    styles: [style],
    animations: [animateFactory(300, 100, 'ease-in')]
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