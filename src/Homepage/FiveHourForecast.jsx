/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React,{useEffect,useState} from "react";
import styles from "./FiveHourForecast.module.css";
import rainmid from '../assets/midrain.svg';
import daycloudy from '../assets/daycloudy.svg';
import daysunny from '../assets/daysunny.svg';
import dayverycloudy from '../assets/dayverycloudy.svg';
import dayrain from '../assets/midrain.svg';

import nightclear from '../assets/daycloudy.svg';
import nightcloudy from '../assets/nightcloudy.svg';
import nightrain from '../assets/daycloudy.svg';

import storm from '../assets/storm.svg';
import heavyrain from '../assets/heavyrain.svg';
import snow from '../assets/snow.svg';

import Raindrop from '../assets/drop.svg';

function FiveHourForecast(props){

    // all props entered are the data retrieved by the api calls on the home page
    const weather = props.weather.list;
    const current_Weather=props.current;
    const DayForecast=props.DayForecast.list;

    // sets the data of the 5 hour forecast in 3 sets of state arrays
    const [icon,seticon]=useState([rainmid,rainmid,rainmid,rainmid,rainmid]);

    const [rainchance,setrainchance]=useState(['1%','2%','3%','4%','5%']);

    const [time,settime]=useState(['10:00','11:00','12:00','13:00','14:00'])

    // 5 day forecast is empty to be set later
    const [FiveDayForecast,setFiveDayForecast]=useState([])

    // needs to be an object containing icon location date of week current temp current time rain chance
    const [CurrentForecast,setCurrentForecast]=useState({
        Current_icon:rainmid,
        Current_dayofweek:'',
        Current_time:'',
        Current_description:'',
        Current_temp:'',
        Current_loc:'',
        Current_cloudyness:''});

    // where state values are set
    function setData(){

        // real time
        let r_time=weather[0].dt_txt.slice(11,13);
        r_time=parseInt(r_time);
        // day weather
        let current_icon=dayverycloudy;
        const date = new Date(current_Weather.dt * 1000);
        let day=date.getDay();
        // the day is determined by the number recieved by the api
        if (day==1){day='Monday';}
        else if (day==2){day='Tuesday';}
        else if (day==3){day='Wednesday';}
        else if (day==4){day='Thursday';}
        else if (day==5){day='Friday';}
        else if (day==6){day='Saturday';}
        else{day='Sunday';}
        // format the time to display current time
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const correct_time=hours+':'+minutes;

        // list of empty arrays to be set later
        let w_icon =[]
        let w_time=[]
        let w_rainchance=[]

        // how the icon dispayed on each forecast is determined,less than17 = day
        if (r_time<17){
            // set the current weather icon
            if(current_Weather.weather[0].main=='Clouds'){
                current_icon=daycloudy;
            }
            else if (current_Weather.weather[0].main== 'Drizzle'){
                current_icon=dayrain;
            }
            else if(current_Weather.weather[0].main== 'Clear'){
                current_icon=daysunny;
            }
            else if(current_Weather.weather[0].main=='Rain'){
                current_icon=heavyrain;
            }
            else if(current_Weather.weather[0].main== 'Snow'){
                current_icon=snow;
            }
            else if(current_Weather.weather[0].main=='Thunderstorm'){
                current_icon=storm;
            }

            //set the data for 5 hour forecast 
            for (let i = 0; i < 5; i++) {
                //add the time
                w_time.push(weather[i].dt_txt.slice(11,16));
                w_rainchance.push(weather[i].pop*100 + '%');

                if (weather[i].weather[0].main== 'Clouds'){
                    w_icon.push(daycloudy);
                }
                else if (weather[i].weather[0].main== 'Drizzle'){
                    w_icon.push(dayrain);
                }
                else if(weather[i].weather[0].main== 'Clear'){
                    w_icon.push(daysunny);
                }
                else if(weather[i].weather[0].main== 'Rain'){
                    w_icon.push(heavyrain);
                }
                else if(weather[i].weather[0].main== 'Snow'){
                    w_icon.push(snow);
                }
                else if(weather[i].weather[0].main== 'Thunderstorm'){
                    w_icon.push(storm);
                }
                else{
                    w_icon.push(dayverycloudy);
                }
            }
        }
        // deal with night icons
        else{

            // set the current weather icon
            if(current_Weather.weather[0].main=='Clouds'){
                current_icon=nightcloudy;
            }
            else if (current_Weather.weather[0].main== 'Drizzle'){
                current_icon=nightrain;
            }
            else if(current_Weather.weather[0].main== 'Clear'){
                current_icon=nightclear;
            }
            else if(current_Weather.weather[0].main=='Rain'){
                current_icon=nightrain;
            }
            else if(current_Weather.weather[0].main== 'Snow'){
                current_icon=snow;
            }
            else if(current_Weather.weather[0].main=='Thunderstorm'){
                current_icon=storm;
            }

            // set night icons
            for (let i = 0; i < 5; i++) {
                //add the time
                w_time.push(weather[i].dt_txt.slice(11,16));
                w_rainchance.push(weather[i].pop*100 + '%');

                if (weather[i].weather[0].main== 'Clouds'){
                    w_icon.push(nightcloudy);
                }
                else if (weather[i].weather[0].main== 'Drizzle'){
                    w_icon.push(nightrain);
                }
                else if(weather[i].weather[0].main== 'Clear'){
                    w_icon.push(nightclear);
                }
                else if(weather[i].weather[0].main== 'Rain'){
                    w_icon.push(heavyrain);
                }
                else if(weather[i].weather[0].main== 'Snow'){
                    w_icon.push(snow);
                }
                else if(weather[i].weather[0].main== 'Thunderstorm'){
                    w_icon.push(storm);
                }
                else{
                    w_icon.push(nightcloudy);
                }
            }
        }

        seticon(w_icon);
        setrainchance(w_rainchance);
        settime(w_time);
        
        //set current forecast state
        setCurrentForecast({
            ...CurrentForecast,
            Current_icon:current_icon,
            Current_dayofweek:day,
            Current_time:correct_time,
            // convert temp to degree celcius 
            Current_temp:(current_Weather.main.temp-273.15).toFixed(1)+'°C',
            Current_description:current_Weather.weather[0].description,
            Current_loc:current_Weather.name,
            Current_cloudyness:current_Weather.clouds.all+ '%'
        });

        // set 5 days forecast
        for(let i=0 ; i<5 ; i++){

            let five_icon=daycloudy;
            if (DayForecast[i].weather[0].main== 'Drizzle'){
                current_icon=dayrain;
            }
            else if(DayForecast[i].weather[0].main== 'Clear'){
                five_icon=daysunny;
            }
            else if(DayForecast[i].weather[0].main=='Rain'){
                five_icon=heavyrain;
            }
            else if(DayForecast[i].weather[0].main== 'Snow'){
                five_icon=snow;
            }
            else if(DayForecast[i].weather[0].main=='Thunderstorm'){
                five_icon=storm;
            }

            // deal with the day similar to above
            const F_date = new Date(DayForecast[i].dt * 1000);
            let F_day=F_date.getDay();
            let day='';
            if (F_day==1){day='Monday';}
            else if (F_day==2){day='Tuesday';}
            else if (F_day==3){day='Wednesday';}
            else if (F_day==4){day='Thursday';}
            else if (F_day==5){day='Friday';}
            else if (F_day==6){day='Saturday';}
            else{day='Sunday';}

            // set min and max temp for the 5 day forcast
            let min=(DayForecast[i].temp.min-273.15).toFixed(1)+'°C';
            let max=(DayForecast[i].temp.max-273.15).toFixed(1)+'°C';

            // add the oject to the 5 day forecats array state
            setFiveDayForecast(d=>[...d,{
                F_time:day,
                F_icon:five_icon,
                F_rain:DayForecast[i].pop*100 + '%',
                F_temprange:max+'/'+min
            }])
        }
    }

    // reset the fivedayforecast state and run the set data function
    useEffect(()=>{
        setFiveDayForecast([]);
        setData();
    },[])

    return(
        <> 
            {/* icons */}
            <div className={styles.flex_Container_icon}>
                {
                    icon.map((image,key)=>
                    <img className={styles.flex_item_icon} key={key} src={image} alt="icon"/>
                    //<p className={styles.flex_item_icon} key={key}>{image}</p>
                    )
                }
            </div>
            {/* rain */}
            <div className={styles.flex_Container_rain}>
                {
                    
                    rainchance.map((image,key)=>
                    // <img key={key} src={image} alt="icon" />)
                    <div key={key} className={styles.flex_item_rain}>
                        <img src={Raindrop} className={styles.drop_icon} alt="rain" />
                        <p>{image}</p>
                    </div>
                    )
                }
            </div>

            <div className={styles.flex_Container_time}>
                {
                    time.map((image,key)=>
                    // <img key={key} src={image} alt="icon" />)
                    <p className={styles.flex_item_time} key={key}>{image}</p>
                    )
                }
            </div> 

            {/* Current Weather */}
            <div className={styles.flex_current}>
                <div>
                        {
                <img className={styles.current_icon} src={CurrentForecast.Current_icon} alt="icon"/>
                }
                </div>

                <div className={styles.current_container_right}>
                    <div className={styles.current_loc_date_container}>
                        <p className={styles.current_location}>{CurrentForecast.Current_loc}</p>
                        <p className={styles.current_date}>{CurrentForecast.Current_dayofweek}</p>
                    </div>
                    <div >
                        <p className={styles.current_desc}>{CurrentForecast.Current_description}</p>
                    </div>
                    <div>
                        <p className={styles.current_temp}>{CurrentForecast.Current_temp}</p>
                    </div>
                    
                    {/* contains the time and current rain chance */}
                    <div className={styles.rain_time_container}>
                        <div className={styles.current_rain}>
                            <img src={Raindrop} className={styles.drop_icon} alt="rain" />
                            <p>{rainchance[0]}</p>
                        </div>
                        
                        <p className={styles.current_time}>{CurrentForecast.Current_time}</p>
                    </div>
                    
                </div>
                
            </div>              
            
            {/* 5 day forecast */}
            <div className={styles.FiveDayForecast}>
                <h1>Forecast</h1>
                {
                    FiveDayForecast.map((current,key) => 
                    <div className={styles.fiveDay_Container} key={key}>
                        <p className={styles.fiveDay_date}>{current.F_time}</p>
                        <img src={current.F_icon} alt="" className={styles.f_icon_day}/>

                        <div className={styles.fiveDay_rainchance}>
                            <img src={Raindrop} className={styles.five_rain_icon} alt="rain" />
                            <p>{current.F_rain}</p>
                        </div>

                        <p className={styles.fiveDay_temp}>{current.F_temprange}</p>
                    </div>
                    )
                }
            </div>

        </>
    )

}

export default FiveHourForecast