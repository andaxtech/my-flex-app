// app/(tabs)/signup/step3.tsx
import { useSignup } from '@/context/SignupContext';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
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
    TouchableWithoutFeedback,
    View,
} from 'react-native';

export default function SignupStep3() {
  const router = useRouter();
  const { signupData, updateData } = useSignup();

  const handleChange = (key: string, value: string) => {
    updateData({ [key]: value });
  };

  const handleUpload = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Permission Denied', 'Camera access is required to upload an image');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      updateData({ license_plate_image: result.assets[0].uri });
    }
  };

  const validate = () => {
    const requiredFields = [
      'license_number',
      'license_expiration',
      'car_make',
      'car_model',
      'car_year',
      'car_color',
      'license_plate',
      'vin_number',
      'license_plate_image'
    ];

    const missing = requiredFields.filter((field) => !signupData[field]);
    if (missing.length > 0) {
      Alert.alert('Missing Fields', `Please fill in: ${missing.join(', ')}`);
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validate()) {
      router.push('/signup/step4');
    }
  };

  const handleBack = () => {
    router.push('/signup/step2');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Driver License & Vehicle Info</Text>

          <TextInput
            style={styles.input}
            placeholder="License Number"
            placeholderTextColor="#888"
            value={signupData.license_number || ''}
            onChangeText={(val) => handleChange('license_number', val)}
          />

          <TextInput
            style={styles.input}
            placeholder="License Expiration (MM/DD/YYYY)"
            placeholderTextColor="#888"
            value={signupData.license_expiration || ''}
            onChangeText={(val) => handleChange('license_expiration', val)}
          />

          <TextInput
            style={styles.input}
            placeholder="Car Make"
            placeholderTextColor="#888"
            value={signupData.car_make || ''}
            onChangeText={(val) => handleChange('car_make', val)}
          />

          <TextInput
            style={styles.input}
            placeholder="Car Model"
            placeholderTextColor="#888"
            value={signupData.car_model || ''}
            onChangeText={(val) => handleChange('car_model', val)}
          />

          <TextInput
            style={styles.input}
            placeholder="Car Year"
            placeholderTextColor="#888"
            value={signupData.car_year || ''}
            onChangeText={(val) => handleChange('car_year', val)}
            keyboardType="numeric"
          />

          <TextInput
            style={styles.input}
            placeholder="Car Color"
            placeholderTextColor="#888"
            value={signupData.car_color || ''}
            onChangeText={(val) => handleChange('car_color', val)}
          />

          <TextInput
            style={styles.input}
            placeholder="License Plate"
            placeholderTextColor="#888"
            value={signupData.license_plate || ''}
            onChangeText={(val) => handleChange('license_plate', val)}
          />

          <TextInput
            style={styles.input}
            placeholder="VIN Number"
            placeholderTextColor="#888"
            value={signupData.vin_number || ''}
            onChangeText={(val) => handleChange('vin_number', val)}
          />

          <TouchableOpacity onPress={handleUpload} style={styles.uploadButton}>
            <Text style={styles.uploadButtonText}>
              {signupData.license_plate_image ? 'Change License Plate Image' : 'Upload License Plate Image'}
            </Text>
          </TouchableOpacity>

          {signupData.license_plate_image && (
            <Image
              source={{ uri: signupData.license_plate_image }}
              style={styles.imagePreview}
            />
          )}

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
  uploadButton: {
    backgroundColor: '#ccc',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 12,
  },
  uploadButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  imagePreview: {
    width: '50%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});
