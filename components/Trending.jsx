import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import AppBar from './AppBar';

const Trending = () => {
  return (
    <><AppBar title="Trending" />
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.avatarPlaceholder} />
          <View style={styles.headerTextPlaceholder} />
        </View>
        <View style={styles.imagePlaceholder} />
        <View style={styles.cardFooter}>
          <View style={styles.actionPlaceholder} />
          <View style={styles.actionPlaceholder} />
          <View style={styles.actionPlaceholder} />
        </View>
      </View>

        <Text style={styles.comingSoon}>Trending is coming soon</Text>
      <Text style={styles.subText}>
       Trending a project is still its beta stage and will be available soon
      </Text>
    </View>
    </>
  );
};

const { width } = Dimensions.get('window');
const cardWidth = width - 32;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  time: {
    fontSize: 14,
    color: '#666',
  },
  comingSoon: {
    fontSize: 18,
    marginBottom: 8,
    color: '#000',
    textAlign:'center',
    fontWeight:"bold"
  },
  subText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    lineHeight: 22,
    textAlign:'center'
  },
  card: {
    width: cardWidth,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',
  },
  avatarPlaceholder: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    marginRight: 12,
  },
  headerTextPlaceholder: {
    width: 120,
    height: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
  },
  imagePlaceholder: {
    width: '100%',
    height: cardWidth,
    backgroundColor: '#f0f0f0',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#fff',
  },
  actionPlaceholder: {
    width: 24,
    height: 24,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
  },
});

export default Trending;