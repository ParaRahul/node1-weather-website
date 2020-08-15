const request= require('request')

const forecast = (lalitude,longitude,callback) =>{

    const url = 'http://api.weatherstack.com/current?access_key=3d1a736755326f084d4a1d9405f29bc6&query='+lalitude+','+longitude+'&units=f'

    request({url:url,json:true}, (error,response)=>{
        if(error){
            callback('unableto connect',undefined)
        }else if(response.body.error){
            callback('wrong location')
        }else{
            const data= `Its currently ${response.body.current.temperature} degrees faren out, There is a ppt chance of ${response.body.current.weather_descriptions} in ${response.body.location.name}`
            callback(undefined, data)
        }
    })
   
}


module.exports = forecast
