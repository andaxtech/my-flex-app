// app/(tabs)/signup/step1.tsx
import { useSignup } from '@/context/SignupContext';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Button,
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback
} from 'react-native';

export default function SignupStep1() {
  const router = useRouter();
  const { signupData, updateData } = useSignup();

  const [image, setImage] = useState(signupData.driver_image || '');

  const pickImage = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission Required', 'Camera access is needed to upload your photo.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({ quality: 0.5, base64: false });
    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImage(uri);
      updateData({ driver_image: uri });
    }
  };

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhone = (phone: string) => /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/.test(phone);
  const isValidDate = (date: string) => /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/.test(date);

  const validate = () => {
    const { first_name, last_name, email, phone_number, birth_date } = signupData;
    if (!first_name || !last_name || !email || !phone_number || !birth_date || !image) {
      Alert.alert('Missing Fields', 'Please fill out all fields and upload a photo');
      return false;
    }
    if (!isValidEmail(email)) {
      Alert.alert('Invalid Email', 'Enter a valid email address');
      return false;
    }
    if (!isValidPhone(phone_number)) {
      Alert.alert('Invalid Phone Number', 'Enter a valid US phone number');
      return false;
    }
    if (!isValidDate(birth_date)) {
      Alert.alert('Invalid Birth Date', 'Use MM/DD/YYYY format');
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validate()) {
      router.push('/signup/step2');
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Account & Personal Info</Text>

          <TextInput
            style={styles.input}
            placeholder="First Name"
            placeholderTextColor="#888"
            value={signupData.first_name || ''}
            onChangeText={(val) => updateData({ first_name: val })}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            placeholderTextColor="#888"
            value={signupData.last_name || ''}
            onChangeText={(val) => updateData({ last_name: val })}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#888"
            keyboardType="email-address"
            value={signupData.email || ''}
            onChangeText={(val) => updateData({ email: val })}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            placeholderTextColor="#888"
            keyboardType="phone-pad"
            value={signupData.phone_number || ''}
            onChangeText={(val) => updateData({ phone_number: val })}
          />
          <TextInput
            style={styles.input}
            placeholder="Birth Date (MM/DD/YYYY)"
            placeholderTextColor="#888"
            value={signupData.birth_date || ''}
            onChangeText={(val) => updateData({ birth_date: val })}
          />

          <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
            <Text style={styles.imagePickerText}>
              {image ? 'Change Driver Image' : 'Upload Driver Image'}
            </Text>
          </TouchableOpacity>
          {image ? <Image source={{ uri: image }} style={styles.image} /> : null}

          <Button title="Next" onPress={handleNext} />
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
  imagePicker: {
    backgroundColor: '#eee',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 10,
  },
  imagePickerText: {
    color: '#333',
    fontWeight: '500',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 20,
  },
});
