import { getCssText } from '@/styles/theme';
import { Html, Head, Main, NextScript } from 'next/document';

// Esse é o componente responsavel por fazer mudancas no html root do nosso app

export default function Document() {
	return (
		<Html lang="pt-br">
			<Head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="anonymous"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
					rel="stylesheet"
				/>
				{/* Aqui fazemos com que nosso CSS seja renderizado no servidor Node que roda por tras do Next  */}
				<style
					id="stitches"
					dangerouslySetInnerHTML={{ __html: getCssText() }}
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
