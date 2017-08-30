import { MongoObservable } from "meteor-rxjs";
import { WeddingDB } from "../models/wedding.model";

export const WeddingCollection = new MongoObservable.Collection<WeddingDB>("wedding-collection");
