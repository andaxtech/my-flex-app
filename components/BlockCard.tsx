import { Button, StyleSheet, Text, View } from 'react-native';

export default function BlockCard({ block, onPress }: any) {
  return (
    <View style={styles.card}>
      <Text style={styles.text}>Block ID: {block.block_id}</Text>
      <Text style={styles.text}>Location ID: {block.location_id}</Text>
      <Text style={styles.text}>Start Time: {block.start_time}</Text>
      <Text style={styles.text}>End Time: {block.end_time}</Text>
      <Text style={styles.text}>Status: {block.status}</Text>
      {onPress && <Button title="Claim" onPress={onPress} />}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
  },
});
