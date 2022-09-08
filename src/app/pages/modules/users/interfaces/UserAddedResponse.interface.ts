export interface UserAddedResponse {
  ok: boolean;
  msg: string;
  usuario: AddedUser;
}

export interface AddedUser {
  _id: string;
  name: string;
  role: string;
  email: string;
  token: string;
}
