import {GET_ANIMAL_BY_ID} from '.';
import axios from 'axios';



const getmascotabyid =(id) => {   
    
    
    return async function (dispatch) {
        try {
            
            let result = await axios.get(`/animales/${id}`); 
            dispatch({ type: GET_ANIMAL_BY_ID, payload: result.data })                                                                                                      
                  
            
        } catch (error) {
            return alert (error)            
        }        
    }
    
}

export default getmascotabyid;
