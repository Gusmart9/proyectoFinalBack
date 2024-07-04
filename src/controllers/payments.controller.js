import Stripe from 'stripe'
import dotenv from 'dotenv'

dotenv.config()

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY)

export const createSession = async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        line_items:[
            {
                price_data: {
                    product_data: {
                        name: 'nombre del producto',
                        description: 'descripcion del producto'
                    },
                    currency: 'usd',
                    unit_amount: 500
                },
                quantity: 2,
            }
        ],
        mode: 'payment',
        success_url: 'http://localhost:8080/payments/success',
        cancel_url: 'http://localhost:8080/payments/cancel'
    })
    return res.json(session)
}

export const success = async (req, res) => {
    
    res.render('paymentSuccess')
}

export const cancel = async (req, res) => {
    res.render('paymentCancel')
}