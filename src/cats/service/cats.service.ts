import {Injectable} from "@nestjs/common";
import {Cat} from "../schemas/cat.schema";
import {CatsRepository} from "../repository/cats.repository";
import {FilterQuery} from "mongoose";

@Injectable()
export class CatsService {

    constructor(
        private readonly catsRepository: CatsRepository
    ) {
    }

    findById() {
        return undefined;
    }

    findByName(catName: string): Promise<Cat> {
        return this.catsRepository.findOne({name: catName});
    }
}
