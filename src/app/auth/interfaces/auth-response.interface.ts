export interface AuthResponse {
    ok: boolean;
    uid: string;
    name: string;
    token: string;
    role: string;
    email: string;
}