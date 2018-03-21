import {Component, Input, OnInit} from "@angular/core";
import template from "./table.html";
import style from "./table.scss";
import {WeddingService} from "../../../common/services/wedding.service";
import {ModalService} from "../../services/modals.service";
import {Observable} from "rxjs/Observable";

declare let $: any;

@Component({
    selector: "table-card",
    host: {
        class: 'table',
    },
    template,
    styles: [style],
})

export class admin_TableComponent implements OnInit {
    @Input() table: any;
    @Input() guests: any;
    @Input() meals: any;
    @Input() index: any;

    tableCount: number;
    slots: any;
    tablePercent: number;

    constructor(private _weddingService: WeddingService) {

    }

    ngOnInit() {
        this.tableCount = this.table.guests ? this.table.guests.length : 0;
        this.slots = Observable.range(0, this.tableCount).toArray();
        this.tablePercent = 100*(this.tableCount/this.table.seats);

        $('.activitiesToggle').popup({
            inline: true,
            on: 'click'
        });

        $('.label').popup();

        this.getGuests();
    }

    getGuests() {
        this.guests = this.guests.filter(guest => this.table.guests.indexOf(guest._id) > -1);
    }


    getColor(guest, key) {
        //TODO these color values should be stored as a value of the "tag" when tag functionality it working
        let item = guest[key];

        switch (key) {
            case 'attending':
                if (!guest.completed) {
                    return 'gray';
                }
                switch(item) {
                    case true: return 'green';
                    default: return 'red';
                }
            case 'relation':
                switch(item) {
                    case 'Friend': return 'teal';
                    case 'Family': return 'purple';
                    default: return 'blue';
                }
            case 'party':
                switch(item) {
                    case 'Bride': return 'pink';
                    case 'Groom': return 'blue';
                    default: return 'purple';
                }
            case 'meal':
                let result = this.meals.filter(m => m.name === item);
                if (result.length > 0) {
                    return result[0].color;
                }
                break;
        }

    }
}