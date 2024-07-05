import { useEffect, useState } from "react";
import PhotosUploader from "../PhotoUploader";
import Perks from "../perk";
import axios from "axios";
import AccountNav from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";

export default function PlacesFormPage(){
    const {id} = useParams();

    const [title, setTitle] = useState('');
    const [address,setAddress] = useState('');
    const [description,setDescription] = useState('');
    const [perks, setPerks] = useState('');
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1); 
    const [addedPhotos, setAddedPhotos]  = useState([]); 
    const [price, setPrice] = useState(100);
    const[redirect, setRedirect] = useState(false)
    
    useEffect(()=>{
      if(!id){
        return;
      }
      axios.get('/places/'+id).then(response=>{
         const {data} = response;
         setTitle(data.title);
         setAddress(data.address);
         setAddedPhotos(data.addedPhotos)
         setDescription(data.description);
         setPerks(data.perks);
         setExtraInfo(data.extraInfo);
         setCheckIn(data.checkIn);
         setCheckOut(data.checkOut);
         setMaxGuests(data.maxGuests);
         setPrice(data.price);
      })
    },[id]);

    function inputHeader(text){ 
        return(
            <h2 className="text-xl mt-4">{text}</h2>
        )
    }
    
    function inputDescription(text){
        return(
            <p className="text-gray-500 text-sm">{text}</p>
        )
    }
    
    function preInput(header,description){
        return(
            <>
              {inputHeader(header)}
              {inputDescription(description)}
            </>
        )
    }

    async function savePlace(ev){
        ev.preventDefault();
        const placeData = {title, address,addedPhotos,
        description,perks,extraInfo,
        checkIn,checkOut, maxGuests,price
        };
        if(id){
            //updating in existing place
            await axios.put(
            '/places',
            {   id,
                ...placeData
            });
            setRedirect(true);
        }
        else{
            // adding a new place
            await axios.post('/places',placeData);
            setRedirect(true);
        }
    }
   
    if(redirect){
        return <Navigate to = {'/account/places'}/>
    }




    return(
    <div>
        <AccountNav/>
       <form onSubmit={savePlace}>
            {preInput('Title','title for your place. should be short and catchy as in advertisement')}
            <input type="text" value = {title} onChange ={ev=>setTitle(ev.target.value)} placeholder="title, for example: My lovely apartmen"/>

            {preInput('Address','Address to this place')}
            <input type="text" value ={address} onChange = {ev=>setAddress(ev.target.value)} placeholder="address"/>

            {preInput('Photos','more = better')}
            <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

            {preInput('Description','Description of the place')}
            <textarea value ={description} onChange = {ev=>setDescription(ev.target.value)} />

            {preInput('Perks','Select all the perks of your place ')}
            <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6"> 
                <Perks selected = {perks} onChange = {setPerks} />
            </div>
                       
            {preInput('Extra Info','house rules, etc')}
            <textarea value ={extraInfo} onChange = {ev=>setExtraInfo(ev.target.value)} />

            {preInput('Check in&out time , max guests','add check in and oout time, remeber to have some time window for cleaning room between guests')}
            <div className="grid sm:grid-cols-2 md:grid-cols-4">
                <div>
                    <h3 classeName = "mt-2 -mb-1">Check in time</h3>
                    <input type="text" value ={checkIn} onChange = {ev=>setCheckIn(ev.target.value)}placeholder="14:00"/>
                </div>
                <div>
                    <h3 classeName = "mt-2 -mb-1">Check out time</h3>
                    <input type="text" value ={checkOut} onChange = {ev=>setCheckOut(ev.target.value)}placeholder="23:00"/>
                </div>
                <div>
                    <h3 classeName = "mt-2 -mb-1">Max number of guests</h3>
                    <input type="number" value ={maxGuests} onChange = {ev=>setMaxGuests(ev.target.value)}placeholder="3"/>
                </div>
                <div>
                    <h3 classeName = "mt-2 -mb-1">Price per night</h3>
                    <input type="number" value ={price} onChange = {ev=>setPrice(ev.target.value)}placeholder="3"/>
                </div>
            </div>
            
            <button className="primary mt-2 mb-2"> Save</button>
                        
        </form>
   </div> 
)
}