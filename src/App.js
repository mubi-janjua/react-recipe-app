import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";
import ReceipeComponent from "./receipeComponent";

function App() {
  const APP_ID='b0a475a4';
  const APP_KEY='a28a31789323c9773b173fe653a218b1';
  const [recipe, setReceipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query , setQuery] = useState('chicken');
  useEffect(() => {
    getReceipe();
    }, [query]);

  const getReceipe = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setReceipes(data.hits)
  };

  const updateSearch = e => {
    setSearch(e.target.value);
  }
  const getQuery = e => {
    e.preventDefault();
    setQuery(search);
  }
  const getReset = e => {
    e.preventDefault();
    setQuery('chicken')
    setSearch('');
  }
  return (
    <div className="App">
     <form className="search-form">
       <input className="search-bar" type="text" placeholder="Search Recipe" value={search} onChange={updateSearch}/>
       <div className="space">
         <button className="search-button" type="submit" onClick={getQuery}>submit</button>
       </div>
       <div>
         <button className="search-button" type="submit" onClick={getReset}>reset</button>
       </div>
     </form>
  <div className="recipes">
    {
      recipe.length > 0 ? recipe.map(receipes => (
          <ReceipeComponent
              key={receipes.recipe.label}
              title={receipes.recipe.label}
              calories={receipes.recipe.calories}
              image={receipes.recipe.image}
              ingredients={receipes.recipe.ingredients}
          ></ReceipeComponent>
      )) : null
    }
  </div>
    </div>
  );
}

export default App;
