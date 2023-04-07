import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapView, { Marker, Polygon, Callout } from "react-native-maps";
import { StyleSheet, Text, View , KeyboardAvoidingView,ScrollView, 
  Platform, StatusBar, SafeAreaView, Image, ImageBackground, Dimensions, Alert} from 'react-native';
import { useRef, useState, Label, Item, Body, useEffect } from 'react';
import { Button, CheckBox, Input, ListItem } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Sidebar from './customDrawer';
import Home from './Home';
import Swiper from "react-native-swiper";
import AntDesign from "@expo/vector-icons/AntDesign";
import { firebaseConfig } from './config';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;
const Tab = createMaterialBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function HomeScreen({navigation}) {


  var mapStyle =
  [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#ebe3cd"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#523735"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#f5f1e6"
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#c9b2a6"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#dcd2be"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#ae9e90"
        }
      ]
    },
    {
      "featureType": "landscape.man_made",
      "stylers": [
        {
          "color": "#c2a5d9"
        }
      ]
    },
    {
      "featureType": "landscape.natural",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dfd2ae"
        }
      ]
    },
    {
      "featureType": "landscape.natural.landcover",
      "stylers": [
        {
          "color": "#c4c4e4"
        }
      ]
    },
    {
      "featureType": "poi",
      "stylers": [
        {
          "visibility": "on"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dfd2ae"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#93817c"
        }
      ]
    },
    {
      "featureType": "poi.attraction",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi.business",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi.government",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi.medical",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#a5b076"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#447530"
        }
      ]
    },
    {
      "featureType": "poi.place_of_worship",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi.school",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi.sports_complex",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road",
      "stylers": [
        {
          "weight": 0.5
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f5f1e6"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#fdfcf8"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f8c967"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#e9bc62"
        }
      ]
    },
    {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e98d58"
        }
      ]
    },
    {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#db8555"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#806b63"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dfd2ae"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#8f7d77"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#ebe3cd"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dfd2ae"
        }
      ]
    },
    {
      "featureType": "transit.station.airport",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "transit.station.rail",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#b9d3c2"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#92998d"
        }
      ]
    }
  ]
  
  const mapRef = useRef(null);
  const [region, setRegion] = useState({
    latitude: 56.9516,
    longitude:  24.1187,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const gardenRegion = {
    latitude: 56.9516,
    longitude: 24.1187,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  };
  const mezaparkRegion = {
    latitude: 57.0122,
    longitude: 24.1538,
    latitudeDelta: 0.03,
    longitudeDelta: 0.03,
  };
  const origoRegion = {
    latitude: 56.9477,
    longitude: 24.1213,
    latitudeDelta: 0.007,
    longitudeDelta: 0.007,
  };
  const mildaRegion = {
    latitude: 56.9515,
    longitude: 24.1133,
    latitudeDelta: 0.007,
    longitudeDelta: 0.007,
  };
  const blackRegion = {
    latitude: 56.9473,
    longitude: 24.1068,
    latitudeDelta: 0.007,
    longitudeDelta: 0.007,
  };
  const[friends] = useState([
    {
      id: 1,
      title: 'bob1',
      description: 'child',
      location:{
        latitude: 56.9541,
        longitude: 24.1149,
      },
      icon: 'dog'
    },
    {
      id: 2,
      title: 'bob2',
      description: 'child',
      location:{
        latitude: 56.9716,
        longitude: 24.1587,
      },
      icon: 'dog'
    },
    
  ])
  const goToGarden = () => {
    //complete this animation in 3 seconds
    mapRef.current.animateToRegion(gardenRegion, 2 * 1000);
  };
  const goToMezapark = () => {
    //complete this animation in 3 seconds
    mapRef.current.animateToRegion(mezaparkRegion, 2 * 1000);
  };
  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        showsUserLocation={true}
        customMapStyle={mapStyle}
        style={styles.map}
        initialRegion={{
          latitude: 56.9677,
          longitude: 24.1056,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Polygon
    coordinates={[
      { latitude: 57.022991, longitude: 24.154376 },
      { latitude: 57.016791, longitude: 24.128980 },
      { latitude: 57.008940, longitude: 24.127604 },
      { latitude: 57.003962, longitude: 24.129569 },
      { latitude: 56.996272, longitude: 24.134810 },
      { latitude: 57.005481, longitude: 24.157203 },
      { latitude: 57.018169, longitude: 24.160112 },
      
      
    ]}
    
    strokeColor="brown"
    fillColor="rgba(201, 242, 155,  0.5)"
    strokeWidth={1}
  />
        <Marker coordinate={mildaRegion} title='Milda' 
      description='Zivotnije i vse dela' image={require('./dog_custom.png')}/>

      <Marker coordinate={blackRegion} title='Blackheads' 
      description='Zivotnije i vse dela' image={require('./dog_custom3.png')}/>

      <Marker coordinate={gardenRegion} title='Vermik' 
      description='Zivotnije i vse dela' image={require('./dog_custom.png')}/>

       <Marker coordinate={origoRegion} title='Origo' 
      description='Zivotnije i vse dela' image={require('./dog_custom3.png')}/>

      <Marker coordinate={mezaparkRegion} title='Mezaparks' 
      description='Zivotnije i vse dela' pinColor='green'>
       <Callout tooltip>
        <View>
          <View style={styles.bubble}>
            <Text style={{fontSize:16}}>The best park</Text>
            
          </View>
        </View>
       </Callout>
      </Marker>

      {friends ? friends.map((friend) => (
        <Marker coordinate={friend.location}
        title={friend.title} description={friend.description}
        image={require('./dog_custom2.png')}>
       
        </Marker>
      )): null}
      </MapView>
      
    </View>
  );

}

function ProfileScreen() {
        return (
          <SafeAreaView style={{ flex: 1, backgroundColor:'#fff' }}>
            <ScrollView
            style={{flex:1, backgroundColor:'#fff', padding:20}}
            contentContainerStyle={{justifyContent:'center', alignItems:'center'
            }}>
          <Image style={{height:150, width:150, borderRadius:75}}
          source={require('./dantol-photo.jpg')}/>
          <Text style={{fontSize:18, fontWeight:'bold'}}>Daniil Tolmacov</Text>
            <Text style={{fontSize: 12,fontWeight: '600',color: '#666',textAlign: 'center',marginBottom: 10,}}>I love dogs and cats, moreover I want to be a dog!</Text>
           <View style={styles.userBtnWrapper}>
            <TouchableOpacity style={styles.userBtn}>
              <Text style={styles.userBtnTxt}>Message</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.userBtn}>
              <Text style={styles.userBtnTxt}>Follow</Text>
            </TouchableOpacity>
           </View>
           <View style={styles.userInfoWrapper}>
            <View style={styles.userInfoItem}>
              <Text style={styles.userInfoTitle}>22</Text>
              <Text style={styles.userInfoSubTitle}>Posts</Text>
            </View> 
            <View style={styles.userInfoItem}>
              <Text style={styles.userInfoTitle}>10</Text>
              <Text style={styles.userInfoSubTitle}>Followers</Text>
            </View> 
            <View style={styles.userInfoItem}>
              <Text style={styles.userInfoTitle}>29</Text>
              <Text style={styles.userInfoSubTitle}>Following</Text>
            </View> 

           </View>
            </ScrollView>
          </SafeAreaView>
        );
}  

function SettingsScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor:'#fff' }}>
      <ScrollView
      style={{flex:1, backgroundColor:'#fff', padding:20}}
      contentContainerStyle={{justifyContent:'center', alignItems:'center'
      }}>
    <Image style={{height:150, width:150, borderRadius:75}}
    source={require('./dog_photo.jpeg')}/>
    <Text style={{fontSize:18, fontWeight:'bold', marginBottom:10}}>Sharik</Text>
      
     <View style={styles.userBtnWrapper}>
      <TouchableOpacity style={styles.userBtn}>
        <Text style={styles.userBtnTxt}>Health</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.userBtn}>
        <Text style={styles.userBtnTxt}>Food</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.userBtn}>
        <Text style={styles.userBtnTxt}>Training</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.userBtn}>
        <Text style={styles.userBtnTxt}>Toys</Text>
      </TouchableOpacity>
     </View>
     
      </ScrollView>
    </SafeAreaView>
  );
}

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  
  const handleCreateAccount = () => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log('Account created')
      const user = userCredential.user;
      console.log(user)
    })
    .catch.log(error => {
      console.log(error)
    })
      
  }

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log('Signed in')
      const user = userCredential.user;
      console.log(user)
      navigation.navigate('home');
    })
    /*.catch.log(error => {
      console.log(error)
      Alert.alert(error.message)
    })*/
  }
  /*loginUser = async (email, password) => {
    try{
      await firebase.auth().signInWithEmailAndPassword(email, password)
    } catch(error){
      alert(error.message)
    }
  }*/
  return (
   
    <ScrollView style={{ flex: 1, backgroundColor:'#fff'}}
    showsVerticalScrollIndicator={false}>
      <ImageBackground source={require('./riga.jpg')}
      style={{height:Dimensions.get('window').height / 2.5}}>
       <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <MaterialCommunityIcons name='dog' style={{color:'#ffffff', fontSize:100}}/>
        <Text style={{fontSize:40, fontWeight:'bold', textTransform:'uppercase', color:'#ffffff'}}>we love pets</Text>
       </View>
      </ImageBackground>
      <View style={{flex:1.5, backgroundColor:'#ffffff', bottom:50, 
      borderTopStartRadius:60, borderTopEndRadius:60}}>
        <View style={{padding:40}}>
          <Text style={{color:'#8d0fa3', fontSize:34}}>Welcome</Text>
          <Text>Don't have an account?
          <Text style={{color:'red', fontStyle:'italic'}}          onPress={() => navigation.navigate('Register')}> Register now!</Text>
          </Text>
          <View style={{marginTop:30}}>
            
              
              <Input placeholder='Email' keyboardType='email-address'
              onChangeText={(text) => setEmail(text)}></Input>
              <Input placeholder='Password' secureTextEntry type='password'
              onChangeText={(text) => setPassword(text)}></Input>
          </View>
          <View style={{height:30, marginTop:-20, flexDirection:'row'}}> 
          <View style={{flex:1, marginLeft:-87}}>
            <ListItem noBorder>
              <CheckBox checked={true} color='black'/>
                <Text style={{alignSelf:'flex-start',fontWeight:'200',}}>Forgot Password</Text>
              
            </ListItem>

          </View>
          </View>
          <View style={{height:100, justifyContent:'center', alignItems:'center'}}>
          <Button  raised  buttonStyle={{
                backgroundColor: '#8d0fa3',borderRadius: 30, shadowOffset:{width:1, height:10},
                shadowOpacity: 0.4,shadowRadius:3,elevation: 15, shadowColor:'#d751e0'}}
              containerStyle={{width:200, marginTop:10, borderRadius: 30,}} title='Login'
              onPress={handleSignIn}/>
          </View>
          <View style={{flex:1}}>
            <Text style={{textAlign:'center'}}>or Login With</Text>
            <View style={{flexDirection:'row', flex:1, justifyContent:'space-around', marginTop:20}}>
                <MaterialCommunityIcons name='facebook' style={{color:'black',fontSize:30}}/>
                <MaterialCommunityIcons name='google-plus' style={{color:'black',fontSize:30}}/>
                <MaterialCommunityIcons name='twitter' style={{color:'black',fontSize:30}}/>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  
  const handleCreateAccount = () => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log('Account created')
      const user = userCredential.user;
      console.log(user)
    })
    .catch.log(error => {
      console.log(error)
    })
      
  }

  
  return (
   
    <ScrollView style={{ flex: 1, backgroundColor:'#fff'}}
    showsVerticalScrollIndicator={false}>
      <ImageBackground source={require('./riga.jpg')}
      style={{height:Dimensions.get('window').height / 3.5}}>
       <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <MaterialCommunityIcons name='dog' style={{color:'#ffffff', fontSize:100}}/>
        
       </View>
      </ImageBackground>
      <View style={{flex:1.5, backgroundColor:'#ffffff', bottom:50, 
      borderTopStartRadius:60, borderTopEndRadius:60}}>
        <View style={{padding:40}}>
          <Text style={{color:'#8d0fa3', fontSize:34}}>Register</Text>
  
          <View style={{marginTop:30}}>
            
              
              <Input placeholder='Email' keyboardType='email-address'
              onChangeText={(text) => setEmail(text)}></Input>
              <Input placeholder='Name' secureTextEntry type='name'
              onChangeText={(text) => setPassword(text)}></Input>
              <Input placeholder='Password' secureTextEntry type='password'
              onChangeText={(text) => setPassword(text)}></Input>
              <Input placeholder='Repeat password' secureTextEntry type='password'
              onChangeText={(text) => setPassword(text)}></Input>
              <Input placeholder='Age' secureTextEntry type='password'
              onChangeText={(text) => setPassword(text)}></Input>
          </View>
          <View style={{height:30, marginTop:-20, flexDirection:'row'}}> 
          <View style={{flex:1, marginLeft:-87}}>
            <ListItem noBorder>
              <CheckBox checked={true} color='black'/>
               
              
            </ListItem>

          </View>
          </View>
          <View style={{height:100, justifyContent:'center', alignItems:'center'}}>
          <Button  raised  buttonStyle={{
                backgroundColor: '#8d0fa3',borderRadius: 30, shadowOffset:{width:1, height:10},
                shadowOpacity: 0.4,shadowRadius:3,elevation: 15, shadowColor:'#d751e0'}}
              containerStyle={{width:200, marginTop:10, borderRadius: 30,}} title='Register'
              />
          </View>
         
        </View>
      </View>
    </ScrollView>
  );
}

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
    barStyle={{  position: 'absolute',
    overflow: 'hidden',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,backgroundColor:'white'}}
      screenOptions={({route}) => ({
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          display: 'flex',
          position: 'absolute',
          bottom: 20,
          left: 25,
          right: 25,
          elevation: 5,
          backgroundColor: '#8A56AC',
          borderRadius: 30,
          height: 60,
        },
        tabBarShowLabel: false,
        headerShown: false,
      })}>
      <Tab.Screen
        name="Messenger"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                top: Platform.OS === 'ios' ? 10 : 0,
              }}>
              <MaterialCommunityIcons
                name="android-messages"
                size={28}
                color={focused ? 'white' : '#8A56AC'}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Pet"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                top: Platform.OS === 'ios' ? 10 : 0,
              }}>
              <MaterialCommunityIcons
                name="dog"
                size={30}
                color={focused ? 'white' : '#8A56AC'}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Map"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                top: Platform.OS === 'ios' ? -10 : -13,
                width: Platform.OS === 'ios' ? 50 : 45,
                height: Platform.OS === 'ios' ? 50 : 45,
                
                
              }}>
              <MaterialCommunityIcons
                name="map"
                size={Platform.OS === 'ios' ? 50 : 45}
                color={focused ? 'white' : '#8A56AC'}
              />
            </View>
          ),
          tabBarIconStyle: {},
        }}
      />
      <Tab.Screen
        name="News"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                top: Platform.OS === 'ios' ? 10 : 0,
              }}>
              <MaterialCommunityIcons
                name="newspaper-variant"
                size={28}
                color={focused ? 'white' : '#8A56AC'}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Market"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                top: Platform.OS === 'ios' ? 10 : 0,
              }}>
              <MaterialCommunityIcons
                name="shopping"
                size={28}
                color={focused ? 'white' : '#8A56AC'}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const HomeScreenStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="BottomTabStack" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
};

function Hello({ navigation }){
  return(
    <Swiper
    buttonWrapperStyle={{
      backgroundColor: "transparent",
      flexDirection: "row",
      position: "absolute",
      bottom: 0,
      left: 0,
      flex: 1,
      paddingHorizontal: 30,
      paddingVertical: 20,
      justifyContent: "flex-end",
      alignItems: "flex-end",
    }}
    style={styles.wrapper}
    showsButtons={true}
    paginationStyle={{
      marginRight: w * 0.7,
      marginBottom: h * 0.02,
    }}
    activeDotColor="#8A56AC"
    dotColor="#998FA2"
    nextButton={
      <View
        style={{
          height: 60,
          borderRadius: 30,
          alignItems: "center",
          justifyContent: "center",
          width: 60,
          backgroundColor: "#8A56AC",
        }}
      >
        <AntDesign name="arrowright" size={22} color="#FFF" />
      </View>
    }
    prevButton={
      <View
        style={{
          height: 60,
          borderRadius: 30,
          alignItems: "center",
          justifyContent: "center",
          width: 60,
          backgroundColor: "#8A56AC",
          marginHorizontal: 20,
        }}
      >
        <AntDesign name="arrowleft" size={22} color="#FFF" />
      </View>
    }
  >
    
    <View style={styles.slide}>
      <Image source={require("./doggy3.jpg")} style={styles.img} />
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.text2}>
      Lorem ipsum is placeholder text commonly used in the graphic, print, 
      and publishing industries for previewing layouts and visual mockups.
      </Text>
    </View>
    <View style={styles.slide}>
      <Image source={require("./soggy4.jpg")} style={styles.img} />
      <Text style={styles.title}>Discover</Text>
      <Text style={styles.text2}>
      Lorem ipsum is placeholder text commonly used in the graphic, print, 
      and publishing industries for previewing layouts and visual mockups.
      </Text>
     
    </View>
  
    <View style={styles.slide}>
      <Image source={require("./doggy1.jpg")} style={styles.img} />
      <Text style={styles.title} >Get Started</Text>
      <Text style={styles.text2}>
      Lorem ipsum is placeholder text commonly used in the graphic, print, 
      and publishing industries for previewing layouts and visual mockups.
      </Text>
    </View>
    <View style={styles.slide}>
      <Image source={require("./doggy2.jpg")} style={styles.img} />
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.text2}>
      Lorem ipsum is placeholder text commonly used in the graphic, print, 
      and publishing industries for previewing layouts and visual mockups.
      </Text>
      <Button
          title="Home"
          onPress={() => navigation.navigate('Home')}
        />
    </View>
  </Swiper>
  );
}
  

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  

return(
  <NavigationContainer>
  <Drawer.Navigator drawerContent={props=><Sidebar {...props}/>} initialRouteName="Login">
    <Drawer.Screen name="home"  screenOptions={{headerShown: false}} component={HomeScreenStack}  options={{ 
      headerRight: () => (
        <View>
        <TouchableOpacity style={{marginRight:15}}>
          <MaterialCommunityIcons name='dots-vertical' size={24}/>
        </TouchableOpacity>
        </View>
      ),
      
         headerStyle: {shadowColor:'#000', elevation:10,backgroundColor:'#F3EDF5',
           borderBottomRightRadius:50, borderBottomLeftRadius:50, height:100, },
          headerTitle:'',headerTransparent: true, 
          drawerIcon:({focused, color,size}) => (
            <Icon name='home' style={{fontSize: size, color: color}} />
          )}}/>
    
       <Drawer.Screen name="Login" component={LoginScreen}  options={{ headerShown: false,
          drawerIcon:({focused, color,size}) => (
            <Icon name='login' style={{fontSize: size, color: color}} />
          ) }}/>
          <Drawer.Screen name="Register" component={RegisterScreen}  options={{ headerShown: false,
          drawerIcon:({focused, color,size}) => (
            <Icon name='login' style={{fontSize: size, color: color}} />
          ) }}/>
          <Drawer.Screen name="Hello" component={Hello}  options={{ headerShown: false,  
          drawerIcon:({focused, color,size}) => (
            <Icon name='setting' style={{fontSize: size, color: color}} />
          )}}/>
    
  </Drawer.Navigator>
  
</NavigationContainer>
);
}
  export default () => {
    return(
      
        <App/>
      
    );
  }


const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  slide: {
    flex: 1,
    paddingTop: 80,
    marginHorizontal: 30,
  },
  img: {
    alignSelf: "center",
    borderTopRightRadius: 80,
    borderBottomLeftRadius: 80,
    height: h * 0.5,
    width: w * 0.9,
  },
  title: {
    
    marginTop: 60,
    marginHorizontal: 10,
    fontSize: 32,
  },
  text2: {
    color: "#767676",
    
    marginTop: 20,
    fontSize: 16,
    lineHeight: 25,
    marginLeft: 10,
  },
  text: {
    fontSize: 20,
    backgroundColor: "lightblue",
  },
  circle:{
    width:26,
    height:26,
    borderRadius: 50,
    shadowColor: "#555",
    shadowOffset:{
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.9

  },
  stroke:{
    width:26,
    height:26,
    borderRadius: 50,
    backgroundColor:'#fff',
    zIndex: 1
  },
  core:{
    width: 24,
    height: 24,
    position: 'absolute',
    top: 1,
    left: 1,
    right: 1,
    bottom: 1,
    backgroundColor: 'green',
    zIndex: 2,
    borderRadius: 50

  },
  bubble:{
    flexDirection:'row',
    alignSelf:'flex-start',
    borderRadius: 6,
    backgroundColor:'#fff',
    borderColor:'#ccc',
    borderWidth: 0.5,
    padding: 15,
    width: 150,



  },
  userBtn: {
    borderColor: '#9594e5',
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  userBtnWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 10,
  },
  userBtnTxt: {
    color: '#9594e5',
  },
  userInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20,
  },
  userInfoItem: {
    justifyContent: 'center',
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  userInfoSubTitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  shadow:{
    shadowOffset:{width:1, height:10},
    shadowOpacity: 0.4,
    shadowRadius:3,
    elevation: 15
  }
});
//<Button onPress={() => goToGarden()} title="Go to Vermanskij" />
//<Button onPress={() => goToMezapark()} title="Go to Mezaparks" />

