import { styled } from "../theme";

export const SucessContainer = styled('main',{
    display: 'flex', 
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto',
    height: 656,

    h1:{
        fontSize: '$2xl', 
        color: "$gray100"
    },

    p:{
        fontSize: '$xl', 
        color: "$gray300",
        maxWidth: 560,
        textAlign: "center", 
        lineHeight: 1.4
    },

    a:{
        color: "$green500",
        fontSize: "$lg",
        textDecoration: 'none',
        marginTop: '5rem',
        display: "block",
        fontWeight: "bold",

        '&:hover':{
            color: "$green300",
        }
    }
})
export const SucessImageContainer = styled('main',{
    width:'100%',
    maxWidth: 180,
    height: 205,
    background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
    borderRadius: 8,
    padding: '0.25rem',
    marginTop: '4rem',
    marginBottom: '2rem',
    display: 'flex', 
    alignItems: 'center',
    justifyContent: 'center',

    img: {
        objectFit: 'cover'
    },

})