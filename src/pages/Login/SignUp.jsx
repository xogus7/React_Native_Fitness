import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { api } from '../../utils/api';
import BasicHeader from '../../components/BasicHeader';
import AlertModal from '../../components/AlertModal';

const SignUp = ({ navigation }) => {
    const [isVisible, setVisible] = useState(false);
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onValid = async (form) => {
        const response = await api.post('/accounts', {
            email: form.email,
            password: form.password,
            nickname: form.nickname,
            phoneNumber: form.phoneNumber,
        });
        setVisible(true);
        if (response.ok) {
            navigation.navigate('Login');
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
                        render={({ field: { onBlur, onChange, value } }) => (
                            <TextInput
                                style={styles.input}
                                placeholder="아이디"
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
                        render={({ field: { onBlur, onChange, value } }) => (
                            <TextInput
                                style={styles.input}
                                placeholder="비밀번호"
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
                        render={({ field: { onBlur, onChange, value } }) => (
                            <TextInput
                                style={styles.input}
                                placeholder="비밀번호 확인"
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
                        render={({ field: { onBlur, onChange, value } }) => (
                            <TextInput
                                style={styles.input}
                                placeholder="닉네임"
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
                        render={({ field: { onBlur, onChange, value } }) => (
                            <TextInput
                                style={styles.input}
                                placeholder="전화번호( -제외 )"
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                            />
                        )}
                    />
                </View>
                <TouchableOpacity
                    onPress={handleSubmit(onValid)}
                    style={{
                        backgroundColor: '#4AABFF',
                        paddingHorizontal: 16,
                        paddingVertical: 16,
                        borderRadius: 8,
                        alignItems: 'center',
                    }}>
                    <Text style={{ color: '#fff' }}>회원가입하기</Text>
                </TouchableOpacity>
                <AlertModal
                    isVisible={isVisible}
                    okText={'확인'}
                    noText={'닫기'}
                    headerTitle={'잘못된 값을 입력하셨습니다.'}
                    onPressOk={() => setVisible(!isVisible)}
                    onPressNo={() => setVisible(!isVisible)}
                />
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
    errorText: {
        color: 'red',
    },
});

export default SignUp;