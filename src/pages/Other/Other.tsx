import {
    Body,
    Button,
    Content,
    Icon,
    List,
    ListItem,
    Right,
    Text,
    Toast,
    View,
} from 'native-base';
import React, { useEffect, useState } from 'react';
import { Linking, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import PageContainer from '../../components/PageContainer';

import { useIsLogin } from '../../hooks/useStore';
import socket from '../../socket';
import action from '../../state/action';
import { getStorageValue, removeStorageValue } from '../../utils/storage';
import Avatar from '../../components/Avatar';
import PrivacyPolicy, { PrivacyPolicyStorageKey } from './PrivacyPolicy';

function getIsNight() {
    const hour = new Date().getHours();
    return hour >= 18 || hour < 6;
}

function Other() {
    const isLogin = useIsLogin();
    const [isNight, setIsNight] = useState(getIsNight());
    const [showPrivacyPolicy, togglePrivacyPolicy] = useState(false);

    async function getPrivacyPolicyStatus() {
        const privacyPoliceStorageValue = await getStorageValue(
            PrivacyPolicyStorageKey,
        );
        togglePrivacyPolicy(privacyPoliceStorageValue !== 'true');
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setIsNight(getIsNight());
        }, 1000);

        getPrivacyPolicyStatus();

        return () => {
            clearInterval(timer);
        };
    }, []);

    async function logout() {
        action.logout();
        await removeStorageValue('token');
        Toast.show({ text: 'Loged out' });
        socket.disconnect();
        socket.connect();
    }

    async function login() {
        const privacyPoliceStorageValue = await getStorageValue(
            PrivacyPolicyStorageKey,
        );
        if (privacyPoliceStorageValue !== 'true') {
            togglePrivacyPolicy(true);
            return;
        }

        Actions.push('login');
    }

    return (
        <PageContainer>
            <Content>
                <View style={styles.app}>
                    <Avatar
                        src={
                            isNight
                                ? require('../../../icon.png')
                                : require('../../assets/images/admin.png')
                        }
                        size={90}
                    />
                    <Text style={styles.name}>
                        Taiki-Chat
                    </Text>
                </View>
                {/*<List style={styles.list}>
                    <ListItem
                        icon
                        onPress={() =>
                            Linking.openURL(
                                'https://github.com/stevekeol/Taiki',
                            )
                        }
                    >
                        <Body>
                            <Text style={styles.listItemTitle}>Github</Text>
                        </Body>
                        <Right>
                            <Icon
                                active
                                name="arrow-forward"
                                style={styles.listItemArrow}
                            />
                        </Right>
                    </ListItem>
                    <ListItem
                        icon
                        onPress={() =>
                            Linking.openURL('https://github.com/stevekeol/Taiki')
                        }
                    >
                        <Body>
                            <Text style={styles.listItemTitle}>Author</Text>
                        </Body>
                        <Right>
                            <Icon
                                active
                                name="arrow-forward"
                                style={styles.listItemArrow}
                            />
                        </Right>
                    </ListItem>
                    <ListItem
                        icon
                        onPress={() =>
                            Linking.openURL('https://github.com/stevekeol/Taiki')
                        }
                    >
                        <Body>
                            <Text style={styles.listItemTitle}>
                                Taiki Web
                            </Text>
                        </Body>
                        <Right>
                            <Icon
                                active
                                name="arrow-forward"
                                style={styles.listItemArrow}
                            />
                        </Right>
                    </ListItem>
                </List>*/}
            </Content>
            {isLogin ? (
                <Button
                    danger
                    block
                    style={styles.logoutButton}
                    onPress={logout}
                >
                    <Text>Log out</Text>
                </Button>
            ) : (
                <Button block style={styles.logoutButton} onPress={login}>
                    <Text>Login / Register</Text>
                </Button>
            )}
            <View style={styles.copyrightContainer}>
                <Text style={styles.copyright}>
                    Copyright© 2021-
                    {new Date().getFullYear()} Taiki
                </Text>
            </View>
            <PrivacyPolicy
                visible={showPrivacyPolicy}
                onClose={() => togglePrivacyPolicy(false)}
            />
        </PageContainer>
    );
}

const styles = StyleSheet.create({
    logoutButton: {
        marginLeft: 12,
        marginRight: 12,
    },
    app: {
        alignItems: 'center',
        paddingTop: 12,
    },
    name: {
        marginTop: 6,
        color: '#222',
    },
    list: {
        marginTop: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
    },
    listItemTitle: {
        color: '#333',
    },
    listItemArrow: {
        color: '#999',
    },
    github: {
        fontSize: 26,
        color: '#000',
    },
    copyrightContainer: {
        marginTop: 12,
        marginBottom: 6,
    },
    copyright: {
        fontSize: 10,
        textAlign: 'center',
        color: '#666',
    },
});

export default Other;