import { Injectable } from '@angular/core';
import { ObservableCursor } from "meteor-rxjs";
import { WeddingDB } from "../../../../../both/models/wedding.model";
import { WeddingCollection } from "../../../../../both/collections/wedding.collection";

@Injectable()
export class WeddingService {
    private data: ObservableCursor<WeddingDB>;
    weddingId: string;

    constructor() {

    }

    public getWedding(reqObj: any): ObservableCursor<WeddingDB> {

        //TODO fetch wedding by url instead of hardcode
        if (!reqObj._id) {
            reqObj._id = "FKm7S7p8FhpdgyeE3";
        }

        this.weddingId = reqObj._id;

        this.data = WeddingCollection.find(reqObj);
        return this.data;
    }

    public static addWeddingItem(id, obj, type) {
        Meteor.call('addItem', id, type, obj);
    };

    public static updateWeddingItem(id: string, obj: object, type: string) {
        Meteor.call('updateItem', id, type, obj);
    }

    public deleteWeddingItem(type: string, obj:any) {
        Meteor.call( 'deleteItem', this.weddingId, type, obj)
    }
}