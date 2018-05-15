const route = require('express').Router()
const path = require('path')
const Subject = require('../../db').Subject
const SubTeachMap = require('../../db').SubTeachMap
const Teacher = require('../../db').Teacher
const Sequelize = require('sequelize')
const Op = Sequelize.Op;

route.get('/:id/teachers', (req, res) => {

    let Sid = req.params.id


    SubTeachMap.findAll({

        where: {
            subjectId: Sid
        },
        attributes: ['teacherId']
    }).then((teacherIds) => {
        let teacherArray = []
        teacherIds.forEach((teacher) => {
            teacherArray.push(teacher.teacherId)
        })
        Teacher.findAll({
            where: {
                id: {
                    [Op.in]: teacherArray
                }
            }
        }).then((teacher) => {
            res.json(teacher)
        })
    })
})

route.get('/:id', (req, res) => {
    const subjectId = req.params.id
    Subject.findAll({
            where: {
                id: subjectId
            }
        })
        .then((subject) => {
            res.status(200).json(subject)
        })
})


route.get('/', (req, res) => {
    Subject.findAll({})
        .then((subjects) => {
            res.status(200).json(subjects)
        })
})


route.post('/', (req, res) => {
    let SubName = req.query.name

    const SubjectObj = new Subject({
        name: SubName
    });

    SubjectObj.save();
    res.send({
        sucess: true
    })
})

route.put('/:subjectId', (req, res) => {

})

route.delete('/:subjectId', (req, res) => {

})

route.post('/', (req, res) => {

})

route.put('/:subjectId', (req, res) => {

})

route.delete('/:subjectId', (req, res) => {

})

module.exports = route