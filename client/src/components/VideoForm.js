import styles from './VideoForm.module.css';
import { useState } from 'react';

const VideoForm = () => {
    const [url, setUrl] = useState('');
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(0);
    const [customize, setCustomize] = useState(0);
    const [error, setError] = useState(null);

    return (
        <form className={styles['video-form']}>
            <h1>LoopTube</h1>
            <h3>Fill your form</h3>

            <div className={styles['input-group']}>  {/* We need to group <label> and <input> in same line  */}
                <label>Youtube Url</label>
                <input 
                    type="text"
                    onChange={(e) => setUrl(e.target.value)}
                    value={url}/>
            </div>
            <div className={styles['input-group']}>
                <label>Start</label>
                <input 
                    type="number"
                    onChange={(e) => setStart(e.target.value)}
                    value={start}/>
            </div>
            <div className={styles['input-group']}>
                <label>End</label>
                <input 
                    type="number"
                    onChange={(e) => setEnd(e.target.value)}
                    value={end}/>
            </div>
            <div className={styles['input-group']}>
                <label>Customize</label>
                <input 
                    type="number"
                    onChange={(e) => setCustomize(e.target.value)}
                    value={customize}/>
            </div>

            <div className={styles['button-container']}>
                <button type="submit">Submit</button>
            </div>
        </form>
    );
};

export default VideoForm;
