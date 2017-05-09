
var searching = {
  getPlace(lat,lng) {
    //const mode = 'driving'; // driving','walking';
    // const origin = '13.764595,100.537438';
    // const destination = '13.763681,100.538125';
    //const APIKEY = 'AIzaSyC-udozXXZX6D_ZkY3Yp5jeq3t5x37iqM0';
    const APIKEY = 'AIzaSyCC0crXKewe6P9uHj8PInupu9szq0Sy7gY';

    //googlemap direction api key: AIzaSyAIhBgBucmNvPhFm90OO0rhjZOzlUNyQN8
    const link =`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=10000&type=hospital&keyword=โรงพยาบาล&key=${APIKEY}`;
    return fetch(link).then((res) => res.json());
  }
};

module.exports = searching;

//tae
//distance
// AIzaSyBVuvi1fr3uEW5OOAnrgj130Wg77Yv_FE0


//place
//AIzaSyCC0crXKewe6P9uHj8PInupu9szq0Sy7gY


/*Distance.getDistance(this.state.currentLatitude , this.state.currentLongitude ,
  res.results[i].geometry.location.lat , res.results[i].geometry.location.lng).then((response) =>{
    console.log(response.rows[0].elements[0].distance.text);
    console.log(response.rows[0].elements[0].duration.text);
    console.log('---------------------------------------------------');
    this.setState({
      distance : response.rows[0].elements[0].distance.text,
      duration : response.rows[0].elements[0].duration.text
    });
});*/
