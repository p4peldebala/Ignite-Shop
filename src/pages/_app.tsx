import '@/styles/globals.css';
import { globalStyles } from '@/styles/global';
import type { AppProps } from 'next/app';
import { Container, Header } from '@/styles/pages/app';
import logoImg from '../assets/logo.svg'
import Image from 'next/image';

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
		<Container className='min-h-screen'>
      <Header>
        <Image src={logoImg} alt=''></Image>
      </Header>
			<Component {...pageProps} />
		</Container>
  );
}
