import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {sign} from "jsonwebtoken";
import {User} from "../../users/entities/user.schema";

export type RefreshTokenDocument = RefreshToken & Document;

@Schema()
export class RefreshToken {

    constructor(init?: Partial<RefreshToken>) {
        Object.assign(this, init);
    }

    @Prop()
    user: User;

    @Prop()
    userAgent: string;

    @Prop()
    ipAddress: string;

    sign(): string {
        return sign({...this}, process.env.REFRESH_SECRET, {})
    }
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);
