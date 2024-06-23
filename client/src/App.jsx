import './App.css'
import PostsList from './features/posts/PostsList'

function App() {

  return (
    <>
      <div className="App-header">
        <h1>React on Rails Blog</h1>
        <p>React on Rails Blog is a simple blog application built with React and Ruby on Rails.</p>
        <PostsList />
      </div>
    </>
  )
}

export default App
