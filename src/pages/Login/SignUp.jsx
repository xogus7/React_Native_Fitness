import React from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import Toast from 'react-native-toast-message';

import { api } from '../../utils/api';
import BasicHeader from '../../components/BasicHeader';


const SignUp = ({ navigation }) => {
    const { control, handleSubmit, formState: { errors } } = useForm();

    const validation = async (form) => {
        const response = await api.post('/accounts', {
            email: form.email,
            password: form.password,
            nickname: form.nickname,
            phoneNumber: form.phoneNumber,
        });
        if (response.ok) {
            navigation.navigate('Login');
        }
        else {
            Toast.show({
                type: 'error',
                text1: 'SignUp fail',
                text2: `${response.data.errors[0].reason}`
            });
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <BasicHeader title="회원가입" />
            <View
                style={{
                    flex: 1,
                    marginHorizontal: 48,
                    justifyContent: 'center',
                    gap: 16,
                }}>
                <View>
                    <Controller
                        name="email"
                        control={control}
                        rules={{ required: '이메일을 입력' }}
                        render={({ field: { onBlur, onChange, value } }) => (
                            <TextInput
                                style={styles.input}
                                placeholder="email"
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                            />
                        )}
                    />

                </View>
                <View>
                    <Controller
                        name="password"
                        control={control}
                        rules={{ required: true, }}
                        render={({ field: { onBlur, onChange, value } }) => (
                            <TextInput
                                style={styles.input}
                                placeholder="password"
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                secureTextEntry={true}
                            />
                        )}
                    />
                </View>
                <View>
                    <Controller
                        name="passwordCheck"
                        control={control}
                        rules={{ required: true, }}
                        render={({ field: { onBlur, onChange, value } }) => (
                            <TextInput
                                style={styles.input}
                                placeholder="passwordCheck"
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                secureTextEntry={true}
                            />
                        )}
                    />
                </View>
                <View>
                    <Controller
                        name="nickname"
                        control={control}
                        rules={{ required: { value: true, message: 'error message' } }}
                        render={({ field: { onBlur, onChange, value } }) => (
                            <TextInput
                                style={styles.input}
                                placeholder="nickname"
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                            />
                        )}
                    />
                </View>
                <View>
                    <Controller
                        name="phoneNumber"
                        control={control}
                        rules={{ required: true, }}
                        render={({ field: { onBlur, onChange, value } }) => (
                            <TextInput
                                style={styles.input}
                                placeholder="phoneNumber"
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                            />
                        )}
                    />
                </View>
                <TouchableOpacity
                    onPress={handleSubmit(validation)}
                    style={styles.signUpButton}>
                    <Text style={{ color: '#fff' }}>회원가입 하기</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#B2DCFF',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
    },
    signUpButton: {
        backgroundColor: '#4AABFF',
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderRadius: 8,
        alignItems: 'center',
    }
});

export default SignUp;