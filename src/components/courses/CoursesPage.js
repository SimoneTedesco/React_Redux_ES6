import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as authorActions from "../../redux/actions/authorActions";
import * as courseActions from "../../redux/actions/courseActions";
import CourseList from "./CourseList";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

class CoursesPage extends React.Component {
    // state = {
    //     course: {
    //         title: ""
    //     }
    // };

    state = {
        redirectToAddCoursePage: false
    };

    // handleChange = event => {
    //     const course = { ...this.state.course, title: event.target.value };
    //     this.setState({ course });
    // };

    // handleSubmit = event => {
    //     event.preventDefault();
    //     this.props.actions.createCourse(this.state.course);
    // };

    componentDidMount() {
        const { courses, authors, actions } = this.props;

        if (courses.length === 0) {
            actions.loadCourses().catch(error => {
                alert("Loading Courses Failed " + error);
            });
        }

        if (authors.length === 0) {
            actions.loadAuthors().catch(error => {
                alert("Loading Authors Failed " + error);
            });
        }
    }

    // handleDeleteCourse = course => {
    //     toast.success("Course deleted");
    //     this.props.actions.deleteCourse(course).catch(error => {
    //         toast.error("Delete failed. " + error.message, {
    //             autoClose: false
    //         });
    //     });
    // };

    handleDeleteCourse = async course => {
        toast.success("Course deleted");
        try {
            await this.props.actions.deleteCourse(course);
        } catch (error) {
            toast.error("Delete failed. " + error.message, {
                autoClose: false
            });
        }
    };

    render() {
        return (
            <>
                {this.state.redirectToAddCoursePage && (
                    <Redirect to="/course" />
                )}
                <h2>Courses</h2>
                {this.props.loading ? (
                    <Spinner />
                ) : (
                    <>
                        <button
                            style={{ marginBottom: 20 }}
                            className="btn btn-primary add-course"
                            onClick={() =>
                                this.setState({ redirectToAddCoursePage: true })
                            }
                        >
                            Add Course
                        </button>
                        <CourseList
                            courses={this.props.courses}
                            onDeleteClick={this.handleDeleteCourse}
                        />
                    </>
                )}
            </>
        );
    }
    // render() {
    //     return (
    //         <form onSubmit={this.handleSubmit}>
    //             <h2>Courses</h2>
    //             <h3>Add course</h3>
    //             <input
    //                 type="text"
    //                 onChange={this.handleChange}
    //                 value={this.state.course.title}
    //             />
    //             <input type="submit" value="Save" />
    //             {this.props.courses.map(course => (
    //                 <div key={course.title}>{course.title}</div>
    //             ))}
    //         </form>
    //     );
    // }
}

CoursesPage.propTypes = {
    courses: PropTypes.array.isRequired,
    authors: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        courses:
            state.authors.length === 0
                ? []
                : state.courses.map(course => {
                      return {
                          ...course,
                          authorName: state.authors.find(
                              a => a.id === course.authorId
                          ).name
                      };
                  }),
        authors: state.authors,
        loading: state.apiCallsInProgress > 0
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            loadCourses: bindActionCreators(
                courseActions.loadCourses,
                dispatch
            ),
            loadAuthors: bindActionCreators(
                authorActions.loadAuthors,
                dispatch
            ),
            deleteCourse: bindActionCreators(
                courseActions.deleteCourse,
                dispatch
            )
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CoursesPage);
