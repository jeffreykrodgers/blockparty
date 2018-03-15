import {Component, OnInit} from "@angular/core";
import template from "./venues.view.html";
import style from "./venues.view.scss";
import {Observable} from "rxjs/Observable";
import {WeddingDB} from "../../../../../../both/models/wedding.model";
import {WeddingService} from "../../../common/services/wedding.service";
import {ModalService} from "../../services/modals.service";

@Component({
    selector: "venues",
    host: {
        class: 'venues',
    },
    template,
    styles: [style]
})

export class VenuesView implements OnInit {
    weddingData: Observable<WeddingDB[]>;

    venues: object[];

    constructor(private _weddingService: WeddingService,
                private _modalService: ModalService) {
        this.weddingData = this._weddingService.getWedding({}).zone();
    }


    ngOnInit() {
        this.weddingData.subscribe(wedding => {
            this.venues = wedding[0].venues;
        });
    }
}