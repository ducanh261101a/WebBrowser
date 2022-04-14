import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Image,
  TextInput,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {fetchData} from '../../api';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackParams} from '../../navigations/index';

const WIDTH = Dimensions.get('window').width;

type Props = NativeStackScreenProps<AppStackParams, 'HomeScreen'>;

const HomeScreen = ({navigation}: Props) => {
  const [search, setSearch] = useState<string>('');
  const [listMovie, setListMovie] = useState<any>([]);

  const changeSearchText = async (text: string) => {
    setSearch(text);
    if (!text) {
      setListMovie([]);
    } else {
      await getListMovie(text);
      console.log('list Movie', listMovie);
    }
  };

  const getListMovie = async (text: string) => {
    let request = await fetchData(text);
    if (request) {
      setListMovie(request);
    } else {
      setListMovie([]);
    }
  };

  const handleMovie = (item: any) => {
    if (item) {
      navigation.navigate('InfoMovieScreen', {
        idMovie: item.imdbID,
      });
    }
  };

  const renderItem = ({item}: any) => {
    console.log('item', item.Poster);
    let uri = item.Poster ? item.Poster : null;
    return (
      <View
        style={{
          width: WIDTH,
          height: 80,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={styles.btnMovie}
          onPress={() => handleMovie(item)}>
          <View style={styles.viewLeft}>
            <Image
              source={{uri: uri}}
              style={{width: 60, height: 60, resizeMode: 'contain'}}
            />
          </View>
          <View style={styles.viewRight}>
            <Text style={{fontSize: 18, fontWeight: '600'}}>{item.Title}</Text>
            <Text style={{fontSize: 16, fontStyle: 'italic'}}>{item.Year}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.headerView}>
        <Image
          source={require('../../assets/images/logo2.jpg')}
          style={{width: WIDTH, height: 70, resizeMode: 'cover'}}
        />
      </View>
      <View style={styles.searchView}>
        <View>
          <TouchableOpacity style={styles.searchBtn}>
            <Icon name="search" size={22} color={'#000'} />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            value={search}
            placeholder={'Nhập tên phim...'}
            onChangeText={text => changeSearchText(text)}
          />
        </View>
      </View>

      <FlatList
        data={listMovie}
        renderItem={renderItem}
        keyExtractor={item => item.imdbID}
      />
      <View style={{height: 30}} />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  headerView: {
    width: WIDTH,
    height: 100,
    // backgroundColor: '#FF5959',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textHeader: {
    fontSize: 17,
    color: '#fff',
  },
  searchView: {
    width: WIDTH,
    height: 60,
    marginTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  input: {
    width: 250,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
  },
  searchBtn: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
  },
  btnMovie: {
    width: 320,
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ccc',
  },
  viewLeft: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewRight: {
    marginLeft: 20,
    maxWidth: 230,
  },
});
