import { stripe } from "@/lib/stripe";
import { SucessContainer, SucessImageContainer } from "@/styles/pages/sucess";
import { GetServerSideProps } from "next";
import { redirect } from "next/dist/server/api-utils";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";

interface ProductDetailsProps{
    customerName: string
    product: {
        name: string,
        imgUrl: string
    }
}

export default function Sucess({customerName, product}:ProductDetailsProps){
    return (
		<>
			<Head>
				<title>Compra efetuada | Ignite Shop</title>
                {/* Fazendo com que os robos de busca dos navegadores nao indexem essa pagina ao pesquisar */}
				<meta name="robots" content="noindex"/>
				
			</Head>
			<SucessContainer>
				<h1>Compra efetuada!</h1>

				<SucessImageContainer>
					<Image
						src={product.imgUrl}
						alt=""
						width={150}
						height={200}
					/>
				</SucessImageContainer>

				<p>
					Uhuul <strong>{customerName}</strong>, sua Camiseta{' '}
					<strong>{product.name}</strong> já está a caminho da sua
					casa.{' '}
				</p>

				<Link href={''}>Voltar ao catálogo</Link>
			</SucessContainer>
		</>
	);
}

export const getServerSideProps:GetServerSideProps = async({query}) =>{
    if(!query.session_id){
        return {
            redirect: {
                destination:'/',
                permanent: false
            }
        }
    }
    const sessionId = String(query.session_id) // Forçando uma string

    // Redirecionando o usuario caso nao tenha um sessionId


    const sessionReponse = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['line_items', 'line_items.data.price.product']
    })
    
    const customerName = sessionReponse.customer_details.name;
    const product = sessionReponse.line_items?.data[0].price?.product as Stripe.Product


    return { props: {
        customerName,
        product: {
            name: product.name,
            imgUrl: product.images[0]
        }
    } };
  }

