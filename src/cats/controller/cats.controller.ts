import {Body, Controller, Get, Param, Post} from "@nestjs/common";
import {CatsRepository} from "../repository/cats.repository";
import {Cat} from "../schemas/cat.schema";
import {CatsService} from "../service/cats.service";

@Controller('cats')
export class CatsController {
    constructor(
        private readonly catsService: CatsService,
        private readonly catsRepository: CatsRepository) {
    }

    @Get(':catName')
    async getCat(@Param('catName') catName: string): Promise<Cat> {
        return this.catsService.findByName(catName);
    }

    @Post()
    async createCat(@Body() cat: Cat): Promise<Cat> {
        console.log("createCat");
        console.log(cat);
        return this.catsRepository.create(cat);
    }
}
