const express = require('express');
const router = express.Router();

// Multer
const multer = require('multer');
const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, './public/uploads')
    },
    filename: (req, file, cb)=>{
        cb(null, 'file-' + Date.now() + '.' +
            file.originalname.split('.')[file.originalname.split('.').length-1])
    }
})

const upload = multer({ storage: storage}).single('file')
/* Multer */

const { createEvent, 
    listEvent, 
    currentMonth, 
    currentEvening, 
    updateEvent,
    updateImage,
    deleteEvent
    } = require('../controller/fullcalendar')

//@Endpoint = localhost:5000/api/event
//@Method       post
//@Acess        Public
router.post('/event',createEvent)

//@Endpoint = localhost:5000/api/event
//@Method       get
//@Acess        Public
router.get('/event',listEvent)

//@Endpoint = localhost:5000/api/event
//@Method       put
//@Acess        Public
router.put('/event',updateEvent)

// //@Endpoint = localhost:5000/api/event
// //@Method       delete
// //@Acess        Public
router.delete('/event-delete',deleteEvent)

//@Endpoint = localhost:5000/api/current-month
//@Method       post
//@Acess        Public
router.post('/current-month',currentMonth)

// //@Endpoint = localhost:5000/api/current-date
// //@Method       get
// //@Acess        Public
 router.get('/current-date',currentEvening)

// //@Endpoint = localhost:5000/api/update-image
// //@Method       post
// //@Acess        Public
 router.post('/update-image',upload,updateImage)





module.exports = router;