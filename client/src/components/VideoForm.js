import styles from "./VideoForm.module.css";
import { useState } from "react";
import { FetchYoutubeData } from "../scripts/FetchYoutubeData";
import { validateYouTubeLink } from "../scripts/YoutubeValidator";

const VideoForm = () => {
    const [url, setUrl] = useState("");
    const [startHour, setStartHour] = useState(0);
    const [startMinute, setStartMinute] = useState(0);
    const [startSecond, setStartSecond] = useState(0);
    const [endHour, setEndHour] = useState(0);
    const [endMinute, setEndMinute] = useState(0);
    const [endSecond, setEndSecond] = useState(0);
    const [customize, setCustomize] = useState(0);
    const [errors, setErrors] = useState([]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        let tempErrors = []; // Temporary array to collect error messages
    
        var startTime = startHour * 3600 + startMinute * 60 + startSecond;
        var endTime = endHour * 3600 + endMinute * 60 + endSecond;
        
        const checkValidUrl = await validateYouTubeLink(url)
        console.log("CheckValidUrl is", checkValidUrl)
        if (!checkValidUrl) {
            tempErrors.push("The URL is not a valid YouTube link.");
        } else {
            //Only fetch if valid url
            const youtubeLength = await FetchYoutubeData(url) 
            // Collecting error messages based on different conditions
            if (!url) {
                tempErrors.push("Your URL is missing.")
            }
            if (endTime < startTime) {
                tempErrors.push("End time should be greater than start time.")
            }
            if (endTime > youtubeLength || startTime > youtubeLength) {
                tempErrors.push("Start time or end time exceeds the video length.")
            }
        }
    
        // Update the error state with all collected error messages
        setErrors(tempErrors)
    
        // Check if there are any errors before proceeding
        if (tempErrors.length === 0) {
            //send those data into createIframefunction
        } else {
            // Errors are present, handle them appropriately
            console.log("Errors are:", tempErrors)
        }
    } 

    return (
        <form className={styles["video-form"]} onSubmit = {handleSubmit} >
            <h1>LoopTube</h1>
            <h3>Fill your form</h3>

            <div className={styles["input-group"]}>
                {/* We need to group <label> and <input> in same line        */}
                <label>Youtube Url</label>
                <input
                    type="text"
                    onChange={(e) => setUrl(e.target.value)}
                    value={url}
                    placeholder = "Enter your youtube url here..."
                />
            </div>
            <div className={styles["time-input-group"]}>
                <label>Start (hh:mm:ss)</label>
                <input
                    type = "number"
                    min = "0" //So the value of input cannot be negative
                    step = "1" //only accept integer
                    onChange = {(e) => setStartHour(e.target.value)}
                    value = {startHour}
                />
                <span>:</span>
                <input
                    type = "number"
                    min = "0"
                    step = "1"
                    onChange = {(e) => setStartMinute(e.target.value)}
                    value = { startMinute }
                />
                <span>:</span>
                <input
                    type = "number"
                    min = "0"
                    step = "1"
                    onChange={(e) => setStartSecond(e.target.value)}
                    value={ startSecond }
                />
            </div>
            <div className={styles["time-input-group"]}>
                <label>End (hh:mm:ss)</label>
                <input
                    type = "number"
                    min = "0"
                    step = "1"
                    onChange={(e) => setEndHour(e.target.value)}
                    value={endHour}
                />
                <span>:</span>
                <input
                    type = "number"
                    min = "0"
                    step = "1"
                    onChange={(e) => setEndMinute(e.target.value)}
                    value={ endMinute }
                />
                <span>:</span>
                <input
                    type="number"
                    min = "0"
                    step = "1"
                    onChange={(e) => setEndSecond(e.target.value)}
                    value={ endSecond }
                />
            </div>
            <div className={styles["input-group"]}>
                <label>Customize</label>
                <input
                    type = "number"
                    min = "0"
                    step = "1"
                    onChange={(e) => setCustomize(e.target.value)}
                    value={ customize }
                />
            </div>

            <div className={styles["button-container"]}>
                <button type="submit">Submit</button>
            </div>

            {errors.length > 0 && (
                <div>
                    {errors.map((error, index) => (
                    <p key={index}>{error}</p>
                    ))}
                </div>
            )}

        </form>
    );
};

export default VideoForm;
