import React from "react"

import { useCreateUserMutation } from "../../../../generated/graphql"

const Register = (): JSX.Element => {
    const [createUserMutation, { data, loading, error, called }] = useCreateUserMutation({
        variables: {
            email: "asda@asdas1.com",
            firstName: "asdas",
            lastName: "asdasd",
            password: "asdasdsadas",
        },
    })

    const onSubmit = async () => {
        try {
            await createUserMutation()
        } catch (error) {
            console.log(error)
        }
    }

    if (called && loading) {
        return <p>creating user!</p>
    }

    if (called && error) {
        return <p>{error.message}</p>
    }

    return (
        <div>
            <p>Create account</p>
            <p onClick={onSubmit}>submit me</p>
        </div>
    )
}

export default Register
