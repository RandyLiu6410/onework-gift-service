import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IUser, UserRole } from 'common/user';

import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User implements IUser {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  displayName: string;

  @Prop({ required: true })
  balance: number;

  @Prop({ required: false })
  avatar: string;

  @Prop({ required: true, type: String })
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);
