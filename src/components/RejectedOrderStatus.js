import React, { useState, useEffect } from "react";
import {
  Image,
  ScrollView,
  ActivityIndicator,
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
  LogBox,
  TextInput,
} from "react-native";

import {
  Container,
  Header,
  Spinner,
  Card,
  CardItem,
  Title,
  Thumbnail,
  Item,
  Content,
  Text,
  Button,
  Left,
  Body,
  Right,
  View,
} from "native-base";
import { Picker } from "@react-native-picker/picker";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useIsFocused } from "@react-navigation/native";
import DropdownAlert from 'react-native-dropdownalert';

//import ViewShot from "react-native-view-shot";
import Colors from "../ColorCodes/Colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import URL from "../api/ApiURL";
import { useSelector, useDispatch } from "react-redux";
import * as ApiAction from "../store/actions/ApiData";
import MyHeader from "../components/MyHeader";
import OrderCartItem from "../components/OrderCardItem";
import { BottomSheet } from "react-native-btr";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Platform } from "react-native";
function RejectedOrdersStatus({ navigation, route }) {
  const { OID, orderBoxId, Quantity } = route.params;
  //   const packages = Packages;
  const {id, name ,address} = route.params
  const [boxData, setBoxData] = useState("");
  const [boxDetail, setBoxDetail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [dataStatus, setDataStatus] = useState("");
  const [note, setNote] = useState("");
  const [disvisible, setDisvisible] = useState(false);
  //   const [visible, setVisible] = useState(false);
  const isFocused = useIsFocused();
  //   const cartTotalAmount = useSelector((state) => state.OrderBox.totalAmount);
  //   const count = useSelector((state) => state.OrderBox.count);
  //   const CheckId = useSelector((state) => state.OrderBox.items);
  //   const cartItems = useSelector((state) => {
  //     const transformedCartItems = [];
  //     for (const key in state.OrderBox.items) {
  //       transformedCartItems.push({
  //         id: key,
  //         // id:items[key],
  //         quantity: state.OrderBox.items[key].quantity,
  //         total_amount: state.OrderBox.items[key].total_amount,
  //         name: state.OrderBox.items[key].name,
  //         unit: state.OrderBox.items[key].unit,
  //         price: state.OrderBox.items[key].price,
  //       });
  //     }
  //     return transformedCartItems.sort((a, b) => (a.id > b.id ? 1 : -1));
  //   });
  //   var Count = 0;

  const dispatch = useDispatch();
  const ClientId = useSelector((state) => state.ApiData.ClientId);
  const ClientName = useSelector((state) => state.ApiData.ClientName);
  const ClientImage = useSelector((state) => state.ApiData.ClientImage);

  //   const PoNumber = useSelector((state) => state.ApiData.PoNumber);
  //   const OrderId = useSelector((state) => state.ApiData.OrderId);
  //   console.log("PoNumber", PoNumber);
  //   console.log("OrderId", OrderId);
  const [pickUpDate, setPickUpDate] = useState("");
  const [MyOrderBoxId, setMyOrderBoxId] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  //   const [note, setNote] = useState("");
  const [qtty, setQtty] = useState(0);
  // const autocompletes = [...Array(10).keys()];
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedValue, setSelectedValue] = useState([{}]);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [units, setUnits] = useState([]);
  const [totalAmount, setTotalAmount] = useState("");
  const [filteredUnits, setFilteredUnits] = useState([]);
  const [selectedUnits, setSelectedUnits] = useState({});
  const [checkRow, setCheckRow] = useState(false);
  const [unitCheck, setUnitCheck] = useState(false);
  const [riderData, setRiderData] = useState("");
  const [riderName, setRiderName] = useState("");
  const [riderAddress, setRiderAddress] = useState("");
  const [riderId, setRiderId] = useState("");
  const [formattedDate, setFormattedDate] = useState("");
  const [businessData, setBusinessData] = useState("");
  const [selectedBusinessId, setSelectedBusinessId] = useState("");
  const [loading, setLoading] = useState(false);
  const [riderLoading, setRiderLoading] = useState(false);
  const [AddressName, setAddressName] = useState("");
  const [businessName, setBusinessName] = useState("");
  // const [time,setTime]=useState("12:56:00");
  const [formattedTime, setFormattedTime] = useState("");
  const [time, setTime] = useState("");
  const [buttonState, setButtonState] = useState("");
  const [sendButtonCheck, setSendButtonCheck] = useState(false);
  // const [formattedDate, setFormattedDate] = useState("");

  var hourss;
  var minn;
  var secc;
  var datee;
  var monthh;
  var yearr;

  
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

 

  // const onChange = (event, selectedDate) => {
  //   const currentDate = selectedDate || date;
  //   setShow(Platform.OS === "ios");
  //   setDate(currentDate);
  // };

  // const showMode = (currentMode) => {
  //   setShow(true);
  //   setMode(currentMode);
  // };

  // const showDatepicker = () => {
  //   showMode("date");
  // };

  // const showTimepicker = () => {
  //   showMode("time");
  // };

  // const onChange = (event, selectedDate) => {
  // const currentDate = selectedDate || date;
  // console.log("currentDate", currentDate);
  // setShow(Platform.OS === "ios");
  // if (
  // parseInt(currentDate.getFullYear()) < parseInt(yearr) ||
  // currentDate.getMonth() + 1 < monthh ||
  // (currentDate.getMonth() + 1 == monthh && currentDate.getDate() < datee)
  // ) {
  // alert("Selected Date is Invalid!");
  // } else {
  // setDate(currentDate);

  // setFormattedDate(
  // currentDate.getDate() +
  // "-" +
  // (currentDate.getMonth() + 1) +
  // "-" +
  // currentDate.getFullYear()
  // );
  // console.log("date", formattedDate);
  // }
  // };

  // const onChangee = (event, selectedDate) => {
  // const currentDate = selectedDate || date;
  // console.log("currentTime", currentDate);
  // setShow(Platform.OS === "ios");

  // setTime(currentDate);

  // setFormattedTime(
  // +" "+
  // currentDate.getHours() +
  // ":" +
  // currentDate.getMinutes() +
  // ":" +
  // currentDate.getSeconds()
  // );
  // console.log("date", formattedTime);

  // };

  // const showMode = (currentMode) => {
  // setShow(true);
  // setMode(currentMode);

  // };

  // const showDatepicker = () => {
  // showMode("date");
  // };

  // const showTimepicker = () => {
  // showMode("time");
  // };

  const resend = () => {
    // console.log(formattedDate, "updates Date");
    // console.log(formattedTime, "updates Time");

    // AsyncStorage.clear();
    // dispatch(ApiDataAction.SetOrderBoxId(1));
    // console.log("value",selectedValue.id);
    // if (cartItems == "") {
    //   alert("Kindly place an order");
    // } else {
    // if (riderId == "") {
    //   alert("Please Select Delivery Person");
    console.log("Order Box Id:",OID);
    console.log("Order Box Id:",selectedBusinessId);
    
    console.log("DP Id :",id);
    console.log("dateeeeeeeee",formattedDate+" "+formattedTime)
    setButtonLoading(true);
    if(selectedBusinessId==""){
      alert("Please Select Delivery Address");
      setButtonLoading(false);

    }
    else{
      if (formattedDate == "") {
        setFormattedDate(
          date.getDate() +
            "-" +
            (date.getMonth() + 1) +
            "-" +
            date.getFullYear()
        );
        setFormattedTime(
          date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
        );
  
        alert(
          "Are you sure about your order?"
        );
        setButtonLoading(false);


      }
      else {
        // console.log("before Order box", OrderId);
        // Count = Count + 1;
        setSendButtonCheck(true);
        fetch(URL + "/order/update_order/", {
          method: "POST   ",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            order_id: OID,
            delivery_person: riderId==""?id:riderId,
            business: selectedBusinessId,
            delivery_datetime: formattedDate + " " + formattedTime,
  
          }),
        })
          .then(async (response) => {
            let data = await response.json();
            console.log("status code of Resend Order", data);
            console.log("status code of Resend Order", response.status);
            // console.log("Order Detail",data.order_box.order_products)
            if(response.status == 200) {
              // console.log("data",data)
              // dispatch(ApiDataAction.CreateOrder(1));
            // Toast.show("Order Successfully Delivered.", Toast.LONG);
            setButtonLoading(false);

  
              alert("Order Successfully Delivered");
              setNote("");
              // setUnitCheck(false);
              // setQtty("");
              // setFormattedDate("");
              // AsyncStorage.clear();
              navigation.navigate("Dashboard");
              setSendButtonCheck(false);
              // CreateOrder();
              console.log("(Oreder is added to order box)");
              // dispatch(ApiDataActions.SetLoginData(data));
              // navigation.navigate("MyDrawer");
            }
            else{
              alert(data.message);
              setButtonLoading(false);

            }
  
            // code that can access both here
          })
          .catch((error) => {
            setSendButtonCheck(false);
            console.log("", error);
          });
      }
    }
    

    // console.log("before create",OrderId);

    // alert("Thanks,Your Order is Placed,")
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    setFormattedDate(
      currentDate.getDate() +
          "-" +
          (currentDate.getMonth() + 1) +
          "-" +
          currentDate.getFullYear()
      );
      setFormattedTime(
        currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds()
      );
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const [visible, setVisible] = useState(false);
  const toggleBottomNavigationView = () => {
    //Toggling the visibility state of the bottom sheet
    setVisible(!visible);
  };

  const [s_visible, setS_visible] = useState(false);
  const s_toggleBottomNavigationView = () => {
    //Toggling the visibility state of the bottom sheet
    setS_visible(!s_visible);
  };

  //   const toggleBottomNavigationView = () => {
  //     //Toggling the visibility state of the bottom sheet
  //     setVisible(!visible);
  //   };
  //const OId = OrderId;
  //const OrderBoxId = OrderBox;
  const totalQuantity = Quantity;

  //   const setting = () => {
  //     toggleBottomNavigationView();

  //     // if(dataStatus=="in_progress")
  //     // {

  //     // }
  //   };
  const rider = (name, address, id) => {
    setRiderName(name);
    setRiderAddress(address);
    setRiderId(id);
    toggleBottomNavigationView();
  };

  useEffect(() => {
    // getToken();
    //   console.log("hi---------------")
    // console.log(PoNumber,"-----");
    //console.log(OrderId, "------");
    setSendButtonCheck(false);

    setIsLoading(true);
    if (orderBoxId != "") {
      fetch(URL + "/order/list_order/" + orderBoxId + "/")
        // fetch(URL+'/client_app/clients_list/33/')
        .then((response) => response.json())
        .then((responseJson) => {
          console.log("OrderBoxDetail:", responseJson.order);
          setBoxData(responseJson.order);
          setBoxDetail(responseJson.order.order_products);
          setIsLoading(false);
          setDataStatus(responseJson.order.status);
          console.log(boxDetail, "-------");
          setIsLoading(false);
        })
        .catch((error) => console.error(error));
    }

    fetch(URL + "/client_app/list_business/client/" + ClientId + "/")
      // fetch(URL+'/client_app/clients_list/33/')
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log("Buisness Detail:",responseJson);
        // console.log("Buisness Detail:",responseJson.client_businesses[0]['name']);
        // if (json["response"] == "Record does not exist or not found") {
        // setLoading(true);
        // } else {
        setBusinessData(responseJson.client_businesses);
        if (responseJson.client_businesses == "") {
          setLoading(true);
        }
        console.log("Business Detail", responseJson);
        // }
      })
      .catch((error) => console.error(error));

    fetch(URL + "/delivery_person/delivery_person_list/")
      // fetch(URL+'/client_app/clients_list/33/')
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.delivery_person == "") {
          setRiderLoading(true);
        } else {
          setRiderData(responseJson.delivery_person);
        }

        // console.log("Dashboard:",responseJson.client_dashboard.client_name);
        //console.log("Buisness Detail:",responseJson.client_businesses[0]['name']);
        // if (json["response"] == "Record does not exist or not found") {
        // setLoading(true);
        // } else {
        // dispatch(ApiDataAction.SetListData(responseJson));
        // dataa=responseJson;
        // setData(responseJson);
        // //console.log(json);

        // }

        //   console.log("Dashboard:",responseJson.client_dashboard.client_name);
        //console.log("Buisness Detail:",responseJson.client_businesses[0]['name']);
        // if (json["response"] == "Record does not exist or not found") {
        //   setLoading(true);
        // } else {
        //   dispatch(ApiDataAction.SetListData(responseJson));
        //   dataa=responseJson;
        //   setData(responseJson);
        //   //console.log(json);

        // }
      })
      .catch((error) => console.error(error));
    setDisvisible(false);

    datee = new Date().getDate(); //Current Date
    monthh = new Date().getMonth() + 1; //Current Month
    yearr = new Date().getFullYear(); //Current Year
    hourss = new Date().getHours(); //Current Hours
    minn = new Date().getMinutes(); //Current Minutes
    secc = new Date().getSeconds(); //Current Seconds
    console.log("date",datee);
    setCurrentDate(datee + "-" + monthh + "-" + yearr);
    setFormattedDate(datee +"-" +monthh +"-" +yearr);
      setFormattedTime(
        hourss + ":" + minn + ":" + secc
      );
    // .finally(() => setIsLoading(false));

    //console.log(data)
  }, [orderBoxId, disvisible, isFocused]);
  // console.log("Order Box Id:",OrderBoxId);
  // console.log("Order Box Id:",boxDetail);
  return (
    <View style={{ flex: 1 }}>

      {/* <MyHeader name="ORDERS STATUS" nav={navigation} /> */}
      <ScrollView>
        {isLoading ? (
          <Spinner color={Colors.themeColor} />
        ) : (
          <Content>
            
            <View style={styles.footer}>
      <DropdownAlert ref={ref => dropDownAlertRef = ref} updateStatusBar={false} tapToCloseEnabled={true} errorColor={Colors.themeColor} successColor={Colors.themeColor} containerStyle={{width:"80%"}} />

              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "center",
                  padding: 10,
                }}
              >
                <Card
                  style={{
                    padding: 10,
                    width: "50%",
                    backgroundColor: "#e6e6e6",
                    elevation: 0,
                    borderRadius: 7,
                  }}
                >
                  <TouchableOpacity onPress={toggleBottomNavigationView}>
                    <Text style={{ color: Colors.themeColor, fontSize: 12 }}>
                      Delivery Person:
                    </Text>
                    {riderName==""?<Text style={{ fontSize: 16, fontWeight: "bold" }}>
                      {name}
                    </Text>:
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                      {riderName}
                    </Text>}
                    {riderAddress==""?<Text style={{ fontSize: 12, color: "#666666" }}>
                      {address}
                    </Text>
                    :<Text style={{ fontSize: 12, color: "#666666" }}>
                      {riderAddress}
                    </Text>}
                  </TouchableOpacity>
                </Card>
                <BottomSheet
                  visible={visible}
                  //setting the visibility state of the bottom shee
                  onBackButtonPress={toggleBottomNavigationView}
                  //Toggling the visibility state on the click of the back botton
                  onBackdropPress={toggleBottomNavigationView}
                  //Toggling the visibility state on the clicking out side of the sheet
                >
                  {/*Bottom Sheet inner View*/}
                  <View style={styles.bottomNavigationView}>
                    {riderLoading ? (
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          // alignSelf:'center',
                          marginTop: "20%",
                        }}
                      >
                        <Text
                          style={{
                            color: Colors.themeColor,
                            fontWeight: "bold",
                            marginTop: 20,
                            fontSize: 25,
                            textAlign: "center",
                          }}
                        >
                          Rider is Not Available
                        </Text>
                      </View>
                    ) : (
                      <FlatList
                        nestedScrollEnabled={true}
                        data={riderData}
                        style={{ padding: 10 }}
                        showsVerticalScrollIndicator={false}
                        // keyExtractor={item => item.index_id.toString()}
                        keyExtractor={({ id }, index) => id}
                        renderItem={({ item }) => (
                          <TouchableOpacity
                            style={{
                              width: "95%",
                              marginBottom: 15,
                              alignSelf: "center",
                            }}
                            onPress={() =>
                              rider(
                                item.first_name + " " + item.last_name,
                                item.address,
                                item.id
                              )
                            }
                            // onPress = {() => navigation.navigate("PendingDetails" , {Due_Date : item.due_date , Invoice_Total : item.grand_total,Carrier_Name : item.carrier_company ,Load_Type : item.load_type,Origin_City : item.Origin_city,Destination_City : item.Destination_city,Delivery_Option : item.Delivery_Option,Cargo_Amount : item.Cargo_amount,Cargo_Type : item.Cargo_Type,Cargo_Product_Type : item.Cargo_Product_type,Cargo_Product_List : item.Cargo_Product_List,Booking_Status : item.booking_status})}
                            // onPress={() =>
                            // navigation.navigate("PaymentHistoryDetail")
                            // }
                          >
                            <Card
                              style={{
                                borderRadius: 15,
                                padding: 10,
                              }}
                            >
                              <View
                                style={{
                                  // borderRadius: 10,
                                  // backgroundColor: "white",
                                  // overflow: "hidden",

                                  flexDirection: "column",
                                  // justifyContent: "flex-start",
                                  // alignSelf: "center",

                                  // marginTop: 10,
                                  // shadowColor: "#000",
                                  // shadowOffset: { width: 0, height: 2 },
                                  // shadowOpacity: 0.25,
                                  // shadowRadius: 3.84,
                                  // elevation: 5,
                                }}
                              >
                                <View style={{ flexDirection: "row" }}>
                                  <View
                                    style={{
                                      padding: 10,
                                      width: "100%",
                                      // alignSelf: "center",
                                      // alignItems: "center",
                                      justifyContent: "flex-start",
                                    }}
                                  >
                                    <Text
                                      style={{
                                        fontSize: 20,
                                        fontWeight: "bold",
                                        color: Colors.darkRedColor,
                                        // marginTop: "4%",
                                      }}
                                    >
                                      {item.first_name} {item.last_name}
                                    </Text>

                                    <View
                                      style={{
                                        // width: 200,
                                        flexDirection: "row",
                                        alignItems: "center",

                                        marginTop: "1.5%",
                                      }}
                                    >
                                      <Text
                                        style={{
                                          fontSize: 14,
                                          color: "grey",
                                          width: 240,
                                        }}
                                      >
                                        {item.address}
                                      </Text>
                                    </View>
                                  </View>
                                  <View style={{ alignSelf: "center" }}>
                                    <Text
                                      style={{
                                        marginBottom: 3,
                                        fontSize: 14,
                                        alignSelf: "flex-end",
                                        marginRight: 10,
                                        fontWeight: "bold",
                                      }}
                                    ></Text>
                                    {/* <Text style={{ fontSize:12,alignSelf:'flex-end', color: "white",backgroundColor:Colors.darkRedColor,borderRadius:10,padding:5,}}>
  {item.status}
  </Text> */}
                                  </View>
                                </View>
                              </View>
                            </Card>
                          </TouchableOpacity>
                        )}
                      />
                    )}
                  </View>
                </BottomSheet>

                <Card
                  style={{
                    padding: 10,
                    marginLeft: 5,
                    width: "50%",
                    backgroundColor: "#e6e6e6",
                    elevation: 0,
                    borderRadius: 7,
                  }}
                >
                  <TouchableOpacity
                    // style={{width:"95%",marginBottom:15,alignSelf:'center'}}
                    // onPress={()=>rider(item.first_name+" "+item.last_name,item.address,item.id)}
                    onPress={s_toggleBottomNavigationView}
                  >
                    <Text style={{ color: Colors.themeColor, fontSize: 12 }}>
                      Delivery Address:
                    </Text>
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                      {businessName}
                    </Text>
                    <Text style={{ fontSize: 12, color: "#666666" }}>
                      {AddressName}
                    </Text>
                  </TouchableOpacity>
                </Card>

                <BottomSheet
                  visible={s_visible}
                  //setting the visibility state of the bottom shee
                  onBackButtonPress={s_toggleBottomNavigationView}
                  //Toggling the visibility state on the click of the back botton
                  onBackdropPress={s_toggleBottomNavigationView}
                  //Toggling the visibility state on the clicking out side of the sheet
                >
                  {/*Bottom Sheet inner View*/}
                  <View style={styles.bottomNavigationView}>
                    {loading ? (
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          // alignSelf:'center',
                          marginTop: "20%",
                        }}
                      >
                        <Text
                          style={{
                            color: Colors.themeColor,
                            fontWeight: "bold",
                            marginTop: 20,
                            fontSize: 25,
                            textAlign: "center",
                          }}
                        >
                          Please Add Your Address at Business Detail Screen
                        </Text>
                      </View>
                    ) : (
                      <FlatList
                        nestedScrollEnabled={true}
                        data={businessData}
                        style={{ padding: 10 }}
                        showsVerticalScrollIndicator={false}
                        // keyExtractor={item => item.index_id.toString()}
                        keyExtractor={({ id }, index) => id}
                        renderItem={({ item }) => (
                          <View>
                            <TouchableOpacity
                              style={{
                                width: "95%",
                                marginBottom: 15,
                                alignSelf: "center",
                              }}
                              onPress={() => {
                                setSelectedBusinessId(item.id);
                                setAddressName(item.address);
                                setBusinessName(item.name);
                                s_toggleBottomNavigationView();
                              }}
                              // onPress = {() => navigation.navigate("PendingDetails" , {Due_Date : item.due_date , Invoice_Total : item.grand_total,Carrier_Name : item.carrier_company ,Load_Type : item.load_type,Origin_City : item.Origin_city,Destination_City : item.Destination_city,Delivery_Option : item.Delivery_Option,Cargo_Amount : item.Cargo_amount,Cargo_Type : item.Cargo_Type,Cargo_Product_Type : item.Cargo_Product_type,Cargo_Product_List : item.Cargo_Product_List,Booking_Status : item.booking_status})}
                              // onPress={() =>
                              // navigation.navigate("PaymentHistoryDetail")
                              // }
                            >
                              <Card style={{ borderRadius: 15, padding: 10 }}>
                                <View
                                  style={{
                                    // borderRadius: 10,
                                    // backgroundColor: "white",
                                    // overflow: "hidden",

                                    flexDirection: "column",
                                    // justifyContent: "flex-start",
                                    // alignSelf: "center",

                                    // marginTop: 10,
                                    // shadowColor: "#000",
                                    // shadowOffset: { width: 0, height: 2 },
                                    // shadowOpacity: 0.25,
                                    // shadowRadius: 3.84,
                                    // elevation: 5,
                                  }}
                                >
                                  <View style={{ flexDirection: "row" }}>
                                    <View
                                      style={{
                                        padding: 10,
                                        width: "100%",
                                        // alignSelf: "center",
                                        // alignItems: "center",
                                        justifyContent: "flex-start",
                                      }}
                                    >
                                      <Text
                                        style={{
                                          fontSize: 20,
                                          fontWeight: "bold",
                                          color: Colors.darkRedColor,
                                          // marginTop: "4%",
                                        }}
                                      >
                                        {item.name}
                                      </Text>

                                      <View
                                        style={{
                                          // width: 200,
                                          flexDirection: "row",
                                          alignItems: "center",

                                          marginTop: "1.5%",
                                        }}
                                      >
                                        <Text
                                          style={{
                                            fontSize: 14,
                                            color: "grey",
                                            width: 240,
                                          }}
                                        >
                                          {item.address}
                                        </Text>
                                      </View>
                                    </View>
                                    <View style={{ alignSelf: "center" }}>
                                      <Text
                                        style={{
                                          marginBottom: 3,
                                          fontSize: 14,
                                          alignSelf: "flex-end",
                                          marginRight: 10,
                                          fontWeight: "bold",
                                        }}
                                      ></Text>
                                      {/* <Text style={{ fontSize:12,alignSelf:'flex-end', color: "white",backgroundColor:Colors.darkRedColor,borderRadius:10,padding:5,}}>
  {item.status}
  </Text> */}
                                    </View>
                                  </View>
                                </View>
                              </Card>
                            </TouchableOpacity>
                          </View>
                        )}
                      />
                    )}
                  </View>
                </BottomSheet>
              </View>
              {/* <View
                style={{
                  flexDirection: "row",
                  marginBottom: "5%",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    paddingTop: Platform.OS == "ios" ? 55 : 15,
                    paddingLeft: 15,
                  }}
                >
                  <Image
                    source={
                      ClientImage == ""
                        ? require("../assets/profilelogo.png")
                        : { uri: ClientImage }
                    }
                    style={{
                      width: Platform.OS == "ios" ? 130 : 80,
                      height: Platform.OS == "ios" ? 130 : 80,
                      borderRadius:60
                    }}
                  />
                </View>

                <View
                  style={{
                    paddingTop: Platform.OS == "ios" ? 25 : 0,
                    paddingLeft: 12,
                    alignSelf: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "black",
                      fontWeight: "bold",
                      borderBottomWidth: 2,
                      borderBottomColor: Colors.textGreyColor,
                      fontSize: Platform.OS == "android" ? 20 : 22,
                      alignSelf: "center",
                      width: 230,
                    }}
                  >
                    {boxData.client}
                  </Text>
                  <Text style={{ fontSize: 13, marginTop: 2 }}>
                    Order No: {boxData.purchase_order_no}
                  </Text>
                </View> */}
              {/* </View> */}
            </View>
            
               {/* <View
                style={{
                  flexDirection: "row",
                  alignSelf: "center",
                  // padding: 5,
                }}
              > */}
                <View style={{flexDirection: "row",
                  alignSelf: "center",
                  padding: 20,}}>
                <Card
                  style={{
                    padding: 5,
                    // paddingLeft:0,
                    // marginLeft: 10,
                    width: "50%",
                    backgroundColor: "white",
                    elevation: 0,
                  }}
                >
                  <View style={{ padding: 5 }}>
                    <TouchableOpacity onPress={showDatepicker}>
                      <Text style={{ color: Colors.themeColor, fontSize: 12 }}>
                        Delivery Date:
                      </Text>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "bold",
                          textAlign: "center",
                        }}
                      >
                        {date.getDate() +
                          "-" +
                          (date.getMonth() + 1) +
                          "-" +
                          date.getFullYear()}
                      </Text>
                    </TouchableOpacity>
                    {show && (
                      // <DatePicker
                      // defaultDate={new Date(yearr, monthh, datee)}
                      // minimumDate={new Date(yearr, monthh, datee)}
                      // maximumDate={new Date(2021, 12, 31)}
                      // // formatChosenDate={(date) => {
                      // // return moment(date).format("YYYY-MM-DD");
                      // // }}
                      // locale={"en"}
                      // timeZoneOffsetInMinutes={undefined}
                      // modalTransparent={false}
                      // animationType={"fade"}
                      // androidMode={"default"}
                      // textStyle={{ color: "green" }}
                      // placeHolderTextStyle={{ color: "#d3d3d3" }}
                      // onDateChange={(itemValue, itemIndex) => {
                      // setPickUpDate(itemValue);
                      // }}
                      // disabled={false}
                      // />
                      <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        // defaultDate={new Date()}
                        minimumDate={new Date()}
                        is24Hour={true}
                        style={{ color: Colors.themeColor }}
                        display="default"
                        // dateFormat="day month year"
                        onChange={onChange}
                      />
                    )}
                  </View>
                </Card>

                <Card
                  style={{
                    padding: 5,
                    marginLeft: 10,
                    width: "50%",
                    backgroundColor: "white",
                    elevation: 0,
                  }}
                >
                  <View style={{ padding: 5 }}>
                    <TouchableOpacity onPress={showTimepicker}>
                      <Text style={{ color: Colors.themeColor, fontSize: 12 }}>
                        Delivery Time:
                      </Text>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "bold",
                          textAlign: "center",
                        }}
                      >
                        {date.getHours() + ":" + date.getMinutes()}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </Card>
                </View>
                {/* <View
              style={{
                flexDirection: "row",
                borderBottomColor: Colors.textGreyColor,
                borderBottomWidth: 1,
                width: "90%",
                alignSelf: "center",
              }}
            >
              
              <View style={{ alignSelf: "center", marginLeft: "5%" }}>
                <View
                  style={{
                    backgroundColor: Colors.themeColor,
                    height: 17,
                    borderRadius: 2,
                    width: "40%",
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 12,
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    {dataStatus.toUpperCase()}
                  </Text>
                </View>
                <Text style={{ color: Colors.productGrey, fontSize: 14 }}>
                  Delivery Address:{" "}
                </Text>
                <Text style={{ fontSize: 16, width: 210 }}>
                  {boxData.business_address}
                </Text>
              </View>
            </View> */}


                    <View
                      style={{
                        flexDirection: "row",
                        marginTop: 10,
                        //justifyContent: "center",
                        width: "100%",
                      }}
                    >
                      <Text
                        style={{
                          color: Colors.themeColor,
                          width: "30%",
                          textAlign: "center",

                          fontSize: 14,
                        }}
                      >
                        Product
                      </Text>
                      <Text
                        style={{
                          color: Colors.textGreyColor,
                          width: "20%",
                          textAlign: "center",

                          fontSize: 14,
                        }}
                      >
                        Unit
                      </Text>
                      <Text
                        style={{
                          color: Colors.themeColor,
                          width: "20%",

                          fontSize: 14,
                          textAlign: "center",
                        }}
                      >
                        Quantity
                      </Text>
                      <Text
                        style={{
                          color: Colors.textGreyColor,
                          width: "20%",

                          fontSize: 14,
                          textAlign: "center",
                        }}
                      >
                        Price Per Unit
                      </Text>

                      {/* <SafeAreaView> */}
                      {/* <View style={styles.container}> */}

                      {/* </View> */}
                      {/* </SafeAreaView> */}
                    </View>

            <View
              style={{
                // borderBottomColor: Colors.textGreyColor,
                // borderBottomWidth: 2,
                marginBottom: 10,
              }}
            >
              <FlatList
                data={boxDetail}
                keyExtractor={(item) => item.product_id}
                renderItem={(itemData) => (
                  <OrderCartItem
                    id={itemData.item.product_id}
                    quantity={itemData.item.quantity}
                    total_amount={itemData.item.total_amount}
                    name={itemData.item.product_name}
                    unit={itemData.item.product_unit}
                    price={itemData.item.avg_price}
                  />
                )}
              />
              <View style={{ flexDirection: "row", paddingTop: 70 }}>
                    <Text
                      style={{ color: Colors.themeColor,fontWeight:'bold',width:"50%",marginLeft:"8%"}}
                    >
                      Total:
                    </Text>
                    <Text style={{ color: Colors.themeColor, fontWeight:'bold',width:"15%" }}>
                      {totalQuantity}
                    </Text>
                    <Text style={{ color: Colors.textGreyColor,width:"27%" }}>
                    
                    </Text>
                  </View>
              {/* <View style={{ flexDirection: "row" }}>
                <Text style={{ color: Colors.themeColor, marginLeft: "15%" }}>
                  Total Packages:
                </Text>
                <Text style={{ color: Colors.themeColor, marginLeft:Platform.OS=="android"?35:55 }}>
                  {totalQuantity}
                </Text>
              </View> */}
            </View>

            <TouchableOpacity
              style={{
                alignSelf: "center",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
                width: "80%",
                marginTop:30,
                height: 40,
                backgroundColor: Colors.themeColor,
              }}
              onPress={resend}
              disabled={sendButtonCheck}
            >
              {buttonLoading ? (
                <Spinner color={"white"} />
              ) : (
                <Text style={{ color: "white",fontWeight:'600' }}>Resend Order</Text>
              )}
              
            </TouchableOpacity>
          </Content>
        )}

        {/* )}
        {/* <View style={{flexDirection:'row'}}>
            <Text style={{color:Colors.themeColor,marginLeft:"35%"}}>Total Price:</Text>
            <Text style={{color:Colors.themeColor,marginLeft:50}}>78656/-</Text>
        </View> */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: '#EE0202',
  },
  activityIndicator: {
    // backgroundColor:'#FFF',
    // alignItems: 'center',
    // justifyContent: 'center',
    // alignSelf:"center",
    fontSize: 25,
    width: "60%",
    color: Colors.accentColor,
  },

  spinner: {
    //flex: 1,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    // paddingTop: 30,
    //backgroundColor: '#ecf0f1',
    //padding: 8,
  },

  signupContianer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  signupText: {
    fontSize: 14,
    fontWeight: "bold",
    // color:'rgba(255,255,255, 0.7)',
    color: "black",
  },
  signupButton: {
    fontWeight: "bold",
    backgroundColor: "#EE0202",
    fontSize: 20,
    width: 100,
    height: 30,
    borderRadius: 25,
  },
  header: {
    flex: 1,
    width: "100%",
    //backgroundColor:'#EE0202',
    justifyContent: "center",
    alignItems: "center",
  },

  footer: {
    backgroundColor: "#ffffff",
    // borderTopLeftRadius: 30,
    // borderTopRightRadius: 30,
    //paddingVertical: 10,
    // paddingHorizontal: 60,
  },
  g_container: {
    // flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputArea: {
    marginVertical: 15,
    height: 40,
    width: "100%",
    backgroundColor: "white",
    borderColor: Colors.textGreyColor,
    borderWidth: 2,

    borderRadius: 5,
    paddingHorizontal: 30,
  },
  button: {
    height: 40,
    width: 300,
    backgroundColor: Colors.themeColor,
    justifyContent: "center",
    borderRadius: 25,
    marginVertical: 20,
  },
  s_button: {
    height: 40,
    width: 300,
    backgroundColor: Colors.themeColor,
    justifyContent: "center",
    borderRadius: 25,
    //   marginVertical: 5,
  },

  buttonText: {
    fontSize: 20,
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "center",
  },
  bottomNavigationView: {
    backgroundColor: "#F2F1F3",
    width: "100%",
    height: "100%",

    // justifyContent: 'center',
    //alignItems: 'center',
  },
  note_inputArea: {
    alignSelf: "center",
    marginVertical: 10,
    height: 60,
    width: "100%",
    backgroundColor: "#E6E6E6",
    borderRadius: 10,
    paddingHorizontal: 30,
  },
});

export default RejectedOrdersStatus;
