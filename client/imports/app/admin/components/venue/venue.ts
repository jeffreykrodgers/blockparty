import {Component, Input, OnInit} from "@angular/core";
import template from "./venue.html";
import style from "./venue.scss";

import * as moment from 'moment';
import {ModalService} from "../../views/modals/modals.service";
import {WeddingService} from "../../../services/wedding.service";
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
    startTime: any;
    endTime: any;

    constructor(private _modalService: ModalService,
                private _weddingService: WeddingService) {

        this.moment = moment;
    }

    ngOnInit() {
        this.startTime = moment(this.venue.start_time).format('h:mm a');
        this.endTime = moment(this.venue.end_time).format('h:mm a');

        $('.activitiesToggle')
            .popup({
                inline: true,
                on: 'click'
            });
    }

}