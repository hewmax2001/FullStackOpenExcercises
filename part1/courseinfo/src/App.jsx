
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
      <Part part={props.content[0].name} ex={props.content[0].exercises} />
      <Part part={props.content[1].name} ex={props.content[1].exercises} />
      <Part part={props.content[2].name} ex={props.content[2].exercises} />
    </div>
  )
}

const Total = (props) => {
  let sum = 0;
  for (let i = 0; i < props.total.length; i++) {
    sum += props.total[i].exercises;
  }
  return (
    <div>
      <p>Number of exercises {sum}</p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      { 
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content content={course.parts} />
      <Total total={course.parts} />
    </div>
  )
}

export default App
