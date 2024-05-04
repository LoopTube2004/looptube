export const FetchYoutubeData = async (url) => { // Fetch YouTube data
    var apiKey = ''
    fetch('https://9d6ss4k11k.execute-api.us-east-2.amazonaws.com/default/looptube_yt_api', {
        method: 'post',
    })
    .then(response => response.text())
    .then(data => {
        apiKey = data;
    });
    const videoId = getIdYoutubeVideo(url)
    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=contentDetails&key=${apiKey}`
    
    let youtubeLength = 0 
    try {
        const response = await fetch(apiUrl)
        if (response.ok) {
            const data = await response.json()
            const time = data.items[0].contentDetails.duration
            youtubeLength = iso8601DurationToSeconds(time)
        } else {
            throw new Error('Failed to fetch data from YouTube API')
        }
    } catch (error) {
        console.log("There is error with FetchYoutubeData.js")
        console.log(error)
        return { error1: " Cannot fetch youtube video " }
    }

    return youtubeLength
}

export function iso8601DurationToSeconds(duration) { // Convert time ISO 8601 format to seconds
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

export function getIdYoutubeVideo(url) { // Get ID of YouTube URL
    const splitted = url.split("v=")[1];
    const params = splitted.indexOf("&") > -1 ? splitted.split("&") : [splitted];
    return params[0];
}
