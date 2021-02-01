import * as React from 'react';
import { View } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';

export default class App extends React.Component {
  render() {
    return (
      <View>
        <AppContainer />
      </View>
    );
  }
}



var AppNavigator = createSwitchNavigator({
  HomeScreen: HomeScreen,
});

const AppContainer = createAppContainer(AppNavigator)