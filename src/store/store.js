// redux @4.2.0 捨棄了createStore的寫法
import { legacy_createStore as createStore } from 'redux'

// 定義state，並用action來改變狀態
const counterRedux = ( state = {myPosition : false }, action ) => {
  if (action.type === 'myPosition') {
    console.log('hi')
    return {
      myPosition: true
    }
  }

  if (action.type === 'notMyPosition') {
    console.log('hi-no')
    return {
      myPosition: false
    }
  }

  return state
}

// 定義store
const store = createStore(counterRedux)

// 把store提供到src/index.js來用，這樣提供一次就好
export default store