import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import Toast from 'react-native-toast-message';

import { api } from '@utils/api';
import BasicHeader from '@components/BasicHeader';

const regex_email = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
const regex_pwd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#.~_-])[A-Za-z\d@$!%*?&#.~_-]{8,20}$/
const regex_nickname = /^[ㄱ-ㅎ가-힣a-z0-9-_]{2,10}$/
const regex_phoneNumber = /^\d{9,20}$/


const SignUp = ({ navigation }) => {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const [pwdValue, setPwdValue] = useState('');


    const validation = async (form) => {
        const response = await api.post('/accounts', {
            email: form.email,
            password: form.password,
            nickname: form.nickname,
            phoneNumber: form.phoneNumber,
        });
        if (response.ok) {
            Toast.show({
                type: 'success',
                text1: '회원가입 성공',
            });
            navigation.navigate('Login');
        }
        else {
            Toast.show({
                type: 'error',
                text1: '회원가입 실패',
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
                        rules={{
                            required: {
                                value: true,
                                message: '이메일을 입력해주세요.'
                            },
                            pattern: {
                                value: regex_email,
                                message: '이메일 형식이 올바르지 않습니다.'
                            },
                        }}
                        render={({ field: { onBlur, onChange, value } }) => (
                            <TextInput
                                style={styles.input}
                                placeholder="email"
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur} />
                        )}
                    />
                    {errors.email &&
                        <Text style={{ color: 'red' }}>{errors.email.message}</Text>}
                </View>
                <View>
                    <Controller
                        name="password"
                        control={control}
                        rules={{
                            required: {
                                value: true,
                                message: '비밀번호를 입력해주세요.'
                            },
                            pattern: {
                                value: regex_pwd,
                                message: '비밀번호는 8~20 자리, 최소 하나의 영어소문자, 영어 대문자, 특수 문자, 숫자 이상 포함되어야 합니다.'
                            },
                        }}
                        render={({ field: { onBlur, onChange, value } }) => (
                            <TextInput
                                style={styles.input}
                                placeholder="password"
                                value={value}
                                onChange={(event) => {
                                    const { text } = event.nativeEvent;
                                    setPwdValue(text)
                                }}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                secureTextEntry={true}
                            />
                        )}
                    />
                    {errors.password &&
                        <Text style={{ color: 'red' }}>{errors.password.message}</Text>}
                </View>
                <View>
                    <Controller
                        name="passwordCheck"
                        control={control}
                        rules={{
                            required: {
                                value: true,
                                message: '비밀번호를 한 번 더 입력해주세요.'
                            },
                            pattern: {
                                value: new RegExp(`${pwdValue}`),
                                message: '비밀번호가 일치하지 않습니다.'
                            },
                        }}
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
                    {errors.passwordCheck &&
                        <Text style={{ color: 'red' }}>{errors.passwordCheck.message}</Text>}
                </View>
                <View>
                    <Controller
                        name="nickName"
                        control={control}
                        rules={{
                            required: {
                                value: true,
                                message: '닉네임을 입력해주세요.'
                            },
                            pattern: {
                                value: regex_nickname,
                                message: '닉네임은 한글, 영어, 숫자를 2~10글자 사이로 입력해주세요.'
                            },
                        }}
                        render={({ field: { onBlur, onChange, value } }) => (
                            <TextInput
                                style={styles.input}
                                placeholder="nickName"
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                            />
                        )}
                    />
                    {errors.nickName &&
                        <Text style={{ color: 'red' }}>{errors.nickName.message}</Text>}
                </View>
                <View>
                    <Controller
                        name="phoneNumber"
                        control={control}
                        rules={{
                            required: {
                                value: true,
                                message: '전화번호를 입력해주세요.'
                            },
                            pattern: {
                                value: regex_phoneNumber,
                                message: '9~20자리 숫자만 입력 가능합니다.'
                            },
                        }}
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
                    {errors.phoneNumber &&
                        <Text style={{ color: 'red' }}>{errors.phoneNumber.message}</Text>}
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