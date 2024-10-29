import { randomUUID } from 'node:crypto';
import { faker } from '@faker-js/faker';

import { PutItemCommand } from '@aws-sdk/client-dynamodb';
import { dynamoClient } from '../../clients/dynamoClient';
import { env } from '../../config/env';
import { response } from '../../utils/response';

export async function handler() {
	const total = 1000;

	const responses = await Promise.allSettled(
		Array.from({ length: total }, async () => {
			const command = new PutItemCommand({
				TableName: env.DYNAMO_LEADS_TABLE,
				Item: {
					id: { S: randomUUID() },
					name: { S: faker.person.fullName() },
					email: { S: faker.internet.email() },
					jobTitle: { S: faker.person.jobTitle() },
				},
			});

			await dynamoClient.send(command);
		}),
	);

	const totalCreatedLeads = responses.filter(
		(result) => result.status === 'fulfilled',
	).length;

	return response(201, { totalCreatedLeads });
}
