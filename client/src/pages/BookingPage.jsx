import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom"
import AddressLink from "../AddressLink";
import { useState } from "react";
import PlaceGallery from "../PlaceGallery";
import { differenceInCalendarDays, format } from "date-fns";


export default function BookingPage(){
    const {id} = useParams();
    const [booking, setBooking] = useState(null);
    useEffect(()=>{
       if(id){
         axios.get('/bookings').then(response=>{
            const foundBooking =  response.data.find(({_id}) => _id === id)
            if(foundBooking){
               setBooking(foundBooking);
            }
         });
       }
    },[id]);
    if(!booking){
      return '';
    }
    return(
       <div>
           <div className="my-8">
               <h1 className="text-3xl">{booking.place.title}</h1>
               <AddressLink className="my-2 block">{booking.place.address}</AddressLink>
               <div className="by-gray-200 p-4 mb-4 rounded-2xl">
                  <h2 className="text-xl">Your booking information:</h2>
                  <div className="py-3">
                     <div className="flex mt-4 gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                           <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                        </svg>
                        {format(new Date(booking.checkIn),'dd-MM-yyyy')} &rarr; 
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                           <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                        </svg>
                        {format(new Date(booking.checkOut),'dd-MM-yyyy')}  
                     </div>
                     <div className="text-xl mt-4"> 
                        {differenceInCalendarDays(new Date(booking.checkOut),new Date(booking.checkIn))} nights |
                        Total price: ${booking.price}  
                     </div>
                  </div>
               </div>
               <PlaceGallery place = {booking.place} />
           </div>
       </div>
    )
} 