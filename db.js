const Sequelize = require('sequelize')

const DB = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    pool: {
        max: 5,
        min: 0
    },
    storage: './LMS.db'
})

const Course = DB.define('courses', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    timestamps: false
})

const Batch = DB.define('batches', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    timestamps: false
})

const Subject = DB.define('subjects', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    timestamps: false
})

const Teacher = DB.define('teachers', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    timestamps: false
})

const Lecture = DB.define('lectures', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    timestamps: false
})

const Student = DB.define('students', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    timestamps: false
})

const SubTeachMap = DB.define('sub-teach-map', {}, {
    timestamps: false
})

const StudentBatchMap = DB.define('student-batch-map', {}, {
    timestamps: false
})


Course.hasMany(Batch)
Batch.belongsTo(Course)

Batch.hasMany(Lecture)
Lecture.belongsTo(Batch)

Subject.hasMany(SubTeachMap)
SubTeachMap.belongsTo(Subject)
Teacher.hasOne(SubTeachMap)
Lecture.hasOne(SubTeachMap)

Batch.belongsToMany(Student, {
    through: StudentBatchMap,
    timestamps: false
})
Student.belongsToMany(Batch, {
    through: StudentBatchMap,
    timestamps: false
})

DB.sync()
    .then(() => {
        force: true
        console.log('database has been synced')
    })
    .catch((err) => {
        console.log("error syncing database " + err)
    })

module.exports = {
    Course,
    Batch,
    Subject,
    Teacher,
    Lecture,
    Student,
    SubTeachMap,
    StudentBatchMap
}