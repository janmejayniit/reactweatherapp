import { useState } from "react"
import Axios from 'axios';
import './App.css';
function App() {

    const [cityname,setCityName]=useState();
    const [weather, setWeather] = useState({loading: false,data: {},error: false});

    const  searchWeather= async () =>{

      const APIKEY='d68b6d50ae70af571636261f2c00a2a2'
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${APIKEY}&units=metric`
    
      await Axios({ 
        method: "get", 
        url: url, 
        responseType: "json"
      }).
      then((response)=>{
        setWeather({ data: response.data, loading: false, error: false });
        setCityName('');
      })
      .catch((error) => { 
        setWeather({ ...weather, data: {}, error: true });
        setCityName('');
        console.log('error', error);
      }); 
  }

  return (
    <div className='container mt-2'>
      <div className='row'>
         
            <div className="col-md-4"></div>  
            <div className='col-md-4' >
              <div className='card' style={{boxShadow:'1px 1px 2px black'}}>
                <div className='card-header'>
                  <p><i className="bi bi-cloud-drizzle"></i> Get Your City Weather Updates</p>
                </div>
                <div className='card-body'>
                  <div className="mb-3">                
                    <div className="input-group">
                      <input type="text" className="form-control" id="" value={cityname} onChange={(e)=>setCityName(e.target.value)} placeholder="Enter Your city name"/>
                      <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={searchWeather}><i className="bi bi-search"></i></button>
                    </div>   
                  </div>  

                  {weather && weather.data && weather.data.main && (
                      <div>
                          <div className="city-name">
                              <h2>
                                  {weather.data.name}, <span>{weather.data.sys.country}</span>
                              </h2>
                          </div>
                          <div className="date">
                              <span></span>
                          </div>
                          <div className="icon-temp">
                              <img
                                  className=""
                                  src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
                                  alt={weather.data.weather[0].description}
                              />
                              {Math.round(weather.data.main.temp)}
                              <sup className="deg">°C</sup>
                          </div>
                          <div className="des-wind">
                              <p>{weather.data.weather[0].description.toUpperCase()}</p>
                              <p>Wind Speed: {weather.data.wind.speed}m/s</p>
                          </div>
                      </div>
                  )}

                </div>
              </div>
            </div>  
         
         
      </div>
    </div>
  )
}
export default App
