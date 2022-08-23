import crypto from 'crypto';

export default async function handler(req, res) {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
    const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    let generatedSignature = hmac.digest('hex');
    let isSignatureValid = generatedSignature == razorpay_signature;

    if (isSignatureValid) {
        // res.json({ sucess: true, razorpay_order_id, razorpay_payment_id, razorpay_signature })
        //do something
        res.redirect(307, '/success')
    } else {
        res.status(500).json({ sucess: false })
    }

}