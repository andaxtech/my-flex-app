import { useSignup } from '@/context/SignupContext';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Alert,
    Button,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View,
} from 'react-native';

export default function SignupStep5() {
  const router = useRouter();
  const { signupData, updateData } = useSignup();

  const handleChange = (key: string, value: string) => {
    updateData({ [key]: value });
  };

  const handleSubmit = async () => {
    const requiredFields = [
      'account_holder_first_name',
      'account_holder_last_name',
      'bank_name',
      'bank_account_number',
      'routing_number',
    ];

    const missing = requiredFields.filter((key) => !signupData[key]);
    if (missing.length > 0) {
      Alert.alert('Missing Fields', `Please fill out: ${missing.join(', ')}`);
      return;
    }

    try {
      const response = await fetch('https://flex-backend2-production.up.railway.app/signup-driver', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupData),
      });

      if (response.ok) {
        router.push('/signup-success');
      } else {
        Alert.alert('Error', 'Failed to register driver');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Something went wrong');
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Banking Info & Review</Text>

          <TextInput
            style={styles.input}
            placeholder="Account Holder First Name"
            placeholderTextColor="#888"
            value={signupData.account_holder_first_name || ''}
            onChangeText={(val) => handleChange('account_holder_first_name', val)}
          />

          <TextInput
            style={styles.input}
            placeholder="Account Holder Last Name"
            placeholderTextColor="#888"
            value={signupData.account_holder_last_name || ''}
            onChangeText={(val) => handleChange('account_holder_last_name', val)}
          />

          <TextInput
            style={styles.input}
            placeholder="Bank Name"
            placeholderTextColor="#888"
            value={signupData.bank_name || ''}
            onChangeText={(val) => handleChange('bank_name', val)}
          />

          <TextInput
            style={styles.input}
            placeholder="Account Number"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={signupData.bank_account_number || ''}
            onChangeText={(val) => handleChange('bank_account_number', val)}
          />

          <TextInput
            style={styles.input}
            placeholder="Routing Number"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={signupData.routing_number || ''}
            onChangeText={(val) => handleChange('routing_number', val)}
          />

          <View style={styles.buttonRow}>
            <View style={styles.buttonWrapper}>
              <Button title="Back" onPress={() => router.push('/signup/step4')} />
            </View>
            <View style={styles.buttonWrapper}>
              <Button title="Submit" onPress={handleSubmit} />
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 20,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
    backgroundColor: '#fff',
    color: '#000',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 5,
  },
});
