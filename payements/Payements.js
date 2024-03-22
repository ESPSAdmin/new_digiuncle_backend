
require('dotenv').config()

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

const PaymentService = async (req,res) => {
    const data= req.body;
    console.log(data)

    const lineItems = data?.map((item) => ({
        price_data: {
            currency: 'inr',
            product_data: {
                name: item?.product_name,
                images:[item?.product_image]
            },
            unit_amount: Math.round(item?.product_price * 100)
        },
        quantity: item.product_qty,
    }));

    try {
        const session = await stripe.checkout.sessions.create({
            line_items: lineItems,
            payment_method_types: ["card"],
            mode: "payment",
            success_url: "http://localhost:3000/success",
            cancel_url: "http://localhost:3000/cancel"
        });

        console.log(session.id)
        return res.status(200).json({
            sessionId:session.id
        })
    } catch (error) {
        console.error("Error making payment:", error);
        return res.status(500).json({
            message:"internal server error"
        })
    }
}


module.exports = PaymentService