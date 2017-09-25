import { Injectable } from '@angular/core';
import { ObservableCursor } from "meteor-rxjs";
import { WeddingDB } from "../../../../both/models/wedding.model";
import { WeddingCollection } from "../../../../both/collections/wedding.collection";

@Injectable()
export class WeddingService {
    private data: ObservableCursor<WeddingDB>;

    constructor() {

    }

    public getWedding(reqObj: any): ObservableCursor<WeddingDB> {

        //TODO fetch wedding by url instead of hardcode
        if (!reqObj._id) {
            reqObj._id = "kn9uNZazZ7uAExBAb";
        }

        this.data = WeddingCollection.find(reqObj);
        return this.data;
    }

    public setWedding(obj) {

    }
}