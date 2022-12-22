import React, { useState, useEffect } from "react";
import Load from "./components/BoxImage"
import axios from 'axios';
import img from "./assets/img/cold-day.gif"
import img2 from "./assets/img/snoopy-hot.gif"

    const Localization = () => {

      const [local, setLocal] = useState({})
        const [temperature, setTemperature]=useState(true)
            const[backgroundChange,setBackgroundChange]= useState(true)
              const[loading, setLoading]=useState(false)

              //loader

                const changeState=()=>{

            setLoading(true)
        setTimeout(()=>{
    setLoading(false);
}, 6000);

  }
   
  /*Use Effect*/
       
  useEffect(()=>{
     changeState()
        function success(pos){
          const crd = pos.coords;

            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=5af70f675f3884f9d8b503b7a7b39348`)
              .then(res => setLocal(res.data))
    
    
                console.log('Your current position is:');
                  console.log(`Latitude : ${crd.latitude}`);
                    console.log(`Longitude: ${crd.longitude}`);
                      console.log(`More or less ${crd.accuracy} meters.`);
                            }
    
                      function error(err) {
                      console.warn(`ERROR(${err.code}): ${err.message}`);
                      }
    
                  navigator.geolocation.getCurrentPosition(success, error);
   
                },[])
            console.log(local)
    
            /*constante cambio kelvin a Celsius y celsius a farenheit*/

        const celsius =  Math.round(local.main?.temp - 273.15)
    const farenh = (Math.round(local.main?.temp - 273.15)* 9)/5+32

    /*funcion cambio backgroun y temperatura*/

  function changeGrade(){
      setBackgroundChange(!backgroundChange)
          setTemperature(!temperature)
                          }

                          /*condicion para cambio de background*/

                const max = celsius < 20
                  if(max){
                      document.body.style=  `background: deepskyblue` 
                        }else{document.body.style= "background: pink" }

                              return (
       
                              <div className="BoxPhrase1">
                              <div className="snoopy"><img className="snoopyImg" src={max ? img : img2} alt="" /></div>
                            <div className="BoxPhrase">
                        {loading ? <Load/> : loading===false}
                      <h1 className="title">Hello!! this is your current weather:</h1>
                  <div className="countryDate"> <h2>Country: {local.sys?.country} </h2>
                <h2>City: {local.name} </h2></div>

              <div className="container">

          <div className="data">
      <h2>Weather: {local.weather?.[0].main}</h2>
 <h2>Atmospheric pressure: {local.main?.pressure}  hPa</h2>
  <h2>Humidity: {local.main?.humidity}%</h2>
    <h2>Wind Speed: {local.wind?.speed} m/s</h2>
      <h2>Wind Direction: {local.wind?.deg} Degrees</h2>
        <h2>Cloudiness: {local.clouds?.all}%</h2>
            <h2>Description: {local.weather?.[0].description}</h2></div>
              <div className="icon">
                  <img className="icon1" src={`http://openweathermap.org/img/wn/${local.weather?.[0].icon}@2x.png`} alt="" />
                    <h2 className="temperature"> {temperature ?  celsius
                      : farenh}{"  "}{temperature ? "Celsius" : "Farenheit"}</h2></div></div>
                          <button className="to" style={temperature ? {background:"pink"} : {background:"deepskyblue"}} onClick={changeGrade}>{temperature ? "to Farenheit" : "to Celsius" }</button>
                            </div></div>
                                    )
                                    };
                                export default Localization;

