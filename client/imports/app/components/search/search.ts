import { Component, OnInit, Input } from "@angular/core";

import { GuestService } from "../../services/guest.service";

import template from "./search.html";
import style from "../../style/themes/default/search.scss";

@Component({
    selector: "search",
    template,
    styles: [ style ],
    providers: [GuestService]
})

export class SearchComponent implements OnInit {
    @Input() currentComponent;
    guestName: string;
    findGuest: any;

    constructor(private guestService:GuestService) {

        this.findGuest = () => {
            if (this.guestName) {
                this.guestService.setGuestData({guestName: this.guestName});
                this.currentComponent = 'guest';
            }
        }

    }

    ngOnInit() {

    }
}