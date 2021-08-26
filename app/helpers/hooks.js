import React, { useEffect, useState } from 'react'
import * as ScreenOrientation from 'expo-screen-orientation';
import { Orientation } from 'expo-screen-orientation';
import NetInfo from '@react-native-community/netinfo';

export function useIsHorizontal() {
  const [orientation, setOrientation] = useState(0);

  useEffect(() => {
    const listener = ScreenOrientation.addOrientationChangeListener(({ orientationInfo }) => {
      setOrientation(orientationInfo.orientation);
    });
    return () => {
      ScreenOrientation.removeOrientationChangeListener(listener);
    }
  }, []);

  return [Orientation.LANDSCAPE_RIGHT, Orientation.LANDSCAPE_LEFT].includes(orientation);
}

export function useIsConnected() {
  const [networkState, setNetworkState] = useState(null);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log('Type:', state.type);
      console.log('connected?:', state.isConnected);
      setNetworkState(state);
    });
    return () => {
      unsubscribe();
    }
  }, []);

  return networkState;
}