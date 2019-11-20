import dispatcher from "../appDispatcher";
import * as courseApi from "../api/courseApi";
import actionTypes from "./actionTypes";

export function saveCourse(course) {
    return courseApi.saveCourse(course).then(savedCourse => {
        //Dispatcher, tell all of the stores that a course was created
        dispatcher.dispatch({
            actionType: actionTypes.CREATE_COURSE,
            course: savedCourse
        });
    });
}

export function loadCourses(course) {
    return courseApi.getCourses().then(courses => {
        dispatcher.dispatch({
            actionType: actionTypes.LOAD_COURSES,
            courses: courses
        });
    });
}
