import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
  ImageBackground,
  Image,
  TextInput,
  KeyboardAvoidingView,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Colors from "../ColorCodes/Colors";
import MyHeader from "../components/MyHeader";
import { Spinner } from "native-base";
import URL from "../api/ApiURL";
import { useSelector, useDispatch } from "react-redux";
// import Toast from "react-native-simple-toast";

const ChangePasswordByEmail = ({ navigation }) => {
  const [tokken, setTokken] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmNewPass, setConfirmNewPass] = useState("");
  const [isLoading,setIsLoading]=useState(false);
  const [securePass , setSecurePass] = useState(true);
  const [secureConfirmPass , setSecureConfirmPass] = useState(true);
  //const ClientEmail = useSelector((state) => state.ApiData.ClientEmail);

  const change_Password = () => {
    setIsLoading(true);
    if (tokken != "" && newPass != "" && confirmNewPass != "") {
      if (newPass == confirmNewPass) {
        fetch(URL + "/api/password_reset/confirm/", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            token: tokken,
            password: newPass,
          }),
        })
          .then(async (response) => {
            let data = await response.json();
            console.log("signup", data);

            //console.log("signup", response);
            if (response.status == 200) {
              setIsLoading(false);
              // Toast.show("Password Successfully Updated", Toast.LONG);

              alert("Password Updated Successfully");
              // Toast.show(data.password, Toast.LONG);
              setNewPass("");
              setConfirmNewPass("");
              setTokken("");
              navigation.navigate("Login");
            } else {
              
                // if(data.status="notfound"){
              setIsLoading(false);

                  alert(data.status=="notfound"?"Incorrect Tokken":data.password);
                // Toast.show(data.password, Toast.LONG);
              setTokken("");

                setNewPass("");
                setConfirmNewPass("");
                // }
                
              // }
              // else if(data.password!=""){
              //   alert(data.password);
              //   // Toast.show(data.password, Toast.LONG);
              //   setNewPass("");
              //   setConfirmNewPass("");
              // }
             
              // setTokken("");

              //  alert(data.message);
            }
            //send_Verification_Code()
            // navigation.navigate("Ver

            //setResponse(json);
          })
          .catch((error) => console.log(error));
      } else {
        setIsLoading(false);
        alert("Password And Confirm Password Doesnot Match")
        // Toast.show("Password And Confirm Password Doesnot Match", Toast.LONG);
      }
    } else {
      setIsLoading(false);
      alert("All Fields Are Required")
      // Toast.show("All Fields Are Required", Toast.LONG);
    }
  };

  return (
    <View style={{ flex: 1, height: "100%" }}>
      <View style={{ height: "30%" }}>
        <ImageBackground
          source={require("../assets/Splash.jpg")}
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 25,
              fontWeight: "bold",
              letterSpacing: 2,
            }}
          >
            CHANGE
          </Text>
          <Text
            style={{
              color: "white",
              fontSize: 25,
              fontWeight: "bold",
              letterSpacing: 2,
            }}
          >
            PASSWORD
          </Text>
        </ImageBackground>
      </View>

      {/* <View
        style={{
          height: "10%",
          width: "85%",
          alignSelf: "center",
          marginTop: 20,
        }}
      >
        <Text
          style={{
            color: Colors.productGrey,
            fontWeight: "bold",
            textAlign: "center",
            fontSize: 16,
          }}
        >
          Select your which contact details you want
        </Text>
        <Text
          style={{
            color: Colors.productGrey,
            fontWeight: "bold",
            textAlign: "center",
            fontSize: 16,
          }}
        >
          to use for verification code
        </Text>
      </View>

      <View
        style={{
          width: "80%",
          height: "15%",
          alignSelf: "center",
          borderRadius: 10,

          flexDirection: "row",
          backgroundColor: "#E2E2E2",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            width: "15%",
            height: "100%",

            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../assets/sms.png")}
            style={{
              width: 40,
              height: 40,
            }}
          />
        </View>
        <View
          style={{
            width: "70%",
            height: "100%",
            paddingLeft: 20,

            justifyContent: "center",
          }}
        >
          <Text style={{ color: Colors.textGreyColor }}>Via Sms</Text>
          <Text
            style={{
              color: Colors.productGrey,
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            030*****56
          </Text>
        </View>
      </View>

      <View
        style={{
          width: "80%",
          height: "15%",
          alignSelf: "center",
          borderRadius: 10,
          marginTop: 20,

          flexDirection: "row",
          backgroundColor: "#E2E2E2",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            width: "15%",
            height: "100%",

            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../assets/forgotemail.png")}
            style={{
              width: 40,
              height: 40,
            }}
          />
        </View>
        <View
          style={{
            width: "70%",
            height: "100%",
            paddingLeft: 20,

            justifyContent: "center",
          }}
        >
          <Text style={{ color: Colors.textGreyColor }}>Via Email</Text>
          <Text
            style={{
              color: Colors.productGrey,
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            ****al@gmail.com
          </Text>
        </View>
      </View> */}
      <View style={{ ...styles.inputArea, marginTop: 40 }}>
        <TextInput
          style={{ width: 250 }}
          placeholder="Enter Your Tokken"
          autoCapitalize="none"
          required={true}
          placeholderTextColor={Colors.productGrey}
          minLength={6}
          errorMessage="Please enter Minimum 6 characters password"
          value={tokken}
          onChangeText={(value) => setTokken(value)}
          initialValue=""
        />
      </View>
      <View style={styles.inputArea}>
        <TextInput
          style={{width:"95%"}}
          placeholder="Enter New Password"
          autoCapitalize="none"
          required={true}
          secureTextEntry={securePass}
          placeholderTextColor={Colors.productGrey}
          minLength={6}
          errorMessage="Please enter Minimum 6 characters password"
          value={newPass}
          onChangeText={(value) => setNewPass(value)}
          initialValue=""
        />
        <View style={{alignSelf:"center",}}>
            <Icon active name={securePass?'eye':"eye-off"} color= {Colors.textGreyColor} size={25} 
                 onPress = {() => {
               
                  if(securePass == true){
                 setSecurePass(false)
                  }
                  else{
                    setSecurePass(true)
                  }
                }
                }
                 />
              </View>
      </View>
      <View style={styles.inputArea}>
        <TextInput
          style={{width:"95%"}}
          placeholder="Confirm Password"
          autoCapitalize="none"
          required={true}
          secureTextEntry={secureConfirmPass}
          placeholderTextColor={Colors.productGrey}
          minLength={6}
          errorMessage="Please enter Minimum 6 characters password"
          value={confirmNewPass}
          onChangeText={(value) => setConfirmNewPass(value)}
          initialValue=""
        />
        <View style={{alignSelf:"center",}}>
            <Icon active name={secureConfirmPass?'eye':"eye-off"} color= {Colors.textGreyColor} size={25} 
                 onPress = {() => {
               
                  if(secureConfirmPass == true){
                    setSecureConfirmPass(false)
                  }
                  else{
                    setSecureConfirmPass(true)
                  }
                }
                }
                 />
              </View>
      </View>

      <TouchableOpacity onPress={change_Password} style={styles.button}>
      {isLoading ? (
              <Spinner color={"white"} />
            ) : (
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            textAlign: "center",
            fontSize: 16,
          }}
        >
          SUBMIT
        </Text>)}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    flex: 1,
    marginTop: 12,
    padding: 10,
    backgroundColor: "white",
    borderWidth: 0.5,
    borderColor: "#EE0202",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    borderRadius: 15,
  },
  button: {
    height: 40,
    width: 270,
    backgroundColor: "#EE0202",
    justifyContent: "center",
    borderRadius: 25,
    marginVertical: 20,
    alignSelf: "center",
  },
  inputArea: {
    marginVertical: 5,
    alignSelf: "center",

    height: 40,
    width: "85%",
    backgroundColor: "#E2E2E2",
    borderRadius: 25,
    paddingHorizontal: 30,
    flexDirection: "row",
  },
});

export default ChangePasswordByEmail;
