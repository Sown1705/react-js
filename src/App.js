import {useEffect,useState} from "react";
import axios from 'axios';
import './App.css';
import React from 'react';

function App() {
  const [values,setValue] = useState({
      id:'',
      name:''
  });

    const [hero,setHero] = useState({
        id:'',
        name:''
    });
    const [display,setDisplay] = useState('none')
    const [historySelected,setHistorySelected] = useState([])
  useEffect(()=>{
    axios.get(`https://60dff0ba6b689e001788c858.mockapi.io/heroes`)
        .then(res => {
          const heros = res.data;
          console.log(heros)
          setValue( heros);
        })
        .catch(error => console.log(error));
  },[]);


    const selectedHero = (item) =>{
        setDisplay('block')
        setHero(item)
        historySelected.push(item.id)
        console.log("lll",historySelected)
        setHistorySelected(historySelected)
    }

  const handleOnChange = (item) =>{
        setHero({
          ...hero,
          name:item.target.value
      })
      const list = [...values]
      Array.from(list).find(x=>x.id===hero.id).name = item.target.value
  }

  return (
    <div>
        <div>
            {Array.from(values).map(hero =>(
                <ul key={hero.id} className="heroes" onClick={()=> selectedHero(hero) }>
                    <li><span className="badge" >{hero.id}</span>{hero.name}</li></ul>))}
        </div>

        <div>
            <span style={{display}}>
               <h1> {hero.name} Details</h1>
                <p>id : {hero.id}</p>
                hero name :
                <input
                name="name"
                type="text"
                value={hero.name}
                onChange={ handleOnChange }
                /></span>
        </div>
        <div>
            <h2 style={{color:'red'}}>Messages</h2>
            <button onClick={ ()=> setHistorySelected([]) }>Clear Message</button>
            <p>HeroService: fetched heroes</p>
           {historySelected.map((item)=> <span style={{display}}>HeroesComponent: Selected hero id={item}</span>)}
        </div>
    </div>
  );
}

export default App;
