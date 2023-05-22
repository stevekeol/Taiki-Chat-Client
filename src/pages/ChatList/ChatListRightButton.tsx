import { View, Icon } from 'native-base';
import { Header, Item, Input } from 'native-base';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Dialog from 'react-native-dialog';
import { createGroup } from '../../service';
import action from '../../state/action';
import { isiOS } from '../../utils/platform';
import { search } from '../../service';

function ChatListSearchButton() {
    const [searchKeywords, updateSearchKeywords] = useState('');

    async function handleSearch() {
        const result = await search(searchKeywords);
        updateSearchKeywords('');
        Actions.push('searchResult', result);
    }

    return (
            <Item style={styles.searchItem}>
                <Icon name="search" style={styles.searchIcon} />
                <Input
                    style={styles.searchText}
                    placeholder="Search Group/User"
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="search"
                    value={searchKeywords}
                    onChangeText={updateSearchKeywords}
                    onSubmitEditing={handleSearch}
                />
            </Item>
    )
}

function ChatListAddButton() {
    const [showDialog, toggleDialog] = useState(false);
    const [groupName, updateGroupName] = useState('');

    function handleCloseDialog() {
        updateGroupName('');
        toggleDialog(false);
    }

    async function handleCreateGroup() {
        const group = await createGroup(groupName);
        if (group) {
            action.addLinkman({
                ...group,
                type: 'group',
                unread: 1,
                messages: [],
            });
            action.setFocus(group._id);
            handleCloseDialog();
            Actions.push('chat', { title: group.name });
        }
    }

    return (
        <>
            <TouchableOpacity onPress={() => toggleDialog(true)}>
                <View style={styles.container}>
                    <Icon name="add-outline" style={styles.icon} />
                </View>
            </TouchableOpacity>
            <Dialog.Container visible={showDialog}>
                <Dialog.Title>Create group</Dialog.Title>
                <Dialog.Description>Group name</Dialog.Description>
                <Dialog.Input
                    value={groupName}
                    onChangeText={updateGroupName}
                    autoCapitalize="none"
                    autoFocus
                    autoCorrect={false}
                />
                <Dialog.Button label="Cancel" onPress={handleCloseDialog} />
                <Dialog.Button label="Create" onPress={handleCreateGroup} />
            </Dialog.Container>
        </>
    );
}

function ChatListRightButtons() {
    return (
        <>
            <ChatListAddButton />
            {/*{<ChatListSearchButton />}*/}
        </>
    )
}

export default ChatListRightButtons;

const styles = StyleSheet.create({
    container: {
        width: 44,
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        color: 'white',
        fontSize: 26,
    },
    searchContainer: {
        marginTop: isiOS ? 0 : 5,
        backgroundColor: 'transparent',
        height: 42,
        borderBottomWidth: 0,
    },
    searchItem: {
        backgroundColor: 'rgba(255,255,255,0.5)',
    },
    searchIcon: {
        color: '#555',
    },
    searchText: {
        fontSize: 14,
    },    
});
