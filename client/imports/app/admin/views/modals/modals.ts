import {Component, OnInit, ViewChild} from "@angular/core";
import template from "./modals.html";
import style from "./modals.scss";
import {WeddingService} from "../../../services/wedding.service";
import {Observable} from "rxjs/Observable";
import {WeddingDB} from "../../../../../../both/models/wedding.model";
import {ModalService} from "./modals.service";

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
    @ViewChild('itemModal') itemModal:any;

    weddingData: Observable<WeddingDB[]>;
    weddingId: any;
    activeForm: string;
    modalData: any;
    modalMode: string;
    guests: any;
    addingMultiple: boolean;

    constructor(private _weddingService: WeddingService,
                private _modalService: ModalService) {
        this.weddingData = this._weddingService.getWedding({}).zone();
        this.modalData = {};
        this.activeForm = 'Guest';
        this.modalData.address = {};
    }

    ngOnInit() {
        const self = this;

        //Open Modal event from modal service
        this._modalService.events$.forEach((data) => {
            if (data.data) {
                this.modalData = {...data.data};
            }
            this.modalMode = data.mode;

            switch(this.modalMode) {
                case 'Edit':
                    self.editItem(data.form);
                    break;
                case 'Add':
                default:
                    self.addItem(data.form);
                    break;
            }
        });

        this.weddingData.subscribe(wedding => {
            this.weddingId = wedding[0]._id;
            this.guests = wedding[0].guests;
        });

        $('.addButtonsToggle').popup({
            on: 'click',
        });

        $('.addToggle').popup({
            inline: true,
            on: 'hover'
        });

        $('#itemModal').modal();
    };

    addItem(form) {
        if (form === 'Venue') {
            this.modalData = {address:{}}
        }

        this.modalMode = 'Add';
        this.activeForm = form;
        this.showModal(this.itemModal);

        $('.addButtonsToggle').popup('hide');
    };

    editItem(form) {
        this.activeForm = form;
        this.showModal(this.itemModal);
    };

    clearModalData() {
        if (this.activeForm === 'Venue') {
            this.modalData = {address:{}};
        } else {
            this.modalData = {};
        }
    }

    cancelModal(modal) {
        modal.hide();

        this.clearModalData();
        $('#modalForm').form('clear');
    }

    showModal(modal) {
        $('.activitiesToggle').popup('hide');
        modal.show({
            inverted: true,
            observeChanges: true,
        });
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

        switch (this.modalMode) {
            case 'Edit':
                Meteor.call('updateItem',
                    this.weddingId,
                    this.activeForm,
                    [this.modalData],
                );
                break;
            case 'Add':
            default:
                Meteor.call('addItem',
                    this.weddingId,
                    this.activeForm,
                    [item]
                );
                break;
        }


        if (!this.addingMultiple) {
            this.cancelModal(modal);
        }
    }
}