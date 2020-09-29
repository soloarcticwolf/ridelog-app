import {
  AntDesign,
  Feather,
  FontAwesome5,
  SimpleLineIcons,
} from "@expo/vector-icons"
import React, { useContext, useState } from "react"
import { View } from "react-native"
import {
  ScrollView,
  Switch,
  TouchableOpacity,
} from "react-native-gesture-handler"
import { connect } from "react-redux"
import TextMontserrat from "../../Components/TextMontserrat"
import TextOpenSans from "../../Components/TextOpenSans"
import Colors from "../../Config/Colors"
import { firebase } from "../../Config/firebase"
import { AuthContext } from "../../Contexts/AuthProvider"
import { AppState, dispatchHandler } from "../../State-management"

type Props = {}

const userAccount: React.FunctionComponent<Props> = (props) => {
  const { user, logout } = useContext(AuthContext)
  const [pushNotificationToggler, setPushNotificationToggler] = useState(true)
  const [SMSNotificationToggler, setSMSNotificationToggler] = useState(true)
  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        logout()
      })
  }

  const handleUpdatePassword = () => console.log("update password")
  const handleRateUs = () => console.log("leave a 5 star rating")
  const handleFAQs = () => console.log("Read more at docs")

  return (
    <ScrollView style={{ backgroundColor: Colors.white }}>
      {/* Accounts setting section +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/}
      <View style={{ marginHorizontal: 20, marginTop: 24, marginBottom: 10 }}>
        <TextMontserrat fontSize={28}>Account Settings</TextMontserrat>
        <TextMontserrat
          fontSize={16}
          style={{ marginTop: 10, letterSpacing: 0.55 }}
        >
          Update you account settings like profile edits,notifications, payments
          etc
        </TextMontserrat>
      </View>
      <View>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginVertical: 10,
          }}
          onPress={() => console.log("Profile information")}
        >
          <SimpleLineIcons
            name="user"
            size={24}
            color={Colors.imperialRed}
            style={{ marginLeft: 20 }}
          />
          <View style={{ marginLeft: -50 }}>
            <TextOpenSans fontSize={18} weight={"semibold"}>
              Profile Information
            </TextOpenSans>
            <TextMontserrat fontSize={14}>
              Change your account information
            </TextMontserrat>
          </View>
          <SimpleLineIcons
            name="arrow-right"
            size={24}
            color="black"
            style={{ marginRight: 10 }}
          />
        </TouchableOpacity>
        <View
          style={{
            marginLeft: 60,
            borderBottomWidth: 1,
            borderColor: Colors.default_grey,
            opacity: 0.2,
          }}
        />
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginVertical: 10,
          }}
          onPress={handleUpdatePassword}
        >
          <SimpleLineIcons
            name="lock"
            size={24}
            color={Colors.imperialRed}
            style={{ marginLeft: 20 }}
          />
          <View style={{ marginLeft: -65 }}>
            <TextOpenSans fontSize={18} weight={"semibold"}>
              Update Password
            </TextOpenSans>
            <TextMontserrat fontSize={14}>
              Change your current password
            </TextMontserrat>
          </View>
          <SimpleLineIcons
            name="arrow-right"
            size={24}
            color="black"
            style={{ marginRight: 10 }}
          />
        </TouchableOpacity>

        {/* notifications section +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/}
        <View>
          <TextMontserrat
            fontSize={16}
            style={{
              letterSpacing: 0.4,
              marginLeft: 20,
              marginTop: 20,
              marginBottom: 10,
            }}
            weight={"medium"}
          >
            NOTIFICATIONS
          </TextMontserrat>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginVertical: 10,
            }}
          >
            <SimpleLineIcons
              name="bell"
              size={24}
              color={Colors.imperialRed}
              style={{ marginLeft: 20 }}
            />
            <View style={{ marginLeft: -90 }}>
              <TextOpenSans fontSize={18} weight={"semibold"}>
                Push Notifications
              </TextOpenSans>
              <TextMontserrat fontSize={14}>
                For occasional updates
              </TextMontserrat>
            </View>
            <Switch
              style={{ marginRight: 10 }}
              trackColor={{
                true: Colors.imperialRed,
                false: Colors.default_grey,
              }}
              thumbColor={Colors.inputBackGroundWhite}
              onValueChange={(value) => {
                setPushNotificationToggler(value)
              }}
              value={pushNotificationToggler}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginVertical: 10,
            }}
          >
            <Feather
              name="message-square"
              size={24}
              color={Colors.imperialRed}
              style={{ marginLeft: 20 }}
            />
            <View style={{ marginLeft: -80 }}>
              <TextOpenSans fontSize={18} weight={"semibold"}>
                SMS Notifications
              </TextOpenSans>
              <TextMontserrat fontSize={14}>
                For important reminders
              </TextMontserrat>
            </View>
            <Switch
              style={{ marginRight: 10 }}
              trackColor={{
                true: Colors.imperialRed,
                false: Colors.default_grey,
              }}
              thumbColor={Colors.inputBackGroundWhite}
              onValueChange={(value) => {
                setSMSNotificationToggler(value)
              }}
              value={SMSNotificationToggler}
            />
          </View>
        </View>
        {/* MORE section +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/}
        <View>
          <TextMontserrat
            fontSize={16}
            style={{
              letterSpacing: 0.4,
              marginLeft: 20,
              marginTop: 20,
              marginBottom: 10,
            }}
            weight={"medium"}
          >
            MORE
          </TextMontserrat>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginVertical: 10,
            }}
            onPress={handleRateUs}
          >
            <FontAwesome5
              name="star"
              size={24}
              color={Colors.imperialRed}
              style={{ marginLeft: 20 }}
            />
            <View style={{ marginLeft: -150 }}>
              <TextOpenSans fontSize={18} weight={"semibold"}>
                Rate Us
              </TextOpenSans>
              <TextMontserrat fontSize={14}>Leave us a rating</TextMontserrat>
            </View>
            <SimpleLineIcons
              name="arrow-right"
              size={24}
              color="black"
              style={{ marginRight: 10 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginVertical: 10,
            }}
            onPress={handleFAQs}
          >
            <AntDesign
              name="book"
              size={24}
              color={Colors.imperialRed}
              style={{ marginLeft: 20 }}
            />
            <View style={{ marginLeft: -70 }}>
              <TextOpenSans fontSize={18} weight={"semibold"}>
                FAQs
              </TextOpenSans>
              <TextMontserrat fontSize={14}>
                Frequently asked questions
              </TextMontserrat>
            </View>
            <SimpleLineIcons
              name="arrow-right"
              size={24}
              color="black"
              style={{ marginRight: 10 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginVertical: 30,
            }}
            onPress={handleLogout}
          >
            <AntDesign
              name="logout"
              size={24}
              color={Colors.imperialRed}
              style={{ marginLeft: 20 }}
            />
            <View style={{ marginLeft: -120 }}>
              <TextOpenSans fontSize={18} weight={"semibold"}>
                Logout
              </TextOpenSans>
              <TextMontserrat fontSize={14}>Signout of Ridelogg</TextMontserrat>
            </View>
            <SimpleLineIcons
              name="arrow-right"
              size={24}
              color="black"
              style={{ marginRight: 10 }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <TextMontserrat
          fontSize={10}
          style={{ color: Colors.tGrey, opacity: 0.2, marginBottom: 10 }}
        >
          Storm0171
        </TextMontserrat>
      </View>
    </ScrollView>
  )
}

const mapStateToProps = (state: AppState) => ({})
const mapDispatchToProps = (dispatch: any) => ({
  dispatch: dispatchHandler(dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(userAccount)
