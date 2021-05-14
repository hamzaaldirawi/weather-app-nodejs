const request = require('request')

const forecast = (lat, long, callback) => {

    const url = `http://api.weatherstack.com/current?access_key=14da64004689259e1f625c66bd3e87d1&query=${lat},${long}`

    request( { url , json: true }, (error, { body }) => {
        if (error) {
           callback('Low Error', undefined)
        } else if (body.error) {
            callback('Location Error', undefined)
        } else {
            const res = body.current
            callback(undefined, `It's ${res.temperature} degree outside, and it feels like ${res.feelslike} degree`)
        }
    })
}

module.exports = forecast