import { Injectable } from '@angular/core';
import { ObservableCursor } from "meteor-rxjs";
import { WeddingDB } from "../../../../both/models/wedding.model";
import { WeddingCollection } from "../../../../both/collections/wedding.collection";

@Injectable()
export class WeddingService {
    private data: ObservableCursor<WeddingDB>;

    constructor() {
        this.data = WeddingCollection.find({});
    }

    public getWedding(): ObservableCursor<WeddingDB> {
        return this.data;
    }
}