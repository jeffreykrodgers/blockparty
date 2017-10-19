import {WeddingCollection} from "../../../both/collections/wedding.collection";
import {check} from "meteor/check";
import {Meteor} from "meteor/meteor";
import {Random} from "meteor/random";

Meteor.methods({

    setGuests: (weddingId: string, guestData: object[]) => {
        check(weddingId, String);
        check(guestData, Array);


    },

    setMeals: (weddingId: string, mealData: object[]) => {
        check(weddingId, String);
        check(mealData, Array);

    },

    updateWedding: (weddingId:string, weddingData:object) => {
        check(weddingId, String);
        check(weddingData, Object);

        WeddingCollection.collection.update(weddingId, {$set: weddingData});
    },

    updateGuests: (weddingId: string, guestData: object[]) => {
        check(weddingId, String);
        check(guestData, Array);

        guestData.forEach((guest?: any) =>{
            WeddingCollection.collection.update({_id: weddingId, "guests._id": guest._id}, {$set: {"guests.$": guest}});
        });
    },

    addItem: (weddingId: string, items: object[], type: string) => {
        console.log("INCOMING", weddingId, items, type);
        // check([weddingId, type], String);
        // check(items, Array);

        items.forEach((item?: any) => {
            item._id = Random.id;
            console.log('NEW ITEM ID', item._id);
        });

        switch (type) {
            case 'guest':
                items.forEach( (item?: any) => {
                    WeddingCollection.collection.update({_id: weddingId}, {$push: {"guests": item}});
                });
                break;
            case 'table':
                items.forEach( (item?: any) => {
                    WeddingCollection.collection.update({_id: weddingId}, {$push: {"meals": item}});
                });
                break;
            case 'meal':
                items.forEach( (item?: any) => {
                    WeddingCollection.collection.update({_id: weddingId}, {$push: {"tables": item}});
                });
                break;
            case 'venue':
                items.forEach( (item?: any) => {
                    WeddingCollection.collection.update({_id: weddingId}, {$push: {"venues": item}});
                });
                break;
            case 'announcement':
                items.forEach( (item?: any) => {
                    WeddingCollection.collection.update({_id: weddingId}, {$push: {"announcements": item}});
                });
                break;
            default:
                console.error("E01 -", type, "is not a valid wedding item.");
        }
    },

    removeItem: (weddingId: string, guestId: string) => {
        check([weddingId, guestId], String);

        WeddingCollection.collection.update({_id: weddingId}, {$pull: {"guests.$._id": guestId}});
    },

    testMethods: (testMessage: string) => {
        console.log(testMessage);
    },

    getServerTime: () => {
        return (new Date);
    }
});