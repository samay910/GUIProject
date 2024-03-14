// eslint-disable-next-line no-unused-vars
import React,{useState,useEffect} from "react";
import axios from "axios";
import Home from '../Homepage/Home.jsx'
import styles from "./Options.module.css";
import optionbutton from "../assets/optionButton.svg";
import home from "../assets/HomeButton.svg";


function Options(){

    // states are used to manage which page the user is on
    const [showMenue, setshowMenue] = useState(false);
    const [mainPage, setMainPage] = useState(true);
    const [moreinfo,setmoreinfo] = useState(false);



    const[input,setInput] = useState();
    const[listOfLocations, setListOfLocations] = useState([''])
    const[LatandLon,setLatandLon] = useState('');
    const[LocationName,setLocationName] = useState('');

    
    //hide main page 
    const handleButtonMenueClick = () => {
        
        setshowMenue(true);
        setMainPage(false);
        setListOfLocations([''])
    };

    const handleMoreInfoClick = () => {
        setshowMenue(false);
        setmoreinfo(true);
    }

    const retuntohoem=() => {
        setmoreinfo(false);
        setshowMenue(false);
        setMainPage(true);
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


    // set the location and parse the value into home



        return(
        <>
        {/* change the options button to a home button if the user is not on the homepage */}



        {
            mainPage&&
            <div>


                            <div className={styles.option_button_container}>
                
                <h2>current location: {LocationName!=''?LocationName:'Browser Location'}</h2>
            
                {/* when clicked switch to option screen */}


                <a href="#" onClick={handleButtonMenueClick}  className={styles.OptionsButton}>
                    <img src={optionbutton} alt="options"  />
                </a>
                


            </div>
            <Home coords={LatandLon} />
            </div>

        }

        {/* display options page */}
        {
            showMenue&&
            (


                <>

            <div className={styles.option_button_container}>
                
                <h2>current location: {LocationName!=''?LocationName:'Browser Location'}</h2>
            
                {/* when clicked switch to option screen */}


                <a href="#" onClick={retuntohoem}  className={styles.OptionsButton}>
                    <img src={home} alt="options"  />
                </a>
                
            </div>

     
                  <div className={styles.options_container}>
      
                   <div className={styles.searchbarContainer}>
                        <h3>Enter a location below</h3>
                        <input type="text" className={styles.searchbar} onChange={(e)=> setInput(e.target.value)} id="location" value={input} placeholder="enter location"/>
                        <button className={styles.searchbutton} onClick={handleinputLocation}>Find</button>
                   </div>
                   
                   <h2>
                         Select a location
                    </h2>
                    <button className={styles.chosen_button} onClick={()=>handleChosenLoc('')}>
                        Current Location
                    </button>
                    <p>The location provided by the current button is provided by your browser</p>

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

                    <button className={styles.more_info} onClick={()=>handleMoreInfoClick()}>
                        Moreinfo
                    </button>
                </div>
                </>
              
      
                

       
            )
        }
        {/* display page of additional info */}
        {
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

               
     
      
                </>
              
      
                

       
            )
        }
            
        </>
    )
    }




export default Options;