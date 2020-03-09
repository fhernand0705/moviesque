import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

const Likes = ({ liked, onLike }) => {

    function renderHeart() {
      if (!liked) {
        return <FontAwesomeIcon icon={faHeart} onClick={ onLike }/>
      }
      return <i className='fa fa-heart' onClick={ onLike }></i>
    }

    return (
      renderHeart()
    )
}




export default Likes
