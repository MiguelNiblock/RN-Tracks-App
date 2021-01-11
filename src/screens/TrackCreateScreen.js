import '../_mockLocation';
import React,{useContext,useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import {SafeAreaView, withNavigationFocus} from 'react-navigation';
import Map from '../components/Map';
import {Context as LocationContext} from '../context/LocationContext';
import useLocation from '../hooks/useLocation';
import TrackForm from '../components/TrackForm';

const TrackCreateScreen = ({isFocused})=>{

  const { addLocation, state: {recording} } = useContext(LocationContext);
  const callback = useCallback(
    (location) => { //location will be provided by watchPositionAsync when calling this fn
    addLocation(recording, location)
    },
    [recording]
    )
  const [err] = useLocation( isFocused || recording, callback );

  return (
    <SafeAreaView forceInset={{top: 'always'}}>
      <Text h2>TrackCreateScreen</Text>
      <Map />
      {err ? <Text>Please enable location services.</Text> : null }
      <TrackForm />
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({});

export default withNavigationFocus(TrackCreateScreen);
//withNavigationFocus provides with the 'isFocused' prop, which is a boolean. 
//Becomes false when navigating away
