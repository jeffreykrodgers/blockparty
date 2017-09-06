import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Subscription } from 'rxjs/Subscription';

import template from "./search.html";
import style from "../../style/themes/default/search.scss";
import {GuestService} from "../../services/guest.service";

@Component({
    selector: "search",
    host: {
      class: "search"
    },
    template,
    styles: [ style ],
})

export class SearchComponent implements OnInit {
    @Output() currentComponent: EventEmitter<string> = new EventEmitter();
    guestName: string;
    findGuest: any;

    constructor(private guestService: GuestService) {

        this.findGuest = () => {
            if (this.guestName) {
                this.guestService.setGuestData({guestName: this.guestName});
                this.currentComponent.emit('guest');
            }
        }

    }

    ngOnInit() {

    }
}