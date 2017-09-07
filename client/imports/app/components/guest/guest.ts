import { Component, OnInit, Input } from "@angular/core";
import template from "./guest.html";
import style from "../../style/themes/default/guest.scss";
import {GuestService} from "../../services/guest.service";

@Component({
    selector: "guest",
    template,
    styles: [ style ],
    providers: [GuestService]
})

export class GuestComponent implements OnInit {
    @Input() currentComponent;
    guestData: any;

    constructor(private guestService: GuestService) {

    }

    ngOnInit() {
        this.guestData = this.guestService.getGuestData();
        console.log(this.guestData);
    }
}