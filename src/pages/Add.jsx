import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, Image, FlatList, TouchableOpacity,
  useWindowDimensions, Platform, PermissionsAndroid} from 'react-native';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';

const Add = ({ navigation }) => {
    const [images, setImages] = useState([]);
    const [selectedPhoto, setSelectedPhoto] = useState();
    const [selectedIndex, setSelectedIndex] = useState();

    const { width, height } = useWindowDimensions();

    useEffect(() => {
        FetchImages();
    }, [])

    async function hasAndroidPermission() {
        const getCheckPermissionPromise = () => {
          if (Platform.Version >= 33) {
            return Promise.all([
              PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES),
              PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO),
            ]).then(
              ([hasReadMediaImagesPermission, hasReadMediaVideoPermission]) =>
                hasReadMediaImagesPermission && hasReadMediaVideoPermission,
            );
          } else {
            return PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
          }
        };
      
        const hasPermission = await getCheckPermissionPromise();
        if (hasPermission) {
          return true;
        }
        const getRequestPermissionPromise = () => {
          if (Platform.Version >= 33) {
            return PermissionsAndroid.requestMultiple([
              PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
              PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
            ]).then(
              (statuses) =>
                statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
                  PermissionsAndroid.RESULTS.GRANTED &&
                statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
                  PermissionsAndroid.RESULTS.GRANTED,
            );
          } else {
            return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE).then((status) => status === PermissionsAndroid.RESULTS.GRANTED);
          }
        };
      
        return await getRequestPermissionPromise();
      }

    const FetchImages = async () => {
        if (Platform.OS === "android" && !(await hasAndroidPermission())) {
            console.log("fail");
          }
        CameraRoll.getPhotos({
            first: 100,
            assetType: 'Photos',
            groupTypes: 'All'
        }).then(res => {
            console.log(res);
            if (!selectedPhoto) {
                setSelectedPhoto(res.edges[0].node.image);
                setSelectedIndex(0);
            }

            setImages(res.edges.map(e => e.node.image))
        })
    }

    const renderItem = ({item, index}) => {
        return (
            <TouchableOpacity 
                style={{borderWidth: 1, borderColor: '#FFF'}}
                onPress={() => {
                    setSelectedPhoto(item)
                    setSelectedIndex(index)
                }
                }>
                    {
                        selectedIndex === index && (
                            <View style={{position:'absolute', right:8, top:2, width:20, height:20, borderWidth:1, borderColor: '#000', borderRadius: 20, zIndex: 2}}>
                                <View style={{width:20, height: 20, borderRadius: 10, backgroundColor: 'green'}} />
                            </View>
                        )
                    }
                <Image source={item} style={{width: (width/4) -2, height: (width/4) -2}} />
            </TouchableOpacity>
        )
    }


    return (
        <SafeAreaView style={{flex:1, backgroundColor:'#000'}}>
            <View style={{flexDirection:'row', justifyContent:'space-between', alignItems: 'center', marginHorizontal: 16, marginBottom: 8}}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={{fontSize: 24, color:'#FFF', fontWeight: 'bold'}}>X</Text>
                </TouchableOpacity>
                <Text style={{fontSize: 15, color:'#FFF', fontWeight: 'bold'}}>새 게시물</Text>
                <TouchableOpacity>
                    <Text style={{fontSize: 14, color:'#FFF', fontWeight: 'bold'}}>다음</Text>
                </TouchableOpacity>
            </View>
            <View style={{backgroundColor:'#000', flex: 0.5}}>
                <Image source={{uri: selectedPhoto?.uri}} style={{ width: '100%', height: '100%'}} />
            </View>
            <View style={{flex: 0.5}}>
                <FlatList 
                    data={images}
                    renderItem={renderItem}
                    keyExtractor={item => item.uri}
                    numColumns={4}
                    showsVerticalScrollIndicator={false}
                    removeClippedSubviews
                />
            </View>
        </SafeAreaView>
    )
}

export default Add;