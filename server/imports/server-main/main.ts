import {WeddingCollection} from "../../../both/collections/wedding.collection";
import {WeddingDB} from "../../../both/models/wedding.model";

import "../meteor/methods";
import "../meteor/startup";

import { Random } from 'meteor/random';

export class Main {
    start(): void {
        this.insertDemoWedding();
    }

    insertDemoWedding(): void {
        if (WeddingCollection.find({}).cursor.count() === 0) {
            const data: WeddingDB[] = [{
                _id: "FKm7S7p8FhpdgyeE3",
                date: '2018-06-24T23:00:00+05:00',
                theme: 'default',
                spouses: [
                    {
                        _id: Random.id(),
                        first_name: 'Vina',
                        last_name: 'Cañete',
                        title: 'Bride',
                        email: 'vina.canete@gmail.com',
                        password: 'testpass',
                        services: {}
                    },
                    {
                        _id: Random.id(),
                        first_name: 'Jeff',
                        last_name: 'Rodgers',
                        title: 'Groom',
                        email: 'jeffrey.rodgers@outlook.com',
                        password: 'testpass',
                        services: {}
                    },
                ],
                venues: [],
                meals: [],
                announcements: [],
                guests: [],
                tables: []
            }];
            data.forEach((obj: WeddingDB) => {
                WeddingCollection.insert(obj);
            })
        }
    }
}
