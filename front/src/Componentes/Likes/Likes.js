import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getLikesFromBackend from '../../Actions/getlikes';
import "../Likes/Likes.css";
import Toast from 'light-toast';


const LikeButton = () => {
  const dispatch = useDispatch();
  const {isAuthenticated} = useAuth0()
  const [liked, setLiked] = useState(false);
  let likes2 = useSelector((state) => state.likes);
  
  
  useEffect(() => {
    dispatch(getLikesFromBackend())
  }, [])
  
  const totalLikes = likes2.reduce((acc, { likes }) => acc + likes, 0);
  
  let [numLikes, setNumLikes] = useState(0);

  const [hasLiked, setHasLiked] = useState(false);

function handleClick(e) {
  e.preventDefault();
  if (!isAuthenticated) {
    Toast.fail("Debes estar logueado para dejar un Like", 1000, () => {});
  } else if (hasLiked) {
    Toast.fail("Ya has dado un like a esta página", 1000, () => {});
  } else {
    setLiked(!liked);
    setHasLiked(true);
    setNumLikes(numLikes + 1);
    saveLikeToBackend();
  }
}

const saveLikeToBackend = () => {
    axios.post("/likes", {
        likes: liked
    });
};

  return (
    <>    
    <div className="corazon">
    <div className={liked ? 'boton-liked' : 'boton-sin-liked'} onClick={handleClick}/>
    <div className="likes">{totalLikes + numLikes} Me gusta</div>
    </div>
  <div className="daleclick">(Si te gusta la página hace "Doble Click" para dejarnos un Like)</div>
    </>

  );
};

export default LikeButton;

