import {Component, OnInit, ViewChild} from "@angular/core";
import template from "./modals.html";
import style from "./modals.scss";
import {WeddingService} from "../../../common/services/wedding.service";
import {Observable} from "rxjs/Observable";
import {WeddingDB} from "../../../../../../both/models/wedding.model";
import {ModalService} from "./modals.service";
import {UtilityService} from "../../../common/services/utils.services";
import {Router, RouterModule, Routes} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";

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
    modalData: any;
    modalMode: string;
    guests: any;
    invitations: any;
    meals: any;
    colors: string[];

    constructor(private _weddingService: WeddingService,
                private _modalService: ModalService,
                private _utils: UtilityService,
                private router: Router) {

        this.weddingData = this._weddingService.getWedding({}).zone();
        this.modalData = {};
        this.invitations = [];
        this.activeForm = 'Guest';
        this.modalData.address = {};

        this.colors = ['teal', 'pink', 'purple', 'blue'];
    }

    ngOnInit() {
        const self = this;

        this._modalService.events$.forEach((data) => {
            if (data.data) {
                this.modalData = {...data.data};
            }
            this.modalMode = data.mode;

            switch (this.modalMode) {
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
            this.invitations = wedding[0].invitations;
            this.meals = wedding[0].meals;
        });
    };

    ngAfterViewInit() {
        $('.addButtonsToggle').popup({on: 'click'});
        $('.addToggle').popup({inline: true, on: 'hover'});
        $('#itemModal').modal();
    };

    addItem(form) {
        if (form === 'Venue') this.modalData = {address: {}};

        this.modalMode = 'Add';
        this.activeForm = form;
        this.showModal(this.itemModal);

        $('.addButtonsToggle').popup('hide');
    };

    buttonText(): string {
        return this.modalMode === 'Edit' ? 'Save' : this.modalMode;
    };

    checkForGen(e) {
        e.stopPropagation();
        if (e.target.value === 'generateInvite') this.generateInvite();
    };

    clearModalData() {
        this.modalData = this.activeForm === 'Venue'
            ? this.modalData = {address: {}} : this.modalData = {};
    };

    closeModal(modal) {
        modal.hide();
        this.clearModalData();
        $('#modalForm').form('clear');
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
        let url = slug === 'tables' ? `/admin/guests` : `/admin/${slug}`;

        Meteor.call(methodName,
            this.weddingId,
            this.activeForm,
            [this.modalData],
        );

        this.router.navigate([url]);
        $('#modalForm').form('clear');

        if (this.modalMode === 'Edit') {
            this.closeModal(modal);
        }
        ;
        //     if (this.addingMultiple) {
        //         $('#modalForm').form('clear');
        //     } else {
        //         this.router.navigate([url]);
        //         this.closeModal(modal);
        //     }
    }
}