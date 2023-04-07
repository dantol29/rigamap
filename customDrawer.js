import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import React from 'react';
import { NativeBaseProvider, Box, HStack, Divider,Avatar, Text, Switch} from "native-base";
import Icon from 'react-native-vector-icons/AntDesign';

function Sidebar({...props}){
    
    return(
        <NativeBaseProvider>
        <HStack bg="#ffffff" px="5" py="10" justifyContent="space-between" alignItems="center" w="100%" maxW="350">
        
        <Avatar size="20" source={require('./dantol-photo.jpg')} />
        <Box>
        <Text px="5" style={{fontWeight:'bold', fontSize:20}}>Vasja Pupkin</Text>
        <Text px="5" style={{fontWeight:'300', fontSize:12}}> Owner of Siberian Husky</Text>
        </Box>
        </HStack>
        
        <Divider my={1} />
            <DrawerContentScrollView {...props}>
        <DrawerItemList {...props}/>
        <DrawerItem label='Rate Us' icon={({color,size}) => 
        <Icon name='staro' style={{fontSize: size, color: color}} />}
        onPress={() => props.navigation.navigate('Home')}
        />
    </DrawerContentScrollView>
    <HStack alignItems="center" space={79}>
      <Text fontSize="lg" px='5' >Dark Mode</Text>
      <Switch value={true} />
    </HStack>
        </NativeBaseProvider>
    );
}

export default Sidebar;