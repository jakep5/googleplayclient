import React from 'react';
import './AppEntry.css';

export default function AppEntry(props) {
    return (
        <div className="appEntry">
            <h2>{props.App}</h2>
            <div className="appRating">Rating: {props.Rating} stars</div>
            <div className="appSize">Size: {props.Size}</div>
            <div className="appGenre">Genres: {props.Genres}</div>
        </div>
    )
}

