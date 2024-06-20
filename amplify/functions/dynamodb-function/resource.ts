import { defineFunction } from '@aws-amplify/backend';

export const myDynamoDBFunction = defineFunction({
    name: 'dynamodb-function'
});
