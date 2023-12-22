import {createSlice, PayloadAction} from "@reduxjs/toolkit"

interface IFilterState {
    isShowFilters: boolean,
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState: {
        isShowFilters: false,
    },
    reducers: {
        setIsShowFilters: (state: IFilterState, action: PayloadAction<boolean>) => {
            state.isShowFilters = action.payload
        },
    }
})

// actions
export const {setIsShowFilters} = filterSlice.actions

export default filterSlice.reducer