import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomTab from '@components/BottomTab';

import Splash from './pages/Splash';
import Home from './pages/Home/Home';
import Search from './pages/Search';
import Add from './pages/Add';
import Chat from './pages/Chat/Chat';
import Mypage from './pages/Mypage/Mypage';
import Follower from './pages/Mypage/Follower';
import Myfeed from './pages/Mypage/Myfeed';
import FeedDetail from './pages/Home/FeedDetail';
import ChatDetail from './pages/Chat/ChatDetail';
import SignUp from './pages/Login/SignUp';
import Login from './pages/Login/Login';
import EditMyInfo from './pages/Mypage/EditMyInfo';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const renderTabBar = (props) => <BottomTab {...props} />

const MainTab = () => {
    return (
        <Tab.Navigator 
            tabBar={renderTabBar}    
            screenOptions={{
                headerShown: false,
        }}>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Search" component={Search} />
            <Tab.Screen name="Add" component={Add} />
            <Tab.Screen name="Chat" component={Chat} />
            <Tab.Screen name="Mypage" component={Mypage} />
            
        </Tab.Navigator>

    )
}
const Router = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
            // gestureEnabled: false
        }}>
            <Stack.Screen name="Splash" component={Splash} options={{ animation: 'fade_from_bottom'}} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="MainTab" component={MainTab} />
            <Stack.Screen name="FeedDetail" component={FeedDetail} />
            <Stack.Screen name="ChatDetail" component={ChatDetail} />
            <Stack.Screen name="SearchTag" component={Search} />
            <Stack.Screen name="Myfeed" component={Myfeed} />
            <Stack.Screen name="Follower" component={Follower} />
            <Stack.Screen name="EditMyInfo" component={EditMyInfo} />
        </Stack.Navigator>
    )
}

export default Router;