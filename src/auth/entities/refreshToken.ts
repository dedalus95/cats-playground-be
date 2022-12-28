import {Schema, SchemaFactory} from "@nestjs/mongoose";
import {sign} from "jsonwebtoken";

export type RefreshTokenDocument = RefreshToken & Document;

@Schema()
export class RefreshToken {

    constructor(init?: Partial<RefreshToken>) {
        Object.assign(this, init);
    }

    id: string;
    userId: string;
    userAgent: string;
    ipAddress: string;

    sign(): string {
        return sign({...this}, process.env.REFRESH_SECRET, {})
    }
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);
