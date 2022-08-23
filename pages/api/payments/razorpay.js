import Razorpay from 'razorpay';
import shortid from 'shortid';

export default async function handler(req, res){

    var instance = new Razorpay({
        key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    
    var options = {
        amount: req.body.amount * 100,  // amount in the smallest currency unit
        currency: "INR",
        receipt: shortid.generate()
    };
    instance.orders.create(options, function (err, order) {
        if(err){
            return res.json({ success: false, error: err })
        }
        res.json({ success: true, id: order.id, amount: order.amount });
    });
    
}