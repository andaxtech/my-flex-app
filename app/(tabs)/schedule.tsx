import BlockCard from '@/components/BlockCard';
import { getClaimsForDriver } from '@/services/api';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export default function ScheduleScreen() {
  const [claims, setClaims] = useState([]);
  const driverId = 1;

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const data = await getClaimsForDriver(driverId);
        setClaims(data);
      } catch (error) {
        console.error('Error fetching claims:', error);
      }
    };

    fetchClaims();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Claimed Blocks</Text>
      <FlatList
        data={claims}
        keyExtractor={(item) => item.claim_id.toString()}
        renderItem={({ item }) => <BlockCard block={item} />}
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
