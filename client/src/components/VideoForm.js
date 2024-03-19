import styles from "./VideoForm.module.css";
import { useState } from "react";


const VideoForm = () => {
    const [url, setUrl] = useState(null);
    const [startHour, setStartHour] = useState(0);
    const [startMinute, setStartMinute] = useState(0);
    const [startSecond, setStartSecond] = useState(0);
    const [endHour, setEndHour] = useState(0);
    const [endMinute, setEndMinute] = useState(0);
    const [endSecond, setEndSecond] = useState(0);
    const [customize, setCustomize] = useState(0);
    const [error, setError] = useState(null);


    const handleSubmit = (e) => {
    //     e.preventDefault();
    //     if (!ur)
        }

    return (
        <form className={styles["video-form"]} onSubmit = {handleSubmit} >
            <h1>LoopTube</h1>
            <h3>Fill your form</h3>

            <div className={styles["input-group"]}>
                {" "}
                {/* We need to group <label> and <input> in same line    */}
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
                    onChange = {(e) => setStartHour(e.target.value)}
                    value = {startHour}
                />
                <span>:</span>
                <input
                    type = "number"
                    min = "0"
                    onChange = {(e) => setStartMinute(e.target.value)}
                    value = { startMinute }
                />
                <span>:</span>
                <input
                    type = "number"
                    min = "0"
                    onChange={(e) => setStartSecond(e.target.value)}
                    value={ startSecond }
                />
            </div>
            <div className={styles["time-input-group"]}>
                <label>End (hh:mm:ss)</label>
                <input
                    type = "number"
                    min = "0"
                    onChange={(e) => setEndHour(e.target.value)}
                    value={endHour}
                />
                <span>:</span>
                <input
                    type = "number"
                    min = "0"
                    onChange={(e) => setEndMinute(e.target.value)}
                    value={ endMinute }
                />
                <span>:</span>
                <input
                    type="number"
                    min = "0"
                    onChange={(e) => setEndSecond(e.target.value)}
                    value={ endSecond }
                />
            </div>
            <div className={styles["input-group"]}>
                <label>Customize</label>
                <input
                    type = "number"
                    min = "0"
                    onChange={(e) => setCustomize(e.target.value)}
                    value={ customize } 
                />
            </div>

            <div className={styles["button-container"]}>
                <button type="submit">Submit</button>
            </div>
        </form>
    );
};

export default VideoForm;
