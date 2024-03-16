// eslint-disable-next-line no-unused-vars
import React,{useState,useEffect} from "react";
import axios from "axios";
import Home from '../Homepage/Home.jsx'
import styles from "./Options.module.css";
import optionbutton from "../assets/optionButton.svg";
import home from "../assets/HomeButton.svg";
import WeatherDisplay from "../MoreInfo/WeatherDisplay.jsx";

function Options(){

    // states are used to manage which page the user is on ad which is displayed
    const [showMenue, setshowMenue] = useState(false);
    const [mainPage, setmainPage] = useState(true);
    const [moreinfo,setmoreinfo] = useState(false);

    // states used to deal with location changes and inputs
    const[input,setInput] = useState();
    const[listOfLocations, setListOfLocations] = useState([''])
    const[LatandLon,setLatandLon] = useState('');
    const[LocationName,setLocationName] = useState('');

    
    //display options menue page 
    const handleButtonMenueClick = () => {
        setshowMenue(true);
        setmainPage(false);
        setListOfLocations([''])
    };

    // display moreinfo page
    const handleMoreInfoClick = () => {
        setshowMenue(false);
        setmoreinfo(true);
    }

    // display the main paage
    const retuntohoem=() => {
        setmoreinfo(false);
        setshowMenue(false);
        setmainPage(true);
    }

    // does the api call for the location and returns the result if valid
    // check if the location entered is valid
    async function handleinputLocation(){        
        try{
            const response=await axios.get(
                `http://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=69a76ba65a0f35730c3d61f7b31cfc05`
            );
            setListOfLocations(response.data);
            console.log(response.data);
        }
        catch(error){
            console.log('unknown')
        }
         // clear the input field
        setInput('');     
    }

    //set the location to a new one if chosen 
    function handleChosenLoc(e){
        if(e==''){
            setLocationName('');
            setLatandLon('');
        }
        else{
            setLocationName(e.name);
            setLatandLon({latitude:e.lat,longitude:e.lon});
        }
    }

    // deal with if user presses enter key once location is typed
    const enterKeyPressed = (e) => {
        // enter keycode
        if (e.keyCode === 13) {
          handleinputLocation();
          e.currentTarget.blur();
        }
      };

    return(
        <>
        
        {
            // Displays Homepage
            mainPage&&(
                <div>
                    <div className={styles.option_button_container}>
                        {/* display the current location */}
                        <h2>current location: {LocationName!=''?LocationName:'Browser Location'}</h2>
                
                        {/* when clicked switch to option screen */}
                        {/* the image is the option button */}
                        <a href="#" onClick={handleButtonMenueClick}  className={styles.OptionsButton}>
                            <img src={optionbutton} alt="options"  />
                        </a>
                    </div>
                    {/* call the homepage file */}
                    <Home coords={LatandLon} />
                </div>
            )

        }
        {
            // Display Menue
            showMenue&&(
            <>
                <div className={styles.option_button_container}>
                    {/* display the current location */}
                    <h2>current location: {LocationName!=''?LocationName:'Browser Location'}</h2>

                    {/* when clicked returns to homepage */}
                    {/* image is of a homebutton */}
                    <a href="#" onClick={retuntohoem}  className={styles.OptionsButton}>
                        <img src={home} alt="options"  />
                    </a>
                </div>

                <div className={styles.options_container}>
                    {/* provide input for the user to search a location */}
                    <div className={styles.searchbarContainer}>
                            <h3>Enter a location below</h3>
                            <input type="text" className={styles.searchbar} onKeyDown={enterKeyPressed} onChange={(e)=> setInput(e.target.value)} id="location" value={input} placeholder="enter location"/>
                            <button className={styles.searchbutton} onClick={handleinputLocation}>Find</button>
                    </div>
                   
                    <h2> Select a location </h2>
                    {/* change location to current whcih is provided by the geolocation api */}
                    <button className={styles.chosen_button} onClick={()=>handleChosenLoc('')}>
                        Current Location
                    </button>
                    <p>The location provided by the current button is provided by your browser</p>

                    {/* if an invalid location or not location is entered than only this message will display */}
                    <p>Only valid locations supported by this webapp will appear below</p>

                    {listOfLocations[0]!=''&&(
                        listOfLocations.map((value, key)=>
                        <div key={key} className={styles.chosenContainer}>
                                <button className={styles.chosen_button} onClick={()=>handleChosenLoc(value)}>
                                   cityname: {value.name}
                                </button>
                                <p><b>Country: </b>{value.country} ,<b>State: </b>{value.state}</p>
                        </div> 
                        )
                    )
                    }

                    <br />
                    <br />

                    {/* button linking to the more info page */}
                    <button className={styles.more_info} onClick={()=>handleMoreInfoClick()}>
                        Moreinfo
                    </button>
                </div>
            </>
            )
        }
        {
            // Display More Info page
            moreinfo&&
            (
            <>
                <div className={styles.option_button_container}>
                    
                    <h2>current location: {LocationName!=''?LocationName:'Browser Location'}</h2>
                
                    {/* when clicked switch to option screen */}


                    <a href="#" onClick={retuntohoem}  className={styles.OptionsButton}>
                        <img src={home} alt="options"  />
                    </a>
                    
                </div>
               <WeatherDisplay location={LatandLon}/>
            </>
            )
        }
        </>
    )
}

export default Options;