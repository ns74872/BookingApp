import { Link } from "react-router-dom";
import Header from "../header";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

export default function IndexPage(){
  const [places,setPlaces] = useState([])
 
 useEffect(()=>{
    axios.get('/places').then(response=>{
      setPlaces(response.data);
    })
 },[]);

  return(
    <div className="mt-12 gap-4 gap-y-6 grid gird-cols-2 md:grid-cols-4 lg:grid-cols-6">
      {places.length>0 && places.map(place=>(
        <Link to = {'/place/'+place._id}>
          <div className="bg-gray-500 mb-2 rounded-2xl flex"></div>
          {place.addedPhotos?.[0] &&(
            <img className="rounded-2xl object-cover aspect-square" src={'http://localhost:4000/uploads/'+place.addedPhotos?.[0]} alt="" />
          )}
          <h2 className="font-bold text-sm ">{place.address}</h2>
          <h3 className="text-sm text-gray-500 ">{place.title}</h3>
          <div className="mt-1">
            <span className="font-bold"> ${place.price }</span>/ Per night</div>
          
        </Link>
      ))}
    </div>
  );
}