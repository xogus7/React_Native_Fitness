import React, { useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import ImageCropPicker from 'react-native-image-crop-picker'
import Toast from 'react-native-toast-message';

import { hasAndroidPermission } from '@utils/permissions';
import { API_URL, api } from '@utils/api';
import BasicHeader from '@components/BasicHeader';
import AlertModal from '@components/AlertModal';



const EditMyInfo = ({ navigation, route }) => {
    const { nickName, introduce, profileImagePath } = route.params;
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            introduce,
            nickName,
        },
    });
    const [newProfileImage, setProfileImage] = useState();
    const [isVisible, setIsVisible] = useState(false);

    const patchProfileImage = async () => {
        if (hasAndroidPermission()) {
            try {
                const selcetedImage = await ImageCropPicker.openPicker({
                    mediaType: 'photo',
                    cropping: true,
                });

                const newProfileImageData = {
                    uri: selcetedImage.path,
                    type: selcetedImage.mime,
                    name: 'profileImage',
                };

                const formData = new FormData();
                formData.append('image', newProfileImageData);
                const response = await api.patch('/accounts/profile', formData, {
                    headers: { 'Content-Type': 'multipart/form-data', },
                });

                console.log(JSON.stringify(formData))
                if (response.ok) {
                    setProfileImage(newProfileImageData);
                } else {
                    console.warn(response);
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    const deleteProfileImage = async () => {
        const formData = new FormData();
        formData.append('image', {
            uri: 'https://avatar.iran.liara.run/public',
            type: 'image/jpeg',
            name: 'profileImage',
          })
        const response = await api.patch('/accounts/profile', formData, {
            headers: { 'Content-Type': 'multipart/form-data', },
        });
        console.log(formData)
        if (response.ok) {
            setProfileImage(null);
        } else {
            console.warn(response);
        }
        setIsVisible(false)
    }

    const patchAccounts = async (form) => {
        const response = await api.patch('/accounts', {
            nickname: {
                value: form.nickName,
            },
            name: form.nickName,
            introduce: form.introduce,
        });
        if (response.ok) {
            Toast.show({
                type: 'success',
                text1: '변경사항을 저장했습니다.'
            });
            navigation.goBack();
        } else {
            console.warn(response.data);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <BasicHeader title={'프로필 편집'} />

            <View style={{ flex: 1, margin: 16, gap: 16 }}>
                <TouchableOpacity
                    style={{ justifyContent: 'center', alignItems: 'center' }}
                    onPress={patchProfileImage}
                    onLongPress={() => setIsVisible(true)}
                >
                    <Image
                        style={{ width: 80, height: 80, borderRadius: 100 }}
                        source={
                            newProfileImage ?
                                { uri: newProfileImage.uri }
                                : (profileImagePath ?
                                    { uri: `${API_URL}${profileImagePath}` }
                                    : { uri: 'https://avatar.iran.liara.run/public' }
                                )
                        }
                    />

                </TouchableOpacity>
                <TouchableOpacity style={{
                    height: 40,
                    backgroundColor: '#9CB6FF',
                    borderRadius: 8,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#000', paddingHorizontal: 10 }}>프로필 이미지 바꾸기</Text>
                </TouchableOpacity>
                <View style={{ gap: 8 }}>
                    <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 16 }}>
                        닉네임
                    </Text>
                    <Controller
                        control={control}
                        name="nickName"
                        rules={{
                            required: {
                                value: true,
                                message: '닉네임을 입력해주세요.'
                            },
                            pattern: {
                                value: /^[ㄱ-ㅎ가-힣a-z0-9-_]{2,10}$/,
                                message: '닉네임은 한글, 영어, 숫자를 2~10글자 사이로 입력해주세요.'
                            },
                        }}
                        render={({ field: { value, onChange, onBlur } }) => (
                            <TextInput
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                style={styles.input}
                                placeholder="닉네임"
                            />
                        )}
                    />
                    {errors.nickName &&
                        <Text style={{ color: 'red' }}>{errors.nickName.message}</Text>}
                </View>
                <View style={{ gap: 8 }}>
                    <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 16 }}>
                        소개
                    </Text>
                    <Controller
                        control={control}
                        name="introduce"
                        render={({ field: { value, onChange, onBlur } }) => (
                            <TextInput
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                style={styles.input}
                                placeholder="간단한 지기 소개"
                            />
                        )}
                    />
                </View>
                <TouchableOpacity
                    style={{
                        height: 40,
                        backgroundColor: '#9CB6FF',
                        borderRadius: 8,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    onPress={handleSubmit(patchAccounts)}>
                    <Text style={{ color: '#000', fontWeight: '700', fontSize: 15 }}>
                        완료
                    </Text>
                </TouchableOpacity>
            </View>
            <AlertModal
                isVisible={isVisible}
                headerTitle={'이미지를 삭제하시겠습니까?'}
                okText={'삭제하기'}
                noText={'취소'}
                onPressOk={deleteProfileImage}
                onPressNo={() => setIsVisible(false)}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    input: {
        paddingHorizontal: 16,
        borderRadius: 8,
        backgroundColor: '#DCE6FF',
    },

})

export default EditMyInfo;