import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'
import GetStarted from '../Screens/Auth/get-started'
import SignIn from '../Screens/Auth/signin'
import SignUp from '../Screens/Auth/signup'

const AuthStack = (): JSX.Element => {
  const AuthComponent = createStackNavigator()
  return (
    <AuthComponent.Navigator screenOptions={{headerShown: false}}>
      <AuthComponent.Screen name="getStarted" component={GetStarted} />
      <AuthComponent.Screen name="signIn" component={SignIn} />
      <AuthComponent.Screen name="signUp" component={SignUp} />
    </AuthComponent.Navigator>
  )
}

export default AuthStack
