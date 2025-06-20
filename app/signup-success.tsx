import { StyleSheet, Text, View } from 'react-native';

export default function SignupSuccessScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thanks for Signing Up!</Text>
      <Text style={styles.message}>
        Our team will review your information and contact you once you're approved to start earning.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
  },
});
