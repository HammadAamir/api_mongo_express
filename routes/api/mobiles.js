const express = require('express')
const router = express.Router()
const Mobile = require('../../models/api/mobiles.js')
// Get all mobiles
router.get('/', async (req, res) => {
    try{
        res.json(await Mobile.find(req.params.id))
    }catch(err){
        res.status(500).json({'msg': err.message})
    }
});

// Get one mobile
router.get('/:id', getMobile, async (req, res) => {
    res.json(res.mobile)
});

// Post mobile
router.post('/', async (req, res) => {
    const mobile = Mobile({
        brand: req.body.brand,
        name: req.body.name,
        price: req.body.price
    })

    try{
        const newMobile = await mobile.save()
        res.status(401).json({newMobile})
    }catch(err){
        res.status(401).json({msg: err.message})
    }
})

// Update mobile
router.patch('/:id', getMobile, async (req, res) => {
    res.mobile.brand = req.body.brand ? req.body.brand : res.mobile.brand
    res.mobile.name = req.body.name ? req.body.name : res.mobile.name
    res.mobile.price = req.body.price ? req.body.price : res.mobile.price

    try{
        const updatedMobile = await res.mobile.save()
        res.json(updatedMobile)
    }catch(err){
        res.status(400).json({msg: err.message})
    }

})

// Delete mobile
router.delete('/:id', getMobile, async (req, res) => {
    try{    
        await res.mobile.remove()
        res.json({message: "Deleted Mobile"})
    }catch(err){
        res.status(500).json({msg: err.messasge})
    }
})

async function getMobile(req, res, next){
    let mobile
    try{
        mobile = await Mobile.findById(req.params.id)
        if(mobile == null){
            return res.status(404).json({msg: "Cannot find with the Mobile ID"})
        }
    }catch(err){
        return res.status(500).json({msg: err.message})
    }
    res.mobile = mobile
    next()
}


module.exports = router