import {WeddingCollection} from "../../../both/collections/wedding.collection";
import {check} from "meteor/check";
import {Meteor} from "meteor/meteor";
import {Random} from "meteor/random";

Meteor.methods({

    updateWedding: (weddingId:string, weddingData:object) => {
        WeddingCollection.collection.update(weddingId, {$set: weddingData});
    },

    updateItem: (weddingId: string, type: string, item: any) => {
        switch (type) {
            case 'Guest':
                WeddingCollection.collection.update({
                    _id: weddingId,
                    "guests._id": item._id
                }, {$set: {"guests.$": item}});
                break;
            case 'Table':
                WeddingCollection.collection.update({
                    _id: weddingId,
                    "tables._id": item._id
                }, {$set: {"tables.$": item}});
                break;
            case 'Meal':
                WeddingCollection.collection.update({
                    _id: weddingId,
                    "meals._id": item._id
                }, {$set: {"meals.$": item}});
                break;
            case 'Venue':
                WeddingCollection.collection.update({
                    _id: weddingId,
                    "venues._id": item._id
                }, {$set: {"venues.$": item}});
                break;
            case 'Announcements':
                WeddingCollection.collection.update({
                    _id: weddingId,
                    "venues._id": item._id
                }, {$set: {"venues.$": item}});
                break;
            default:
                console.error("E03-Type not valid. Cannot edit document");
        }
    },

    addItem: (weddingId: string, type: string, items: object[]) => {

        items.forEach((item?: any) => {
            item._id = Random.id();
            console.log('NEW ITEM ID', item._id);
        });

        switch (type) {
            case 'Guest':
                items.forEach( (item?: any) => {
                    WeddingCollection.collection.update({_id: weddingId}, {$push: {"guests": item}});
                });
                break;
            case 'Table':
                items.forEach( (item?: any) => {
                    WeddingCollection.collection.update({_id: weddingId}, {$push: {"tables": item}});
                });
                break;
            case 'Meal':
                items.forEach( (item?: any) => {
                    WeddingCollection.collection.update({_id: weddingId}, {$push: {"meals": item}});
                });
                break;
            case 'Venue':
                items.forEach( (item?: any) => {
                    WeddingCollection.collection.update({_id: weddingId}, {$push: {"venues": item}});
                });
                break;
            case 'Announcement':
                items.forEach( (item?: any) => {
                    WeddingCollection.collection.update({_id: weddingId}, {$push: {"announcements": item}});
                });
                break;
            default:
                console.error("E01 -", type, "is not a valid wedding item.");
        }
    },

    deleteItem: (weddingId: string, type: string, item: any) => {
        console.log(weddingId, type, item);
        switch (type) {
            case 'Guest':
                WeddingCollection.collection.update({
                    _id: weddingId,
                    "guests._id": item._id
                }, {$pull: {"guests": {'_id': item._id}}});
                break;
            case 'Table':
                WeddingCollection.collection.update({
                    _id: weddingId,
                    "tables._id": item._id
                }, {$pull: {"tables": {'_id': item._id}}});                break;
            case 'Meal':
                WeddingCollection.collection.update({
                    _id: weddingId,
                    "meals._id": item._id
                }, {$pull: {"meals": {'_id': item._id}}});
                break;
            case 'Venue':
                WeddingCollection.collection.update({
                    _id: weddingId,
                    "venues._id": item._id
                }, {$pull: {"venues": {'_id': item._id}}});                break;
            case 'Announcements':
                WeddingCollection.collection.update({
                    _id: weddingId,
                    "announcements._id": item._id
                }, {$pull: {"announcements": {'_id': item._id}}});                break;
            default:
                console.error("E03-Type not valid. Cannot edit document");
        }
    },

    testMethods: (testMessage: string) => {
        console.log(testMessage);
    },

    getServerTime: () => {
        return (new Date);
    }
});