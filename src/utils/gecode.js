const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiaGFtemFkaXJhd2kiLCJhIjoiY2tvZ2FhaDkzMG42bDJvbHozdWdkaWxybCJ9.YoAQCFmypBGSAzMGR0uScg&limit=1`

    request({ url /* Shorthand */ , json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Anything', undefined)
            // when we call geocode and call callback function
            // it's 2 arg, so we want to return any thing in error, and undefined for data (response)
            // simiulate error and response in request. 
            // we can write callback('Anything) with 1 arg the 2nd will auto be undefined
        } else if (body.message || body.features.length === 0) {
            callback('Any message', undefined)
        } else {
            callback(undefined, {
                lat : body.features[0].center[1],
                long : body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode