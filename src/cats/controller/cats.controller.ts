import {Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors} from "@nestjs/common";
import {CatsRepository} from "../repository/cats.repository";
import {Cat} from "../schemas/cat.schema";
import {CatsService} from "../service/cats.service";
import {FileInterceptor} from "@nestjs/platform-express";

@Controller('cats')
export class CatsController {
    constructor(
        private readonly catsService: CatsService,
        private readonly catsRepository: CatsRepository) {
    }

    @Get(':catName')
    async getCatByCatName(@Param('catName') catName: string): Promise<Cat> {
        return this.catsService.findByName(catName);
    }

    @Get()
    async getCats(): Promise<Cat[]> {
        return this.catsRepository.find({});
    }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async createCat(@Body() cat: Cat,
                    @UploadedFile() file: Express.Multer.File): Promise<Cat> {
        cat.image = file.buffer.toString('base64');
        return this.catsRepository.create(cat);
    }
}
