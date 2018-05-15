const route = require('express').Router()
const path = require('path')
const Course = require('../../db').Course
const Batch = require('../../db').Batch
const Lecture = require('../../db').Lecture


route.get('/:id/batches/:Bid/students', (req, res) => {

    res.status(200).json({})
})
route.get('/:id/batches/:Bid/teachers', (req, res) => {

    res.status(200).json({})
})

route.get('/:id/batches/:BId/lectures', (req, res) => {

    const bId = req.params.BId
    Lecture.findAll({
        where: {
            batchId: parseInt(bId)
        }
    }).then((lecture) => {
        res.status(200).json(lecture)
    })
})

route.get('/:id/batches/:BId/lectures/:Lid', (req, res) => {

    Lecture.findAll({
        where: {
            id: req.params.Lid
        }
    }).then((lecture) => {
        res.status(200).json(lecture)
    })
})

route.get('/:id/batches/:Bid', (req, res) => {

    Batch.findAll({
        where: {
            id: req.params.Bid
        }
    }).then((batch) => {
        res.status(200).json(batch)
    })

})

route.get('/:id/batches', (req, res) => {

    let url = req.path;
    let arr = url.split('/');

    const cId = arr[1]
    Batch.findAll({
        where: {
            courseId: parseInt(cId)
        }
    }).then((batch) => {
        res.status(200).json(batch)
    })

})

route.get('/:id', (req, res) => {

    const courseId = req.params.id

    Course.findAll({
        where: {
            id: courseId
        }
    }).then((courses) => {

        res.status(200).json({
            courses
        })

    })
})

route.get('/', (req, res) => {

    Course.findAll({}).then((courses) => {

        res.status(200).json({
            courses
        })

    })


})

route.post('/', (req, res) => {
    let CourseName = req.query.name

    const courseObj = new Course({
        name: CourseName
    });

    courseObj.save();
    res.send({
        sucess: true
    })
})


route.post('/:id/batches', (req, res) => {
    let url = req.path;
    let arr = url.split('/');
    console.log(arr)

    const cId = arr[1]
    const batchName = req.query.name

    const batchObj = new Batch({
        name: batchName,
        courseId: parseInt(cId)
    })

    batchObj.save()


    res.status(200).json({ done: true })
})

route.post('/:id/batches/:BId/lectures', (req, res) => {
    let url = req.path;
    let arr = url.split('/');

    const lname = req.query.name

    const bId = req.params.BId

    const obj = new Lecture({
        batchId: bId,
        name: lname
    })

    obj.save()

    res.status(200).json({
        success: true
    })
})

route.put('/:courseId', (req, res) => {

})

route.delete('/:courseId', (req, res) => {

})

module.exports = route