import IAuthenticationValidator from '../abstractions/authenticationValidator';

const authTokens: string[] = require('./authTokens.json');

export default class MockAuthenticationValidator
    implements IAuthenticationValidator
{
    verifyToken(token: string | undefined): Promise<boolean> {
        if (!token) {
            return Promise.resolve(false);
        }

        return Promise.resolve(authTokens.includes(token));
    }
}
