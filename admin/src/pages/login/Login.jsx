import React, { useState } from "react"
import { useLogin, useNotify, Notification, defaultTheme } from "react-admin"
import { makeStyles } from "@material-ui/styles"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import LockIcon from "@material-ui/icons/Lock"
// import { Icon } from '@material-ui/core';
import CircularProgress from "@material-ui/core/CircularProgress"

const useStyles = makeStyles({
    wrapper: {
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        marginTop: "6rem",
        height: "100%",
    },
    root: {
        minWidth: 302,
    },
    bullet: {
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)",
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
})

const MyLoginPage = ({ theme }) => {
    const [inputs, setInputs] = useState({ email: "", password: "" })
    const [loading, setLoading] = useState(false)
    const login = useLogin()
    const notify = useNotify()
    const classes = useStyles()

    const bull = <span className={classes.bullet}>•</span>

    const submit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await login({ ...inputs })
            setLoading(false)
        } catch (error) {
            notify("Invalid email or password")
            setLoading(false)
        }
    }

    // return (
    return (
        <div className={classes.wrapper}>
            <Card className={classes.root} variant="outlined">
                <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
                    <LockIcon color="primary" />
                </div>
                <CardContent>
                    <form onSubmit={submit} style={{ display: "flex", flexDirection: "column" }}>
                        <TextField
                            required
                            style={{ marginTop: "1rem" }}
                            name="email"
                            type="email"
                            value={inputs.email}
                            id="email"
                            label="Email"
                            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                        />
                        {/* <input
                            name="email"
                            type="email"
                            value={inputs.email}
                            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                        /> */}

                        <TextField
                            required
                            style={{ marginTop: "1rem" }}
                            name="password"
                            type="password"
                            value={inputs.password}
                            id="password"
                            label="Password"
                            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                        />

                        <CardActions style={{ marginBottom: "1rem" }}>
                            <Button
                                style={{ width: "100%", marginTop: "1rem" }}
                                variant="contained"
                                color="primary"
                                type="submit"
                                size="small"
                            >
                                Submit
                            </Button>
                        </CardActions>
                    </form>
                    <Notification />
                </CardContent>
                {loading && (
                    <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}>
                        <CircularProgress />{" "}
                    </div>
                )}
            </Card>
        </div>
    )
}

export default MyLoginPage
