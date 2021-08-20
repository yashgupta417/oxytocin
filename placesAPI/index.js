var axios = require('axios');

const API_KEY = "XhRMJY1GldfhWo64KPC0sx0IuJzvcXdN"

async function findDatingLocations(currentLocation, likes, budget) {
    console.log(`[placeApi] Finding places for date from location: ${JSON.stringify(currentLocation)} and likes: ${likes}`)
    let places = []
    for (const like of likes) {
        const queriedPlaces = await searchNearbyPlaces(currentLocation, like)
        places.push(...queriedPlaces)
        console.log(places.length)
    }
    console.log(`[placeApi] Got ${places.length} places for date from location: ${JSON.stringify(currentLocation)}.`)
    return places
}

async function searchNearbyPlaces(currentLocation, query) {
    console.log(`[placeApi] Searching nearby places for location: ${JSON.stringify(currentLocation)}, query: ${query}`)
    query = encodeURIComponent(query)

    const config = {
        method: 'get',
        url: `https://api.tomtom.com/search/2/search/${query}.json`,
        headers: { },
        params: {
            lat: currentLocation.latitude,
            lon: currentLocation.longitude,
            typeAhead: true,
            radius: 10000,
            key: API_KEY
        }
      }
      
    
    const response = await axios(config)
    const places = response.data.results.map(function(place, index) {
        
        // NOTE: search endpoint not returning "place.poiDetails", that's why we are not able to get more details

        // const moreDetails = await getMoreDetailsOfPlace(place.poiDetails.id).result
        // place.rating = moreDetails.rating.value
        // place.price = moreDetails.priceRange
        // place.popularHours = moreDetails.popularHours
        
        return {
            name: place.poi.name,
            type: place.poi.classifications[0].code.toLowerCase(),
            latitude: place.position.lat,
            longitude: place.position.lon,
        }
    });
       
    console.log(`[placeApi] Done performing nearby places query for location: ${JSON.stringify(currentLocation)}`)
    return places
}

async function getMoreDetailsOfPlace(placeId) {
    console.log(`[placeApi] Getting more details for place: ${placeId}`)
    const config = {
      method: 'get',
      url: `https://api.tomtom.com/search/2/poiDetails.json`,
      headers: { },
      params: {
          id: placeId,
          key: API_KEY
      }
    }

    const response = await axios(config)
    console.log(`[placeApi] Done getting more details for place: ${placeId}`)
    return response.data
}

module.exports = {findDatingLocations}