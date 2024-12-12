import mongoose, { model, Schema } from 'mongoose';

mongoose.connect('mongodb://root:example@localhost:27017')
  .then(() => console.log('MongoDB Connected!'))
  .catch((error) => console.error('MongoDB Connection Error: ', error));

// schema 정의
interface IUser {
    id: string;
    name: string;
    email: string;
}

const userSchema = new Schema<IUser>({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true }
});

export const User = model<IUser>('User', userSchema);