
var searching = {
  getPlace(lat,lng) {
    //const mode = 'driving'; // driving','walking';
    // const origin = '13.764595,100.537438';
    // const destination = '13.763681,100.538125';
    const APIKEY = 'AIzaSyCC0crXKewe6P9uHj8PInupu9szq0Sy7gY';
    //googlemap direction api key: AIzaSyAIhBgBucmNvPhFm90OO0rhjZOzlUNyQN8
    const link =`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&rankby=distance&type=dentist&key=${APIKEY}`;
    return fetch(link).then((res) => res.json());
  }
};

module.exports = searching;
