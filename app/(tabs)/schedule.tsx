import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export default function ScheduleScreen() {
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    fetch('https://flex-backend2-production.up.railway.app/claims?driver_id=1') // Replace with actual driver_id
      .then(response => response.json())
      .then(data => setClaims(data))
      .catch(error => console.error('Error fetching claims:', error));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Claimed Blocks</Text>
      <FlatList
        data={claims}
        keyExtractor={(item) => item.claim_id.toString()}
        renderItem={({ item }) => (
          <View style={styles.claim}>
            <Text>Claim ID: {item.claim_id}</Text>
            <Text>Block ID: {item.block_id}</Text>
            <Text>Claim Time: {item.claim_time}</Text>
            <Text>Status: {item.status}</Text>
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
  claim: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
  },
});
