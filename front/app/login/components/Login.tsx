'use client'

import MainContainer from "@/app/components/structure/MainContainer"
import MainTitle from "@/app/components/structure/MainTitle"
import FormLogin from "./form/FormLogin"

const Login = () => {
    return (
        <MainContainer>
            <MainTitle title="Hermes" />
            <FormLogin />
        </MainContainer>
    )
}

export default Login