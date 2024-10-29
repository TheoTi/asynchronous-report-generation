import { Resend } from 'resend';

const resend = new Resend();

interface ISendEmailParams {
	from: string;
	to: string[];
	subject: string;
	text: string;
	html: string;
}

export async function sendEmail({
	from,
	html,
	subject,
	text,
	to,
}: ISendEmailParams) {
	await resend.emails.send({
		from,
		to,
		subject,
		text,
		html,
	});
}
