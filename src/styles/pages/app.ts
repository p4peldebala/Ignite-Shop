import { styled } from "../theme";

export const Container = styled('section', {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', 
    minHeight: '100vh',
    justifyContent: "center"
})

export const Header = styled('header', {
    padding: '2rem 0',
    width: '100%',
    maxWidth: 1180,
    marginLeft: '0 auto'
})