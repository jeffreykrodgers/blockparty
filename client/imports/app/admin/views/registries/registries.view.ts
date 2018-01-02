import {Component, OnInit} from "@angular/core";
import template from "./registries.view.html";
import style from "./registries.view.scss";
import {WeddingService} from "../../../common/services/wedding.service";
import {Observable} from "rxjs/Observable";
import {WeddingDB} from "../../../../../../both/models/wedding.model";
import {ModalService} from "../../services/modals.service";
import {animateFactory} from 'ng2-animate';

@Component({
    selector: "registries",
    host: {
        class: 'registries',
    },
    template,
    styles: [style],
    animations: [animateFactory(300, 100, 'ease-in')]
})

export class RegistriesView implements OnInit {
    weddingData: Observable<WeddingDB[]>;

    registries: object[];

    constructor(private _weddingService: WeddingService,
                private _modalService: ModalService) {
        this.weddingData = this._weddingService.getWedding({}).zone();
    }

    ngOnInit() {
        this.weddingData.subscribe(wedding => {
            this.registries = wedding[0].registries;
        });
    }
}