
var searching = {
  getPlace(lat,lng) {
    //const mode = 'driving'; // driving','walking';
    // const origin = '13.764595,100.537438';
    // const destination = '13.763681,100.538125';
    const APIKEY = 'AIzaSyCC0crXKewe6P9uHj8PInupu9szq0Sy7gY';
    //googlemap direction api key: AIzaSyAIhBgBucmNvPhFm90OO0rhjZOzlUNyQN8
    const link =`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=10000&type=veterinary_care&key=${APIKEY}`;
    return fetch(link).then((res) => res.json());
  }
};

module.exports = searching;

//https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=14.068891,100.607458&rankby=distance&type=veterinary_care&key=AIzaSyC-udozXXZX6D_ZkY3Yp5jeq3t5x37iqM0
