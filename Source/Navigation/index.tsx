import { createStackNavigator } from "@react-navigation/stack"
import React from "react"
import ProfileUpdate from "../Screens/Account/profileUpdate"
import AddVehicle from "../Screens/Dashboard/addVehicle"
import BottomTabsNavigator from "./BottomTabs"

const AppNavigation = () => {
  const AppStack = createStackNavigator()

  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen name={"bottomTabs"} component={BottomTabsNavigator} />
      <AppStack.Screen name="addVehicle" component={AddVehicle} />
      <AppStack.Screen name={"profileUpdate"} component={ProfileUpdate} />
    </AppStack.Navigator>
  )
}

export default AppNavigation