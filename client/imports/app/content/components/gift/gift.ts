import {Component, OnInit} from "@angular/core";

import template from "./gift.html";
import style from "../../style/themes/default/gift.scss";
import {RsvpService} from "../../services/rsvp.service";
import {Router} from "@angular/router";
import {WeddingService} from "../../../common/services/wedding.service";
import {WeddingDB} from "../../../../../../both/models/wedding.model";
import {Observable} from "rxjs/Rx";


@Component({
    selector: "gift",
    host: {
        class: "gift",
    },
    template,
    styles: [style]
})

export class RegistryComponent implements OnInit {
    weddingData: Observable<WeddingDB[]>;

    rsvpData: any;
    registries?: object[];
    links?:object[];

    constructor(private _rsvpService: RsvpService,
                private _weddingService: WeddingService,
                private _router: Router) {
        this.registries = [];
        this.weddingData = this._weddingService.getWedding({}).zone();
    }

    ngOnInit() {
        this._rsvpService.getRsvpData().subscribe(rsvp => {
            this.rsvpData = rsvp;

            if (!rsvp.links) this.rsvpData.links = [];

            if (!this.rsvpData.invitation_num)
                this._router.navigate(['/rsvp']);
        });

        this.weddingData.subscribe(wedding => {
            this.registries = wedding[0].registries;
        });
    }

    getLogo(registry) {
        switch (registry.name) {
            case 'Zola':
                return 'img/zola-logo-white.svg';
        }
    }

    continue() {
        this.links = this.rsvpData.links.filter(
            (link:any) => link.name === 'Summary');

        if (this.links.length === 0)
            this.rsvpData.links.push( {name: 'Summary', slug: '/rsvp/summary'});

        this._rsvpService.setRsvpData(this.rsvpData, true);
        this._router.navigate(['/rsvp/summary']);
    }
}