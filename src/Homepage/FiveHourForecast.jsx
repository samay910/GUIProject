/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React,{useEffect,useState} from "react";
import styles from "./FiveHourForecast.module.css";
import rainmid from '../assets/midrain.svg';
import daycloudy from '../assets/daycloudy.svg';
import nightcloudy from '../assets/nightcloudy.svg';
import Raindrop from '../assets/drop.svg';

function FiveHourForecast(props){

    const weather = props.weather.list;
    const current_Weather=props.CurrentWeather;

    const [icon,seticon]=useState([rainmid,rainmid,rainmid,rainmid,rainmid]);

    const [rainchance,setrainchance]=useState(['1%','2%','3%','4%','5%']);

    const [time,settime]=useState(['10:00','11:00','12:00','13:00','14:00'])

    // needs to be an object containing icon location date of week current temp current time rain chance
    const [CurrentForecast,setCurrentForecast]=useState({
        Current_icon:rainmid,
        Current_time:'',
        Current_temp:'',
        Current_loc:'',
        Current_rain:''});



    function setData(){
        // loop through each hour to set all values
        // first check time to go through correct set of assests

        let r_time=weather[0].dt_txt.slice(11,13);
        r_time=parseInt(r_time);
        // day weather
        let w_icon =[]
        let w_time=[]
        let w_rainchance=[]

        if (r_time<15){
            for (let i = 0; i < 4; i++) {
                //add the time
                w_time.push(weather[i].dt_txt.slice(11,16));
                w_rainchance.push(weather[i].pop*100 + '%');

                if (weather[i].weather[0].main== 'Clouds'){
                    w_icon.push(daycloudy);
                }
            }
        }
        else{
            for (let i = 0; i < 4; i++) {
                //add the time
                w_time.push(weather[i].dt_txt.slice(11,16));
                w_rainchance.push(weather[i].pop*100 + '%');

                if (weather[i].weather[0].main== 'Clouds'){
                    w_icon.push(nightcloudy);
                }
            }
        }
        seticon(w_icon);
        setrainchance(w_rainchance);
        settime(w_time);
        // deal with current weather icon

        setCurrentForecast({
            ...CurrentForecast,
            Current_icon:w_icon[0],
            Current_time:'',
            // convert temp to degree celcius 
            Current_temp:'',
            Current_loc:'',
            Current_rain:''
        });


    }

    useEffect(()=>{
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
            <div className={styles.flex_current_item1}>
                hello
            </div>
            
        </div>   
        </>
    )

}

export default FiveHourForecast