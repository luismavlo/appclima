import { useState, useEffect } from 'react';
import axios from 'axios';

const CardClima = () => {
    const [data, setData] = useState({});
    const [isClick, setIsClick] = useState(true);
    
    useEffect(() =>{
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
                axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=fae9403e2eeb43e4873069de812c048c`)
                        .then((res) => setData(res.data));
            }, (error) =>{
                console.error(error);
                console.log('Ups ha ocurrido un error')
        });
    }, [])
   
    console.log(data);
    
    const handleConverter = () => {
        setIsClick(!isClick);
    }
    

    return (
        <>
            <div className='cardHeader'>
                <h1>Wheater App</h1>
                <h3>{data?.name} - {data?.sys?.country}</h3>
            </div>
            <div className='cardLeftBody'>
                <img src={`http://openweathermap.org/img/wn/${data?.weather?.[0].icon}@2x.png`} alt="" />
            </div>
            <div className='cardRightBody'>
                <h4>"Scattered clouds"</h4>
                <p><span><i className="fas fa-wind"></i> Wind speed: </span> {data?.wind?.speed} m/s</p>
                <p><span><i className="fas fa-cloud"></i> Humidity:</span> {data?.main?.humidity}% </p>
                <p><span><i className="fas fa-thermometer-three-quarters"></i> Pressure:</span> {data?.main?.pressure}mb</p>
            </div>
            <div className='cardFooter'>
                <span><b> {isClick ? (`${(data?.main?.temp - 273).toFixed(2)} °C`): (`${((data?.main?.temp - 273.15) * 9/5 + 32 ).toFixed(2)} °F`)}</b></span>
                <button onClick={handleConverter}>Degrees °F/°C</button>
            </div>
        </>
    )
}

export default CardClima
