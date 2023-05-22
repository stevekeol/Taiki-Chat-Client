import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { Scene, Router, Stack, Tabs, Lightbox } from 'react-native-router-flux';
import { Root } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons'; // 最后的路径字段表示选择的图标库
import { connect } from 'react-redux';
import ChatList from './pages/ChatList/ChatList';
import Chat from './pages/Chat/Chat';
import Login from './pages/LoginSignup/Login';
import Signup from './pages/LoginSignup/Signup';

import Loading from './components/Loading';
import Other from './pages/Other/Other';
import Notification from './components/Nofitication'; // 暂时不能消息推送
import { State, User } from './types/redux';
import SelfInfo from './pages/ChatList/SelfInfo';
import ChatBackButton from './pages/Chat/ChatBackButton';
import GroupProfile from './pages/GroupProfile/GroupProfile';
import ChatRightButton from './pages/Chat/ChatRightButton';
import UserInfo from './pages/UserInfo/UserInfo';
import ChatListRightButtons from './pages/ChatList/ChatListRightButton';
import SearchResult from './pages/SearchResult/SearchResult';
import GroupInfo from './pages/GroupInfo/GroupInfo';
import BackButton from './components/BackButton';

type Props = {
    title: string;
    primaryColor: string;
    isLogin: boolean;
};

function App({ title, primaryColor, isLogin }: Props) {
    const primaryColor10 = `rgba(${primaryColor}, 1)`;
    const primaryColor8 = `rgba(${primaryColor}, 0.8)`;

    const sceneCommonProps = {
        //隐藏导航栏（自定义的带有返回按钮的导航栏）
        hideNavBar: false,
        //导航栏背景透明度
        // navTransparent: false,
        // 导航栏样式
        navigationBarStyle: {
            backgroundColor: 'black', // 设置为transparent时，实际上是灰色的
            borderBottomWidth: 0,
            height: 40,
        },
        navBarButtonColor: '#f9f9f9',
        titleStyle: {
            fontSize: 20,
        },
        renderLeftButton: () => <BackButton />,
    };

    return (
        <View style={styles.container}>
            {/* @TODO 为了美观，目前直接隐藏状态栏，需要调整为 1. 沉浸式然后padding-top；2. 颜色动态跟随 */}
            <StatusBar hidden={true} barStyle="dark-content" />
            <Root>
                <Router>
                    <Stack hideNavBar>
                        <Lightbox>
                            <Tabs
                                key="tabs"
                                hideNavBar
                                tabBarStyle={{
                                    backgroundColor: primaryColor8,
                                    borderTopWidth: 0,
                                }}
                                showLabel={false} // 是否显示Tab label
                            >
                                <Scene
                                    key="chatlist"
                                    navBarButtonColor="transparent"
                                    component={ChatList}
                                    initial
                                    hideNavBar={!isLogin}
                                    icon={({ focused }) => (
                                        <Icon
                                            name="message"
                                            style={{
                                                fontSize: 24,
                                                color: focused
                                                    ? 'white'
                                                    : '#bbb', // Tab图标切换前后的颜色变化
                                            }}
                                        />
                                    )}
                                    renderLeftButton={() => <SelfInfo />}
                                    renderRightButton={() => (
                                        <ChatListRightButtons />
                                    )}
                                    navigationBarStyle={{
                                        backgroundColor: primaryColor10,
                                        borderBottomWidth: 0,
                                    }}
                                />
                                <Scene
                                    key="other"
                                    component={Other}
                                    hideNavBar
                                    title="Other"
                                    icon={({ focused }) => (
                                        <Icon
                                            name="home"
                                            style={{
                                                fontSize: 24,
                                                color: focused
                                                    ? 'white'
                                                    : '#bbb',
                                            }}
                                        />
                                    )}
                                />
                            </Tabs>
                        </Lightbox>
                        <Scene
                            key="chat"
                            component={Chat}
                            title="Chat"
                            getTitle={title}
                            {...sceneCommonProps}
                            renderLeftButton={() => <ChatBackButton />}
                            renderRightButton={() => <ChatRightButton />}
                        />
                        <Scene
                            key="login"
                            component={Login}
                            title="Login"
                            {...sceneCommonProps}
                        />
                        <Scene
                            key="signup"
                            component={Signup}
                            title="Register"
                            {...sceneCommonProps}
                        />
                        <Scene
                            key="groupProfile"
                            component={GroupProfile}
                            title="Group Profile"
                            {...sceneCommonProps}
                        />
                        <Scene
                            key="userInfo"
                            component={UserInfo}
                            title="User Info"
                            {...sceneCommonProps}
                        />
                        <Scene
                            key="groupInfo"
                            component={GroupInfo}
                            title="Group Info"
                            {...sceneCommonProps}
                        />
                        <Scene
                            key="searchResult"
                            component={SearchResult}
                            title="Search Result"
                            {...sceneCommonProps}
                        />
                    </Stack>
                </Router>
            </Root>

            <Loading />
            {/*<Notification />*/}
        </View>
    );
}

export default connect((state: State) => ({
    primaryColor: state.ui.primaryColor,
    isLogin: !!(state.user as User)?._id,
}))(App);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
