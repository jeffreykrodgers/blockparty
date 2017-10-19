import {Component, OnInit} from "@angular/core";
import template from "./modals.html";
import style from "./modals.scss";
import {WeddingService} from "../../../services/wedding.service";
import {Observable} from "rxjs/Observable";
import {WeddingDB} from "../../../../../../both/models/wedding.model";

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

    modalData: any;

    constructor(private _weddingService: WeddingService) {
        this.weddingData = this._weddingService.getWedding({}).zone();
        this.modalData = {};
    }

    ngOnInit() {
        this.weddingData.subscribe(wedding => {
            this.weddingId = wedding[0]._id;
        });
    };

    addItem(modal) {
        modal.show({inverted: true});

    };

    editItem(item) {

    };

    removeItem(item) {

    };

    submitModal(modal) {
        const item = {
            name: this.modalData.name,
            invitation_num: this.modalData.invitation_num,
            relation: this.modalData.relation,
            party: this.modalData.party
        };
        const type = 'guest';

        console.log()

        Meteor.call('addItem', this.weddingId, [item], type);
        modal.hide();
    }
}