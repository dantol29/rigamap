import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapView, { Marker, Polygon, Callout } from "react-native-maps";
import { StyleSheet, Text, View , KeyboardAvoidingView,ScrollView, 
  Platform, StatusBar, SafeAreaView, Image, ImageBackground, Dimensions, Alert, Keyboard, Pressable, Animated} from 'react-native';
import React, { useRef, useState, Label, Item, Body, useEffect } from 'react';
import { Button, CheckBox, Input, ListItem } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/AntDesign';
import { FlatList, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Sidebar from './customDrawer';
import Swiper from "react-native-swiper";
import AntDesign from "@expo/vector-icons/AntDesign";
import { firebaseConfig } from './config';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import * as Location from 'expo-location';
import { markers, mapDarkStyle, mapStandardStyle } from './model/mapData';
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import StarRating from './StarRating';

//client id android 958553801084-5244sg4st3j8j1i0jlcone9n4hndof3u.apps.googleusercontent.com
// client id ios 958553801084-s85p2orhfvi9vui0s6714dh1usb7k7b2.apps.googleusercontent.com
//client secret   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
// client id  web  958553801084-04mj5h4b6rrtbnafi7fipgcu7qkfdbf2.apps.googleusercontent.com
const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 180;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;
const Tab = createMaterialBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function HomeScreen({navigation}) {

  useEffect(() => {
    (async () => {
      let { status } = await  Location.requestForegroundPermissionsAsync();
     if (status !== 'granted') {
       // setStatus('Permission to access location was denied');
        return;
     } else {
       console.log('Access granted!!')
      // setStatus(status)
     }
    
    })();
  }, []);

  const mapRef = useRef(null);
 let mapAnimation = new Animated.Value(0);
  
  
  const goToGarden = () => {
    //complete this animation in 3 seconds
    mapRef.current.animateToRegion(gardenRegion, 2 * 1000);
  };
  const goToMezapark = () => {
    //complete this animation in 3 seconds
    mapRef.current.animateToRegion(mezaparkRegion, 2 * 1000);
  };

  const initialMapState = {
    markers,
    categories: [
      { 
        name: 'Shops', 
        icon: <MaterialCommunityIcons style={styles.chipsIcon} name="paw" size={18} />,
      },
      {
        name: 'Clinics',
        icon: <MaterialCommunityIcons name="hospital" style={styles.chipsIcon} size={18} />,
      },
      {
        name: 'Parks',
        icon: <MaterialCommunityIcons name="forest" style={styles.chipsIcon} size={18} />,
      },
      {
        name: 'Schools',
        icon: <Ionicons name="school" style={styles.chipsIcon} size={18} />,
      },
      {
        name: 'Hotel',
        icon: <Ionicons name="md-restaurant" style={styles.chipsIcon} size={15} />,
      },
  ],
    region: {
      latitude: 22.62938671242907,
      longitude: 88.4354486029795,
      latitudeDelta: 0.04864195044303443,
      longitudeDelta: 0.040142817690068,
    },
  };
  
  const onMarkerPress = (mapEventData) => {
    const markerID = mapEventData._targetInst.return.key;

    let x = (markerID * CARD_WIDTH) + (markerID * 20); 
    if (Platform.OS === 'ios') {
      x = x - SPACING_FOR_CARD_INSET;
    }

    _scrollView.current.scrollTo({x: x, y: 0, animated: true});
  }
 

  
  const [state, setState] = React.useState(initialMapState);
  const _scrollView = React.useRef(null);

  const interpolations = state.markers.map((marker, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      ((index + 1) * CARD_WIDTH),
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: "clamp"
    });

    return { scale };
  });


  return (
    <View style={styles.container}>
      
      <MapView
        ref={mapRef}
        showsUserLocation={true}
        followsUserLocation={true}
        customMapStyle={mapStandardStyle}
        style={styles.map}
        showsCompass={false}
        showsIndoorLevelPicker={true}
        initialRegion={{
          latitude: 56.9677,
          longitude: 24.1056,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >

         {state.markers.map((marker, index) => {
         const scaleStyle = {
          transform: [
            {
              scale: interpolations[index].scale,
            },
          ],
        };
          return (
            <Marker key={index} coordinate={marker.coordinate} onPress={(e)=>onMarkerPress(e)}>
              <Animated.View style={[styles.markerWrap]}>
                <Animated.Image
                  source={require('./marker_purple.png')}
                  style={[styles.marker, scaleStyle]}
                  resizeMode="cover"
                />
              </Animated.View>
            </Marker>
          );
        })}
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
      
      
      </MapView>
      <View style={styles.searchBox}>
        <TextInput 
          placeholder="Search here"
          placeholderTextColor="#000"
          autoCapitalize="none"
          style={{flex:1,padding:0}}
        />
        <Ionicons name="ios-search" size={20} />
      </View>
      <ScrollView
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        height={50}
        style={styles.chipsScrollView}
        contentInset={{ // iOS only
          top:0,
          left:0,
          bottom:0,
          right:20
        }}
        contentContainerStyle={{
          paddingRight: Platform.OS === 'android' ? 20 : 0
        }}
      >
        {state.categories.map((category, index) => (
          
          <TouchableOpacity key={index} style={styles.chipsItem}>
            {category.icon}
            <Text>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Animated.ScrollView
        ref={_scrollView}
        horizontal
        pagingEnabled
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + 20}
        snapToAlignment="center"
        style={styles.scrollView}
        contentInset={{
          top: 0,
          left: SPACING_FOR_CARD_INSET,
          bottom: 0,
          right: SPACING_FOR_CARD_INSET
        }}
        contentContainerStyle={{
          paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0
        }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: mapAnimation,
                }
              },
            },
          ],
          {useNativeDriver: true}
        )}
      >
          {state.markers.map((marker, index) =>(
          <View style={styles.card} key={index}>
            <Image 
              source={marker.image}
              style={styles.cardImage}
              resizeMode="cover"
            />
            <View style={styles.textContent}>
              <Text numberOfLines={1} style={styles.cardtitle}>{marker.title}</Text>
              <StarRating ratings={marker.rating} reviews={marker.reviews} />
              <Text numberOfLines={1} style={styles.cardDescription}>{marker.description}</Text>
              <View style={styles.button}>
                <TouchableOpacity
                  onPress={() => {}}
                  
                >
                  <Text style={[styles.textSign, {
                    color: '#8A56AC'
                  }]}>More</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </Animated.ScrollView>
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
  


  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log('Signed in')
      const user = userCredential.user;
      console.log(user)
      navigation.navigate('home');
    })
    .catch.log(error => {
      
      Alert.alert('Login error',error.message)
    })
  }
 
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
                <MaterialCommunityIcons name='google-plus' style={{color:'black',fontSize:30}} onPress={
                  () => {
                    promptAsync();
                  }
                }/>
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
      navigation.navigate('home');
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
              ></Input>
              <Input placeholder='Password' secureTextEntry type='password'
              onChangeText={(text) => setPassword(text)}></Input>
              <Input placeholder='Repeat password' secureTextEntry type='password'
              ></Input>
              <Input placeholder='Age' secureTextEntry type='password'
             ></Input>
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
              onPress={handleCreateAccount}
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
        component={HomeScreenStack}
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
  
  

return(
  <NavigationContainer>
  <Drawer.Navigator drawerContent={props=><Sidebar {...props}/>} initialRouteName="Home">
    <Drawer.Screen name="Home"  screenOptions={{headerShown: false}} component={HomeScreenStack}  options={{ headerShown: false,
      headerRight: () => (
        <View>
        <TouchableOpacity style={{marginRight:15}}>
          <MaterialCommunityIcons name='dots-vertical' size={24}/>
        </TouchableOpacity>
        </View>
      ),
         
        // headerStyle: {shadowColor:'#000', elevation:10,backgroundColor:'#F3EDF5',
          // borderBottomRightRadius:50, borderBottomLeftRadius:50, height:100, },
          //headerTitle:'',headerTransparent: true, 
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
  },
  searchBox:{
    position:'absolute',
    top:Platform.OS === 'ios' ? 50 : 60,
    flexDirection:'row',
    backgroundColor:'#fff',
    width:'90%',
    alignSelf:'center',
    borderRadius: 5,
    padding: 10,
    shadowColor:'#ccc',
    shadowOffset: {width: 0, height:3 },
    shadowOpacity:0.5,
    shadowRadius:5,
    elevation:10
  },
  chipsScrollView: {
    position:'absolute', 
    top:Platform.OS === 'ios' ? 110 : 120, 
    paddingHorizontal:10
  },
  chipsIcon: {
    marginRight: 5,
  },
  chipsItem: {
    flexDirection:"row",
    backgroundColor:'#fff', 
    borderRadius:20,
    padding:8,
    paddingHorizontal:20, 
    marginHorizontal:10,
    height:35,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  marker: {
    width: 30,
    height: 40,
  },
  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 90,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    // padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
   
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
    borderRadius:20
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
  cardtitle: {
    fontSize: 12,
    // marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width:50,
    height:50,
  },
});
//<Button onPress={() => goToGarden()} title="Go to Vermanskij" />
//<Button onPress={() => goToMezapark()} title="Go to Mezaparks" />

