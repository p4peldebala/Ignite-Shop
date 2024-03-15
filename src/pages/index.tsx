import { styled, theme } from '@/styles/theme';
import {
	HomeContainer,
	ProductCard,
	ProductCardFooter,
} from '@/styles/pages/home';
import Image from 'next/image';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

import Link from 'next/link';

import Head from 'next/head';

import { GetStaticProps } from 'next';
import { stripe } from '@/lib/stripe';
import Stripe from 'stripe';

interface ProductProps {
	id: string;
	name: string;
	imgUrl: string;
	price: number | string;
}
interface HomeProps {
	products: ProductProps[];
}

export default function Home({ products }: HomeProps) {
	const [slideRef] = useKeenSlider({
		slides: {
			perView: 3,
			spacing: 48,
		},
	});

	return (
		<>
			<Head>
				<title>Home | Ignite Shop</title>
				<link rel="icon" href="/logo.svg" />
				<meta
					name="description"
					content="Um web commerce de camisas"
				/>
				<meta name="author" content="Diogo Edurado" />
			</Head>

			<HomeContainer ref={slideRef} className="keen-slider">
				{products &&
					products.map((product) => {
						return (
							// Fazemos o roteamento com a tag Link que impede o recarregamento desnecessario de alguns componentes estaticos
							// Prefetch = sao requisicoes previas para o carregamento da pagina contida no Link
							<Link
								href={`/product/${product.id}`}
								key={product.id}
								prefetch={false}
							>
								<ProductCard className="keen-slider__slide">
									<Image
										src={product.imgUrl}
										alt="camiseta 2"
										width={520}
										height={450}
										priority={true}
									/>
									<ProductCardFooter>
										<strong>{product.name}</strong>
										<span>{product.price}</span>
									</ProductCardFooter>
								</ProductCard>
							</Link>
						);
					})}
			</HomeContainer>
		</>
	);
}

// Fazendo com que fetchs iniciais usando useEffect sejam renderizando do lado do servidor

export const getStaticProps: GetStaticProps<any, {}> = async () => {
	// Fazendo um relacionamento para resgatar o preço do produto
	const response = await stripe.products.list({
		expand: ['data.default_price'],
	});

	const products = response.data.map((product) => {
		const price = product.default_price as Stripe.Price;
		return {
			id: product.id,
			name: product.name,
			imgUrl: product.images[0],
			price: price.unit_amount
				? new Intl.NumberFormat('pt-br', {
						style: 'currency',
						currency: 'BRL',
				  }).format(price.unit_amount / 100)
				: 'Esgotado',
		};
	});

	return {
		props: {
			products,
		},

		// O revalidate irá fazer com que em dados segundos uma nova versao estatica da nossa pagina seja gerada

		revalidate: 60 * 60 * 2, // 2 horas
	};
};
