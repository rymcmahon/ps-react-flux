import React, { useState, useEffect } from "react";
import CourseForm from "./CourseForm";
import courseStore from "../stores/courseStore";
import { toast } from "react-toastify";
import * as courseActions from "../actions/courseActions";

const ManageCoursePage = props => {
  const [errors, setErrors] = useState({});
  const [course, setCourse] = useState({
    id: null,
    slug: "",
    title: "",
    authorId: null,
    category: ""
  });

  useEffect(() => {
    const slug = props.match.params.slug; // from the path '/courses/:slug'
    if (slug) {
      setCourse(courseStore.getCourseBySlug(slug));
    }
  }, [props.match.params.slug])

  function handleChange(event) {
    //Spread operator copies course object
    setCourse({ ...course, [event.target.name]: event.target.value });
  }

  function formIsValid() {
    const _errors = {};

    if (!course.title) _errors.title = "Title is required.";
    if (!course.authorId) _errors.authorId = "Author is required.";
    if (!course.category) _errors.category = "Category is required.";

    setErrors(_errors);

    return Object.keys(_errors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    courseActions.saveCourse(course).then(() => {
      props.history.push("/courses");
      toast.success("Course saved.");
    });
  }

  return (
    <>
      <h2>Manage Course</h2>
      <CourseForm course={course} onChange={handleChange} onSubmit={handleSubmit} errors={errors} />
    </>
  );
};

export default ManageCoursePage;
