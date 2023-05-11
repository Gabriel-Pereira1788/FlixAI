import {User} from '../src/models/User';

export const userMock: User = {
  email: 'johndoe@gmail.com',
  name: 'John doe',
  photoURL: 'www.example.com',
  uid: '1234',
  createdAt: new Date().toISOString(),
};
