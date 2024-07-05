import { useState } from "react";


export default function PlaceGallery({place}){
    
    const [showAllPhotos, setShowAllPhotos] = useState(false);
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    
    const handleNextPhoto = () => {
        setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % place.addedPhotos.length);
    };

    const handlePreviousPhoto = () => {
        setCurrentPhotoIndex((prevIndex) =>
            prevIndex === 0 ? place.addedPhotos.length - 1 : prevIndex - 1
        );
    };

    if (showAllPhotos) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
                <button onClick={() => setShowAllPhotos(false)} className="absolute top-4 right-4 bg-black text-white px-4 py-2 rounded-2xl ">
                    Close
                </button>
                <div className="relative w-4/5 h-4/5 ">
                    <img 
                        src={'http://localhost:4000/uploads/' + place.addedPhotos[currentPhotoIndex]}
                        alt=""
                        className="flex object-contain w-full h-full"
                    />
                    <button onClick={handlePreviousPhoto} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-2xl">
                        &lt;
                    </button>
                    <button onClick={handleNextPhoto} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-2xl">
                        &gt;
                    </button>
                </div>
            </div>
        );
    }
    
    return (
        <div className="relative">
            <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-2xl overflow-hidden">
            <div className="flex w-full h-full">
                {place.addedPhotos?.[0]&&(
                    <div>
                        <img onClick={()=>setShowAllPhotos(true)} className="cursor-pointer w-full h-full object-cover " src= {'http://localhost:4000/uploads/'+place.addedPhotos[0]} alt="" />
                    </div>
                )}
            </div>
            <div className="flex w-full h-full grid">
                    <div className="flex w-full h-full overflow-hidden">
                        {place.addedPhotos?.[1]&&(
                            <img onClick={()=>setShowAllPhotos(true)} className="cursor-pointer aspect-square object-cover " src= {'http://localhost:4000/uploads/'+place.addedPhotos[1]} alt="" />
                        )}
                    </div>
                    <div className="flex w-full h-full overflow-hidden">
                        {place.addedPhotos?.[2]&&(
                            <img onClick={()=>setShowAllPhotos(true)} className="cursor-pointer aspect-square object-cover " src= {'http://localhost:4000/uploads/'+place.addedPhotos[2]} alt="" />
                        )}   
                    </div>
            </div> 
            </div>
            <button onClick={()=> setShowAllPhotos(true)} className="flex gap-2 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow-md shadow-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                    <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clipRule="evenodd" />
                </svg>
                Show more photos
            </button>
        </div>
    )
}