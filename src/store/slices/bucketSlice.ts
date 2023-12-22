import {createSlice, PayloadAction} from "@reduxjs/toolkit"

interface IBucket {
    products: any,
    payment: any
}

export const bucketSlice = createSlice({
    name: 'bucket',
    initialState: {
        products: [],
        payment: {}
    },
    reducers: {
        setBucketProducts: (state: IBucket, action: PayloadAction<any>) => {
            if (!state.products?.find((item: any) => item?.id === action.payload?.id)){
                state.products = [...state.products, {...action.payload, count: 1}]
            }
        },
        setOnClearBucket: (state: IBucket) => {
            state.products = []
        },
        setOnClearById: (state: IBucket, action: any) => {
            state.products = state?.products.filter((item: any) => item?.id !== action.payload)
        },
        setChangeCount: (state: IBucket, action: any) => {
            state.products = state?.products.map((item: any) =>
                item?.id === action.payload?.id
                    ? {...item, count: action.payload?.count}
                    : item
            )
        },
        setPayment: (state: IBucket, action: any) => {
            state.payment = action?.payload
        },
        setGroup: (state: any, action: any) => {
            state.products = action?.payload
        },
    }
})


// actions
export const {setBucketProducts, setOnClearBucket, setOnClearById, setChangeCount, setPayment, setGroup} = bucketSlice.actions

export default bucketSlice.reducer
