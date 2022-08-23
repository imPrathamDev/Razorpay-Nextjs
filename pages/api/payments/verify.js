import crypto from 'crypto';
import Razorpay from 'razorpay';

export default async function handler(req, res) {
	const check = Razorpay.validateWebhookSignature(JSON.stringify(req.body), req.headers['x-razorpay-signature'], process.env.RAZORPAY_WEBHOOK_SECRET);
	if (check) {
		console.log(check);
		//save data in database and this data provide you payment status and payment details
		require('fs').writeFileSync('payment.json', JSON.stringify(req.body, null, 4))
	} else {
		console.log('Err')
	}
	res.json({ status: 'ok' })
}