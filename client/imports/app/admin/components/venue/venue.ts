import {Component, Input, OnInit} from "@angular/core";
import template from "./venue.html";
import style from "./venue.scss";

import * as moment from 'moment';
import {ModalService} from "../../views/modals/modals.service";
import {WeddingService} from "../../../common/services/wedding.service";

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
    moment: any;
    start_time: any;
    end_time: any;

    constructor(private _weddingService: WeddingService) {

        this.moment = moment;
    }

    ngOnInit() {
        this.start_time = moment(this.venue.start_time).format('h:mm a');
        this.end_time = moment(this.venue.end_time).format('h:mm a');

        $('.activitiesToggle')
            .popup({
                inline: true,
                on: 'click'
            });
    }

}