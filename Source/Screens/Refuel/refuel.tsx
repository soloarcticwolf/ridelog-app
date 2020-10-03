import React from "react"
import { AppState, View } from "react-native"
import { FlatList, TouchableOpacity } from "react-native-gesture-handler"
import uuid from "react-native-uuid"
import { connect } from "react-redux"
import ScreenHeader from "../../Components/Header"
import TextMontserrat from "../../Components/TextMontserrat"
import TextOpenSans from "../../Components/TextOpenSans"
import Colors from "../../Config/Colors"
import { RefuelNavigationProps } from "../../Navigation/types"
import { dispatchHandler } from "../../State-management"

type Props = { navigation: RefuelNavigationProps }

const userRefuelLog: React.FunctionComponent<Props> = (props) => {
  const conversionLiquid = "L"
  const conversionDistance = "Km"
  const currency = "₹"
  const refuelData = [
    { uid: uuid.v4(), odo: 2500, quantity: 8, date: new Date(), cost: 275.54 },
    { odo: 2570, quantity: 4.7, date: new Date(), cost: 300 },
    { odo: 2580, quantity: 5, date: new Date(), cost: 245.4 },
    { odo: 2590, quantity: 7, date: new Date(), cost: 2.54 },
    { odo: 2600, quantity: 9, date: new Date(), cost: 25.54 },
    { odo: 2800, quantity: 25.85, date: new Date(), cost: 268.54 },
    { odo: 2583, quantity: 5, date: new Date(), cost: 245.4 },
    { odo: 2595, quantity: 7, date: new Date(), cost: 2.54 },
    { odo: 2607, quantity: 9, date: new Date(), cost: 25.54 },
    { odo: 2808, quantity: 2, date: new Date(), cost: 268.54 },
  ]

  const handleRefuelItem = () => {
    console.log("pressed something")
    props.navigation.navigate("refuelDetails")
  }

  const renderList = ({ item }: { item: any }) => {
    return (
      <TouchableOpacity
        style={{
          marginHorizontal: 10,
          elevation: 1,
          borderRadius: 10,
          marginVertical: 5,
          paddingVertical: 10,
        }}
        onPress={handleRefuelItem}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: 10,
          }}
        >
          <TextMontserrat fontSize={18} weight={"medium"}>
            {item.date.toDateString()}
          </TextMontserrat>
          <TextMontserrat
            fontSize={18}
            weight={"semibold"}
            style={{ color: Colors.imperialRed, opacity: 0.7 }}
          >
            {currency} {item.cost}
          </TextMontserrat>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 15,
            paddingVertical: 2,
          }}
        >
          <TextOpenSans fontSize={16} style={{ color: Colors.default_grey }}>
            Quantity {item.quantity} {conversionLiquid}
          </TextOpenSans>
          <TextOpenSans fontSize={16} style={{ color: Colors.default_grey }}>
            {"   "}Odometer {item.odo} {conversionDistance}
          </TextOpenSans>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      <ScreenHeader title={"Refuel"} />
      <View style={{ flex: 1, marginTop: -10 }}>
        <FlatList
          data={refuelData}
          renderItem={renderList}
          keyExtractor={(item) => item.odo.toString()}
        />
      </View>
    </View>
  )
}
const mapStateToProps = (state: AppState) => ({})
const mapDispatchToProps = (dispatch: any) => ({
  dispatch: dispatchHandler(dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(userRefuelLog)
