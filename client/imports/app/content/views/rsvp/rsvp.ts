import { Component, OnInit } from "@angular/core";

import template from "./rsvp.html";
import style from "../../style/themes/default/rsvp.scss";
import {RsvpService} from "../../../common/services/rsvp.service";
import {Observable} from "rxjs/Observable";

@Component({
    selector: "rsvp",
    host: {
      class: "rsvp",
    },
    template,
    styles: [ style ],
})

export class RsvpView implements OnInit {
    componentData: Observable<any>;

    constructor(private _rsvpService: RsvpService) {

    };

    ngOnInit() {
        this._rsvpService.getRsvpData().subscribe((rsvp) => {
            this.componentData = rsvp.current_component;
        });
    };
}