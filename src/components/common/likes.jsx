import React from 'react';
import 'font-awesome/css/font-awesome.min.css';

const Likes = ({ liked, onLike }) => {
    let classes = 'fa'
    if (!liked) classes += 'r fa-heart'
    classes += ' fa-heart'

    return (
      <i className={ classes } onClick={ onLike }></i>
    )
}

export default Likes
