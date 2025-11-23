import MainContainer from '@/app/components/structure/MainContainer';
import FormRegistro from './form/FormRegistro';
import MainTitle from '@/app/components/structure/MainTitle';

export default function Registro() {
    return (
        <MainContainer>
            <MainTitle title="Registro" />
            <FormRegistro />
        </MainContainer>
    );
};
