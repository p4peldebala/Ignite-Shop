import { styled } from "../theme";

export const HomeContainer = styled('main', {
	display: 'flex',
    width: '100%',
    maxWidth: 'calc(100vw - ((100vw - 1180px)/ 2))',
    marginLeft: 'auto', 
    minHeight: '656px',

});

export const ProductCard = styled('div', {
    background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
    borderRadius: 8,
    cursor: 'pointer',
    position: 'relative',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',

    img: {
        objectFit: 'cover'
    },

    '&:hover':{
        footer:{
            transform: 'translateY(0%)',
            opacity: 1,
        }
    }
})

export const ProductCardFooter = styled('footer', {
	position: 'absolute',
	bottom: '0.25rem',
	left: '0.25rem',
	right: '0.25rem',

	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	backgroundColor: 'rgba(0, 0, 0, 0.6)',
	padding: '2rem',
	borderRadius: 8,

	transform: 'translateY(110%)',
	opacity: 0,
	transition: 'all 0.2s ease-in-out',

	strong: {
		fontSize: '$xl',
		fontWeight: 'normal',
		color: '$gray100',
	},
	span: {
		color: '$green300',
		fontSize: '$lg',
		fontWeight: 'bold',
	},
});