const express = require('express')
const router = express.Router()
const Employee = require('../models/employee')
const cors = require('cors')

//Getting all
router.get('/', async (req,res) => {
    try {
        const employees = await Employee.find()
        res.json(employees)
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
})

//Getting one
router.get('/:id', getEmployee, (req,res) => {
    res.json(res.employee)  
})

//Creating one
router.post('/', cors(), async (req,res) => {
    const employee = new Employee({
        name: req.body.name,
        email: req.body.email,
        mobileNo: req.body.mobileNo
    })

    try{
        const newEmployee = await employee.save()
        res.status(201).json(newEmployee)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
})

//Deleting One
router.delete('/:id', getEmployee, async (req,res) => {
    try{
        console.log("employee: " + res.employee)
        await res.employee.deleteOne()
        return res.json({ message: 'Deleted Employee'})
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: err.message })
    }
})

async function getEmployee (req, res, next) {
    let employee
    try{
        employee = await Employee.findById(req.params.id)
        if(employee === null){
            return res.status(404).json({message: 'Employee not found'})
        }
        res.employee = employee
        next()
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

module.exports = router