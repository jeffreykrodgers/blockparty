import {Component, OnInit} from "@angular/core";
import template from "./guests.view.html";
import style from "./guests.view.scss";
import {WeddingService} from "../../../common/services/wedding.service";
import {Observable} from "rxjs/Observable";
import {WeddingDB} from "../../../../../../both/models/wedding.model";
import {ModalService} from "../../services/modals.service";
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
    meals: object[];
    tables: object[];
    sort: string;
    filters: any[];

    constructor(private _weddingService: WeddingService,
                private _modalService: ModalService) {
        this.weddingData = this._weddingService.getWedding({}).zone();
        this.filters = [];
        this.guests = [];
    }

    ngOnInit() {
        this.weddingData.subscribe(wedding => {
            this.guests = wedding[0].guests;
            this.tables = wedding[0].tables;
            this.meals = wedding[0].meals;
        });
    }

    addFilter(filter) {
        this.filters = filter;
    }

    setSort(sort) {
        this.guests = this.guests.sort((a, b) => {
            if ( a[sort] < b[sort] ){
                return -1;
            }else if( a[sort] > b[sort] ){
                return 1;
            }else{
                return 0;
            }
        });
    }
}