// configureStore 可以傳出很多個reducer
import { createSlice, configureStore } from '@reduxjs/toolkit'

const initialMyPositionState = {
  myPosition: false
}

const myPositionSlice = createSlice({
  name: 'myPostion',
  initialState: initialMyPositionState,
  reducers: {
    myPosition(state) {
      state.myPosition = true
    },
    notMyPosition(state) {
      state.myPosition = false
    }
  }
})

const initialParkingState = {
  info: [],
  dataId: null,
  customizedMapStyle: true,
  isLoading: true
}

const parkingSlice = createSlice({
  name:'parking',
  initialState: initialParkingState,
  reducers: {
    getDataId(state, actions){
      state.dataId = actions.payload
    },
    removeDataId(state){
      state.dataId = null
    },
    getInfo(state, actions){
      state.info = actions.payload
    },
    removeInfo(state){
      state.info = []
    },
    toggleMapStyle(state){
      state.customizedMapStyle = !state.customizedMapStyle
    },
    isLoading(state){
      state.isLoading = true
    },
    notIsLoading(state){
      state.isLoading = false
    },
  }
})

const initialSearchState = {
  searchLatLng: {lat:"", lng:""},
}

const searchSlice = createSlice({
  name:'search',
  initialState: initialSearchState,
  reducers: {
    getSearchLatLng(state, actions){
      state.searchLatLng = actions.payload
    },
    removeSearchLatLng(state, actions){
      state.searchLatLng = actions.payload
    }
  }
})

const initialFilterState = {
  showFilter: false,
  showRemaining: false,
  district: ''
}

const filterSlice = createSlice({
  name: 'filter',
  initialState: initialFilterState,
  reducers: {
    showFilter(state) {
      state.showFilter = true
    },
    notShowFilter(state) {
      state.showFilter = false
    },
    showRemaining(state) {
      state.showRemaining = true
    },
    notShowRemaining(state) {
      state.showRemaining = false
    },
    getDistrict(state, actions) {
      state.district = actions.payload
    },
    removeDistrict(state) {
      state.district = ''
    }
  }
})

// 定義store
const store = configureStore({
  reducer: {
    myPosition: myPositionSlice.reducer,
    parking: parkingSlice.reducer,
    search: searchSlice.reducer,
    filter: filterSlice.reducer
  } 
})

export const myPositionActions = myPositionSlice.actions
export const parkingActions = parkingSlice.actions
export const searchActions = searchSlice.actions
export const filterActions = filterSlice.actions

// 把store提供到src/index.js來用，這樣提供一次就好
export default store