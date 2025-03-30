import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { getSearch } from '../redux/profilereducer';
import { connect } from 'react-redux';
import AppBar from './AppBar';
import { useNavigate } from 'react-router-native';

const SearchScreen = ({ getSearch, getSearchData }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    handleSearch('');
  }, []);

  const handleSearch = async (text) => {
    setQuery(text);
    setLoading(true);
    await getSearch(text);
    setLoading(false);
  };

  return (
    <>
      <AppBar title={'Search'} />
      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search profiles..."
          value={query}
          onChangeText={handleSearch}
        />
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            data={getSearchData?.result || []}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.profileCard} 
                onPress={() => navigate(`/profile/${item._id}`)}
              >
                <Image 
                source={item.profileImg ? { uri: item.profileImg} : require('../assets/logo.png')}
                style={styles.profileImage} 
                />
                <View style={styles.profileInfo}>
                  <Text style={styles.profileName}>{item.username}</Text>
                  {item.bio && <Text style={styles.profileBio}>{item.bio}</Text>}
                </View>
              </TouchableOpacity>
            )}
            ListEmptyComponent={<Text style={styles.noResults}>No profiles found</Text>}
          />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  searchInput: { height: 40, borderColor: '#ccc', borderWidth: 1, borderRadius: 8, paddingHorizontal: 10, marginBottom: 10 },
  profileCard: { flexDirection: 'row', alignItems: 'center', padding: 10, borderBottomWidth: 1, borderBottomColor: '#ddd' },
  profileImage: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
  profileInfo: { flex: 1 },
  profileName: { fontWeight: 'bold', fontSize: 16 },
  profileBio: { fontSize: 14, color: 'gray' },
  noResults: { textAlign: 'center', marginTop: 20, fontSize: 16, color: 'gray' },
});

const mapStateToProps = (state) => ({
  getSearchData: state.profile.getSearchData,
});

export default connect(mapStateToProps, { getSearch })(SearchScreen);
