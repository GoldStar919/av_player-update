import React, {useEffect, useState} from "react";

import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

export default function Audio(props) {

    const{urlprop = "NoAudio"} = props;

    const [url, setURL] = useState("NoAudio");
    const [playState, setplayState] = useState(false);

    useEffect(() => {
        setURL(urlprop);
    }, [urlprop]);

    return (
        <div className={(playState === false) ? 'border rounded border-solid border-4 border-zinc-600 p-1' : 'border rounded border-solid border-4 border-emerald-300 p-1'}>
            <h1 className="p-4">Play Audio</h1>

            <AudioPlayer
                style={{"backgroundColor": "#1e1e1e"}}
                autoPlay
                src={urlprop}
                onPlay={e => setplayState(true)}
                onEnded={e => setplayState(false)}
                onPause={e => setplayState(false)}
                onReady={e => setplayState(false)}
                // other props here
            />
        </div>
    );
}