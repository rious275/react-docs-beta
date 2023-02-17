import logo from "./logo.svg"
import "./App.css"

const today = new Date()

function formatDate(date) {
  return new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date)
}

function App() {
  return <h1>To Do List for {formatDate(today)}</h1>
}

export default App
