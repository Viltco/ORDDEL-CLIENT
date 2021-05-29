import React, { useState, useEffect } from "react";
import {
  StyleSheet, 
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  SafeAreaView,
  BackHandler,
  Platform,
  Alert
} from "react-native";
import {
  Container,
  Card,
  CardItem,
  Header,
  Content,
  Left,
  Footer,
  Body,
  Right,
  Button,
  Drawer,
  Title,
  Text,
  Item,
  Input,
  Spinner,
} from "native-base";
// import Toast from "react-native-simple-toast";
import DropdownAlert from 'react-native-dropdownalert';
import { useRoute, useFocusEffect } from "@react-navigation/native";

// import { ScrollView } from 'react-native-gesture-handler';
//import PreviousShipments from '../shipment/PreviousShipments'
import { useSelector, useDispatch } from "react-redux";
import * as ApiDataAction from "../../store/actions/ApiData";
import AsyncStorage from "@react-native-community/async-storage";
import URL from "../../api/ApiURL";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MyHeader from "../../components/MyHeader";
import { useIsFocused } from "@react-navigation/native";

import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Colors from "../../ColorCodes/Colors";
// import { SafeAreaView } from 'react-native-safe-area-context';
const Dashboard = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [imageLoading, setImageLoading] = useState(false);
  const [statusCode,setStatusCode] = useState("");
  const [resMessage, setResMessage] = useState("");

  const [deliveryPerson, setDeliveryPerson] = useState();
  const [deliveryPersonName, setDeliveryPersonName] = useState("");

  const [deliveryPersonAddress, setDeliveryPersonAddress] = useState("");



  const isFocused = useIsFocused();

  const ClientId = useSelector((state) => state.ApiData.ClientId);
  const ClientName = useSelector((state) => state.ApiData.ClientName);
  const ClientImage = useSelector((state) => state.ApiData.ClientImage);
  const ClientPackage = useSelector((state) => state.ApiData.ClientPackage);
  const CompletedOrders = useSelector((state) => state.ApiData.CompletedOrders);
  const ProgressOrders = useSelector((state) => state.ApiData.ProgressOrders);
  const PendingOrders = useSelector((state) => state.ApiData.PendingOrders);
  const RemainingInvoices = useSelector(
    (state) => state.ApiData.RemainingInvoices
  );


const [productList,setProductList]=useState("");


  const TotalInvoices = useSelector((state) => state.ApiData.TotalInvoices);
  const UsedInvoices = useSelector((state) => state.ApiData.UsedInvoices);
  const PoNumber = useSelector((state) => state.ApiData.PoNumber);
  const OrderId = useSelector((state) => state.ApiData.OrderId);
    const [orderBoxId,setOrderBoxId]=useState("");
console.log(RemainingInvoices,"Remaining ---------------------------- Invoices")
  console.log(CompletedOrders);

  const [data, setData] = useState("");
  //const { params } = route.params
  var dataa = 0;
  var getToken = async () => {
    if (OrderId == null || OrderId == "") {
      try {
        let OrderBoxID = await AsyncStorage.getItem("OrderBoxId");

        //let userPass = await AsyncStorage.getItem("passData");

        let datae = JSON.parse(OrderBoxID);
        console.log("datae", datae);
        dispatch(ApiDataAction.SetOrderBoxId(datae));

        // console.log("my",datae)

        // setMyOrderBoxId(datae);
        // let datap = JSON.parse(userPass);
        // setPassword(datap)
        //   return datae;
        //console.log(datae , datap);
        // if(datae != null && datap != null){

        // loadData()
        // }
      } catch (error) {
        console.log("Something went wrong", error);
      }
    }
  };
  useEffect(() => {
    
    //   console.log("hi---------------")
    // console.log(PoNumber,"-----");
    // console.log(OrderId,"------")
    if(ClientId!=0){

      fetch(URL + "/client_app/check_first_login/" + ClientId + "/")
      // fetch(URL+'/client_app/clients_list/33/')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(
          "First Loginnnnnnnnnnnnnnn:",
          responseJson.first_login
        );
        if(responseJson.first_login==true){
          Alert.alert("Congratulations", "You have been awarded with UNLIMITED INVOICE on your first signup.", [
            {
              text: "Okay",
              onPress: () => null,
              style: "cancel"
            },
            // { text: "YES", onPress: () => BackHandler.exitApp() }
          ]);
          // alert("After Admin Approval, You have been awarded with UNLIMITED INVOICE on your first signup.");
        }
        // console.log("Dashboard:", responseJson);
        // console.log("Dashboard:",responseJson.client_dashboard.client_name);
        //console.log("Buisness Detail:",responseJson.client_businesses[0]['name']);
        // if (json["response"] == "Record does not exist or not found") {
        //   setLoading(true);
        // } else {
        // console.log("=======",)
        // dispatch(ApiDataAction.SetListData(responseJson));
        // dataa = responseJson;
        // setData(responseJson);
        // setDeliveryPerson(responseJson.client_dashboard.preferred_delivery_person)
        // setDeliveryPersonName(responseJson.client_dashboard.preferred_delivery_person_name)
        // setDeliveryPersonAddress(responseJson.client_dashboard.preferred_delivery_person_address)
 
        //   //console.log(json);
        // }
      })
      .catch((error) => console.error(error));




      fetch(URL + "/client_app/client_dashboard/" + ClientId + "/")
      // fetch(URL+'/client_app/clients_list/33/')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(
          "Dashboard:",
          responseJson.client_dashboard.no_of_pending_orders
        );
        console.log("Dashboard:", responseJson);
        // console.log("Dashboard:",responseJson.client_dashboard.client_name);
        //console.log("Buisness Detail:",responseJson.client_businesses[0]['name']);
        // if (json["response"] == "Record does not exist or not found") {
        //   setLoading(true);
        // } else {
        // console.log("=======",)
        dispatch(ApiDataAction.SetListData(responseJson));
        dataa = responseJson;
        setData(responseJson);
        setDeliveryPerson(responseJson.client_dashboard.preferred_delivery_person)
        setDeliveryPersonName(responseJson.client_dashboard.preferred_delivery_person_name)
        setDeliveryPersonAddress(responseJson.client_dashboard.preferred_delivery_person_address)
 
        //   //console.log(json);
        // }
      })
      .catch((error) => console.error(error));

      fetch(URL + "/order/get_order_box/" + ClientId + "/")
      // fetch(URL+'/client_app/clients_list/33/')
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log(
        //   "Dashboard:",
        //   responseJson
        // );
        console.log("OrderBoxId:", responseJson);
        setOrderBoxId(responseJson.order_box);
        if(responseJson.order_box!=""){
          dispatch(ApiDataAction.SetOrderBoxId(responseJson.order_box));
          fetch(URL + "/order/get_po_number/" + responseJson.order_box + "/")
        // fetch(URL+'/client_app/clients_list/33/')
        .then((response) => response.json())
        .then((responseJson) => {
          dispatch(ApiDataAction.SetPoNumber(responseJson.po_number));
          // state.PoNumber=responseJson.po_number;
          // console.log("PO number:",responseJson.po_number);
        });

        }
        
      })
      .catch((error) => console.error(error));


      if (ClientImage == "") {
        setImageLoading(true);
  
        fetch(URL + "/client_app/get_client_logo/" + ClientId + "/")
          // fetch(URL+'/client_app/clients_list/33/')
          .then((response) => response.json())
          .then((responseJson) => {
            console.log(" Getting Image:", responseJson);
            dispatch(ApiDataAction.SetImage(responseJson.image));
            setImageLoading(false);
  
            // setImageCheck(false);
            // setImage(responseJson.image);
          })
          .catch((error) => console.error(error));
      }

      fetch(URL + "/product/product_list/?client_id="+ClientId)
      .then((response) => response.json())
      .then((responseJson) => {
        // const {results: films} = json;
        // console.log("product_list",responseJson)
        dispatch(ApiDataAction.SetList(responseJson));
        setProductList(responseJson);
        // setUnits(responseJson);
        //setting the data in the films state
      })
      .catch((e) => {
        alert(e);
      });

    }
    

    
    // getToken();
    // .finally(() => setIsLoading(false));

    //console.log(data)
  }, [OrderId, isFocused]);

  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        Alert.alert("Hold on!", "Are you sure you want to go back?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel"
          },
          { text: "YES", onPress: () => BackHandler.exitApp() }
        ]);
        return true;
      };
  
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
  
      return () => backHandler.remove();
    }, [route])
  );
  // const dispatch = useDispatch();
  // const [listResponse,setListResponse]=useState("");
  // const ClientId=useSelector(state=>state.ApiData.ClientId);
  // import { ScrollView } from 'react-native-gesture-handler';
  // import PreviousShipments from '../shipment/PreviousShipments'
  // import AsyncStorage from '@react-native-community/async-storage'
  // import URL from '../../api/ApiURL'
  // import { SafeAreaView } from 'react-native-safe-area-context';
  var check = true;
  var storeToken = async (id) => {
    try {
      await AsyncStorage.setItem("OrderBoxId", JSON.stringify(id));
      //  console.log("Settoken",id);
      dispatch(ApiDataAction.SetOrderBoxId(id));
      //  state.OrderId=id;
      // setMyOrderBoxId(datae);
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };

  const apiFunc = () => {
    console.log("Called", RemainingInvoices)
    if(RemainingInvoices != 0){
      console.log("OrderBoxxxxx",orderBoxId);
    if (orderBoxId == "") {
      fetch(URL + "/order/create_order_box/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: ClientId,
        }),
      })
        .then(async (response) => {
          let data = await response.json();

          // console.log("oooodddeerrr",data)
          // console.log("Create",data )
          // console.log("status code",response.status)
          // console.log("status data",data)
          setStatusCode(response.status)
          if (response.status == 201) {
              setResMessage("")
              fetch(URL + "/order/get_po_number/" + data.cart.id + "/")
              // fetch(URL+'/client_app/clients_list/33/')
              .then((response) => response.json())
              .then((responseJson) => {
                dispatch(ApiDataAction.SetPoNumber(responseJson.po_number));
                // state.PoNumber=responseJson.po_number;
                // console.log("PO number:",responseJson.po_number);
              });
            //state.OrderId=data.cart.id;
            // AsyncStorage.clear();
            // console.log("data.cart.id",data.cart.id);
                                           // storeToken(data.cart.id);
        // navigation.navigate("CreateNewOrder",{id: deliveryPerson , name : deliveryPersonName, address: deliveryPersonAddress});


            //AsyncStorage.setItem(state.OrderId, data.cart.id)

            //console.log("OrderBox",state.OrderId);
            //dispatch(ApiDataActions.SetLoginData(data));
            //navigation.navigate("MyDrawer");
          } else {
            console.log("execption: ",data.message);
            alert(data.message);
            // Toast.show(data.message, Toast.LONG);
            setResMessage(data.message)
         
          }
        

          // code that can access both here
        })
        .catch((error) => console.log("Something went wrong", error));
    }
    // if (resMessage != "") {

  navigation.navigate("CreateNewOrder",{id: deliveryPerson , name : deliveryPersonName, address: deliveryPersonAddress});
//   }else{
// Toast.show(resMessage, Toast.LONG);

//   }
    // if(PoNumber=="")
    // {
  }else{
    alert("Your Remaining Invoices Are 0 , Please Renew Your Package")
    // Toast.show("Your Remaining Invoices Are 0 , Please Renew Your Package", Toast.LONG);

  }

  };

  //   if(check==true){
  //   fetch(URL+'/client_app/clients_list/'+ClientId+'/')

  //   .then((response) => response.json())
  //   .then((responseJson) => {
  //     //console.log("List: ",responseJson)
  //     setListResponse(responseJson);
  //     check=false;
  //   }) .catch ((error)=>
  //   console.log("Something went wrong", error)
  // )
  //   }
  //   //console.log("listItem",listResponse)
  //   dispatch(ApiDataActions.SetListData(listResponse));

  //const [data, setData] = useState([]);

  // useEffect(() => {
  //   fetch(URL+'/shipper/Return/ShipperList?shipper_id='+shipperId+'&booking_status=pending')
  //     .then((response) => response.json())
  //     .then((response) => setCountPending(response.length))
  //     .catch((error) => console.error(error))
  //     console.log("Pending",countpending)
  //     if(countpending == ""){
  //       console.log(countpending);
  //       setCountPending("0")
  //     }

  //     fetch(URL+'/carrier/shipper/Return/ShipperList?shipper_id='+shipperId+'&booking_status=in_progress')
  //     .then((response) => response.json())
  //     .then((response) => setInProgress(response.length))
  //     .catch((error) => console.error(error))
  //     console.log("InProgress",InProgress)
  //     if(InProgress == ""){
  //       setInProgress('0')
  //     }

  //     fetch(URL+'/carrier/shipper/Return/ShipperList?shipper_id='+shipperId+'&booking_status=complete')
  //     .then((response) => response.json())
  //     .then((response) => setCountCompleted(response.length))
  //     .catch((error) => console.error(error))
  //     console.log("Completed",countCompleted)
  //     if(countCompleted == ""){
  //       setCountCompleted('0')
  //     }

  // }, []);

  return (
    <>

      <SafeAreaView
        style={{ ...styles.topSafeArea, backgroundColor: "white" }}
      />
      <SafeAreaView style={styles.bottomSafeArea}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={Colors.themeColor}
        />
      <DropdownAlert ref={ref => dropDownAlertRef = ref} updateStatusBar={false} />

        {/* <MyHeader name="DASHBOARD" nav={navigation} /> */}
        <ScrollView>
          <View style={styles.header}>
            {/* <View style={{flex:2}}> */}

            {/* </View> */}

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingTop: 20,
              }}
            >
              <View style={{ paddingLeft:'4%', paddingBottom: '5%' }}>
                {imageLoading ? (
                  <Spinner color="white" />
                ) : (
                  <Image
                    source={
                      ClientImage == ""||ClientImage==null
                        ? require("../../assets/profilelogo.png")
                        : { uri: ClientImage }
                    }
                    style={{
                      width: Platform.OS == "ios" ? 100 : 70,
                      height: Platform.OS == "ios" ? 100 : 70,
                      borderRadius: 100,
                    }}
                  />
                )}
              </View>
              {/* <View style={{alignSelf:'center'}}> */}
              {/* <View style={{marginTop:Platform.OS=='ios'? 50: 30, backgroundColor:Colors.yellowColor,width:60}}>
      <Text style={{color:Colors.darkRedColor,fontSize:12,alignSelf:'center'}}>{ClientPackage.toUpperCase()}</Text>
      </View> */}
              <View
                style={{
                   paddingLeft: '2%',
                   marginRight:'3%',
                  alignSelf: "center",
                  marginBottom: 20,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    borderBottomWidth: 3,
                    borderBottomColor: Colors.yellowColor,
                    fontSize: Platform.OS == "android" ? 20 : 20,
                    //numberOfLines='2'
                    alignSelf: "flex-start",
                      width: 230,
                  }}
                >
                  {ClientName}
                </Text>
              </View>

              {/* <View style={{flexDirection:'row',marginTop:5}}>
        <View style={{color:Colors.darkRedColor,backgroundColor:'white',borderRadius:5}}>
        <Text style={{color:Colors.themeColor,fontWeight:'bold',alignSelf:'center',fontSize:Platform.OS=='android'?18:24,padding:5}}>{RemainingInvoices}</Text>
        </View>
        <Text style={{color:'white',height:40,fontSize:Platform.OS=='android'? 14:18,marginLeft:5,width:Platform.OS=='android'?100:null}}>REMAINING INVOICES</Text>
        <View style={{color:Colors.darkRedColor,backgroundColor:'white',borderRadius:5}}>
        <Text style={{color:Colors.themeColor,fontWeight:'bold',alignSelf:'center',fontSize:Platform.OS=='android'?18:24,padding:5}}>{UsedInvoices}</Text>
        </View>
        <Text style={{color:'white',width:90,height:40,fontSize:Platform.OS=='android'? 14:18,marginLeft:5}}>USED INVOICES</Text>
      
      </View> */}

              {/* </View> */}
            </View>
          </View>

          <View style={styles.footer}>
            <View style={{ width: "100%", height: "40%" }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "space-around",
                  padding: 35,
                  justifyContent: "space-around",
                }}
              >
                <View style={{ flexDirection: "column", width: "30%" }}>
                  <View style={{ flexDirection: "row", alignSelf: "center" }}>
                    <View style={{ alignSelf: "center" }}>
                      <MaterialIcons
                        name="hourglass-top"
                        style={{ color: Colors.themeColor }}
                        size={Platform.OS == "android" ? 35 : 40}
                      />
                    </View>
                    <Text
                      style={{ fontSize: Platform.OS == "android" ? 40 : 45 }}
                    >
                      {ProgressOrders}
                    </Text>
                  </View>
                  <View
                    style={{
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        width: 90,
                        textAlign: "center",
                        fontWeight: "bold",
                        fontSize: Platform.OS == "android" ? 14 : 13,

                        color: Colors.productGrey,
                      }}
                    >
                      IN PROGRESS ORDERS
                    </Text>
                  </View>
                </View>

                <Text
                  style={{
                    height: "100%",
                    width: 1,
                    backgroundColor: Colors.textGreyColor,
                    marginLeft: "2%",
                  }}
                ></Text>
                <View
                  style={{
                    flexDirection: "column",
                    width: "40%",
                    alignItems: "center",
                  }}
                >
                  <View style={{ flexDirection: "row", alignSelf: "center" }}>
                    <View style={{ alignSelf: "center" }}>
                      <MaterialCommunityIcons
                        name="check-box-multiple-outline"
                        color={Colors.themeColor}
                        size={Platform.OS == "android" ? 35 : 40}
                      />
                    </View>
                    <Text
                      style={{ fontSize: Platform.OS == "android" ? 40 : 45 }}
                    >
                      {CompletedOrders}
                    </Text>
                  </View>
                  <Text
                    style={{
                      width: 90,
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: Platform.OS == "android" ? 14 : 13,

                      color: Colors.productGrey,
                    }}
                  >
                    COMPLETED ORDERS
                  </Text>
                </View>
                <Text style={styles.verticleLine}></Text>

                <View
                  style={{
                    flexDirection: "column",
                    width: "30%",
                    alignSelf: "center",
                  }}
                >
                  <View style={{ flexDirection: "row", alignSelf: "center" }}>
                    <View style={{ alignSelf: "center" }}>
                      <MaterialCommunityIcons
                        name="clock-time-four-outline"
                        color={Colors.themeColor}
                        size={Platform.OS == "android" ? 35 : 40}
                      />
                    </View>
                    <Text
                      style={{
                        fontSize: Platform.OS == "android" ? 40 : 45,
                      }}
                    >
                      {PendingOrders}
                    </Text>
                  </View>
                  <Text
                    style={{
                      width: 90,
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: Platform.OS == "android" ? 14 : 13,

                      color: Colors.productGrey,
                    }}
                  >
                    PENDING ORDERS
                  </Text>
                </View>
              </View>
            </View>
            {/* <View style={{flexDirection:'row',paddingTop:20,alignSelf:'center'}}>
    <View style={{flexDirection:'column'}}>
    <View style={{flexDirection:'row'}}>
    <MaterialIcons name="hourglass-top" color = {Colors.themeColor} size={Platform.OS=='android'?50:70} />
    <Text style={{fontSize:Platform.OS=='android'? 45:55}}>{ProgressOrders}</Text>
    </View>
    <Text style={{width:140}}>IN PROGRESS ORDERS</Text>
    </View>
    <Text style={styles.verticleLine}></Text>
    <View style={{flexDirection:'column',marginLeft:'8%'}}>
    <View style={{flexDirection:'row'}}>
    <MaterialCommunityIcons name="check-box-multiple-outline" color = {Colors.themeColor} size={Platform.OS=='android'?50:70} />
    <Text style={{fontSize:Platform.OS=='android'? 45:55}}>{CompletedOrders}</Text>
    </View>
    <Text style={{width:100,marginLeft:10}}>COMPLETED ORDERS</Text>
    </View>
    </View> */}

            <View
              style={{
                alignItems: "center",
                height: "60%",
                width: "100%",
                bottom: 30,
              }}
            >
              <TouchableOpacity
                onPress={apiFunc}
                style={{
                  marginTop: 0,
                  justifyContent: "center",
                  backgroundColor: Colors.themeColor,
                  width: "86%",
                  height: 70,
                  borderRadius: 12,
                }}
              >
                <View style={{ alignSelf: "center", flexDirection: "row" }}>
                  <Ionicons
                    name="ios-add-circle-outline"
                    color="white"
                    size={Platform.OS == "android" ? 25 : 30}
                    style={{ alignSelf: "center" }}
                  />
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      justifyContent: "center",
                      marginLeft: 5,
                      fontSize: 20,
                    }}
                  >
                    Create New Order
                  </Text>
                </View>
              </TouchableOpacity>

              <View
                style={{ flexDirection: "row", marginTop: "2%", height: 100 }}
              >
                <TouchableOpacity
                  onPress={() => navigation.navigate("PendingOrders")}
                  style={{
                    justifyContent: "center",
                    backgroundColor: Colors.themeColor,
                    padding: 10,
                    borderRadius: 12,
                    width: "42%",
                  }}
                >
                  <View
                    style={{ alignSelf: "center", flexDirection: "column" }}
                  >
                    {/* <MaterialIcons
                      name="hourglass-top"
                      color="white"
                      size={Platform.OS == "android" ? 40 : 50}
                      style={{ alignSelf: "center" }}
                    /> */}
                    <Image
                      source={require("../../assets/pendingDashboard.png")}
                      style={{
                        alignSelf: "center",
                        width: Platform.OS == "ios" ? 40 : 40,
                        height: Platform.OS == "ios" ? 40 : 40,
                      }}
                    />
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        textAlign: "center",
                        fontSize: 16,
                      }}
                    >
                      Pending Orders
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.navigate("InProgressListOrders")}
                  style={{
                    justifyContent: "center",
                    backgroundColor: Colors.themeColor,
                    padding: 10,
                    borderRadius: 12,
                    marginLeft: "2%",

                    width: "42%",
                  }}
                >
                  <View
                    style={{ alignSelf: "center", flexDirection: "column" }}
                  >
                    <MaterialIcons
                      name="hourglass-top"
                      color="white"
                      size={Platform.OS == "android" ? 40 : 40}
                      style={{ alignSelf: "center" }}
                    />
                    <View
                      style={{
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontWeight: "bold",
                          textAlign: "center",
                          fontSize: 16,

                          width: "100%",
                        }}
                      >
                        In Progress Orders
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  marginTop: "2%",
                  height: 100,

                  width: "85%",
                }}
              >
                {/* <TouchableOpacity
                  onPress={() => navigation.navigate("InProgressListOrders")}
                  style={{
                    justifyContent: "center",
                    backgroundColor: Colors.themeColor,
                    padding: 10,
                    borderRadius: 12,

                    width: "42%",
                  }}
                >
                  <View
                    style={{ alignSelf: "center", flexDirection: "column" }}
                  >
                    <MaterialIcons
                      name="hourglass-top"
                      color="white"
                      size={Platform.OS == "android" ? 50 : 50}
                      style={{ alignSelf: "center" }}
                    />
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      In Progress Orders
                    </Text>
                  </View>
                </TouchableOpacity> */}

                <TouchableOpacity
                  onPress={() => navigation.navigate("CompletedOrdersList")}
                  style={{
                    justifyContent: "center",
                    //marginLeft: "2%",
                    backgroundColor: Colors.themeColor,
                    padding: 10,
                    borderRadius: 12,
                    width: "49%",
                  }}
                >
                  <View
                    style={{ alignSelf: "center", flexDirection: "column" }}
                  >
                    <MaterialCommunityIcons
                      name="check-box-multiple-outline"
                      color="white"
                      style={{ alignSelf: "center" }}
                      size={Platform.OS == "android" ? 40 : 40}
                    />
                    <View
                      style={{
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontWeight: "bold",
                          textAlign: "center",
                          fontSize: 16,
                          width: "100%",
                        }}
                      >
                        Completed Orders
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate("RejectedOrders",{Id: deliveryPerson , name : deliveryPersonName, address: deliveryPersonAddress})}
                  style={{
                    justifyContent: "center",
                    backgroundColor: Colors.themeColor,
                    padding: 10,
                    borderRadius: 12,
                    marginLeft: "2%",

                    width: "49%",
                  }}
                >
                  <View
                    style={{ alignSelf: "center", flexDirection: "column" }}
                  >
                    <MaterialIcons
                      name="phonelink-erase"
                      color="white"
                      size={Platform.OS == "android" ? 40 : 40}
                      style={{ alignSelf: "center" }}
                    />
                    <View
                      style={{
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontWeight: "bold",
                          textAlign: "center",
                          fontSize: 16,

                          width: "100%",
                        }}
                      >
                        Rejected Orders
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    height: "90%",
    width: "100%",
    justifyContent: "center",
  },
  header: {
    flex: 2,
    backgroundColor: Colors.darkRedColor,
  },
  verticleLine: {
    // marginRight:30,
    // marginTop:10,
    height: "100%",
    width: 1,
    backgroundColor: Colors.textGreyColor,
  },

  footer: {
    flex: 5.5,
    width: "100%",
    backgroundColor: "white",
    height: "100%",
    // borderTopLeftRadius: 30,
    // borderTopRightRadius: 30,
    // paddingVertical: 10,
    //paddingHorizontal:Platform.OS === 'android' ?20:40
  },
  topSafeArea: {
    flex: 0,
    backgroundColor: "white",

    // backgroundColor: 'blue'
  },
  bottomSafeArea: {
    flex: 1,
    backgroundColor: "white",

    // backgroundColor: 'red'
  },
});

export default Dashboard;

// import React,{useState ,useEffect} from 'react';
// import { StyleSheet, View,ImageBackground , TouchableOpacity,Image, ScrollView,StatusBar,SafeAreaView} from 'react-native'
// import { Container,Card,CardItem,Header,Content,Left,Footer ,Body, Right, Button,Drawer, Title,Text , Item,Input } from 'native-base';

// // import { ScrollView } from 'react-native-gesture-handler';
// //import PreviousShipments from '../shipment/PreviousShipments'
// import { useSelector, useDispatch } from 'react-redux';
// import * as ApiDataAction from '../../store/actions/ApiData';
// import AsyncStorage from '@react-native-community/async-storage'
// import URL from '../../api/ApiURL';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import MyHeader from '../../components/MyHeader';

// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import Colors from '../../ColorCodes/Colors';
// // import { SafeAreaView } from 'react-native-safe-area-context';
// const Dashboard = ({navigation , route}) => {
//   const dispatch = useDispatch();
//   const ClientId=useSelector(state=>state.ApiData.ClientId);
//   const ClientName=useSelector(state=>state.ApiData.ClientName);
//   const ClientPackage=useSelector(state=>state.ApiData.ClientPackage);
//   const CompletedOrders=useSelector(state=>state.ApiData.CompletedOrders);
//   const ProgressOrders=useSelector(state=>state.ApiData.ProgressOrders);
//   const PendingOrders=useSelector(state=>state.ApiData.PendingOrders);
//   const RemainingInvoices=useSelector(state=>state.ApiData.RemainingInvoices);
//   const TotalInvoices=useSelector(state=>state.ApiData.TotalInvoices);
//   const UsedInvoices=useSelector(state=>state.ApiData.UsedInvoices);
//   const PoNumber=useSelector(state=>state.ApiData.PoNumber);
//   const OrderId=useSelector(state=>state.ApiData.OrderId);

//   const [data,setData]=useState("");
//    //const { params } = route.params
//  var dataa=0;
//  var getToken = async () => {

//   try {
//     let OrderBoxID = await AsyncStorage.getItem("OrderBoxId");

//     //let userPass = await AsyncStorage.getItem("passData");

//       let datae = JSON.parse(OrderBoxID);
//       if(datae==null||datae==""){
//       console.log("datae",datae)
//       // dispatch(ApiDataAction.SetOrderBoxId(datae));
//       }
//       else{
//         dispatch(ApiDataAction.SetOrderBoxId(datae));
//       }

//       // console.log("my",datae)

//       // setMyOrderBoxId(datae);
//       // let datap = JSON.parse(userPass);
//       // setPassword(datap)
//   //   return datae;
//     //console.log(datae , datap);
//     // if(datae != null && datap != null){

//     // loadData()
//     // }
//   } catch (error) {
//     console.log("Something went wrong", error);
//   }

// }
//    useEffect(() => {
//     getToken();
//     //   console.log("hi---------------")
//     // console.log(PoNumber,"-----");
//     // console.log(OrderId,"------")
//     fetch(URL+'/client_app/client_dashboard/'+ClientId+'/')
//     // fetch(URL+'/client_app/clients_list/33/')
//     .then((response) => response.json())
//     .then((responseJson) => {
//           // console.log("Dashboard:",responseJson);
//           // console.log("Dashboard:",responseJson.client_dashboard.client_name);
//           //console.log("Buisness Detail:",responseJson.client_businesses[0]['name']);
//         // if (json["response"] == "Record does not exist or not found") {
//         //   setLoading(true);
//         // } else {
//           // console.log("=======",)
//           dispatch(ApiDataAction.SetListData(responseJson));
//           dataa=responseJson;
//           setData(responseJson);
//         //   //console.log(json);
//         // }
//       })
//       .catch((error) => console.error(error))
//      // .finally(() => setIsLoading(false));

//     //console.log(data)
//   }, [OrderId]);
//   // const dispatch = useDispatch();
//   // const [listResponse,setListResponse]=useState("");
//   // const ClientId=useSelector(state=>state.ApiData.ClientId);
// // import { ScrollView } from 'react-native-gesture-handler';
// // import PreviousShipments from '../shipment/PreviousShipments'
// // import AsyncStorage from '@react-native-community/async-storage'
// // import URL from '../../api/ApiURL'
// // import { SafeAreaView } from 'react-native-safe-area-context';
// var check=true;
// var storeToken = async (id) => {
//   try {

//      await AsyncStorage.setItem("OrderBoxId",JSON.stringify(id));
//     //  console.log("Settoken",id);
//     console.log("=====",id)
//      dispatch(ApiDataAction.SetOrderBoxId(id));
//     //  state.OrderId=id;
//       // setMyOrderBoxId(datae);

//   } catch (error) {
//     console.log("Something went wrong", error);
//   }

// }

// const apiFunc=()=>{

// if(OrderId==""||OrderId==null)
// {
//   fetch(URL+'/order/create_order_box/', {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json'
//     },
//     body:JSON.stringify({
//       client_id:ClientId
//     })
//   })
//   .then( async (response) => {
//     let data = await response.json();
//     // console.log("Create",data )
//       // console.log("status code",response.status)
//       // console.log("status data",data)
//       if(response.status==201)
//       {
//         //state.OrderId=data.cart.id;
//         // AsyncStorage.clear();
//         // console.log("data.cart.id",data.cart.id);
//         storeToken(data.cart.id);

//         //AsyncStorage.setItem(state.OrderId, data.cart.id)

//           //console.log("OrderBox",state.OrderId);
//         //dispatch(ApiDataActions.SetLoginData(data));
//         //navigation.navigate("MyDrawer");
//       }
//       else {
//         alert(response.message);
//       }

//         // code that can access both here

//   })
//   .catch ((error)=>
//     console.log("Something went wrong", error)
//   )
// }
// // if(PoNumber=="")
// // {

//   navigation.navigate("CreateNewOrder");
// }

//   //   if(check==true){
//   //   fetch(URL+'/client_app/clients_list/'+ClientId+'/')

//   //   .then((response) => response.json())
//   //   .then((responseJson) => {
//   //     //console.log("List: ",responseJson)
//   //     setListResponse(responseJson);
//   //     check=false;
//   //   }) .catch ((error)=>
//   //   console.log("Something went wrong", error)
//   // )
//   //   }
//   //   //console.log("listItem",listResponse)
//   //   dispatch(ApiDataActions.SetListData(listResponse));

//   //const [data, setData] = useState([]);

//   // useEffect(() => {
//   //   fetch(URL+'/shipper/Return/ShipperList?shipper_id='+shipperId+'&booking_status=pending')
//   //     .then((response) => response.json())
//   //     .then((response) => setCountPending(response.length))
//   //     .catch((error) => console.error(error))
//   //     console.log("Pending",countpending)
//   //     if(countpending == ""){
//   //       console.log(countpending);
//   //       setCountPending("0")
//   //     }

//   //     fetch(URL+'/carrier/shipper/Return/ShipperList?shipper_id='+shipperId+'&booking_status=in_progress')
//   //     .then((response) => response.json())
//   //     .then((response) => setInProgress(response.length))
//   //     .catch((error) => console.error(error))
//   //     console.log("InProgress",InProgress)
//   //     if(InProgress == ""){
//   //       setInProgress('0')
//   //     }

//   //     fetch(URL+'/carrier/shipper/Return/ShipperList?shipper_id='+shipperId+'&booking_status=complete')
//   //     .then((response) => response.json())
//   //     .then((response) => setCountCompleted(response.length))
//   //     .catch((error) => console.error(error))
//   //     console.log("Completed",countCompleted)
//   //     if(countCompleted == ""){
//   //       setCountCompleted('0')
//   //     }

//   // }, []);

//   return (
//     <>
//     <SafeAreaView style={styles.topSafeArea} />
//     <SafeAreaView style={styles.bottomSafeArea}>
//     <StatusBar barStyle="default" backgroundColor={Colors.themeColor} />
//     <MyHeader name="DASHBOARD" nav={navigation}/>

//     <View style={styles.header}>
//       {/* <View style={{flex:2}}> */}

//     {/* </View> */}

//     <View style={{flexDirection:'row',alignItems:'center',paddingTop:20}}>
//     <View style={{paddingLeft:10}}>
//       <Image source={require('../../assets/profilelogo.png')} style={{width:Platform.OS=='ios'? 130:100,height:Platform.OS=='ios'? 130:100}}  />
//     </View>
//     {/* <View style={{alignSelf:'center'}}> */}
//       {/* <View style={{marginTop:Platform.OS=='ios'? 50: 30, backgroundColor:Colors.yellowColor,width:60}}>
//       <Text style={{color:Colors.darkRedColor,fontSize:12,alignSelf:'center'}}>{ClientPackage.toUpperCase()}</Text>
//       </View> */}
//       <View style={{paddingLeft:12,alignSelf:'center',marginBottom:20}}>
//       <Text style={{color:'white',fontWeight:'bold',borderBottomWidth:3,borderBottomColor:Colors.yellowColor,fontSize:Platform.OS=='android'? 20:22}}>{ClientName}</Text>
//       </View>

//       {/* <View style={{flexDirection:'row',marginTop:5}}>
//         <View style={{color:Colors.darkRedColor,backgroundColor:'white',borderRadius:5}}>
//         <Text style={{color:Colors.themeColor,fontWeight:'bold',alignSelf:'center',fontSize:Platform.OS=='android'?18:24,padding:5}}>{RemainingInvoices}</Text>
//         </View>
//         <Text style={{color:'white',height:40,fontSize:Platform.OS=='android'? 14:18,marginLeft:5,width:Platform.OS=='android'?100:null}}>REMAINING INVOICES</Text>
//         <View style={{color:Colors.darkRedColor,backgroundColor:'white',borderRadius:5}}>
//         <Text style={{color:Colors.themeColor,fontWeight:'bold',alignSelf:'center',fontSize:Platform.OS=='android'?18:24,padding:5}}>{UsedInvoices}</Text>
//         </View>
//         <Text style={{color:'white',width:90,height:40,fontSize:Platform.OS=='android'? 14:18,marginLeft:5}}>USED INVOICES</Text>

//       </View> */}

//     {/* </View> */}
//     </View>

//     </View>

//     <View style={styles.footer}>

//     <View style={{flexDirection:'row',paddingTop:20,alignSelf:'center'}}>
//     <View style={{flexDirection:'column'}}>
//     <View style={{flexDirection:'row'}}>
//     <MaterialIcons name="hourglass-top" color = {Colors.themeColor} size={Platform.OS=='android'?50:70} />
//     <Text style={{fontSize:Platform.OS=='android'? 45:55}}>{ProgressOrders}</Text>
//     </View>
//     <Text style={{width:140}}>IN PROGRESS ORDERS</Text>
//     </View>
//     <Text style={styles.verticleLine}></Text>
//     <View style={{flexDirection:'column',marginLeft:'8%'}}>
//     <View style={{flexDirection:'row'}}>
//     <MaterialCommunityIcons name="check-box-multiple-outline" color = {Colors.themeColor} size={Platform.OS=='android'?50:70} />
//     <Text style={{fontSize:Platform.OS=='android'? 45:55}}>{CompletedOrders}</Text>
//     </View>
//     <Text style={{width:100,marginLeft:10}}>COMPLETED ORDERS</Text>
//     </View>
//     </View>

//     <View style={{alignItems:'center'}}>

//     <TouchableOpacity
//     onPress = {apiFunc}
//         style = {{marginTop:30,justifyContent:'center',backgroundColor:Colors.themeColor,width:'86%',height:70,borderRadius:18}}>
//           <View style={{alignSelf:'center',flexDirection:'row'}}>
//           <Ionicons name="ios-add-circle-outline" color ='white' size={Platform.OS=='android'?25:30} style={{alignSelf:'center'}}/>
//           <Text style={{color:'white',fontWeight:'bold',justifyContent:'center',marginLeft:5,fontSize:20}}>Create New Order</Text>
//           </View>
//     </TouchableOpacity>

//     <View style={{flexDirection:'row',marginTop:'2%',height:100,}}>
//     <TouchableOpacity
//     onPress = { ()=>navigation.navigate("InProgressListOrders")}
//         style = {{justifyContent:'center',backgroundColor:Colors.themeColor,padding:10,borderRadius:18,width:'42%'}}>
//           <View style={{alignSelf:'center',flexDirection:'column',}}>
//           <MaterialIcons name="hourglass-top" color = 'white' size={Platform.OS=='android'?50:50} style={{alignSelf:'center'}} />
//           <Text style={{color:'white',fontWeight:'bold',textAlign:'center'}}>In Progress Orders</Text>
//           </View>
//     </TouchableOpacity>

//     <TouchableOpacity
//     onPress = { ()=>navigation.navigate("CompletedOrdersList")}
//         style = {{justifyContent:'center',marginLeft:'2%',backgroundColor:Colors.themeColor,padding:10,borderRadius:18,width:'42%'}}>
//           <View style={{alignSelf:'center',flexDirection:'column'}}>
//           <MaterialCommunityIcons name="check-box-multiple-outline" color = 'white' style={{alignSelf:'center'}}  size={Platform.OS=='android'?50:50} />
//           <Text style={{color:'white',fontWeight:'bold',textAlign:'center'}}>Completed Orders</Text>
//           </View>
//     </TouchableOpacity>
//     </View>
//     </View>

//     </View>

//      </SafeAreaView>
//   </>

//   );
// };

// const styles = StyleSheet.create({
//  image : {
//   height:'90%',
//   width:'100%',
//   justifyContent:'center',

//  },
//  header: {
//   flex: 2,
//   backgroundColor: Colors.darkRedColor,
// },
// verticleLine: {
//   // marginRight:30,
//   // marginTop:10,
//   height: '100%',
//   width: 1,
//   backgroundColor: Colors.textGreyColor,
// },

// footer: {
//   flex: 5.5,
//   width:"100%",
//   backgroundColor: '#ffffff',
//   // borderTopLeftRadius: 30,
//   // borderTopRightRadius: 30,
//   // paddingVertical: 10,
//   //paddingHorizontal:Platform.OS === 'android' ?20:40

// },
//  topSafeArea: {
//   flex: 0,
//   // backgroundColor: 'blue'
// },
// bottomSafeArea: {
//   flex: 1,
//   // backgroundColor: 'red'
// },
// });

// export default Dashboard;
