import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Animated, Button, FlatList, Picker, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useIsHorizontal} from './app/helpers/hooks';

const data = [
    {name: 'Jan Kowalski'},
    {name: 'Karol Paciorek'},
    {name: 'Włodek Markowicz'},
    {name: 'Radek Kotarski'},
    {name: 'Dawid Podsiadło'},
    {name: 'Patryk Okoń'},
  ];

export default function App() {
  const [showList, setShowList] = useState(false);
  const isHorizontal = useIsHorizontal();
  const [animation, setAnimation] = useState(new Animated.Value(0));

  const handleAnimation = listState => {
    console.log(listState);
    if(!listState) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: false
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: false
      }).start();
    }
    
  }

  const interpolation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.9]
  })
  
  return (
    <SafeAreaProvider style={{flex: 1}}>
      <SafeAreaView style={[
          styles.container,
          isHorizontal ? {
            flexDirection:'row',
            paddingHorizontal: 0
          } : {
            flexDirection: 'column'
          }
        ]}>
        {/* <Animated.View> */}
        <Animated.View style={[
            styles.form,
            showList ? {
              transform: [{scale: interpolation}]
            } : {
              // flexBasis: '100%'
            },
            {
              flexGrow: isHorizontal ? 1 : 0
            }
          ]}>
          <View style={styles.formGroup}>
            <Text>Wybierz projekt</Text>
            <View style={styles.select}>
              <Picker style={styles.picker}>
                <Picker.Item label="Opcja 1" value="1"/>
                <Picker.Item label="Opcja 1" value="1"/>
              </Picker>
            </View>
          </View>
          <View>
            <Text>Wybierz lokalizację</Text>
            <View style={styles.select}>
              <Picker  style={styles.picker}>
                <Picker.Item label="Opcja 1" value="1"/>
                <Picker.Item label="Opcja 1" value="1"/>
              </Picker>
            </View>
          </View>
          <View style={styles.formGroup}>
            <Button onPress={() => {
              handleAnimation(!showList);
              setShowList(!showList);
              }} title="Show"/>
          </View>
        </Animated.View>
        <View style={
          isHorizontal ? {
            flexGrow: 0,
            flexBasis: '40%',
            backgroundColor: '#de6e19'
          } : {}
        }>
          <FlatList
            style={styles.list}
            data={data}
            renderItem={({item}) => <Text style={[styles.listItem, isHorizontal ? {color: 'white', borderBottomColor: 'white'} : {}]}>{item.name}</Text>}
            keyExtractor={item => item.name}
          />
        </View>
        {/* </Animated.View> */}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10
  },
  form: {
    borderRadius: 10,
    justifyContent: 'flex-end',
  },
  list: {
    borderTopWidth: 1,
    borderTopColor: 'silver'
  },
  formGroup: {
    paddingVertical: 10
  },
  select: {
    borderWidth: 1,
    borderColor: 'black',
    height: 40,
    borderRadius: 35,
    paddingLeft: 10,
    marginTop: 8
  },
  picker: {
    height: 40
  },
  listItem: {
    paddingVertical: 10,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: 'silver',
    textAlign: 'center',
    color: 'black'
  }
});
