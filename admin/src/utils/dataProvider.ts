import { DataProvider, GetListResult } from "ra-core"
import { User } from "../types/types"
import UserFunctions from "../users/UsersFunctions"

const dataProvider: DataProvider = {
    getList: (resource, params) => {
        switch (resource) {
            case "user":
                return UserFunctions.getList()

            default:
                break
        }
    },
    // @ts-ignore
    create: () => Promise.resolve({ data: { id: 0 } }),
    // @ts-ignore
    delete: () => Promise.resolve({ data: {} }),
    deleteMany: () => Promise.resolve({}),
    getMany: () => Promise.resolve({ data: [] }),
    getManyReference: () => Promise.resolve({ data: [], total: 0 }),
    // @ts-ignore
    getOne: () => Promise.resolve({ data: {} }),
    // @ts-ignore
    update: () => Promise.resolve({ data: {} }),
    updateMany: () => Promise.resolve({}),
}

export default dataProvider

/**
 *  THE @ts-ignore IS FROM THEIR OWN DOCUMENTATION!!
 * 
 * const dataProvider: DataProvider = {
    // @ts-ignore
    create: () => Promise.resolve({ data: { id: 0 } }),
    // @ts-ignore
    delete: () => Promise.resolve({ data: {} }),
    deleteMany: () => Promise.resolve({}),
    getList: () => Promise.resolve({ data: [], total: 0 }),
    getMany: () => Promise.resolve({ data: [] }),
    getManyReference: () => Promise.resolve({ data: [], total: 0 }),
    // @ts-ignore
    getOne: () => Promise.resolve({ data: {} }),
    // @ts-ignore
    update: () => Promise.resolve({ data: {} }),
    updateMany: () => Promise.resolve({}),

    },
 */
