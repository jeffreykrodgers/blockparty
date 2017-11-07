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

    public updateWedding(id: string, obj: object) {
        console.log("DB Call:", id, obj);
        Meteor.call('updateItem', id, 'Guest', obj);
    }

    public deleteItem(type: string, obj:any) {
        Meteor.call( 'deleteItem', this.weddingId, type, obj)
    }
}