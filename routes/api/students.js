const route = require('express').Router()
const path = require('path')
const Student = require('../../db').Student
const Batch = require('../../db').Batch
const StudentBatchMap = require('../../db').StudentBatchMap

route.get('/:id/batches', (req, res) => {
    let url = req.path;
    let arr = url.split('/');
    const sId = arr[1]
    StudentBatchMap.findAll({
        where: {
            studentId: sId
        },
    }).then((batchIds) => {
        res.status(200).json(batchIds)
    })
})

route.get('/:id', (req, res) => {
    res.status(200).json({})
})
route.get('/', (req, res) => {
    Student.findAll({})
        .then((students) => {
            res.status(200).json(students)
        })
})

route.post('/', (req, res) => {
    const studentName = req.query.name

    const obj = new Student({
        name: studentName
    })
    obj.save()

    res.send({
        sucess: true
    })
})

route.post('/:id/batches/:bId', (req, res) => {
    let url = req.path;
    let arr = url.split('/');
    const sId = req.params.id
    const bId = req.params.bId

    const obj = new StudentBatchMap({
        batchId: bId,
        studentId: sId
    })

    obj.save()

    console.log(arr)

    res.status(200).json({ done: true })
})
route.put('/:name', (req, res) => {})
route.delete('/:studentId', (req, res) => {})

module.exports = route