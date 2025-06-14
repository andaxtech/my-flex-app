import { useEffect, useState } from 'react';
import { Alert, Button, FlatList, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    fetch('https://flex-backend2-production.up.railway.app/blocks')
      .then(response => response.json())
      .then(data => setBlocks(data))
      .catch(error => console.error('Error fetching blocks:', error));
  }, []);

  const claimBlock = async (block_id) => {
    try {
      const response = await fetch('https://flex-backend2-production.up.railway.app/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          block_id,
          driver_id: 1  // Replace with actual driver_id later
        }),
      });

      if (response.ok) {
        Alert.alert('Success', `Block ${block_id} claimed!`);
      } else {
        Alert.alert('Error', `Failed to claim block ${block_id}`);
      }
    } catch (error) {
      console.error('Error claiming block:', error);
      Alert.alert('Error', 'Failed to claim block.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Blocks</Text>
      <FlatList
        data={blocks}
        keyExtractor={(item) => item.block_id.toString()}
        renderItem={({ item }) => (
          <View style={styles.block}>
            <Text style={styles.blockText}>Block ID: {item.block_id}</Text>
            <Text style={styles.blockText}>Location ID: {item.location_id}</Text>
            <Text style={styles.blockText}>Start Time: {item.start_time}</Text>
            <Text style={styles.blockText}>End Time: {item.end_time}</Text>
            <Text style={styles.blockText}>Status: {item.status}</Text>
            <Button title="Claim" onPress={() => claimBlock(item.block_id)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  block: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
  },
  blockText: {
    fontSize: 16,
  },
});
