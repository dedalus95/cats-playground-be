import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "../entities/user.schema";
import {FilterQuery, Model} from "mongoose";
import {Cat} from "../../cats/schemas/cat.schema";
import {CreateUserDto} from "../dto/create-user.dto";

@Injectable()
export class UsersRepository {

    constructor(@InjectModel(User.name) private userDocumentModel: Model<UserDocument>) {}

    async findOne(userFilterQuery: FilterQuery<User>): Promise<User> {
        return this.userDocumentModel.findOne(userFilterQuery);
    }

    async find(userFilterQuery: FilterQuery<User>): Promise<User[]> {
        return this.userDocumentModel.find(userFilterQuery);
    }

    async create(user: CreateUserDto): Promise<User> {
        const newUser = new this.userDocumentModel(user);
        return newUser.save();
    }

    async findOneAndUpdate(userFilterQuery: FilterQuery<User>, user: Partial<User>): Promise<User> {
        return  this.userDocumentModel.findOneAndUpdate(userFilterQuery, user);
    }

}
