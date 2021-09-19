import React from "react"
import { useLoginMutationMutation } from "../../../generated/graphql"
const Login = () => {
    const [login, { data, loading, error }] = useLoginMutationMutation()

    const onSubmit = async () => {
        const result = await login({
            variables: {
                loginEmail: "asd@sada.com",
                loginPassword: "asdfgh",
                loginPasswordConfirm: "asdfgh",
            },
        })
        console.log(result.data?.login)
    }

    return (
        <div>
            <p>Login</p>
            <p onClick={onSubmit}>Click me to login</p>
        </div>
    )
}

export default Login
