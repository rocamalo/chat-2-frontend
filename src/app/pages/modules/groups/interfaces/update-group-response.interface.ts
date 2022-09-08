import { Group } from "./group.interface";

export interface UpdateGroupResponse {
    ok: boolean;
    msg: string;
    group: Group
}