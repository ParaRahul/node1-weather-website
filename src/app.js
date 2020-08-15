const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const port= process.env.PORT || 3000

// console.log(__dirname)

// Define paths for Express config
const publicDirPAth = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup Handlebars engines and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)



// Setup static directory to serve
app.use(express.static(publicDirPAth))



//app.com
//app.com/help
//app.com/about
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Rahul'
    })
})

// above one or below code... preferably above one
app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'address not provided'
        })
    }

    geocode(req.query.address, (error,data)=>{
        if(error){
            return res.send({
                error: error
            })
        }
        forecast(data.latitude,data.longitude, (error,forecastData)=>{
            if(error){
                return console.log(error)
            }
            
            res.send({
                forecast:forecastData,
                location:data.location,
                address:req.query.address
            })
        })
    })

    // res.send({
    //     forecast:'Its raining',
    //     location:'Hyderabad',
    //     address:req.query.address
    // })
})


app.get('/products', (req,res)=>{

    if(!req.query.search){
        return res.send({
            error:'search not provided'
        })
    }
    // console.log(req.query.search)

    res.send({
        products: []
    })
})



app.get('/about', (req,res) => {
    res.render('about',{
        title:'About',
        name:'Rahul'
    })
})


app.get('/help',(req,res)=>{
    res.render('help')
})

app.get('/help/*',(req,res)=>{
    res.render('error404',{
        title:'ARTICLE NOT FOUND'
    })
})

app.get('*',(req,res)=>{
    res.render('error404',{
        title:'404 ERROR'
    })
})
















app.listen(port, ()=>{
    console.log('Server is running on '+port)
})















