import {Component, OnInit} from "@angular/core";
import template from "./modals.html";
import style from "./modals.scss";
import {WeddingService} from "../../../services/wedding.service";
import {Observable} from "rxjs/Observable";
import {WeddingDB} from "../../../../../../both/models/wedding.model";

declare let jquery: any;
declare let $: any;

@Component({
    selector: "modals",
    host: {
        class: 'modals',
    },
    template,
    styles: [style]
})

export class ModalsView implements OnInit {
    weddingData: Observable<WeddingDB[]>;
    weddingId: any;
    activeForm: string;
    modalData: any;
    guests: any;
    addingMultiple: boolean;

    constructor(private _weddingService: WeddingService) {
        this.weddingData = this._weddingService.getWedding({}).zone();
        this.modalData = {};
        this.activeForm = 'guest';
        this.modalData.address = {};
    }

    ngOnInit() {
        this.weddingData.subscribe(wedding => {
            this.weddingId = wedding[0]._id;
            this.guests = wedding[0].guests;
        });

        $('.addButtonsToggle').popup({
            on: 'click',
            hideOnScroll: true,
        });

        $('.addToggle')
            .popup({
                inline: true,
                on: 'hover'
            });
    };

    // setForm(form) {
    //     this.activeForm = form;
    // }

    addItem(modal, form) {
        modal.show({inverted: true});
        this.activeForm = form;
        $('.addButtonsToggle').popup('hide');
    };

    editItem(item) {

    };

    removeItem(item) {

    };

    cancelModal(modal) {
        console.log("Clearing Form");
        this.modalData = {};
        $('#modalForm').form('clear');
        modal.hide();
    }

    submitModal(modal) {

        let item = {};
        switch (this.activeForm) {
            case 'Guest':
                item = {
                    name: this.modalData.name,
                    invitation_num: this.modalData.invitation_num,
                    relation: this.modalData.relation,
                    party: this.modalData.party
                };
                break;
            case 'Table':
                item = {
                    number: 2,
                    notes: this.modalData.notes,
                    seats: this.modalData.seats,
                    guests: this.modalData.guests,
                };
                break;
            case 'Venue':
                item = {
                    name: this.modalData.name,
                    address: this.modalData.address,
                    event: this.modalData.event,
                    start_time: this.modalData.startTime,
                    end_time: this.modalData.endTime,
                };
                break;
            case 'Meal':
                item = {
                    name: this.modalData.name,
                    notes: this.modalData.notes,
                };
                break;
            case 'Announcement':
                item = {
                    date: this.modalData.date,
                    title: this.modalData.title,
                    announcements: this.modalData.announcement
                };
                break;
            default:
                console.error("E02-Not a valid form");
        }

        Meteor.call('addItem', this.weddingId, [item], this.activeForm);

        if (!this.addingMultiple) {
            this.cancelModal(modal);
        }

        // $('#modalForm').form('reset');

    }
}