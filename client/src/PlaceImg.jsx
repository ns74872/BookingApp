

export default function PlaceImg({place,index = 0, className= null}){
    if(!place.addedPhotos?.length){
        return '';
    }
    if(!className){
        className = "rounded-xl w-full object-cover position-center"
    }
    return(
        <img className={className} src={`http://localhost:4000/uploads/${place.addedPhotos[index]}`} alt="No Image found" />
    )
}