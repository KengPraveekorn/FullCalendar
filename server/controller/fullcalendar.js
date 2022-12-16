const Events = require('../models/Events')
const { notifyEvent } = require('../functions/notify')
const cron = require('node-cron')
const moment = require('moment')

exports.createEvent = async (req,res) => {
    try{
        
        res.send(await new Events(req.body).save())
    } catch (err){
        console.log('Server Error')
        res.status(500).send('Server Error!!')
    }
}

exports.listEvent = async (req,res) => {
    try{
       
        res.send(await Events.find({}))
    } catch (err){
        console.log('Server Error')
        res.status(500).send('Server Error!!')
    }
}

exports.deleteEvent = async (req,res) => {
    try{
       const remove = await Events.findOneAndDelete({_id: req.params.id})
       res.json(remove)
    } catch (err){
        console.log('Server Error')
        res.status(500).send('Server Error!!')
    }
}

exports.updateEvent = async (req,res) => {
    try{
        console.log(req.body.id)
        res.send(await Events.findOneAndUpdate(
            {_id:req.body.id},
            {start:req.body.start,end:req.body.end}))
    } catch (err){
        console.log('Server Error')
        res.status(500).send('Server Error!!')
    }
}

exports.currentMonth = async (req,res) => {
    try{
        const m = parseInt(req.body.mm)
        console.log(typeof m)
        const currentM = await Events.find({
            "$expr":{
                "$eq":[{
                    "$month":"$start"
                },m]
            }
        }).sort({ start: 1})
        console.log(currentM)
        res.send(currentM)
    } catch (err){
        console.log('Server Error')
        res.status(500).send('Server Error!!')
    }
}

const currentDate = async () => {
    try{
        const d = new Date()
        const currentD = await Events.find({}).sort({ start: 1})
        
        const current = currentD.filter(item=>{
            return d >= item.start && d < item.end
        })
        
        for (t in current) {
            const msg = 'วันนี้มีกิจกรรม '+current[t].title
            notifyEvent(msg)
        }
        //console.log(current)
        //res.send(current)
    } catch (err){
        console.log('Server Error')
        //res.status(500).send('Server Error!!')
    }
}

exports.currentEvening = async (req, res) =>{
    try{
        const d = new Date();
        const currentD = await Events.find({}).sort({ start: 1})
        const current = currentD.filter(item =>{
            return d >= item.start && d < item.end
        })
        for (t in current) {
            const msg = 'กิจกรรม ' + current[t].title
            console.log('curren notify')
        }
        res.send(current)
    } catch (err){
        console.log(err)
    }
}



// Notify
cron.schedule('11 15 * * *', ()=> {
    currentDate()
})

exports.updateImage = async(req, res) =>{
    try{
        const id = req.body.id
        const filename = req.file.filename
        const updateImage = await Events.findOneAndUpdate({_id: id},{filename: filename})
        res.send(updateImage)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}
