import { Container } from '@material-ui/core';

const Wrapper = ({ children }: any) => {
    return (
        <Container component='main' maxWidth='md'>
            {children}
        </Container>
    );
};

export default Wrapper;
