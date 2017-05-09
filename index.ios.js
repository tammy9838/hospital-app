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
  TextInput,
  AlertIOS,
  AsyncStorage,
  ScrollView,
} from 'react-native';
var {height, width} = Dimensions.get('window');
import MapView from 'react-native-maps';

import Dentist from './api/dentist.js';
import Vet from './api/vet.js';
import Hospital from './api/hospital.js';
import Distance from './api/distance.js';

export default class hospital extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentLatitude: null,
      currentLongitude: null,
      error: null,
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      markers : []
    };
    this.onRegionChange = this.onRegionChange.bind(this);
    this.findDentist = this.findDentist.bind(this);
    this.findVet = this.findVet.bind(this);
    this.findHospital = this.findHospital.bind(this);
  }

  onRegionChange(region) {
    this.setState({region});
  }

  componentDidMount() {
    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        this.setState({
          currentLatitude: position.coords.latitude,
          currentLongitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  findDentist(){
    var placeInfo = [];
    var count = -1;
    console.log(`On pressed!` );
    /*console.log(this.state.currentLatitude);*/
    Dentist.getPlace(this.state.currentLatitude,this.state.currentLongitude).then((res) =>{
      console.log(res);
      //console.log(res.results[1].photos[0].photo_reference);
      //console.log(res.results[0].name);
      for (var i = 0; i < res.results.length; i++) {
        placeInfo[i] = {place_id: res.results[i].place_id,
                        title: res.results[i].name,
                        latlng : {latitude: res.results[i].geometry.location.lat, longitude: res.results[i].geometry.location.lng},
                        photo: {uri: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CnRtAAAATLZNl354RwP_9UKbQ_5Psy40texXePv4oAlgP4qNEkdIrkyse7rPXYGd9D_Uj1rVsQdWT4oRz4QrYAJNpFX7rzqqMlZw2h2E2y5IKMUZ7ouD_SlcHxYq1yL4KbKUv3qtWgTK0A6QbGh87GB3sscrHRIQiG2RrmU_jF4tENr9wGS_YxoUSSDrYjWmrNfeEHSGSc3FyhNLlBU&key=AIzaSyAIhBgBucmNvPhFm90OO0rhjZOzlUNyQN8'},
                        description: res.results[i].vicinity,
                        image: require('./images/attention.png'),
                      };
                    if (res.results[i].photos != null || res.results[i].photos !=undefined ){
                      //console.log(i);
                      placeInfo[i].photo = {uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${res.results[i].photos[0].photo_reference}&key=AIzaSyAIhBgBucmNvPhFm90OO0rhjZOzlUNyQN8`};
                      /*console.log(res.results[i].name);
                      console.log(res.results[i].photos[0].photo_reference);*/
                    }
                    Distance.getDistance(this.state.currentLatitude , this.state.currentLongitude ,
                      res.results[i].geometry.location.lat , res.results[i].geometry.location.lng).then((response) =>{
                        count = count+1;
                        /*console.log(count);
                        console.log(placeInfo[count].title);
                        console.log(response.rows[0].elements[0].distance.text);
                        console.log(response.rows[0].elements[0].duration.text);
                        console.log('---------------------------------------------------');*/
                        placeInfo[count].distance = response.rows[0].elements[0].distance.text;
                        placeInfo[count].duration = response.rows[0].elements[0].duration.text
                    });

      }

      //console.log(placeInfo);
      this.setState({
        markers : placeInfo
      });
      //this.state.markers = placeInfo;
      console.log(this.state.markers);
    });
  }

  findVet(){
    var placeInfo = [];
    var count = -1;
    console.log(`On pressed!` );
    /*console.log(this.state.currentLatitude);*/
    Vet.getPlace(this.state.currentLatitude,this.state.currentLongitude).then((res) =>{
      //console.log(res);
      //console.log(res.results[0].name);
      for (var i = 0; i < res.results.length; i++) {
        placeInfo[i] = {place_id: res.results[i].place_id,
                        title: res.results[i].name,
                        latlng : {latitude: res.results[i].geometry.location.lat, longitude: res.results[i].geometry.location.lng},
                        photo: {uri: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CnRtAAAATLZNl354RwP_9UKbQ_5Psy40texXePv4oAlgP4qNEkdIrkyse7rPXYGd9D_Uj1rVsQdWT4oRz4QrYAJNpFX7rzqqMlZw2h2E2y5IKMUZ7ouD_SlcHxYq1yL4KbKUv3qtWgTK0A6QbGh87GB3sscrHRIQiG2RrmU_jF4tENr9wGS_YxoUSSDrYjWmrNfeEHSGSc3FyhNLlBU&key=AIzaSyAIhBgBucmNvPhFm90OO0rhjZOzlUNyQN8'},
                        description: res.results[i].vicinity,
                        image: require('./images/attention.png'),
                      };
      if (res.results[i].photos != null || res.results[i].photos !=undefined ){
        placeInfo[i].photo = {uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${res.results[i].photos[0].photo_reference}&key=AIzaSyAIhBgBucmNvPhFm90OO0rhjZOzlUNyQN8`};
        /*console.log(res.results[i].name);
        console.log(res.results[i].photos[0].photo_reference);
        console.log(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${res.results[i].photos[0].photo_reference}&key=AIzaSyAIhBgBucmNvPhFm90OO0rhjZOzlUNyQN8`);*/
      }
      Distance.getDistance(this.state.currentLatitude , this.state.currentLongitude ,
        res.results[i].geometry.location.lat , res.results[i].geometry.location.lng).then((response) =>{
          count = count+1;
          placeInfo[count].distance = response.rows[0].elements[0].distance.text;
          placeInfo[count].duration = response.rows[0].elements[0].duration.text
      });
      }
      //console.log(placeInfo);
      this.setState({
        markers : placeInfo
      });
      //this.state.markers = placeInfo;
      console.log(this.state.markers);
    });
  }

    findHospital(){
      var placeInfo = [];
      var count = -1;
      console.log(`On pressed!` );
      /*console.log(this.state.currentLatitude);*/
      Hospital.getPlace(this.state.currentLatitude,this.state.currentLongitude).then((res) =>{
        //console.log(res);
        //console.log(res.results[0].name);
        for (var i = 0; i < res.results.length; i++) {
          placeInfo[i] = {place_id: res.results[i].place_id,
                          title: res.results[i].name,
                          latlng : {latitude: res.results[i].geometry.location.lat, longitude: res.results[i].geometry.location.lng},
                          photo: {uri: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CnRtAAAATLZNl354RwP_9UKbQ_5Psy40texXePv4oAlgP4qNEkdIrkyse7rPXYGd9D_Uj1rVsQdWT4oRz4QrYAJNpFX7rzqqMlZw2h2E2y5IKMUZ7ouD_SlcHxYq1yL4KbKUv3qtWgTK0A6QbGh87GB3sscrHRIQiG2RrmU_jF4tENr9wGS_YxoUSSDrYjWmrNfeEHSGSc3FyhNLlBU&key=AIzaSyAIhBgBucmNvPhFm90OO0rhjZOzlUNyQN8'},
                          description: res.results[i].vicinity,
                          image: require('./images/attention.png'),
                        };
        if (res.results[i].photos != null || res.results[i].photos !=undefined ){
          placeInfo[i].photo = {uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${res.results[i].photos[0].photo_reference}&key=AIzaSyCC0crXKewe6P9uHj8PInupu9szq0Sy7gY`};
          /*console.log(res.results[i].name);
          console.log(res.results[i].photos[0].photo_reference);
          console.log(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${res.results[i].photos[0].photo_reference}&key=AIzaSyAIhBgBucmNvPhFm90OO0rhjZOzlUNyQN8`);*/
        }
        Distance.getDistance(this.state.currentLatitude , this.state.currentLongitude ,
          res.results[i].geometry.location.lat , res.results[i].geometry.location.lng).then((response) =>{
            count = count+1;
            placeInfo[count].distance = response.rows[0].elements[0].distance.text;
            placeInfo[count].duration = response.rows[0].elements[0].duration.text
        });
        }
        //console.log(placeInfo);
        this.setState({
          markers : placeInfo
        });
        //this.state.markers = placeInfo;
        console.log(this.state.markers);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView style={styles.map}
        showsUserLocation={true}
        followsUserLocation={true}
        showsCompass={true}
        showsPointOfInterest={false}
        region={this.state.region}
        onRegionChange={this.onRegionChange}
        >
          {this.state.markers.map((marker, i) => (
            <MapView.Marker key={i} coordinate={marker.latlng} title={marker.title} description={marker.description}>
              {/*<View style={styles.pin}>
                <Image style={styles.pinImage} source={marker.image}/>
                <Text style={styles.pinText}>
                  {marker.title}
                </Text>
              </View>*/}
              <MapView.Callout style={styles.callout}>

                  <Image style={styles.calloutPhoto} source={marker.photo}/>
                  <Text style={styles.calloutTitle}>{marker.title}</Text>
                  <Text>{marker.description}</Text>
                  <Text>-------------------------</Text>
                  <Text>Distance: {marker.distance}</Text>
                  <Text>Duration: {marker.duration}</Text>

              </MapView.Callout>
            </MapView.Marker>
          ))}
        </MapView>
        <View style={styles.container}>
          <Text>
            Latitude: {this.state.region.latitude}{'\n'}
            Longitude: {this.state.region.longitude}{'\n'}
            LatitudeDelta: {this.state.region.latitudeDelta}{'\n'}
            LongitudeDelta: {this.state.region.longitudeDelta}{'\n'}
            C_Latitude: {this.state.currentLatitude}{'\n'}
            C_Longitude: {this.state.currentLongitude}
            {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
          </Text>
          <TouchableOpacity style={styles.button}
            onPress={ this.findDentist}>
            <Text style={styles.buttonText}>Dentist</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}
            onPress={ this.findVet}>
            <Text style={styles.buttonText}>Animal</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}
            onPress={ this.findHospital}>
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  map: {
    width: width,
    height: height*2/3
  },
  pin: {
    backgroundColor: '#fffa',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 2,
    padding: 5,
    borderRadius: 10
  },
  pinImage: {
    width: 25,
    height: 25
  },
  pinText: {
    color: 'red'
  },
  callout:{
    flex: 1,
    position: 'relative' ,
    paddingRight: 10,
    paddingBottom: 10,
    marginRight: 10,
    marginBottom: 10
  },
  calloutPhoto:{
    flex: 1,
    width: 150,
    height: 100
  },
  calloutTitle:{
    fontSize: 16,
  }
});

AppRegistry.registerComponent('hospital', () => hospital);
