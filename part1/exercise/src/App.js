const Header = (prop) => {
  return <h1>{prop.course.name}</h1>;
};

const Part = (prop) => {
  console.log(`Part: ${prop}`);
  console.log(prop);
  return (
    <p>
      {prop.part} {prop.exercises}
    </p>
  );
};

const Content = (prop) => {
  console.log(`Content:`);
  console.log(prop);
  return (
    <div>
      <Part part={prop.parts[0].name} exercises={prop.parts[0].exercises} />
      <Part part={prop.parts[1].name} exercises={prop.parts[1].exercises} />
      <Part part={prop.parts[2].name} exercises={prop.parts[2].exercises} />
    </div>
  );
};

const Total = (prop) => {
  console.log("Total");
  console.log(prop);
  let proparr = prop.parts.map(({ exercises }) => exercises);
  let totalTime = proparr.reduce((prev, curr) => (prev += curr), 0);
  return <p>Number of exercises {totalTime}</p>;
};

const App = () => {
  class Part {
    constructor(name, exercises) {
      this.name = name;
      this.exercises = exercises;
    }
  }

  const course = {
    name: "Half Stack application development",
    parts: [
      new Part("Fundamentals of React", 10),
      new Part("Using props to pass data", 7),
      new Part("State of a component", 14),
    ],
  };

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;
