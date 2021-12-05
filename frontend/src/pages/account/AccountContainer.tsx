import React, { useState } from "react"

import { Login } from "./components/Login"
import { Register } from "./components/Register"

const AccountContainer = () => {
    const [registered, setRegistered] = useState(true)

    return (
        <div
            className="w-100 d-flex justify-content-center align-items-center"
            style={{ height: "100vh" }}
        >
            <div
                style={{
                    border: "2px solid black",
                    borderRadius: "15px",
                    minWidth: 300,
                    maxWidth: 300,
                    minHeight: 300,
                }}
                className="p-3"
            >
                {" "}
                {registered ? <Login /> : <Register />}
                <div className="d-flex justify-content-end w-100">
                    <p className="mb-0" style={{ fontSize: 14 }}>
                        Not registered?{" "}
                        <span
                            className="link-primary"
                            style={{ cursor: "pointer" }}
                            onClick={() => setRegistered(!registered)}
                        >
                            {registered ? "Login" : "Register"} here
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default AccountContainer
