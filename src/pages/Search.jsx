import React, { useCallback, useRef, useState } from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, View, useWindowDimensions } from 'react-native';

import BasicHeader from '@components/BasicHeader';
import { API_URL, api } from '@utils/api';
const searchIcon = require('@icons/search.png');

const Search = ({ navigation }) => {
    const { width } = useWindowDimensions();
    const [feeds, setFeeds] = useState([]);
    const searchQueryRef = useRef('');
    const columns = 3;
    const imageSize = width / columns;

    const getFeeds = async () => {
        const response = await api.get('/feed/search',
            {
                searchTag: searchQueryRef.current,
                page: 0,
                pageSize: 10,
            },
        );
        if (response.ok && response.data) {
            setFeeds(response.data.result.content);
        } else {
            console.warn(response.data);
        }
    };

    const renderItem = useCallback(({ item }) => {
        return (
            <TouchableOpacity
                onPress={() =>
                    navigation.navigate('FeedDetail', {
                        id: item.id,
                    })
                }>
                <Image
                    style={{
                        width: imageSize,
                        height: imageSize,
                        borderWidth: 1,
                        borderColor: '#fff',
                        borderRadius: 8,
                    }}
                    source={{ uri: `${API_URL}${item.images[0]}` }}
                />
            </TouchableOpacity>
        );
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <BasicHeader title="검색" />
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#DCE6FF',
                    margin: 16,
                    marginBottom: 0,
                    borderRadius: 8,
                }}>
                <TextInput
                    style={{
                        flex: 1, paddingHorizontal: 16,
                        borderRadius: 8,
                        backgroundColor: '#DCE6FF',
                    }}
                    placeholder="태그를 검색하세요!"
                    onChangeText={text => (searchQueryRef.current = text)}
                />
                <TouchableOpacity style={{ paddingRight: 8 }} onPress={getFeeds}>
                    <Image style={{ width: 32, height: 32 }} source={searchIcon} />
                </TouchableOpacity>
            </View>
            <View style={{ marginTop: 16, flex: 1 }}>
                <FlatList
                    keyExtractor={item => item.id}
                    data={feeds}
                    renderItem={renderItem}
                    numColumns={columns}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({

})

export default Search;