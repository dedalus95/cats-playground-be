import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {FilterQuery, Model} from "mongoose";
import {RefreshToken, RefreshTokenDocument} from "../entities/refreshToken";

@Injectable()
export class RefreshTokenRepository {

    constructor(@InjectModel(RefreshToken.name) private refreshTokenDocumentModel: Model<RefreshTokenDocument>) {}

    async save(refreshToken: RefreshToken): Promise<RefreshToken> {
        const newRefreshToken = new this.refreshTokenDocumentModel(refreshToken);
        return newRefreshToken.save();
    }

    async delete(refreshTokenFilterQuery: FilterQuery<RefreshToken>) {
        return this.refreshTokenDocumentModel.deleteOne(refreshTokenFilterQuery);
    }

    async findOne(refreshTokenFilterQuery: FilterQuery<RefreshToken>): Promise<RefreshToken> {
        return this.refreshTokenDocumentModel.findOne(refreshTokenFilterQuery);
    }
}
