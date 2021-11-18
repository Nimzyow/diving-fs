import React from "react"
import {
    List as RaList,
    ListProps,
    SimpleListLoading,
    ReferenceField,
    TextField,
    useListContext,
    ExportButton,
    SortButton,
    TopToolbar,
    CreateButton,
    Pagination,
    useGetIdentity,
    DateField,
    Datagrid,
} from "react-admin"
import {
    List,
    ListItem,
    ListItemAvatar,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    Checkbox,
    Typography,
} from "@material-ui/core"
import { Link } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import { User } from "../types/types"

export const UserList = (props: any) => {
    const { data, ids, loaded, onToggleItem, selectedIds } = useListContext<User>()

    if (loaded === false) {
        return <SimpleListLoading hasLeftAvatarOrIcon hasSecondaryText />
    }

    console.log("**************")
    console.log(props)
    console.log("**************")

    return (
        <List {...props}>
            <Datagrid>
                <TextField source="id" />
                <TextField source="firstName" />
                <TextField source="lastName" />
                {/* <EditButton basePath="/posts" /> */}
            </Datagrid>
        </List>
    )
}
