import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Image } from 'react-native';
import BasicHeader from '../../components/BasicHeader';
import { API_URL } from '@utils/api';
import { FlatList } from 'react-native-gesture-handler';


const MyFeed = ({ data, onPressFeedImage ,route}) => {
    const [width, setWidth] = useState(300);
    const numColumns = 3;
    const imageSize = width / numColumns;
    data = route.params.data
    onPressFeedImage = route.params.onPressFeedImage
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
            <BasicHeader title={'My Feed'} />
            <View style={{ flex: 1 }}>
                <FlatList
                    onLayout={event => setWidth(event.nativeEvent.layout.width)}
                    data={data}
                    numColumns={numColumns}
                    renderItem={({ item }) => {
                        const { images } = item;
                        return (
                            <TouchableOpacity onPress={() => onPressFeedImage(item.id)}>
                                <Image
                                    style={{
                                        width: imageSize,
                                        height: imageSize,
                                        borderWidth: 1,
                                        borderColor: '#fff',
                                    }}
                                    source={{ uri: `${API_URL}${images[0]}` }}
                                />
                            </TouchableOpacity>
                        );
                    }}
                />
            </View>
        </SafeAreaView>
    );
};

export default MyFeed;