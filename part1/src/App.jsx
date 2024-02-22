
const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>{props.part} {props.ex}</p>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.content[0].part} ex={props.content[0].ex} />
      <Part part={props.content[1].part} ex={props.content[1].ex} />
      <Part part={props.content[2].part} ex={props.content[2].ex} />
    </div>
  )
}

const Total = (props) => {
  let sum = 0;
  for (let i = 0; i < props.total.length - 1; i++) {
    sum += props.total[i];
  }
  return (
    <div>
      <p>Number of exercises {sum}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  const content = [
    { part: part1, ex: exercises1 },
    { part: part2, ex: exercises2 },
    { part: part3, ex: exercises3 }
  ]

  return (
    <div>
      <Header course={course} />
      <Content content={content} />
      <Total total={[exercises1, exercises2, exercises3]} />
    </div>
  )
}

export default App
