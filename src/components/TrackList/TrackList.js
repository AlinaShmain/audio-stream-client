import React from 'react';

import './TrackList.css';

const TrackList = ({tracks, onTrackBtnClick}) => {
    return (
        <table className='tracks-tbl m-4 w-100'>
            <thead>
            <tr className='table-header'>
                <th width='30%'>Title</th>
                <th width='30%'>Artist</th>
                <th width='30%'>Album</th>
            </tr>
            </thead>
            <tbody className='table-body'>
                {tracks ?
                    tracks.map(({id, title, address, artist, album}, idx) => (
                        <tr key={idx} className='table-row' data-id={id} onClick={onTrackBtnClick}>
                            <td id='title'>{title}</td>
                            <td id='artist'>{artist}</td>
                            <td id='album'>{album}</td>
                        </tr>
                    )) : null
                }
            </tbody>
        </table>
    )
};

export default TrackList;