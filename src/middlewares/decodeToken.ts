export interface IDecodeToken {
    id: number;
    iss?: string;
    aud?: string | string[];
    exp?: number;
    nbf?: number;
    iat?: number;
    jti?: string;
}
