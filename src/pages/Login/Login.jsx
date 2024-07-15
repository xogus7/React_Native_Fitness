import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { api } from '../../utils/api';
import AlertModal from '../../components/AlertModal';

const Login = ({ navigation }) => {
    const [isVisible, setVisible] = useState(false);
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: 'test7@test.com',
            password: 'Asdf1234!',
        },
    });

    const onValid = async (formData) => {
        const response = await api.post('/auth', formData);
        if (!response.ok) {
            console.log('login fail');
            setVisible(true);
            return;
        }

        const userInfoResponse = await api.get(
            '/accounts/info',
        );
        if (userInfoResponse.ok && userInfoResponse.data?.result) {
            console.log(userInfoResponse.data.result);
            navigation.navigate('MainTab');
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={styles.signInContainer}>
                <View style={styles.signInWrapper}>
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
                                    placeholder="이메일"
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
                                    placeholder="비밀번호"
                                    secureTextEntry={true}
                                />
                            )}
                        />
                    </View>
                    <View style={{ gap: 8 }}>
                        <TouchableOpacity
                            style={styles.loginButtonWrapper}
                            onPress={handleSubmit(onValid)}>
                            <Text style={styles.loginButtonText}>로그인</Text>
                        </TouchableOpacity>
                        <AlertModal
                            isVisible={isVisible}
                            okText={'확인'}
                            noText={'회원가입'}
                            headerTitle={'로그인 정보를 다시 입력해주세요.'}
                            onPressOk={() => setVisible(!isVisible)}
                            onPressNo={() => navigation.navigate('SignUp')}
                        />
                        <TouchableOpacity
                            style={styles.loginButtonWrapper}
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
    signInScreen: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    signInContainer: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    signInWrapper: {
        gap: 16,
        width: '100%',
    },
    inputWrapper: { flexDirection: 'row', alignItems: 'center' },
    input: {
        paddingHorizontal: 16,
        borderRadius: 8,
        backgroundColor: '#B2DCFF',
    },
    loginButtonWrapper: {
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