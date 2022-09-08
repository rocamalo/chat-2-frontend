import { Group } from "./group.interface";

export interface GroupResponse {
    ok: boolean;
    groups: Group[];
}