import {DemoCollection} from "../../../both/collections/demo.collection";
import {Demo} from "../../../both/models/demo.model";
import {WeddingCollection} from "../../../both/collections/wedding.collection";
import {WeddingDB} from "../../../both/models/wedding.model";

import { Random } from 'meteor/random';

export class Main {
    start(): void {
        console.log(Random.id());
        this.insertDemoWedding();
    }

    insertDemoWedding(): void {
        if (WeddingCollection.find({}).cursor.count() === 0) {
            const data: WeddingDB[] = [{
                date: '2018-06-24T09:00:00+05:00',
                theme: 'default',
                spouses: [{
                        _id: Random.id(),
                        first_name: 'Jeff',
                        last_name: 'Rodgers',
                        title: 'Groom',
                        email: 'jeffrey.rodgers@outlook.com',
                        password: 'testpass',
                        services: {}
                    },
                    {
                        _id: Random.id(),
                        first_name: 'Vina',
                        last_name: 'Cañete',
                        title: 'Bride',
                        email: 'vina.canete@gmail.com',
                        password: 'testpass',
                        services: {}
                    }],
                venues: [
                    {
                        _id: Random.id(),
                        name: 'Holy Cross Catholic Church',
                        address: '',
                        event: 'Ceremony',
                        start_time: '2018-06-24T09:00:00+05:00',
                        end_time: '2018-06-24T11:00:00+05:00'
                    },
                    {
                        _id: Random.id(),
                        name: 'Flourtown Country Club ',
                        address: '',
                        event: 'Reception',
                        start_time: '2018-06-24T12:00:00+05:00',
                        end_time: '2018-06-24T17:00:00+05:00'
                    }
                ],
                meals: [
                    {
                        _id: Random.id(),
                        name: "Chicken Dish"
                    },
                    {
                        _id: Random.id(),
                        name: "Salmon Dish"
                    },
                    {
                        _id: Random.id(),
                        name: "Vegitarian"
                    },
                ],
                announcements: [],
                guests: [
                    {
                        _id: Random.id(),
                        guest_name: 'Keith Shingleton',
                        invitation_num: '001',
                        attending: false,
                        secondary: false,
                        meal: '',
                        reminder: [],
                    },
                    {
                        _id: Random.id(),
                        guest_name: 'AJ Lando',
                        invitation_num: '001',
                        attending: false,
                        secondary: false,
                        meal: '',
                        reminder: [],
                    },
                    {
                        _id: Random.id(),
                        guest_name: 'Damien Blasko',
                        invitation_num: '002',
                        attending: false,
                        secondary: false,
                        meal: '',
                        reminder: [],
                    },
                    {
                        _id: Random.id(),
                        guest_name: 'Damiens Guest',
                        invitation_num: '002',
                        attending: false,
                        secondary: true,
                        meal: '',
                        reminder: [],
                    }
                ]
            }];
            data.forEach((obj: WeddingDB) => {
                WeddingCollection.insert(obj);
            })
        }
    }
}
