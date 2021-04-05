import React, { useEffect, useState, useCallback } from "react";
import {
  Container,
  Header,
  Content,
  Input,
  Item,
  Form,
  Label,
  Button,
  Text,
  Spinner,
} from "native-base";
import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  Linking,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from "react-native";
//import styles from './Login.style'
import { useSelector, useDispatch } from "react-redux";
import * as ApiDataActions from "../store/actions/ApiData";
import base64 from "react-native-base64";
import AsyncStorage from "@react-native-community/async-storage";
import Firebase from '@react-native-firebase/app'
import Icon from "react-native-vector-icons/Ionicons"; 

import PushNotificationIOS from "@react-native-community/push-notification-ios";
import URL from "../api/ApiURL";
import PushNotification from "react-native-push-notification";
import * as Animatable from "react-native-animatable";
//import PushNotification from "react-native-push-notification";
import Colors from "../ColorCodes/Colors";
import Logos from "../components/Logos";
import { set } from "date-fns";
import { ScrollView } from "react-native-gesture-handler";
const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [companyInfo, setCompanyInfo] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [personInfo, setPersonInfo] = useState([]);
  const [contactPerson, setContactPerson] = useState([]);
  const [accountInfo, setaccountInfo] = useState([]);

  const [securePass, setSecurePass] = useState(true);
  const [tokken, setTokken] = useState("");
  const [emailMsg, setEmailMsg] = useState(false);
  const [passMsg, setPassMsg] = useState(false);
  const [emptyMsg, setEmptyMsg] = useState(false);
  const [device,setDevice]=useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [loading, setLoading] = useState("");

  // const saveData = async () => {
  //   try {
  //     await AsyncStorage.setItem(STORAGE_Login, email)
  //     await AsyncStorage.setItem(STORAGE_Password, password)
  //     alert('Data successfully saved')
  //   } catch (e) {
  //     alert('Failed to save the daa to the storage')
  //   }
  // }
  //   var arr=[email,password];
  //  var len=arr.length;

  const check = () => {
   if(email==""||email==null){
    setToastMessage("Please Enter Email");
   }
   else{
     if(password==""||password==null){
      setToastMessage("Please Enter Password");
     }
     else{
      loadData();

     }
   }

   
  };

  const sendTokken=()=>{
    if(tokken!=""){
      console.log("Tokkennnnnnnnnn:",tokken)
      console.log("Tokkennnnnnnnnn:",tokken.os)
      fetch(URL + "/devices/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization:
            "Basic " + base64.encode(`${email}:${password}`),
          //   btoa({ username: ClientEmail, password: oldPass })

          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: "",
          registration_id: tokken,
          device_id: "",
          active: true,
          type: device
        }),
      })
        .then(async (response) => {
          let data = await response.json();
          //console.log("signup", data);
          //console.log("signup", response.message);
          if (response.status == 200) {
            console.log("lalalalalalalalal",data)
            //alert(data.message);
            // Toast.show(data.message, Toast.LONG);
          } else {
            console.log("lalalalalalalalal",data)

            // Toast.show("Your Old Password Is Invalid", Toast.LONG);
          }
        })
        .catch((error) => console.log(error));
    }
    
  }

  const loadData = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    
    if (reg.test(email) === false) {
      setToastMessage("Email is Not Correct");

      return false;
    } else {
      setLoading(true);
      fetch(
        "http://ec2-3-129-128-169.us-east-2.compute.amazonaws.com:8000/client_app/client_login/",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: email,
            password: password,
          }),
        }
      )
        .then(async (response) => {
          let data = await response.json();
          console.log("Response",data.message);

          console.log("status code", response.status);
          console.log("status code", data);
          if (data.message != "The account is not verified via email") {
            if (response.status == 200) {
              dispatch(ApiDataActions.SetLoginData(data));
              storeToken(email, password);
              setLoading(false);
              sendTokken();
              navigation.navigate("MyDrawer");
              setEmail("");
              setPassword("");
            } else if (
              response.message == "The account is not verified via email"
            ) {
              setLoading(false);
              alert(response.message);
            } else {
              setLoading(false);
              alert(data.message);
            }
            // code that can access both here
          } else {
            setLoading(false);

            alert(data.message);
          }
        })
        .catch((error) => console.log("Something went wrong", error));
    }

    //  if(email=="")
    //  {
    //    setEmailMsg(true);
    //  }
    //  else {
    //   setEmailMsg(false);
    //  }

    //console.log(email,password,tokken)

    // return fetch(URL+'/client_app/client_login/')

    // .then((response) => response.json())
    // .then((responseJson) => {
    //   if(responseJson[0] != "Login doesn't exist or password is incorrect"){

    //   // setData({data : responseJson})
    //   // setCompanyInfo({companyInfo : responseJson[0]})
    //   // setPersonInfo({personInfo : responseJson[1]})
    //   // setContactPerson({contactPerson : responseJson[2]})
    //   // setaccountInfo({accountInfo : responseJson[3]})
    //   // AsyncStorage.setItem('isLoggedIn' , '1')
    // //   const STORAGE_LOGIN = ''
    // //   const STORAGE_PASSWORD = ''
    // //   AsyncStorage.setItem(STORAGE_LOGIN, "email")
    // //   AsyncStorage.setItem(STORAGE_PASSWORD, password)

    // // console.log("Shaheer",STORAGE_LOGIN)

    // storeToken(email,password)

    //   navigation.navigate("MyDrawer" , { Company_Data : responseJson })
    //   }else{
    //   alert("Wrong email or password")

    //   }

    //})
  };

  // const loadData = () => {

  //   return fetch(URL+'/shipment/search?login='+email.trim()+'&password='+password+'&token='+tokken)
  //   .then((response) => response.json())
  //   .then((responseJson) => {
  //     //console.log(responseJson)
  //     setData({data : responseJson})

  //     setCompanyInfo({companyInfo : responseJson[0]})
  //     setPersonInfo({personInfo : responseJson[1]})
  //     setContactPerson({contactPerson : responseJson[2]})
  //     setaccountInfo({accountInfo : responseJson[3]})
  //     // AsyncStorage.setItem('isLoggedIn' , '1')
  //   //   const STORAGE_LOGIN = ''
  //   //   const STORAGE_PASSWORD = ''
  //   //   AsyncStorage.setItem(STORAGE_LOGIN, "email")
  //   //   AsyncStorage.setItem(STORAGE_PASSWORD, password)

  //   // console.log("Shaheer",STORAGE_LOGIN)

  //   storeToken(email,password)

  //     navigation.navigate("MyDrawer" , { Company_Data : responseJson })

  //   })
  //   .catch((error) => {
  //     alert("Email or Password Incorrect")

  //   });

  // }

  var storeToken = async (e, p) => {
    try {
      await AsyncStorage.setItem("userData", JSON.stringify(e));

      await AsyncStorage.setItem("passData", JSON.stringify(p));
      await AsyncStorage.setItem("loginCheck", JSON.stringify(true));
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };

  var getToken = async () => {
    try {
      let userEmail = await AsyncStorage.getItem("userData");

      let userPass = await AsyncStorage.getItem("passData");

      let datae = JSON.parse(userEmail);

      setEmail(datae);
      console.log(email)

      let datap = JSON.parse(userPass);
      setPassword(datap);

      //console.log(datae , datap);
      // if(datae != null && datap != null){

      // loadData()
      // }
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };

  useEffect(() => {
    getToken();

      Firebase.initializeApp
      PushNotification.configure({
        // (optional) Called when Token is generated (iOS and Android)
        onRegister: function (token) {
          setTokken(token.token)
          setDevice(token.os)
          console.log(tokken)
          console.log("TOKEN:", token);
        },
        // (required) Called when a remote is received or opened, or local notification is opened
        onNotification: function (notification) {
          console.log("NOTIFICATION:", notification);
          // process the notification
          // (required) Called when a remote is received or opened, or local notification is opened
          notification.finish(PushNotificationIOS.FetchResult.NoData);
        },
        // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
        onAction: function (notification) {
          console.log("ACTION:", notification.action);
          console.log("NOTIFICATION:", notification);
          // process the action
        },
        // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
        onRegistrationError: function(err) {
          console.error(err.message, err);
        },
        // IOS ONLY (optional): default: all - Permissions to register.
        permissions: {
          alert: true,
          badge: true,
          sound: true,
        },
        // Should the initial notification be popped automatically
        // default: true
        popInitialNotification: true,
        /**
         * (optional) default: true
         * - Specified if permissions (ios) and token (android and ios) will requested or not,
         * - if not, you must call PushNotificationsHandler.requestPermissions() later
         * - if you are not using remote notification or do not have Firebase installed, use this:
         *     requestPermissions: Platform.OS === 'ios'
         */
        requestPermissions: true,
      });
      console.log("Tkon",tokken.token)
      
        // try {
        //   const Login =  AsyncStorage.getItem('@login')
        //   const Password = AsyncStorage.getItem('@password')
        //   if (Login !== null) {
        //      this.props.navigation.navigate("Dashboard")
        //   }
        // } catch (e) {
        //   alert('Failed to fetch the data from storage')
        // }
    //  getToken()
  }, []);

  return (
    //     <Container >
    //   {/* <Animatable.View
    //             animation="fadeInUpBig"
    //             // style={[styles.footer, {
    //             //     backgroundColor: colors.background
    //             // }]}
    //         > */}
    //         <View style={{flex:1}}>
    //         <View style={{flex:2}}>
    //     <ImageBackground
    //       source={require('../assets/Splash.jpg')}
    //       style={styles.image}
    //       >
    //       </ImageBackground>
    //       </View>

    //       <View style={{flex:7}}>
    //       <Content style = {{padding:15}}>
    //       <View style = {{height:'15%',alignItems:'center',marginTop:30}}  >
    //            <Image
    //       source={require('../assets/companylogo.png')}
    //       style={styles.logo}
    //       />
    //       </View>
    //       {/* <View style = {{height:'10%' ,alignItems:'center'}}>
    //         <Text style = {{color:'white',fontSize:25,letterSpacing:1 ,marginTop:10}}>Login Yourself</Text>
    //       </View> */}
    //       <Form style = {{height:'50%',alignItems:'center',marginTop:30}}>

    //           <Item regular style = {{backgroundColor:'#ffffff45', borderColor:'#ffffff45',
    //       color:'#FFFFFF',borderRadius:30,paddingLeft:20,height:40 }}>
    //           <Icon active name='email' color= "#3873ad"/>
    //                 <Input
    //                 style={{ borderColor: email=='' ? 'red' : '#ffffff45' }}
    //                 title="Email"
    //                 placeholder = "email or mobile number"
    //                 placeholderTextColor = "#3873ad"
    //                 required={true}
    //                 autoCapitalize="none"
    //                 keyboardType="email-address"
    //                 // errorMessage={<Text></Text>}
    //                 value={email}
    //                 onChangeText={text => {
    //                   setEmail(text)
    //                   setEmailMsg(false)
    //                 }}
    //                 />
    //               </Item>
    //               {emailMsg &&
    //                 <Animatable.View animation="fadeInLeft" duration={500}>
    //                 <Text style={{color:'#DC143C'}}>Correct Email is Required</Text>
    //                 </Animatable.View>
    //                 }
    //                 {/* {emailMsg==&&
    //                 <Animatable.View animation="fadeInLeft" duration={500}>
    //                 <Text style={{color:'#DC143C'}}>Correct Email is Required</Text>
    //                 </Animatable.View>
    //                 } */}
    //                 {/* {email!=''?setEmailMsg(false):null} */}

    //     {/* <Text>{emailMsg}</Text> */}

    //               {/* {
    //                 email==''?
    //                 (
    //                   <Item error>
    //                   <Text style={{color:'red'}} >Please Enter Email</Text>
    //                   </Item>
    //                 ):''
    //               } */}

    //               {/* <Item error>
    //                 <Text style={{color:'red'}} >Please Enter Email</Text>
    //             <Input placeholder='Please Enter Email'/>
    //             <Icon name='close-circle' />
    //           </Item> */}
    //               <Item regular  style = {{padding:10,marginTop:10,backgroundColor:'#ffffff45',borderColor:passMsg,color:'#FFFFFF',borderRadius:30,paddingLeft:20,height:40}}>
    //               <Icon active name='vpn-key' color= "#3873ad"/>
    //                 <Input
    //                 placeholder = "password"
    //                 placeholderTextColor = "#3873ad"
    //                 autoCapitalize="none"
    //                 secureTextEntry={securePass}
    //                 value={password}
    //                 required={true}
    //                 onChangeText={text => {
    //                   setPassword(text)
    //                   setPassMsg(false)
    //                 }}
    //                 />
    //                <Icon active name='remove-red-eye' color= "#3873ad"
    //                onPress = {() => {

    //                 if(securePass == true){
    //                setSecurePass(false)
    //                 }
    //                 else{
    //                   setSecurePass(true)
    //                 }

    //               }
    //               }
    //                />
    //               </Item>
    //               {passMsg==true?
    //                 <Animatable.View animation="fadeInLeft" duration={500}>
    //                 <Text style={{color:'#DC143C'}}>Correct Password is Required</Text>
    //                 </Animatable.View>
    //                 : null}

    //               <Button
    //               onPress = { () =>
    //               Linking.openURL('http://165.22.47.236:8069/web/reset_password?')

    //               }
    //               style = {{alignSelf:'center'}} transparent>
    //               <Text style = {{color:'white'}}>Forgot your password ?</Text>
    //             </Button>
    //               <Button
    //               onPress = {check}
    //               style = {{backgroundColor:'white',width:'100%',justifyContent:'center',height:40,borderRadius:30,marginTop:20}}>
    //                <Text style = {{color:'#0f70b7',fontWeight:'bold',letterSpacing:1}}>LOG IN</Text>
    //               </Button>
    //             </Form>
    //             <Form  style = {{height:'20%'}}>

    //             <Form/>
    //           <Button transparent
    //            style = {{alignSelf:'center',marginTop:5}}
    //            onPress = { () => navigation.navigate("Signup")}
    //           >
    //               <Text style = {{color:'white'}}>Don't have an account? SIGN UP</Text>
    //             </Button>

    //             </Form>
    //           </Content>
    //           </View>
    //           </View>
    //         {/* </Animatable.View> */}
    //         </Container>

    //   );
    // };

    // export default Login;
    // <>
    // <ScrollView>
    <View style={styles.container}>
      {/* <View style={styles.spinnerv}> */}
      {/* {
  state?
  <ActivityIndicator size={100} /> :
  <Text> loading... </Text>
} */}
      {/* </View> */}

      <View style={styles.header}>
        <ImageBackground
          source={require("../assets/Splash.jpg")}
          style={{ width: "100%", height: "100%" }}
        >
          <Text
            style={{
              color: "white",
              marginVertical: "5%",
              fontSize: 35,
              alignSelf: "center",
              marginTop: "15%",
              borderBottomWidth: 1,
              borderBottomColor: "white",
              fontWeight: "bold",
            }}
          >
            LOG IN
          </Text>
          <Text
            style={{
              color: Colors.yellowColor,
              marginVertical: 15,
              fontSize: 20,
              alignSelf: "center",
              marginTop: 10,
            }}
          >
            Login to your ORDDEL Account
          </Text>
        </ImageBackground>
      </View>

      <View style={styles.footer}>
        {/* <View style={styles.g_container}> */}
          <KeyboardAvoidingView>
            <View>
              <TextInput
                style={styles.n_inputArea}
                underlineColorAndroid="rgba(0, 0, 0, 0)"
                autoFocus={true}
                placeholder="Email"
                autoCapitalize="none"
                placeholderTextColor={Colors.textGreyColor}
                keyboardType="email-address"
                value={email}
                onChangeText={(e) => {
                  setEmailMsg(false);
                  setEmail(e);
                  setToastMessage("");
                }}
                initialValue=""
              />
            </View>
            {/* {emailMsg && (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={{ color: "#DC143C" }}>Please Enter Email</Text>
              </Animatable.View>
            )} */}

            <View style={styles.inputArea}>
              <TextInput
                style={{ width: "95%" }}
                placeholder="Password"
                underlineColorAndroid="rgba(0, 0, 0, 0)"
                secureTextEntry={securePass}
                autoCapitalize="none"
                required={true}
                placeholderTextColor={Colors.textGreyColor}
                minLength={6}
                errorMessage="Please enter Minimum 6 characters password"
                value={password}
                onChangeText={(value) => {
                  setPassword(value)
                  setToastMessage("")
                 }}
                initialValue=""
              />
              <View style={{ alignSelf:'center' }}>
                <Icon
                  active
                  name={securePass ? "eye" : "eye-off"}
                  color={Colors.textGreyColor}
                  size={25}
                  onPress={() => {
                    if (securePass == true) {
                      setSecurePass(false);
                    } else {
                      setSecurePass(true);
                    }
                  }}
                />
              </View>
            </View>
            {/* {passMsg == true ? (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={{ color: "#DC143C" }}>Please Enter Password</Text>
              </Animatable.View>
            ) : null} */}
          </KeyboardAvoidingView>

          <View style={{ flexDirection: "row", marginTop: 30,alignSelf:'center' }}>
            <Text style={{ color: Colors.textGreyColor, fontSize: 12 }}>
              {" "}
              Forgot Your Password?{" "}
            </Text>

            <TouchableOpacity
              onPress={() => navigation.navigate("ForgotPasswordVerification")}
            >
              <Text style={{ color: Colors.darkRedColor, fontSize: 12,fontWeight:'700' }}>
                Change Password
              </Text>
            </TouchableOpacity>
          </View>

          {/* {emptyMsg && (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={{ color: "#DC143C" }}>All Fields Are Required</Text>
            </Animatable.View>
          )} */}
          {/* {isLoading ? (
      <Spinner
      //visibility of Overlay Loading Spinner
      visible={isLoading}
      // size="normal"
      // animation='fade'
      //Text with the Spinner
      // textContent={'Loading...'}
      //Text style of the Spinner Text
      // textStyle={styles.activityIndicator}
    />):(

    // )}
    //   {isLoading ? (
    //   <ActivityIndicator size="large" color={Colors.accentColor} style={styles.activityIndicator}/>
    //   ) : ( */}
          {toastMessage != "" ? (
            <Text
              style={{
                color: Colors.themeColor,
                marginTop: 10,
                // fontWeight: "bold",
                alignSelf: "center",
              }}
            >
              {toastMessage}
            </Text>
          ) : null}

          <TouchableOpacity disabled={email==""||password==""?true:false} style={styles.button} onPress={check}>
            {loading ? (
              <Spinner color={"white"} />
            ) : (
              <Text style={styles.buttonText}>LOG IN</Text>
            )}
          </TouchableOpacity>
          {/* //)} */}
        {/* </View> */}

        <View style={styles.signupContianer}>
          <Text style={styles.signupText}> Don't have an account yet? </Text>

          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={{ color: Colors.darkRedColor,fontWeight:'bold' }}>Signup here</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    // </ScrollView>
    // </>
  );
};

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
    // fontWeight: "bold",
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
    flex: 2,
    width: "100%",
    //backgroundColor:'#EE0202',
    justifyContent: "center",
    alignItems: "center",
  },

  footer: {
    flex: 4,
    width:"100%",
    backgroundColor: "#ffffff",
    // borderTopLeftRadius: 30,
    // borderTopRightRadius: 30,
    //paddingVertical: 10,
  
  },
  g_container: {
    // flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputArea: {
    marginVertical: 0,
    height: 40,
    width: "85%",
    backgroundColor: "#F2F1F3",
    flexDirection: "row",
    borderRadius: 25,
    paddingHorizontal: 20,
    alignSelf:'center'
  },
  n_inputArea: {
    marginVertical: 10,
    marginTop: 20,
    height: 40,
    width: "85%",
    backgroundColor: "#F2F1F3",
    flexDirection: "row",
    borderRadius: 25,
    paddingHorizontal: 20,
    alignSelf:'center'
  },
  button: {
    height: 40,
    width: "85%",
    backgroundColor: "#EE0202",
    justifyContent: "center",
    borderRadius: 25,
    marginVertical: 20,
    alignSelf:'center'
  },

  buttonText: {
    fontSize: 20,
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Login;
