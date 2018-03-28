import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import template from "./table.html";
import style from "./table.scss";
import {WeddingService} from "../../../common/services/wedding.service";
import {Observable} from "rxjs/Observable";
import {DragulaService, Dragula} from "ng2-dragula";
import {ModalService} from "../../services/modals.service";

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
    @Input() weddingId: any;

    @Output() seatsChanged = new EventEmitter();

    tableCount: number;
    slots: any;
    tablePercent: number;
    dragulaOptions: object;
    tableGuests: any;

    constructor(private _weddingService: WeddingService,
                private _modalService: ModalService,
                private dragulaService: DragulaService) {
        this.dragulaOptions = {
            removeOnSpill: false,
            moves: function (el, container, handle) {
                return handle.classList.contains('bars');
            }
        };

        dragulaService.drop.subscribe((value) => {
            this.onDrop(value.slice(1));
        });
    }

    private onDrop(args) {
        let [e, el] = args;
        this.seatsChanged.emit();
    }

    private initMisc() {
        $('.activitiesToggle').popup({
            inline: true,
            on: 'click'
        });

        Meteor.setTimeout(() => {
            $('.label').popup();
        }, 2000);
    }

    private mapGuests() {
        // let tableGuests =
    }

    ngOnInit() {
        this.tableCount = this.table.guests ? this.table.guests.length : 0;
        this.slots = Observable.range(0, this.tableCount).toArray();
        this.tablePercent = 100*(this.tableCount/this.table.seats);
        this.initMisc();
    }

    attend(guest) {
        let guestData = this.guests.filter(g => guest === g._id);
        if (!guestData[0] || !guestData[0].completed) {
            return 'No Response';
        }
        switch(guestData[0].attending) {
            case true: return 'Attending';
            default: return 'Not Attending';
        }
    }

    getColor(guest, key) {
        let guestData = this.guests.filter(g => guest === g._id);
        if (!guestData[0]) {
            return 'gray';
        }
        //TODO these color values should be stored as a value of the "tag" when tag functionality it working
        let item = guestData[0][key];

        switch (key) {
            case 'attending':
                if (!guestData[0].completed) {
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
                return result.length > 0 ? result[0].color : 'gray';
        }

    }

    guestData(guest, key) {
        let guestData = this.guests.filter(g => guest === g._id);
        if (!guestData[0]) {
            return 'undefined';
        }
        // console.log(guestData);
        return guestData[0][key];
    }
}