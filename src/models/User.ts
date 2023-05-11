export interface AuthDTO {
  photoURL?: string;
  name?: string;
  email: string;
  password?: string;
}

export interface User {
  uid: string;
  name: string;
  email: string;
  photoURL: string | null;
  createdAt?: string;
}
