// app/(tabs)/signup/step2.tsx
import { useSignup } from '@/context/SignupContext';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Alert,
    Button,
    Keyboard,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View,
} from 'react-native';

export default function SignupStep2() {
  const router = useRouter();
  const { signupData, updateData } = useSignup();

  const [username, setUsername] = useState(signupData.username || '');
  const [password, setPassword] = useState(signupData.password || '');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleNext = () => {
    if (!username || !password || !confirmPassword) {
      Alert.alert('Missing Fields', 'All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Password Mismatch', 'Passwords do not match');
      return;
    }

    updateData({ username, password });
    router.push('/signup/step3');
  };

  const handleBack = () => {
    router.push('/signup/step1'); // Navigate directly to Step 1
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Create Login</Text>

        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#666"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#666"
          value={password}
          secureTextEntry
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#666"
          value={confirmPassword}
          secureTextEntry
          onChangeText={setConfirmPassword}
        />

        <View style={styles.buttonContainer}>
          <Button title="Back" onPress={handleBack} />
          <Button title="Next" onPress={handleNext} />
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
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
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
    color: '#000',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 10,
  },
});
