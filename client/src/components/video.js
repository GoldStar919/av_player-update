import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";

export default function Video(props) {
  const { urlprop = "NoVideo" } = props;

  const [url, setURL] = useState("NoVideo");
  const [playState, setplayState] = useState(false);

  useEffect(() => {
    setURL(urlprop);
  }, [urlprop]);
  return (
    <div
      className={
        playState === false
          ? "player-wrapper border-4 border-zinc-600 h-1/2 mb-1"
          : "player-wrapper border-4 border-emerald-300 h-1/2 mb-1"
      }
    >
      <ReactPlayer
        className="react-player w-full md:max-h-screen"
        url={urlprop}
        width={"100%"}
        // height={'570px'}
        controls={props.controls}
        onPlay={(e) => setplayState(true)}
        onEnded={(e) => setplayState(false)}
        onPause={(e) => setplayState(false)}
        onReady={(e) => setplayState(false)}
      />
    </div>
  );
}
