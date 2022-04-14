import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  Image,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackParams} from '../../navigations/index';
import {fetchMoviesById} from '../../api';
import {Rating, AirbnbRating} from 'react-native-ratings';

const WIDTH = Dimensions.get('window').width;

type Props = NativeStackScreenProps<AppStackParams, 'HomeScreen'>;

export default function InfoMovieScreen({navigation, route}: Props) {
  const idMovie: any = route.params;
  const [movieDetail, setMovieDetail] = useState<any>({});

  const getDetailMovie = async () => {
    if (idMovie) {
      let request = await fetchMoviesById(idMovie.idMovie);
      console.log('request', request);
      if (request) {
        await setMovieDetail(request);
      } else {
        setMovieDetail({});
      }
    }
  };

  let uri;

  useEffect(() => {
    getDetailMovie();
  }, []);

  return (
    <ScrollView>
      <SafeAreaView
        style={{width: 200, height: Dimensions.get('window').height}}>
        <View style={styles.container}>
          <Image
            source={{uri: movieDetail.Poster}}
            style={{
              marginTop: 450,
              width: WIDTH,
              height: 400,
              resizeMode: 'contain',
              paddingBottom: 30,
            }}
          />
          <Text style={{fontWeight: 'bold', fontSize: 24, marginTop: 10}}>
            {movieDetail.Title}
          </Text>

          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
            <AirbnbRating
              count={10}
              isDisabled={true}
              defaultRating={movieDetail.imdbRating}
              showRating={false}
              size={21}
            />
            <Text
              style={{
                fontStyle: 'italic',
                fontSize: 16,
                marginLeft: 20,
                // marginTop: 50,
              }}>
              {movieDetail.imdbVotes}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              width: 160,
              marginTop: 10,
            }}>
            <Text style={{fontSize: 17}}>{movieDetail.Year}</Text>
            <Text style={{fontSize: 17}}>{movieDetail.Runtime}</Text>
          </View>
          <View style={{width: WIDTH, marginTop: 20}}>
            <Text style={{marginLeft: 30, fontSize: 17}}>
              Director: {movieDetail.Director}
            </Text>
            <Text style={{marginLeft: 30, fontSize: 17, marginTop: 10}}>
              Plot: {movieDetail.Plot}
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    // backgroundColor: '#ccc',
  },
});
