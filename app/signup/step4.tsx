// app/(tabs)/signup/step4.tsx
import { useSignup } from '@/context/SignupContext';
import { useRouter } from 'expo-router';
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

export default function SignupStep4() {
  const router = useRouter();
  const { signupData, updateData } = useSignup();

  const handleChange = (key: string, value: string) => {
    updateData({ [key]: value });
  };

  const validate = () => {
    const requiredFields = [
      'insurance_provider',
      'insurance_policy_number',
      'policy_start_date',
      'policy_end_date',
    ];

    const missing = requiredFields.filter((field) => !signupData[field]);
    if (missing.length > 0) {
      Alert.alert('Missing Fields', `Please fill in: ${missing.join(', ')}`);
      return false;
    }

    const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
    if (
      !dateRegex.test(signupData.policy_start_date) ||
      !dateRegex.test(signupData.policy_end_date)
    ) {
      Alert.alert('Invalid Date Format', 'Use MM/DD/YYYY format for all dates');
      return false;
    }

    return true;
  };

  const handleNext = () => {
    if (validate()) {
      router.push('/signup/step5');
    }
  };

  const handleBack = () => {
    router.push('/signup/step3');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Insurance Info</Text>

          <TextInput
            style={styles.input}
            placeholder="Insurance Provider"
            placeholderTextColor="#888"
            value={signupData.insurance_provider || ''}
            onChangeText={(val) => handleChange('insurance_provider', val)}
          />

          <TextInput
            style={styles.input}
            placeholder="Insurance Policy Number"
            placeholderTextColor="#888"
            value={signupData.insurance_policy_number || ''}
            onChangeText={(val) => handleChange('insurance_policy_number', val)}
          />

          <TextInput
            style={styles.input}
            placeholder="Policy Start Date (MM/DD/YYYY)"
            placeholderTextColor="#888"
            value={signupData.policy_start_date || ''}
            onChangeText={(val) => handleChange('policy_start_date', val)}
          />

          <TextInput
            style={styles.input}
            placeholder="Policy End Date (MM/DD/YYYY)"
            placeholderTextColor="#888"
            value={signupData.policy_end_date || ''}
            onChangeText={(val) => handleChange('policy_end_date', val)}
          />

          <View style={styles.buttonRow}>
            <Button title="Back" onPress={handleBack} />
            <Button title="Next" onPress={handleNext} />
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
    marginTop: 10,
  },
});
