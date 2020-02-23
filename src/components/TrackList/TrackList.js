import React from 'react';
import {Track} from '../Track/Track'

const list = [
    {
        'album': 'Strong',
        'artist': 'Britney Spears ',
        'song': 'Oops!... I Did It Again'
    },
    {
        'album': 'So Emotional',
        'artist': 'Whitney Houston',
        'song': 'Whitney'
    },
    {
        'album': `It's Not Right But It's Okay`,
        'artist': 'Whitney Houston ',
        'song': 'My Love Is Your Love'
    }
]
export class TrackList extends React.Component {
    render(){
        return (
        <div className="TrackList">
            <!-- You will add a map method that renders a set of Track components  -->
        </div>
        )

    }
}