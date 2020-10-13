import { applyMiddleware, createStore } from "redux"
import {
  RefuelData,
  ServiceData,
  vehicleInfo,
} from "../Screens/Dashboard/types"
import { ImageSpecs } from "../Screens/Refuel/types"
import { Action } from "./root-action"

const vehiclesInfomation: Array<vehicleInfo> = []
const refuelData: Array<RefuelData> | undefined = []
const serviceData: Array<ServiceData> = []
const selectedVehicle: vehicleInfo = {
  vcallsign: "",
  maker: "",
  model: "",
  odo: "",
  plate: "",
  vin: "",
  year: "",
  images: [],
  refuelData,
  serviceData,
}
const refuelLogImages: Array<ImageSpecs> = []
const refuelLog: RefuelData = {
  uid: "",
  odo: "",
  quantity: "",
  date: "",
  cost: "",
  images: [],
}
const initialState = {
  userInfo: {
    userCallsign: "",
    avatar: "",
    email: "",
    lastLogin: "",
    firebaseUId: "",
  },
  vehiclesInfo: vehiclesInfomation,
  selectedVehicle,
  refuel: {
    addRefuelLog: {
      images: refuelLogImages,
    },
    refuelLog,
  },
  misc: {
    imageUploadProgress: 0,
  },
}

const actionLogger = (state: any) => (next: any) => (action: Action<any>) => {
  console.log("Dispatched", action.type)
  return next(action)
}

export const getStore = () => {
  if (__DEV__) return createStore(rootReducer, applyMiddleware(actionLogger))
  return createStore(rootReducer)
}

const rootReducer = (state: AppState = initialState, action: Action<any>) => {
  if (action && action.isUserAction) {
    const currentStateJSON = JSON.parse(JSON.stringify(state)) // deep-copy state
    let updatedState: AppState = { ...currentStateJSON }
    action.actionSelf.updateState(updatedState)
    return updatedState
  }
  return state
}

export const dispatchHandler = (dispatch: any) => (action: Action<any>) => {
  dispatch(action.actionSelf.plainObj())
}

export type AppState = typeof initialState
