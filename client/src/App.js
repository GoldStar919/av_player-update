import React, { useEffect, useState } from "react";

import moment from "moment";

// We use Route in order to define the different routes of our application
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getAllChannels, getAllFiles } from "./actions";
import Audio from "./components/audio";
import BasicSelect from "./components/basicselect";
import DataGridDemo from "./components/datagriddemo";
import DatePickers from "./components/datepicker";
import RadioButton from "./components/radiobutton";
import Video from "./components/video";

const color = "#ffffff";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  components: {
    MuiIconButton: {
      styleOverrides: {
        sizeMedium: {
          color,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color,
        },
      },
    },
  },
});

export default function App() {
  const [adType, setADType] = useState("FULL_RECORDING"); //ads - full recording
  const [medType, setMEDType] = useState("video"); //video - audio
  const [date, setDate] = useState(moment(new Date()));
  const [channel, setChannel] = useState();
  const [videoURL, setVideoURL] = useState("NoVideo");
  const [logoImgURL, setLogoImgURL] = useState("NoLogoImg");
  const [textURL, setTextURL] = useState("");
  const [textContent, setTextContent] = useState("NoContent");
  const [audioURL, setAudioURL] = useState("NoAudio");

  const [gridData, setGridData] = useState([]);
  const [channellist, setChannelList] = useState([]);

  const [showType, setShowType] = useState(true);
  useEffect(() => {
    loadChannelData();
    // loadFileData();
  }, []);

  const loadChannelData = async () => {
    // const channeldata = await getAllChannels(adType, medType);
    var configFilePath = "source/" + medType + "/" + adType + "/config.txt";
    fetch(configFilePath)
      .then(function (response) {
        return response.text();
      })
      .then(function (data) {
        var resDataList = data.split("\n");
        var channelDataList = [];
        for (var i = 0; i < resDataList.length; i++) {
          channelDataList.push(resDataList[i].replace("\r", ""));
        }
        setChannelList(channelDataList);
      });
  };

  const loadFileData = async () => {
    if (channel === "Empty" || channel === undefined || channel === "") return;
    const fileNameData = await getAllFiles(adType, medType, channel);
    var filedatalist = fileNameData.file;

    if (filedatalist.length < 1) {
      setGridData([]);
      return;
    }
    var valueDate = "";
    if (date._isAMomentObject) {
      valueDate = date.format("YYYY.MM.DD");
    } else {
      valueDate = date;
    }

    var tempGridData = [];

    var logoInfFilePath = "source/" + medType + "/" + adType + "/logo.csv";
    fetch(logoInfFilePath)
      .then(function (response) {
        return response.text();
      })
      .then(function (data) {
        var resDataList = data.split("\n");

        for (var i = 0; i < filedatalist.length; i++) {
          if (
            filedatalist[i].path.split("/")[3].split(".")[1] +
              filedatalist[i].path.split("/")[3].split(".")[2] +
              filedatalist[i].path.split("/")[3].split(".")[3] ===
            valueDate.split(".")[0] +
              valueDate.split(".")[1] +
              valueDate.split(".")[2]
          ) {
            var filename = "";
            for (
              var a = 0;
              a < filedatalist[i].path.split("/")[3].split(".").length;
              a++
            ) {
              filename += filedatalist[i].path.split("/")[3].split(".")[a];
              if (
                a <
                filedatalist[i].path.split("/")[3].split(".").length - 1
              ) {
                filename += ".";
              }
            }

            var logoData = [];
            var textPath = "";
            var tempName = filedatalist[i].path.split("/")[3];
            for (var j = 1; j < resDataList.length - 1; j++) {
              if (
                resDataList[j].split(",")[0] +
                  "." +
                  resDataList[j].split(",")[1] ===
                tempName
              ) {
                logoData.push({
                  timestamp: resDataList[j].split(",")[3],
                  path: resDataList[j].split(",")[4],
                });
                textPath = resDataList[j].split(",")[5].replace("\r", "");
              }
            }

            tempGridData.push({
              filename: filename,
              duration: filedatalist[i].duration,
              filepath: filedatalist[i].path,
              logopath:
                logoData === "undefined" || logoData.length === 0
                  ? []
                  : logoData,
              textpath:
                textPath === undefined || textPath === "" ? "" : textPath,
            });
          }
        }
        setGridData(tempGridData);
      });
  };

  useEffect(() => {
    if (channellist.length > 0) {
      setChannel(channellist[0]);
    } else {
      // setChannel("");
    }
    setVideoURL("NoVideo");
    setLogoImgURL("NoLogoImg");
    setTextURL("");
    setAudioURL("NoAudio");
  }, [channellist]);
  // AD / FULL_RECORDING
  useEffect(() => {
    loadChannelData();
    setVideoURL("NoVideo");
    setLogoImgURL("NoLogoImg");
    setTextURL("");
    setAudioURL("NoAudio");
  }, [adType]);

  // VIDEO / AUDIO
  useEffect(() => {
    loadChannelData();
    if (medType === "video") {
      setShowType(true);
    }
    if (medType === "audio") {
      setShowType(false);
    }
    setVideoURL("NoVideo");
    setLogoImgURL("NoLogoImg");
    setTextURL("");
    setAudioURL("NoAudio");
  }, [medType]);

  useEffect(() => {
    loadFileData();
    setVideoURL("NoVideo");
    setLogoImgURL("NoLogoImg");
    setTextURL("");
    setAudioURL("NoAudio");
  }, [channel, date]);

  useEffect(() => {}, [gridData]);

  useEffect(() => {}, [videoURL]);

  useEffect(() => {}, [audioURL]);

  useEffect(() => {}, [logoImgURL]);

  useEffect(() => {
    if (textURL) {
      fetch(textURL)
        .then(function (response) {
          return response.text();
        })
        .then(function (data) {
          setTextContent(data);
        });
    } else {
      setTextContent("");
    }
  }, [textURL]);

  const AVType = {
    id: 1,
    title: "Vid / Aud",
    content: [
      { value: "video", label: "VIDEO" },
      { value: "audio", label: "AUDIO" },
    ],
    defaultIndex: 0,
  };
  const ADType = {
    id: 2,
    title: "AD / REC",
    content: [
      { value: "ADS", label: " ADS " },
      { value: "FULL_RECORDING", label: " FULL " },
    ],
    defaultIndex: 1,
  };
  // const ChannelType = {id: 1, title: "AirPlaySimple", channels: channellist, defaultIndex: 0 };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="w-full md:h-screen mx-auto shadow-md overflow-hidden p-8">
        <div className="block md:flex gap-4">
          <div className="block gap-4 md:w-3/5 md:shrink lg:w-2/3">
            <div className="w-full mb-5">
              <div className="md:shrink">
                <div className="bg-neutral-600 rounded-lg p-1 block lg:flex gap-2 mb-5">
                  <div className="block flex gap-1 lg:w-1/2 mb-1 mt-2">
                    <div
                      component="span"
                      className="w-1/2 text-center mb-1 text-white"
                    >
                      <RadioButton
                        indexes={AVType}
                        setRadioValue={setMEDType}
                      />
                    </div>
                    <div
                      component="span"
                      className="w-1/2 text-center mt-1 text-white"
                    >
                      <RadioButton indexes={ADType} setRadioValue={setADType} />
                    </div>
                  </div>
                  <div className="block flex gap-1 xl:w-1/2 mt-2">
                    <div
                      component="span"
                      className="w-1/2 !text-center mb-1 mr-2"
                    >
                      <DatePickers
                        className="text-white"
                        date={new Date()}
                        setDateValue={setDate}
                      />
                    </div>
                    <div
                      component="span"
                      className="w-1/2 !text-center mt-1 ml-2"
                    >
                      <BasicSelect
                        onChange={setChannel}
                        title="AirPlaySimple"
                        options={channellist}
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-neutral-600 rounded-lg p-2 mt-5">
                  <div>
                    <DataGridDemo
                      data={{
                        filelist: gridData,
                        adType: adType,
                        medType: medType,
                        date: date,
                        channelname: channel,
                      }}
                      setVURL={setVideoURL}
                      setLIURL={setLogoImgURL}
                      setTURL={setTextURL}
                      setAURL={setAudioURL}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full border-0 border-zinc-600 md:w-2/5 lg:w-1/3 sm:mt-2">
            <div className={showType ? "w-full mb-5" : "hidden"}>
              <Video urlprop={videoURL} controls={true} />
            </div>
            <div className={!showType ? "w-full mb-5" : "hidden"}>
              <Audio urlprop={audioURL} preloadType="auto" />
            </div>
            <div className="w-full h-40 mb-5 border-4 border-zinc-600">
              <img src={logoImgURL} className="h-full m-auto" />
            </div>
            <div className="bg-neutral-600 rounded-lg p-2 block lg:flex mt-5">
              <div className="w-full mt-1 rounded-lg cursor-text">
                <textarea
                  className="w-full !bg-gray h-52 resize-none rounded-lg p-3 text-white cursor-text"
                  style={{ backgroundColor: "#1e1e1e" }}
                  value={textContent}
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
