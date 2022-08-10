import React from "react";

const Course = ({ course }) => {
  console.log(course);
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ parts }) => (
  <p>
    Number of exercises {parts.reduce((prev, curr) => prev + curr.exercises, 0)}
  </p>
);

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <>
    {parts.map((part) => {
      return <Part key={part.id} part={part} />;
    })}
  </>
);

export default Course;
