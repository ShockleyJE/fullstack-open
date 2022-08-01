import { useState } from "react";

function Header(props) {
  return <h2>{props.text}</h2>;
}

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const Stat = (props) => (
  <p>
    <span>{props.text} </span>
    <span> {props.value}</span>
  </p>
);

const Statistics = ({ good, bad, neutral, all }) => {
  const calcAvg = () => {
    return (good * 1 + neutral * 0 + bad * -1) / all || 0;
  };
  const calcPos = () => {
    return (good / all) * 100 || 100;
  };
  return (
    <div>
      <Stat text="good" value={good} />
      <Stat text="neutral" value={neutral} />
      <Stat text="all" value={all} />
      <Stat text="average" value={calcAvg()} />
      <Stat text="positive" value={calcPos()} />
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);

  const handleGood = () => {
    setAll(all + 1);
    setGood(good + 1);
  };
  const handleNeutral = () => {
    setAll(all + 1);
    setNeutral(neutral + 1);
  };
  const handleBad = () => {
    setAll(all + 1);
    setBad(bad + 1);
  };

  return (
    <div>
      <Header text="give feedback" />
      <Button text="good" onClick={handleGood} />
      <Button text="neutral" onClick={handleNeutral} />
      <Button text="bad" onClick={handleBad} />
      <Header text="statistics" />
      <Statistics good={good} bad={bad} neutral={neutral} all={all} />
    </div>
  );
};

export default App;
