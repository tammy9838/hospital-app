//googlemap direction api key: AIzaSyAIhBgBucmNvPhFm90OO0rhjZOzlUNyQN8
/**
 * l9 Map 9
 * https://github.com/kobkrit/learn-react-native
 * @flow
 */

import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  StatusBar,
  Navigator,
} from 'react-native';
var {height, width} = Dimensions.get('window');
import MapView from 'react-native-maps';

// import Menu from './Menu.js';
import SearchPage from './SearchPage.js';
import MapPage from './MapPage.js';



const routes = [
  {
    title: 'Map',
    index: 0
  }, {
    title: 'Search',
    index: 1
  },{
    title: 'Categories',
    index: 2
  }, {
    title: 'Event',
    index: 3
  },{
    title: 'Ngv',
    index: 4
  }, {
    title: 'Setting',
    index: 5
  }
];
class hospital extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="darkred"
          barStyle="light-content"
        />
        <Navigator
          initialRoute={routes[0]}
          initialRouteStack={routes}
          renderScene={
            (route, navigator) => {
              switch (route.index) {
                case 0: return (<MapPage navigator={navigator} route={routes[route.index]} {...route.passProps}></MapPage>);
                case 1: return (<SearchPage navigator={navigator} route={routes[route.index]} {...route.passProps}></SearchPage>);

              }
            }
          }
          configureScene={
            (route, routeStack) =>
              Navigator.SceneConfigs.FadeAndroid
          }

          navigationBar={
           <Navigator.NavigationBar
             routeMapper={{
               LeftButton: (route, navigator, index, navState) => {
                 if (route.index == 0){
                   return null;
                 }
                 if (route.index == 1){
                   return (
                     <TouchableHighlight onPress={()=>navigator.push({index:0})}>
                       <Text style={styles.navigationBarText}>Back</Text>
                     </TouchableHighlight>
                   )

                 }
                 return (
                   <TouchableHighlight onPress={()=>navigator.pop()}>
                     <Text style={styles.navigationBarText}>Back</Text>
                   </TouchableHighlight>
                 )
               },
               RightButton: (route, navigator, index, navState) => { return null; },
               Title: (route, navigator, index, navState) =>
                 { return (<Text style={[styles.navigationBarText, styles.titleText]}>{routes[route.index].title}</Text>); },
             }}
             style={styles.navigationBar}
           />
        }
      />
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  navigationBar:{
    backgroundColor: 'black',
  },
  navigationBarText:{
    color: 'white',
    padding: 10,
    fontSize: 15
  },
  titleText:{
    fontSize: 20,
    paddingTop:5
  }

});

AppRegistry.registerComponent('hospital', () => hospital);
