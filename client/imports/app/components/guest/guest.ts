import { Component, OnInit, Input } from "@angular/core";
import template from "./guest.html";
import style from "../../style/themes/default/guest.scss";
import {RsvpService} from "../../services/rsvp.service";
import {Observable} from "rxjs/Observable";

@Component({
    selector: "guest",
    template,
    styles: [ style ],
})

export class GuestComponent implements OnInit {
    @Input() currentComponent;
    rsvpData: Observable<any>;

    constructor(private _rsvpService: RsvpService) {
        this._rsvpService.getRsvpData().subscribe(rsvp => this.rsvpData = rsvp);
    }

    ngOnInit() {

    }

    setGuests() {

    }
}