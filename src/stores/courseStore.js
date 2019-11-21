import { EventEmitter } from 'events';
import Dispatcher from "../appDispatcher";
import actionTypes from "../actions/actionTypes";

const CHANGE_EVENT = "change";
let _courses = [];

class CourseStore extends EventEmitter {
    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback); //on method is provided by EventEmitter
    }

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }

    emitChange() {
        this.emit(CHANGE_EVENT);
    }

    getCourses() {
        return _courses;
    }

    getCourseBySlug(slug) {
        return _courses.find(_courses => _courses.slug === slug);
    }
}

const store = new CourseStore();

//every store that registers withr the dispatcher is notified of every action
Dispatcher.register(action => {
    switch (action.actionType) {
        case actionTypes.CREATE_COURSE:
            _courses.push(action.course);
            store.emitChange();
            break;
        case actionTypes.UPDATE_COURSE:
            _courses = _courses.map(course => course.id === action.course.id ? action.course : course);
            store.emitChange();
            break;
        case actionTypes.LOAD_COURSES:
            _courses = action.courses;
            store.emitChange();
            break;
        default:
    }
});
export default store;