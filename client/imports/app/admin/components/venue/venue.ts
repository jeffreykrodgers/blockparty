import {Component, Input, OnInit} from "@angular/core";
import template from "./venue.html";
import style from "./venue.scss";

import * as moment from 'moment';
import {ModalService} from "../../services/modals.service";
import {WeddingService} from "../../../common/services/wedding.service";
import {WeddingDB} from "../../../../../../both/models/wedding.model";
import {Observable} from "rxjs/Observable";

declare let $: any;

@Component({
    selector: "venue-card",
    host: {
        class: 'venue card',
    },
    template,
    styles: [style],
})

export class admin_VenueComponent implements OnInit {
    @Input() venue: any;

    weddingData: Observable<WeddingDB[]>;
    moment: any;
    start_time: any;
    end_time: any;
    upload: any;

    constructor(private _weddingService: WeddingService) {
        this.weddingData = this._weddingService.getWedding({}).zone();
        this.moment = moment;
    }

    ngOnInit() {
        if (this.venue.image) {
            this.weddingData.subscribe(wedding => {
                let uploads = wedding[0].uploads.filter((upload) => upload._id === this.venue.image);

                this.upload = uploads[0];
            });
        }

        // this.start_time = moment(this.venue.start_time).format('h:mm a');
        // this.end_time = moment(this.venue.end_time).format('h:mm a');

        $('.activitiesToggle')
            .popup({
                inline: true,
                on: 'click'
            });
    }

}