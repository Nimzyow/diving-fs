import { Record, Identifier } from "react-admin"

export interface User extends Record {
    first_name: string
    last_name: string
    email: string
}
