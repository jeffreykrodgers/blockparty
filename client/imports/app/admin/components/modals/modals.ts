import {Component, OnInit, ViewChild} from "@angular/core";
import template from "./modals.html";
import style from "./modals.scss";
import {WeddingService} from "../../../common/services/wedding.service";
import {Observable} from "rxjs/Observable";
import {WeddingDB} from "../../../../../../both/models/wedding.model";
import {ModalService} from "../../services/modals.service";
import {UtilityService} from "../../../common/services/utils.services";
import {Router, RouterModule, Routes} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {Subject} from "rxjs/Subject";

declare let $: any;

@Component({
    selector: "modals",
    host: {
        class: 'modals',
    },
    template,
    styles: [style],
})

export class ModalsView implements OnInit {
    @ViewChild('itemModal') itemModal: any;

    weddingData: Observable<WeddingDB[]>;
    weddingId: any;
    activeForm: string;
    modal: Observable<any>;
    modalData: any;
    modalMode: string;
    modalMessage: any;
    guests: any;
    tables: any;
    invitations: any;
    meals: any;
    colors: string[];
    buttons: any[];

    constructor(private _weddingService: WeddingService,
                private _modalService: ModalService,
                private _utils: UtilityService,
                private router: Router) {

        this.weddingData = this._weddingService.getWedding({}).zone();
        this.modal = this._modalService.events$;
        this.modalData = {};
        this.invitations = [];
        this.modalMessage = false;
        this.activeForm = 'Guest';
        this.modalData.address = {};

        this.colors = ['teal', 'pink', 'purple', 'blue'];
    }

    ngOnInit() {
        const self = this;

        this.modal.subscribe((data) => {
            // console.log('Event Trigger Received, executing:', data);
            if (data.data) {
                this.modalData = {...data.data};
            }

            // console.log("Am I doing anything?");

            switch (data.mode) {
                case 'Edit':
                    self.editItem(data.form);
                    break;
                case 'Add':
                default:
                    // console.log('Adding Item');
                    self.addItem(data.form);
                    break;
            }
        });

        this.weddingData.subscribe(wedding => {
            this.weddingId = wedding[0]._id;
            this.guests = wedding[0].guests;
            this.tables = wedding[0].tables;
            this.invitations = wedding[0].invitations;
            this.meals = wedding[0].meals;
        });

        this.buttons = [
            {
                name: 'Guest',
                icon: 'user'
            },
            {
                name: 'Table',
                icon: 'users'
            },
            {
                name: 'Venue',
                icon: 'marker'
            },
            {
                name: 'Meal',
                icon: 'food'
            },
        ];


    };

    ngAfterViewInit() {
        $('.addButtonsToggle').popup({on: 'click'});
        $('.addToggle').popup({inline: true, on: 'hover'});
        $('#itemModal').modal();
    };

    addItem(form) {
        if (form === 'Venue' && this.modalData === {}) this.modalData = {address: {}};
        // console.log("Add Item Triggered", this.itemModal);

        this.modalMode = 'Add';
        this.activeForm = form;
        this.showModal(this.itemModal);

        $('.addButtonsToggle').popup('hide');
    };

    buttonIcon(): string {
        switch (this.modalMode) {
            case 'Add':
                return 'plus';
            case 'Edit':
                return 'save';
        }
    };

    buttonText(): string {
        return this.modalMode === 'Edit' ? 'Save' : this.modalMode;
    };

    checkForGen(e) {
        e.stopPropagation();
        if (e.target.value === 'generateInvite') this.generateInvite();
    };

    clearModalData() {
        this.modalMessage = false;
        this.modalData = this.activeForm === 'Venue'
            ? this.modalData = {address: {}} : this.modalData = {};
        // console.log('Clearing Modal data:', this.modalMessage, this.modalData);
        $('.uidropdown').dropdown('reset');
        $('#modalForm').form('clear');
    };

    closeModal(modal) {
        modal.hide();
        this.clearModalData();
    }

    deleteItem(modal) {
        Meteor.call('editItem',
            this.weddingId,
            this.activeForm,
            [this.modalData],
        );
        this._weddingService.deleteWeddingItem(this.activeForm, this.modalData);
        this.closeModal(modal);
    }

    editItem(form) {
        this.activeForm = form;
        this.modalMode = 'Edit';
        this.showModal(this.itemModal);
    };

    generateInvite() {
        const generate = function () {
            let text = "";
            const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            for (let i = 0; i < 3; i++)
                text += possible.charAt(
                    Math.floor(Math.random() * possible.length)
                );
            return text;
        };

        let invite = generate();

        while (this.invitations && this.invitations.includes(invite)) {
            invite = generate();
        }

        Meteor.call('addItem',
            this.weddingId,
            'Invitation',
            [invite],
        );

        this.modalData.invitation_num = invite;
        $('.invites').dropdown('set selected', invite);
    };

    getUserTable(user) {
        let table = this.tables.filter((table) => {
            if (table.guests && table.guests.indexOf(user) > -1) {
                return table;
            }
        });

        if (this.tables.indexOf(table[0]) > -1) {
            return ` (Table ${this.tables.indexOf(table[0]) + 1})`;
        }
    };

    invitationGuests(invite) {
        let guests = this.guests.filter((guest) => {
            if (guest.invitation_num === invite) return guest.name;
        });

        let list = guests.map(guest => ` ${guest.name}`);
        if (list.length > 0) return ` - ${list}`;
    }

    showModal(modal) {
        $('.activitiesToggle').popup('hide');
        modal.show({
            inverted: true,
            observeChanges: true,
            onVisible: () => {
                $('.calendar').calendar();
                $('.uidropdown').dropdown();
                $('.checkbox').checkbox();
            }
        });
    }

    submitModal(modal) {
        let methodName = this.modalMode === "Edit" ? "updateItem" : "addItem";
        let slug = this._utils.invertSlug(this.activeForm, true);
        let url = `/admin/${slug}`;
        let data = [this.modalData];

        if (this.activeForm === 'Table') {
            for (let guest of this.modalData.guests) {
                let table = this.tables.filter((table) => {
                    return table.guests
                        && table.guests.indexOf(guest) > -1
                        && table._id !== this.modalData._id;
                });

                if (table[0]) {
                    let guest_index = table[0].guests.indexOf(guest);
                    table[0].guests.splice(guest_index, 1);

                    data.push(table[0]);
                }
            }
        }

        Meteor.call(methodName,
            this.weddingId,
            this.activeForm,
            data, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    this.modalMessage = {
                        color: 'green',
                        text: `Successfully added ${this.activeForm}`,
                    }

                    this.router.navigate([url]);

                    this.clearModalData();

                    if (this.modalMode === 'Edit') {
                        this.closeModal(modal);
                    }
                }
            }
        );


    }
}