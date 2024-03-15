import { api } from '@/lib/axios';
import { stripe } from '@/lib/stripe';
import {
	ImageContainer,
	ProductContainer,
	ProductDetails,
} from '@/styles/pages/product';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Stripe from 'stripe';

interface ProductProps {
	product: {
		id: string;
		name: string;
		imgUrl: string;
		price: number | string;
		description: string;
		defaultPriceID: string
	};
}

export default function Product({ product }: ProductProps) {
	const { query, isFallback} = useRouter(); // isFallBack => Verifica se o fallback é true e a pagina está carregando o conteudo ainda
	const [isPending, setIsPeding] = useState(false);
	
	if(isFallback){
		return(
			<p>Loading...</p>
		)
	}

	const handleBuyProduct = async () => {
		
		try {
			setIsPeding(true);
			const response = await api.post('/api/checkout', {
				priceId: product.defaultPriceID,
			});

			const { checkoutUrl } = response.data;

			window.location.href = checkoutUrl; // Redirecionando o usuario para o checkout
		} catch (error) {
			setIsPeding(false);
			alert('Falha ao tentar comprar produto');
		}
	};
	
	return (
		<>
			<Head>
				<title> {product.name} | Ignite Shop</title>
				<link rel="icon" href="/logo.svg" />
				<meta name="description" content="Um web commerce de camisas" />
				<meta name="author" content="Diogo Edurado" />
			</Head>
			<ProductContainer>
				<ImageContainer>
					<Image
						src={product.imgUrl}
						alt="Imagem da camiseta"
						width={520}
						height={480}
					></Image>
				</ImageContainer>
				<ProductDetails>
					<h1>{product.name}</h1>
					<span>{product.price}</span>

					<p>{product.description}</p>

					<button disabled={isPending} onClick={handleBuyProduct}>
						Comprar
					</button>
				</ProductDetails>
			</ProductContainer>
		</>
	);
}

// Para SSG que possuem parametros devemos passar antes quais sao esses parametros, para que assim a pagina seja renderizada

export const getStaticPaths: GetStaticPaths = async () => {
	const paths = [{ params: { id: 'prod_PgSIkZvr7olGgZ' } }];

	return {
		paths,
		fallback: 'blocking', // caso true entrará em um estado de loading que pode ser resgatado com o useRouter()
	};
};




// SSG => Geracao de Site estatico:

// o GetStaticProps recebe generics do TypeScript
// 1 => a tipagem das nossas props
// 2 => o formato do nosso objeto de params

type ParamsProps = {
	id: string;
};

export const getStaticProps: GetStaticProps<any, ParamsProps> = async ({
	params,
}) => {
	const productId = params.id;

	const product = await stripe.products.retrieve(productId, {
		expand: ['default_price'],
	});

	const price = product.default_price as Stripe.Price;

	return {
		props: {
			product: {
				id: product.id,
				name: product.name,
				imgUrl: product.images[0],
				price: price.unit_amount
					? new Intl.NumberFormat('pt-br', {
							style: 'currency',
							currency: 'BRL',
					  }).format(price.unit_amount / 100)
					: 'Esgotado',
				description: product.description,
				defaultPriceID: price.id
			},
		},

		// O revalidate irá fazer com que em dados segundos uma nova versao estatica da nossa pagina seja gerada

		revalidate: 60 * 60 * 4, // 2 horas
	};
};
