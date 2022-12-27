import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {FilterQuery, Model} from "mongoose";

import {Cat, CatDocument} from "../schemas/cat.schema";

@Injectable()
export class CatsRepository {
    constructor(@InjectModel(Cat.name) private catDocumentModel: Model<CatDocument>) {}

    async findOne(catFilterQuery: FilterQuery<Cat>): Promise<Cat> {
        return this.catDocumentModel.findOne(catFilterQuery);
    }

    async find(catFilterQuery: FilterQuery<Cat>): Promise<Cat[]> {
        //WRITE SOME function
        //not getting copilot

        return this.catDocumentModel.find(catFilterQuery);
    }

    async create(cat: Cat): Promise<Cat> {
        const newCat = new this.catDocumentModel(cat);
        return newCat.save();
    }

    async findOneAndUpdate(catFilterQuery: FilterQuery<Cat>, cat: Partial<Cat>): Promise<Cat> {
        return  this.catDocumentModel.findOneAndUpdate(catFilterQuery, cat);
    }
}
