import { User } from "./User.interface";

export interface UserUpdatedResponse {
    ok: boolean;
    msg: string;
    usuario: User;
}