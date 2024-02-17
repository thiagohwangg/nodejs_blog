const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class MeController {
    // [GET] /me/stored/courses
    storedCourses(req, res, next) {
        let courseQuery = Course.find({});

        if (req.query.hasOwnProperty('_sort')) {
            courseQuery = courseQuery.sort({
                [req.query.column]: req.query.type,
            });
        }

        Promise.all([courseQuery, Course.countDocumentsWithDeleted({ deleted: true })])
            .then(([courses, deletedCount]) => {
                res.render('me/stored-courses', {
                    courses: mutipleMongooseToObject(courses),
                    deletedCount,
                });
            })
            .catch(next);
    }

    // [GET] /me/trash/courses
    trashCourses(req, res, next) {
        let courseQuery = Course.findWithDeleted({ deleted: true });

        if (req.query.hasOwnProperty('_sort')) {
            courseQuery = courseQuery.sort({
                [req.query.column]: req.query.type,
            });
        }

        courseQuery
            .then((courses) =>
                res.render('me/trash-courses', {
                    courses: mutipleMongooseToObject(courses),
                }),
            )
            .catch(next);
    }
}

module.exports = new MeController();
