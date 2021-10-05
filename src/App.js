import logo from './logo.svg';
import React,{useState} from 'react';
import './App.css';
import {Route} from 'react-router-dom'
/* import Home from './components/Home/Home'; */ 
import Nav from './Components/Nav/Nav';
import Cards from './Components/Card/Cards'
import Ciudad from './Components/Detail/Cities'
import AboutMe from './Components/About/AboutMe';
import {Home} from './Components/Home';
import Search from './Components/Nav/Search';
function App() {
  const [cities, setCities] = useState([]);
    function onClose(id) {
    setCities(oldCities => oldCities.filter(c => c.id !== id));
    }
    function onSearch(ciudad) {
    //Llamado a la API del clima
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=fa03081aa1e5c64b53d46ccbf21237e4&&units=metric`)
      .then(r => r.json())
      .then((recurso) => {
        if(recurso.main !== undefined){
          const ciudad = {
            min: Math.round(recurso.main.temp_min, -1),
            max: Math.round(recurso.main.temp_max),
            img: recurso.weather[0].icon,
            id: recurso.id,
            wind: recurso.wind.speed,
            temp: recurso.main.temp,
            name: recurso.name,
            weather: recurso.weather[0].main,
            clouds: recurso.clouds.all,
            latitud: recurso.coord.lat,
            longitud: recurso.coord.lon,
            mapaSun: recurso.coord.lon,
            mapaSet : recurso.coord.lat
          };
          setCities(oldCities => [...oldCities, ciudad]);
        } else {
          alert("Ciudad no encontrada");
        }
      });
  }
  function onFilter(ciudadId) {
    let ciudad = cities.filter(c => c.id === parseInt(ciudadId));
    if(ciudad.length > 0) {
        return ciudad[0];
    } else {
        return null;
    }
  }
  return (
    <div className="App">
      
      <Route path ='/' component={Nav}/>  
      <Route exact path='/' render={() => <Search onSearch={onSearch}/>} />
      <Route
         exact path='/'
        render={() => <Cards cities={cities} onClose={onClose} />}
      />
      {/* <Route  path='/' render={() => <Nav onSearch={onSearch} />}/> */}
      {/*  */}
      {/* <Route path="/" component={Cards} render={()=> <Nav onSearch={onSearch}/>}/> */}
      <Route
        exact path='/aboutMe'
        component={AboutMe}
      />
      <Route
        exact path='/ciudad/:ciudadId'
        render= {({match}) => <Ciudad city ={onFilter(match.params.ciudadId)} />}
      />
    </div>
  );
}

export default App;
