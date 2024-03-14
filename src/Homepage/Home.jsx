// eslint-disable-next-line no-unused-vars
import React,{useState,useEffect} from "react";
import axios from "axios";
import FiveHourForecast from './FiveHourForecast.jsx'



// API: https://openweathermap.org/api/hourly-forecast#example_XML

// set background based on current time.


function Home(props){

    const [CurrentLocation,setCurrentLocation]=useState(props.coords);
    const [CurrentWeather,setCurrentWeather]=useState();
    const [Current5hours,setCurrent5hours]=useState();

    const [Current5Day,setCurrent5Day]=useState();
   
    

    
    // get the default browser location
    function handleCurrentLocation(){
        if(CurrentLocation==''){
                  try {
         
            //get browser data
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                  (position) => {

                    let latitude= position.coords.latitude;
                    let longitude= position.coords.longitude;
               
                    setCurrentLocation({ latitude, longitude });
                    
                  },
                  (error) => {
                    console.log(error.message);
                  })
                }
            else{
                // default location is london
                setCurrentLocation({ latitude:'51.5072', longitude:'0.1276' });
            }

        } 
            catch (error) {
                
                console.error(error);
            }
        }
    }

    async function handleCurrentWeather(){

        //get current weather data
        const response=await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${CurrentLocation.latitude}&lon=${CurrentLocation.longitude}&appid=69a76ba65a0f35730c3d61f7b31cfc05`
        );
        setCurrentWeather(response.data);
        
    
         //You can see all the weather data in console log
    }

    
    async function handle5dayWeather(){

        //get current weather data
        const response=await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${CurrentLocation.latitude}&lon=${CurrentLocation.longitude}&cnt=5&appid=69a76ba65a0f35730c3d61f7b31cfc05`
        );
        setCurrent5Day(response.data);
        console.log(response.data);
         //You can see all the weather data in console log
    }




    async function handleCurrent5hours(){
        //get current weather data
        const response=await axios.get(
            `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${CurrentLocation.latitude}&lon=${CurrentLocation.longitude}&appid=69a76ba65a0f35730c3d61f7b31cfc05`
        );
        setCurrent5hours(response.data);
      
        
       //You can see all the weather data in console log

    }

    useEffect(() => {
        handleCurrentLocation();            
 
    },[])

    useEffect(() => {
        if(CurrentLocation!=''){
            handleCurrentWeather();
            handleCurrent5hours();
            handle5dayWeather();
        }
        else{
            handleCurrentLocation();
        }
  
        
             
    },[CurrentLocation])


    if(CurrentLocation&& CurrentWeather && Current5hours && Current5Day){
        return(
        <div>
        
           
           <FiveHourForecast weather={Current5hours} current={CurrentWeather} DayForecast={Current5Day}/>
        </div>   
    )    
        }

}

export default Home;