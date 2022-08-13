import { useState } from "react";

function Header({ text }) {
  return <h2>{text}</h2>;
}

function Paragraph({ text }) {
  return <p>{text}</p>;
}

function Anecdote({ anecdoteData }) {
  return (
    <div>
      <Paragraph text={anecdoteData.text} />
    </div>
  );
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

  class AnecdoteData {
    constructor(id, text) {
      this.id = id;
      this.text = text;
      this.points = 0;
    }

    voteAnecdote() {
      this.points += 1;
    }
  }

  let anecdotes_t = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  ];

  anecdotes_t = anecdotes_t.map((ele, idx) => new AnecdoteData(idx, ele));
  debugger;

  const [anecdotes, setAnecdotes] = useState(anecdotes_t);
  debugger;

  const [anecdoteRandCurID, setAnecdotesRandCurID] = useState(0);
  const [anecdoteDailyCurID, setAnecdotesDailyCurID] = useState(0);

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

  const handleDailyAnecdote = () => {
    let anecdote_clone = [...anecdotes];
    debugger;
    anecdote_clone.sort((a, b) => (a.points > b.points ? 1 : -1));
    debugger;
    let highestID = anecdote_clone.pop().id;
    debugger;
    setAnecdotesDailyCurID(highestID);
  };

  const handleRandomAnecdote = () => {
    let rand = Math.ceil(Math.random() * anecdotes.length);
    setAnecdotesRandCurID(rand);
  };

  const handleVoteAnecdote = () => {
    //copy the current anecdotes array
    let anecdote_clone = [...anecdotes];
    //update the points property of the anecdote object at the current index
    anecdote_clone[anecdoteRandCurID].voteAnecdote();
    //use the anecdotes handler to update the anecdotes array
    console.log(`voted for anecdote!`);
    console.log(anecdote_clone[anecdoteRandCurID]);
    setAnecdotes(anecdote_clone);
    handleDailyAnecdote();
    return;
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
      <Header text="random anecdote" />
      <Anecdote anecdoteData={anecdotes[anecdoteRandCurID]} />
      <Button text="vote" onClick={handleVoteAnecdote} />
      <Button text="new anecdote" onClick={handleRandomAnecdote} />
      <Header text="daily anecdote" />
      <Anecdote anecdoteData={anecdotes[anecdoteDailyCurID]} />
    </div>
  );
};

export default App;
