import React from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import Toast from 'react-native-toast-message';

import { api } from '../../utils/api';

const Login = ({ navigation }) => {
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: 'test7@test.com',
            password: 'Asdf1234!',
        },
    });

    const validation = async (formData) => {
        const response = await api.post('/auth', formData);
        if (!response.ok) {
            return Toast.show({
                type: 'error',
                text1: 'Login fail',
                text2: `${response.data.message}`
            });;
        }

        const userInfoResponse = await api.get('/accounts/info');
        if (userInfoResponse.ok && userInfoResponse.data?.result) {
            Toast.show({
                type: 'success',
                text1: `어서오세요! ${userInfoResponse.data.result.nickName}님`
            });
            navigation.navigate('MainTab');
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={styles.loginScreen}>
                <View style={styles.loginContainer}>
                    <View style={{ gap: 8 }}>
                        <Controller
                            name="email"
                            control={control}
                            render={({ field: { onBlur, onChange, value } }) => (
                                <TextInput
                                    style={styles.input}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    placeholder="email"
                                />
                            )}
                        />
                        <Controller
                            name="password"
                            control={control}
                            render={({ field: { onBlur, onChange, value } }) => (
                                <TextInput
                                    style={styles.input}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    placeholder="password"
                                    secureTextEntry={true}
                                />
                            )}
                        />
                    </View>
                    <View style={{ gap: 8 }}>
                        <TouchableOpacity
                            style={styles.loginButton}
                            onPress={handleSubmit(validation)}>
                            <Text style={styles.loginButtonText}>로그인</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.loginButton}
                            onPress={() => navigation.navigate('SignUp')}>
                            <Text style={styles.loginButtonText}>회원가입</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    loginScreen: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginContainer: {
        gap: 16,
        width: '100%',
    },
    input: {
        paddingHorizontal: 16,
        borderRadius: 8,
        backgroundColor: '#B2DCFF',
    },
    loginButton: {
        height: 40,
        backgroundColor: '#4AABFF',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginButtonText: {
        color: '#fff',
    },
});

export default Login;