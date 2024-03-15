import { stripe } from "@/lib/stripe";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	request: NextApiRequest,
	response: NextApiResponse
) {
    
	const { priceId }  = request.body
	console.log(process.env.VERCEL_URL)
    if(request.method !== 'POST'){
        return response.status(405).json({error: 'Ação inválida, método não permitido'})
    }

    if(!priceId){
        return response.status(400).json({error: 'Produto não encontrado'})
    }

    const success_url = `${process.env.VERCEL_URL}/sucess?session_id={CHECKOUT_SESSION_ID}`
    const cancel_url = `${process.env.VERCEL_URL}/cancel`

	const checkoutSession = await stripe.checkout.sessions.create({
		success_url,
		cancel_url,
		mode: 'payment',
		line_items: [
			{
				price: priceId,
				quantity: 1,
			},
		],
	});

    console.log(checkoutSession.url)
    return response.status(201).json({
        checkoutUrl: checkoutSession.url
    })
}
