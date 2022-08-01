import { useState } from "react";

function Header(props) {
  return <h2>{props.text}</h2>;
}

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const Stat = ({ text, value }) => (
  <p>
    <span>{text} </span>
    <span> {value}</span>
  </p>
);

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => {
    setGood(Number(good) + 1);
  };
  const handleNeutral = () => {
    setNeutral(Number(neutral) + 1);
  };
  const handleBad = () => {
    setBad(Number(bad) + 1);
  };

  return (
    <div>
      <Header text="give feedback" />
      <Button text="good" onClick={handleGood} />
      <Button text="neutral" onClick={handleNeutral} />
      <Button text="bad" onClick={handleBad} />
      <Header text="statistics" />
      <Stat text="good" value={good} />
      <Stat text="neutral" value={neutral} />
      <Stat text="bad" value={bad} />
    </div>
  );
};

export default App;
