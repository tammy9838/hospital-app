
var searching = {
  getDistance(oLat , oLng , dLat , dLng) {
    //const mode = 'driving'; // driving','walking';
    // const origin = '13.764595,100.537438';
    // const destination = '13.763681,100.538125';
    //const APIKEY = 'AIzaSyC-udozXXZX6D_ZkY3Yp5jeq3t5x37iqM0';
    //googlemap direction api key: AIzaSyAIhBgBucmNvPhFm90OO0rhjZOzlUNyQN8
    //const link =`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&rankby=distance&type=dentist&key=${APIKEY}`;
    const link = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${oLat},${oLng}&destinations=${dLat},${dLng}&key=AIzaSyAsWbJoWDSzjCcI3SPK-xmyGvMsSOc2aHs` ;
    return fetch(link).then((res) => res.json());
  }
};

module.exports = searching;
