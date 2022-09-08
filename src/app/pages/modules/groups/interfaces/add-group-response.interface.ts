import { Group } from "./group.interface";

export interface AddGroupResponse {
    ok: boolean;
    msg: string;
    group: Group;
}