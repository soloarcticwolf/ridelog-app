import React, {FunctionComponent, useContext, useState} from 'react'
import {View} from 'react-native'
import {TextInput} from 'react-native-paper'
import ScreenHeader from '../../Components/Header'
import SquareButton from '../../Components/SquareButton'
import Colors from '../../Config/Colors'
import {AuthContext} from '../../Contexts/AuthProvider'
import {
  ProfileUpdateNavigationProps,
  ProfileUpdateRouteProp,
} from '../../Navigation/types'

type Props = {
  navigation: ProfileUpdateNavigationProps
  route: ProfileUpdateRouteProp
}

const ProfileUpdate: FunctionComponent<Props> = () => {
  const {user} = useContext(AuthContext)

  const [callsign, setCallsign] = useState(user?.callsign)
  const [email, setEmail] = useState(user?.email)
  const [phone, setPhone] = useState('')

  const handleUpdateProfile = () => {
    console.log('in update profile')
  }

  const disabledButton = () => {
    if (user?.callsign !== callsign || user?.email !== email) return false
    return true
  }

  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <ScreenHeader title="Profile Update" enableBack />
      <View style={{marginTop: 10, marginBottom: 20}}>
        <TextInput
          label="Call Sign"
          mode="outlined"
          style={{color: Colors.imperialRed, marginHorizontal: 20}}
          theme={{
            colors: {
              primary: Colors.imperialRed,
              background: Colors.white,
            },
          }}
          value={callsign}
          onChangeText={(inputText) => {
            setCallsign(inputText)
          }}
        />
        <TextInput
          label="Email Address"
          mode="outlined"
          style={{
            color: Colors.imperialRed,
            marginHorizontal: 20,
            marginTop: 18,
          }}
          theme={{
            colors: {
              primary: Colors.imperialRed,
              background: Colors.white,
            },
          }}
          value={email}
          onChangeText={(inputText) => {
            setEmail(inputText)
          }}
        />
        <TextInput
          label="Phone Number"
          mode="outlined"
          style={{
            color: Colors.imperialRed,
            marginHorizontal: 20,
            marginTop: 18,
          }}
          theme={{
            colors: {
              primary: Colors.imperialRed,
              background: Colors.white,
            },
          }}
          value={phone}
          onChangeText={(inputText) => {
            setPhone(inputText)
          }}
        />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
        }}>
        <SquareButton
          title="UPDATE PROFILE"
          buttonBackgroundColor={Colors.imperialRed}
          onPress={handleUpdateProfile}
          style={{
            marginBottom: 20,
            alignSelf: 'center',
            opacity: disabledButton() ? 0.67 : 0.99,
          }}
          disabled={disabledButton()}
        />
      </View>
    </View>
  )
}

export default ProfileUpdate
