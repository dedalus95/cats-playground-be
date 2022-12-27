import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {Cat, CatSchema} from "./schemas/cat.schema";
import {CatsService} from "./service/cats.service";
import {CatsRepository} from "./repository/cats.repository";
import {CatsController} from "./controller/cats.controller";

@Module({
    imports: [MongooseModule.forFeature([
        {name : Cat.name, schema : CatSchema}
    ])],
    controllers: [CatsController],
    providers: [CatsService, CatsRepository],
})

export class CatsModule {}
