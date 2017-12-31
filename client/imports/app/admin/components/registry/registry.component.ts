import {Component, Input, OnInit} from "@angular/core";
import template from "./registry.component.html";
import style from "./registry.component.scss";
import {WeddingService} from "../../../common/services/wedding.service";
import {Observable} from "rxjs/Observable";
import {WeddingDB} from "../../../../../../both/models/wedding.model";

@Component({
    selector: "registry-card",
    host: {
        class: 'registry card',
    },
    template,
    styles: [style],
})

export class admin_RegistryComponent implements OnInit {
    @Input() registry: any;

    weddingData: Observable<WeddingDB[]>;
    image: string;

    constructor(private _weddingService: WeddingService) {
        this.weddingData = this._weddingService.getWedding({}).zone();
    }

    ngOnInit() {
        switch(this.registry.name) {
            case 'Zola':
                this.image = '/img/zola-logo-white.svg';
                break;
        }
    }
}