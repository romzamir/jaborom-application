export default interface IAuthenticationValidator {
    verifyToken(token: string | undefined): Promise<boolean>;
}
