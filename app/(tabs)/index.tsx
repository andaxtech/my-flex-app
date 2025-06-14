import BlockCard from '@/components/BlockCard';
import { claimBlock, getAvailableBlocks } from '@/services/api';
import { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const [blocks, setBlocks] = useState([]);
  const driverId = 1; // Replace with real driver ID later

  useEffect(() => {
    const fetchBlocks = async () => {
      try {
        const data = await getAvailableBlocks();
        setBlocks(data);
      } catch (error) {
        console.error('Error fetching blocks:', error);
        Alert.alert('Error', 'Failed to load blocks.');
      }
    };

    fetchBlocks();
  }, []);

  const handleClaim = async (block_id: number) => {
    try {
      await claimBlock(block_id, driverId);
      Alert.alert('Success', `Block ${block_id} claimed!`);
    } catch (error) {
      console.error('Error claiming block:', error);
      Alert.alert('Error', `Failed to claim block ${block_id}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Blocks</Text>
      <FlatList
        data={blocks}
        keyExtractor={(item) => item.block_id.toString()}
        renderItem={({ item }) => (
          <BlockCard block={item} onPress={() => handleClaim(item.block_id)} />
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
});
