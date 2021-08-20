const express = require('express')
const {findDatingLocations} = require("../placesAPI")
const router = express.Router()
const {datePlannerValidator} = require("../validation")

router.post("/datePlanner", async function(req, res){
    console.log(`[datePlanner] Received POST request on /datePlanner with body: ${JSON.stringify(req.body)}`)

    //validating data
    const error = datePlannerValidator(req.body)
    if(error) return res.status(400).send({
        status : "failed",
        error : error.details[0].message
    })

    const latitude = req.body.startingLatitude
    const longitude = req.body.startingLongitude
    
    try {
        const suggestedPlaces = await findDatingLocations({latitude, longitude}, req.body.likes, req.body.budget)  
        return res.send({
            status : "success",
            data : {
                suggestedPlaces
            }
        }) 
    } catch(err) {
        return res.status(500).send({
            status : "failed",
            error : err.message 
        })
    }     
})

module.exports = router