import { defineBackend } from '@aws-amplify/backend';
import { Stream } from 'aws-cdk-lib/aws-kinesis';
import { StartingPosition } from 'aws-cdk-lib/aws-lambda';
import { DynamoEventSource, KinesisEventSource } from 'aws-cdk-lib/aws-lambda-event-sources';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { myKinesisFunction } from './functions/kinesis-function/resource';
import { myDynamoDBFunction } from './functions/dynamodb-function/resource';

const backend = defineBackend({
    auth,
    data,
    myKinesisFunction,
    myDynamoDBFunction
});

const kinesisStack = backend.createStack('kinesis-stack');

const kinesisStream = new Stream(kinesisStack, 'KinesisStream', {
    streamName: 'myKinesisStream',
    shardCount: 1
});

const kinesisEventSource = new KinesisEventSource(kinesisStream, {
    startingPosition: StartingPosition.LATEST,
    reportBatchItemFailures: true
});

backend.myKinesisFunction.resources.lambda.addEventSource(kinesisEventSource);

const eventSource = new DynamoEventSource(backend.data.resources.tables["Todo"], {
    startingPosition: StartingPosition.LATEST,
});

backend.myDynamoDBFunction.resources.lambda.addEventSource(eventSource);
