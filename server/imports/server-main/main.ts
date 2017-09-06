import {DemoCollection} from "../../../both/collections/demo.collection";
import {Demo} from "../../../both/models/demo.model";
import {WeddingCollection} from "../../../both/collections/wedding.collection";
import {WeddingDB} from "../../../both/models/wedding.model";

export class Main {
    start(): void {
        // this.initFakeData();
        this.insertDemoWedding();
    }

    insertDemoWedding(): void {
        if (WeddingCollection.find({}).cursor.count() === 0) {
            const data: WeddingDB[] = [{
                date: 'test',
                theme: 'default',
                spouses: [{
                    first_name: 'Jeff',
                    last_name: 'Rodgers',
                    title: 'Groom',
                    email: 'jeffrey.rodgers@outlook.com',
                    password: 'testpass',
                    services: []
                }],
                venues: [],
                meals: [],
                announcements: [],
                guests: [{
                    guest_name: 'Keith Shingleton',
                    group: false,
                    group_name: '',
                    meal: '',
                    reminder: [],
                    additions: {
                        count: 1,
                        details: []
                    },
                }]
            }];
            data.forEach((obj: WeddingDB) => {
                WeddingCollection.insert(obj);
            })
        }
    }

    initFakeData(): void {
        if (DemoCollection.find({}).cursor.count() === 0) {
            const data: Demo[] = [{
                name: "Dotan",
                age: 25
            }, {
                name: "Liran",
                age: 26
            }, {
                name: "Uri",
                age: 30
            }];
            data.forEach((obj: Demo) => {
                DemoCollection.insert(obj);
            });
        }
    }
}
