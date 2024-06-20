import { defineAuth } from '@aws-amplify/backend';
import { preSignUp } from './pre-sign-up/resource';
import { postConfirmation } from './post-confirmation/resource';

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
    loginWith: {
        email: true
    },
    triggers: {
        preSignUp,
        postConfirmation
    },
    groups: ['EVERYONE'],
    access: (allow) => [
        allow.resource(postConfirmation).to(['addUserToGroup'])
    ]
});
