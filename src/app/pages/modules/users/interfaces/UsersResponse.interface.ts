import { User } from "./User.interface";

export interface UsersResponse {
    ok: boolean;
    users: User[];
}