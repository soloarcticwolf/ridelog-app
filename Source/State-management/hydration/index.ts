import {CollectionChangeSet} from 'realm'
import {
  REFUEL,
  SERVICE,
  UPLOAD_TYPE_ADD,
  UPLOAD_TYPE_MODIFIED,
  UPLOAD_TYPE_REMOVE,
  VEHICLE,
} from '../../../Constant'
import {addCloudRefuelLog, removeCloudRefuelLog} from '../../api/refuel'
import {addCloudServiceLog, removeCloudServiceLog} from '../../api/service'
import {deleteVehicle, getVehicles, uploadVehicle} from '../../api/vehicle'
import {getRealmInstance} from '../../Database/index'
import {addvehicleToDb} from '../../Database/jobs'
import {dispatch} from '../../Providers/Providers'
import {ServiceLog} from '../../Types'
import {ActionAddVehicles} from './actions'

const realm = getRealmInstance()

async function getRemoteVehiclesToDb() {
  try {
    const vehicles = await getVehicles()
    if (!vehicles.length) return

    // eslint-disable-next-line no-restricted-syntax
    for (let vehicle of vehicles) {
      vehicle.uploaded = true
      addvehicleToDb(vehicle)
    }
  } catch (error) {
    console.info('ERROR_IN_getRemoteVehiclesToDb', error)
  }
}

export async function hydrateVehicleState(): Promise<any> {
  console.info('Hydrating state...')
  try {
    // @ts-ignore
    const {vehicles, firstLaunch} = realm.objects('User')[0]
    if (!vehicles.length && firstLaunch) {
      getRemoteVehiclesToDb()
      return
    }

    const vehiclesCopy = [...vehicles]
    dispatch(new ActionAddVehicles(vehiclesCopy))
  } catch (error) {
    console.info('ERROR_IN_VEHICLE_HYDRATION', error)
  }
}
// changes contains the index of the item added,deleted or modified
export const vehicleListener = (
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  vehicles: any,
  changes: CollectionChangeSet,
): void => {
  console.info('____IN_LISTENER____')
  if (
    changes.insertions.length ||
    changes.deletions.length ||
    changes.newModifications.length
  )
    hydrateVehicleState()
  console.info('OUT_OF_LISTENER')
}

export const uploadTrackerListener = (
  uploadTrackers: Array<any>,
  changes: CollectionChangeSet,
): void => {
  /**
   * checking only for addition of records, we dont care about
   * deletion or modification as it doesnt matter.
   */
  if (uploadTrackers.length) {
    // if (changes.insertions.length) {
    uploadTrackers.forEach((ut) => {
      if (ut.uploaded) {
        realm.write(() => {
          realm.delete(ut)
          console.log('removed already uploaded data', ut)
        })
        return
      }
      switch (ut.logType) {
        case VEHICLE: {
          // @ts-ignore
          const vehicle: VehicleInfo = realm.objectForPrimaryKey(
            'Vehicle',
            ut.logId,
          )

          if (vehicle) {
            switch (ut.uploadType) {
              case UPLOAD_TYPE_ADD:
                uploadVehicle(vehicle)
                  .then(() => {
                    realm.write(() => {
                      realm.delete(ut)
                      console.info('VEHICLE_ADD_TASK_REQUESTED', ut)
                    })
                  })
                  .catch((error) => {
                    console.info('ERROR_IN_CASE_VEHICLE_ADD', error)
                  })
                break
              case UPLOAD_TYPE_REMOVE:
                deleteVehicle(vehicle)
                  .then(() => {
                    realm.write(() => {
                      realm.delete(ut)
                      console.info('VEHICLE_REMOVE_TASK_REQUESTED', ut)
                    })
                  })
                  .catch((error) => {
                    console.info('ERROR_IN_CASE_VEHICLE_REMOVE', error)
                  })
                break
              case UPLOAD_TYPE_MODIFIED:
                // implementd later
                break

              default:
                console.info('vehicle uploadType mismatch')
            }
          }
          break
        }
        case REFUEL:
          {
            // @ts-ignore
            const refuelLog: RefuelLog = realm.objectForPrimaryKey(
              'RefuelLog',
              ut.logId,
            )
            /**
             * On deleting the refuel log is deleted from realm first,
             * hence its not found when queried, and delete api call fails
             * Thats why It has been moved out of the query
             */
            if (ut.uploadType === UPLOAD_TYPE_REMOVE) {
              const refuelLogIds = {
                _id: ut.logId,
                vehicleId: ut.vehicleId,
              }
              removeCloudRefuelLog(refuelLogIds)
                .then(() => {
                  realm.write(() => {
                    realm.delete(ut)
                    console.info('REFUELLOG_REMOVE_TASK_REQUESTED', ut)
                  })
                })
                .catch((error) => {
                  console.info('ERROR_IN_CASE_REFUEL_REMOVE', error)
                })
              return
            }

            if (refuelLog) {
              switch (ut.uploadType) {
                case UPLOAD_TYPE_ADD:
                  addCloudRefuelLog(refuelLog)
                    .then(() => {
                      realm.write(() => {
                        realm.delete(ut)
                        console.info('REFUELLOG_ADD_TASK_REQUESTED', ut)
                      })
                    })
                    .catch((error) => {
                      console.info('ERROR_IN_CASE_REFUEL_ADD', error)
                    })
                  break
                case UPLOAD_TYPE_MODIFIED:
                  // implemented later
                  break

                default:
                  console.info('refuel uploadType mismatch')
              }
            } else {
              console.info('NO_LOG_FOUND')
            }
          }
          break
        case SERVICE:
          {
            if (ut.uploadType === UPLOAD_TYPE_REMOVE) {
              const serviceLogIds = {
                _id: ut.logId,
                vehicleId: ut.vehicleId,
              }
              removeCloudServiceLog(serviceLogIds)
                .then(() => {
                  console.info('SERVICELOG_REMOVE_TASK_REQUESTED', ut)
                  realm.write(() => {
                    realm.delete(ut)
                  })
                })
                .catch((error) => {
                  console.info('ERROR_IN_CASE_SERVICE_REMOVE', error)
                })
              return
            }
            // @ts-ignore
            const serviceLog: ServiceLog = realm.objectForPrimaryKey(
              'ServiceLog',
              ut.logId,
            )
            if (serviceLog) {
              switch (ut.uploadType) {
                case UPLOAD_TYPE_ADD:
                  addCloudServiceLog(serviceLog)
                    .then(() => {
                      realm.write(() => {
                        realm.delete(ut)
                        console.info('REFUELLOG_ADD_TASK_REQUESTED', ut)
                      })
                    })
                    .catch((error) => {
                      console.info('ERROR_IN_CASE_SERVICE_ADD', error)
                    })
                  break
                case UPLOAD_TYPE_REMOVE:
                  removeCloudServiceLog(serviceLog)
                    .then(() => {
                      realm.write(() => {
                        realm.delete(ut)
                        console.info('SERVICELOG_REMOVE_TASK_REQUESTED', ut)
                      })
                    })
                    .catch((error) => {
                      console.info('ERROR_IN_CASE_SERVICE_REMOVE', error)
                    })
                  break
                case UPLOAD_TYPE_MODIFIED:
                  // implemented later
                  break

                default:
                  console.info('service uploadType mismatch')
              }
            }
          }
          break

        default:
          console.log('invalid option')
      }
    })
  }
}
