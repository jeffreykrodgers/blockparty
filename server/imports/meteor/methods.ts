import {WeddingCollection} from "../../../both/collections/wedding.collection";
// import {check} from "meteor/check";
import {Meteor} from "meteor/meteor";
import {Random} from "meteor/random";
import AWS = require('aws-sdk');


Meteor.methods({

    updateWedding: (weddingId: string, weddingData: object) => {
        WeddingCollection.collection.update(weddingId, {$set: weddingData});
    },

    updateItem: (weddingId: string, type: string, items: any) => {
        items.forEach((item?: any) => {
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
                case 'Registry':
                    WeddingCollection.collection.update({
                        _id: weddingId,
                        "registries._id": item._id
                    }, {$set: {"registries.$": item}});
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
        });
    },

    addItem: (weddingId: string, type: string, items: object[]) => {

        items.forEach((item?: any) => {
            item._id = Random.id();
        });

        switch (type) {
            case 'Guest':
                items.forEach((item?: any) => {
                    WeddingCollection.collection.update({_id: weddingId}, {$push: {"guests": item}});
                });
                break;
            case 'Invitation':
                items.forEach((item?: any) => {
                    WeddingCollection.collection.update({_id: weddingId}, {
                        $push: {
                            "invitations": {
                                $each: [item],
                                $position: 0
                            }
                        }
                    });
                });
                break;
            case 'Table':
                items.forEach((item?: any) => {
                    WeddingCollection.collection.update({_id: weddingId}, {$push: {"tables": item}});
                });
                break;
            case 'Meal':
                items.forEach((item?: any) => {
                    WeddingCollection.collection.update({_id: weddingId}, {$push: {"meals": item}});
                });
                break;
            case 'Venue':
                items.forEach((item?: any) => {
                    WeddingCollection.collection.update({_id: weddingId}, {$push: {"venues": item}});
                });
                break;
            case 'Registry':
                items.forEach((item?: any) => {
                    WeddingCollection.collection.update({_id: weddingId}, {$push: {"registries": item}});
                });
                break;
            case 'Announcement':
                items.forEach((item?: any) => {
                    WeddingCollection.collection.update({_id: weddingId}, {$push: {"announcements": item}});
                });
                break;
            default:
                console.error("E01 -", type, "is not a valid wedding item.");
        }
    },

    deleteItem: (weddingId: string, type: string, item: any, cb: any) => {
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
                }, {$pull: {"tables": {'_id': item._id}}});
                break;
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
                }, {$pull: {"venues": {'_id': item._id}}});
                break;
            case 'Registry':
                WeddingCollection.collection.update({
                    _id: weddingId,
                    "registries._id": item._id
                }, {$pull: {"registries": {'_id': item._id}}});
                break;
            case 'Announcements':
                WeddingCollection.collection.update({
                    _id: weddingId,
                    "announcements._id": item._id
                }, {$pull: {"announcements": {'_id': item._id}}});
                break;
            default:
                console.error("E03-Type not valid. Cannot remove document.");
        }
    },

    getServerTime: () => {
        return (new Date);
    },

    uploadFile: (event_id: string, fileMeta: any, file:any) => {
        const s3_config = Meteor.settings.s3;
        const aws_config = Meteor.settings.aws;
        const data = new Buffer(file, 'binary');
        const fileName = fileMeta.name.replace(/[^a-z0-9.]/gi, '_').toLowerCase();
        const Future = require('fibers/future');
        const future = new Future();

        let upload = {};

        AWS.config.update(aws_config);
        const s3 = new AWS.S3({region: s3_config.region});
        const params = {
            Bucket: s3_config.bucket,
            Key: `${event_id}_${fileName}`,
            Body: data,
            ACL: 'public-read'
        };

        s3.putObject(params, Meteor.bindEnvironment((err) => {
            if (err) {console.error("Error uploading to S3:", err)} else {
                upload = {
                    _id: Random.id(),
                    path: `https://s3.amazonaws.com/eg-bp-cdn/${event_id}_${fileName}`
                };

                WeddingCollection.collection.update({_id: event_id}, {
                    $push: {
                        "uploads": upload
                    }
                });

                future.return(upload);
            }
        }));

        return future.wait();
    }
});