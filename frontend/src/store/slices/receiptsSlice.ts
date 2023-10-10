import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IItem } from '../../types/types'

export interface ReceiptsState {
  value: Array<{
    date_time:string,
    total_sum: number,
        retailplace: {
            name: string,
            address: string
        },
    items: IItem[]
    }>,
  items: IItem[],
  total_sum: number
}


interface IUpdateItem {
  id: number,
  value: IItem
}

interface ISetReceipts {
    date_time:string,
    total_sum: number,
        retailplace: {
            name: string,
            address: string
        },
    items: Array<{
          id:string,
          name:string,
          price: number,
          quantity: number,
          producttype : {
              name: string
          }
          }>
}

const initialState: ReceiptsState = {
  value: [],
  items: [],
  total_sum: 0
}
const sumItems = (arr:IItem[]) => {
  return arr.reduce((a, b) => {return {price: Number(a.price)*a.quantity + Number(b.price)*b.quantity, quantity: 1}},{price:0,quantity:0}).price 
}
export const receiptsSlice = createSlice({
  name: 'receipts',
  initialState,
  reducers: {
    setReceipts: (state, action: PayloadAction<ISetReceipts[]>) => {
      state.value = action.payload
    },
    addNewItem: (state, action: PayloadAction<IItem>) => {
      state.items.push(action.payload) 
      state.total_sum = sumItems(state.items)
    },
    deleteItem: (state, action: PayloadAction<number>) => {
      delete state.items[action.payload]
      state.items = state.items.filter((el)=>el)
      state.total_sum = sumItems(state.items)
    },
    updateItem: (state, action: PayloadAction<IUpdateItem>) => {
      state.items[action.payload.id] = action.payload.value
      state.total_sum = sumItems(state.items)
    },
    clearItems: (state) => {
      state.items = []
      state.total_sum = 0
    }
  },
})

// Action creators are generated for each case reducer function
export const { setReceipts, addNewItem, deleteItem, updateItem, clearItems } = receiptsSlice.actions

export default receiptsSlice.reducer