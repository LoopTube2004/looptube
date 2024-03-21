
import axios from 'axios'


export const FetchYoutubeData = async (url) => {
    const apiKey = "AIzaSyCJH8x_L2mV6VDe1wTCl1q099d4QTyeWNw"
    const videoId = getIdYoutubeVideo(url)
    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=contentDetails&key=${apiKey}`
    
    let youtubeLength = 0 
    try {
        const response = await axios.get(apiUrl)
        const time = response.data.items[0].contentDetails.duration
        youtubeLength = iso8601DurationToSeconds(time)
    } catch (error) {
        console.log("There is error with FetchYoutubeData.js")
        console.log(error)
        return {error1: " Cannot fetch youtube video "}
    }

    return youtubeLength
}

export function iso8601DurationToSeconds(duration) {
    let hours = 0, minutes = 0, seconds = 0;

    // Extract hours
    const hoursMatch = duration.match(/(\d+)H/);
    if (hoursMatch) {
        hours = parseInt(hoursMatch[1], 10);
    }

    // Extract minutes
    const minutesMatch = duration.match(/(\d+)M/);
    if (minutesMatch) {
        minutes = parseInt(minutesMatch[1], 10);
    }

    // Extract seconds
    const secondsMatch = duration.match(/(\d+)S/);
    if (secondsMatch) {
        seconds = parseInt(secondsMatch[1], 10);
    }

    return hours * 3600 + minutes * 60 + seconds;
}

export function getIdYoutubeVideo(url) {
    const splitted = url.split("v=")[1]
    const params = splitted.split("&")
    const id =  params[0] 
    return id 
}


