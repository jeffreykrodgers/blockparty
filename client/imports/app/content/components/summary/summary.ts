import {Component, OnInit, Output, EventEmitter} from "@angular/core";
import template from "./summary.html";
import style from "../../style/themes/default/summary.scss";
import {RsvpService} from "../../services/rsvp.service";
import {Router} from "@angular/router";

@Component({
    selector: "summary",
    template,
    styles: [style],
})

export class SummaryComponent implements OnInit {
    rsvpData: any;

    constructor(private _rsvpService: RsvpService,
                private _router: Router) {}

    ngOnInit() {
        this._rsvpService.getRsvpData().subscribe((rsvp) => {
            this.rsvpData = rsvp;

            if (!this.rsvpData.invitation_num)
                this._router.navigate(['/rsvp']);
        });
    }

    finish() {
        this.rsvpData.guests.forEach((guest) => {
           guest.completed = true;
        });

        this._rsvpService.setRsvpData(this.rsvpData, true);
        this._router.navigate(['/rsvp/finished']);
    }
}