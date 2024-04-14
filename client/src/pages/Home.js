import VideoForm from "../components/VideoForm";
import IFrame from "../components/IFrame";
import styles from "./Home.module.css";
import { useState } from "react";
import { FetchYoutubeData, getIdYoutubeVideo } from "../scripts/FetchYoutubeData";
import { validateYouTubeLink } from "../scripts/YoutubeValidator";
const Home = () => {
    const [url, setUrl] = useState("");
    const [startHour, setStartHour] = useState(0);
    const [startMinute, setStartMinute] = useState(0);
    const [startSecond, setStartSecond] = useState(0);
    const [endHour, setEndHour] = useState(0);
    const [endMinute, setEndMinute] = useState(0);
    const [endSecond, setEndSecond] = useState(0);
    const [customize, setCustomize] = useState(0);
    const [errors, setErrors] = useState([]);
    const [noErrors, setNoErrors] = useState(false);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      let tempErrors = []; // Temporary array to collect error messages
  
      //we need + before startMinute to convert it to a number, now it is a string instead
      var startTime = startHour * 3600 + (+startMinute) * 60 + (+startSecond);
      var endTime = endHour * 3600 + (+endMinute) * 60 + (+endSecond);
  
      //console.log(startTime + " " + endTime)
  
      const checkValidUrl = await validateYouTubeLink(url);
  
      if (!checkValidUrl) {
        tempErrors.push("The URL is not a valid YouTube link.");
      }
  
      const youtubeLength = await FetchYoutubeData(url);
  
      // Collecting error messages based on different conditions
      if (!url) {
        tempErrors.push("Your URL is missing.");
      }
      if (endTime < startTime) {
        //console.log("End time should be greater than start time.")
        tempErrors.push("End time should be greater than start time.");
      }
      if (endTime > youtubeLength || startTime > youtubeLength) {
        tempErrors.push("Start time or end time exceeds the video length.");
      }
  
      // Update the error state with all collected error messages
      setErrors(tempErrors);
  
      // Check if there are any errors before proceeding
      if (tempErrors.length === 0) {
        // Set noError state to false. This will help indicating whether we render a video later.
        setNoErrors(true);
        console.log(url, startHour, startMinute, startSecond, endHour, endMinute, endSecond, customize)
      } else {
        // Errors are present, handle them appropriately
        console.log("Errors are:", tempErrors);
      }
    };

  return (
    <div className={styles.home}>
      <VideoForm 
        url={url}
        setUrl={setUrl}
        startHour={startHour}
        setStartHour={setStartHour}
        startMinute={startMinute}
        setStartMinute={setStartMinute}
        startSecond={startSecond}
        setStartSecond={setStartSecond}
        endHour={endHour}
        setEndHour={setEndHour}
        endMinute={endMinute}
        setEndMinute={setEndMinute}
        endSecond={endSecond}
        setEndSecond={setEndSecond}
        customize={customize}
        setCustomize={setCustomize}
        handleSubmit={handleSubmit}
        errors={errors}
      />
      {noErrors && (
        <IFrame
          youtubeID={getIdYoutubeVideo(url)}
          start={startHour * 3600 + (+startMinute) * 60 + (+startSecond)}
          end={endHour * 3600 + (+endMinute) * 60 + (+endSecond)}
          time={customize}
        />     
      )}
    </div>
  );
};

export default Home;
