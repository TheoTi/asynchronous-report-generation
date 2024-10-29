import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { s3Client } from '../clients/s3Client';

interface IGetPresignedURLParams {
	bucket: string;
	fileKey: string;
}

export async function getPresignedURL({
	bucket,
	fileKey,
}: IGetPresignedURLParams) {
	const command = new GetObjectCommand({
		Bucket: bucket,
		Key: fileKey,
	});

	const url = await getSignedUrl(s3Client, command, {
		expiresIn: 24 * 60 * 60,
	});

	return url;
}
