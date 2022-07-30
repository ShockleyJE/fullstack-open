import { useState } from "react";

function Header(props) {
  return <h2>{props.text}</h2>;
}

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const StatisticsLine = (props) => (
  <tr>
    <td>{props.text} </td>
    <td> {props.value}</td>
  </tr>
);

const Statistics = ({ good, bad, neutral, all, feedback }) => {
  const calcAvg = () => {
    return (good * 1 + neutral * 0 + bad * -1) / all || 0;
  };
  const calcPos = () => {
    return (good / all) * 100 || 100;
  };
  if (feedback) {
    return (
      <table>
        <tbody>
          <StatisticsLine text="good" value={good} />
          <StatisticsLine text="neutral" value={neutral} />
          <StatisticsLine text="all" value={all} />
          <StatisticsLine text="average" value={calcAvg()} />
          <StatisticsLine text="positive" value={calcPos()} />
        </tbody>
      </table>
    );
  }
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [feedback, setFeedback] = useState(false);

  const handlerGod = () => {
    setFeedback(true);
    setAll(all + 1);
  };

  const handleGood = () => {
    handlerGod();
    setGood(good + 1);
  };
  const handleNeutral = () => {
    handlerGod();
    setNeutral(neutral + 1);
  };
  const handleBad = () => {
    handlerGod();
    setBad(bad + 1);
  };

  return (
    <div>
      <Header text="give feedback" />
      <Button text="good" onClick={handleGood} />
      <Button text="neutral" onClick={handleNeutral} />
      <Button text="bad" onClick={handleBad} />
      <Header text="statistics" />
      <Statistics
        good={good}
        bad={bad}
        neutral={neutral}
        all={all}
        feedback={feedback}
      />
    </div>
  );
};

export default App;
