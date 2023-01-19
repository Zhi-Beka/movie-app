//import ApiService from './services/api';
import MovieList from '../MovieList/MovieList';
import './App.css';

//const test = new ApiService()
//test.getOneData(550).then(data => console.log(data))

//test.getSearchMovie("return").then(data => console.log(data))

const App = () => {
  return (
    <div className="app">
      <MovieList />
    </div>
  );
};

export default App;
