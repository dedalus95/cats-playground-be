import {Schema, SchemaFactory} from "@nestjs/mongoose";
import {Prop} from "@nestjs/mongoose";

export type UserDocument = User & Document;

@Schema()
export class User {

    @Prop()
    _id: string;

    @Prop()
    name: string;

    @Prop()
    email: string

    @Prop()
    password: string
}

export const UserSchema = SchemaFactory.createForClass(User);
