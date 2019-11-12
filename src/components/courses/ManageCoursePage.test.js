import React from "react";
import { mount } from "enzyme";
import { authors, newCourse, courses } from "../../../tools/mockData";
import { ManageCoursePage } from "./ManageCoursesPage";

function render(args) {
    const defaultProps = {
        authors,
        courses,
        // passed from react router in real app, so just stubbing in for test.
        // could also choose to use MemoryRouter as shown in header.test.js
        // or even wrap with react router, depending on whether I
        // need to test react router related behavior
        history: {},
        saveCourse: jest.fn(),
        loadAuthors: jest.fn(),
        loadCourse: jest.fn(),
        course: newCourse,
        match: {}
    };

    const props = { ...defaultProps, ...args };
    return mount(<ManageCoursePage {...props} />);
}

it("sets error when attempting to save an empty title field", () => {
    const wrapper = render();
    wrapper.find("form").simulate("submit");
    const error = wrapper.find(".alert").first();
    expect(error.text()).toBe("Title is required.");
});
