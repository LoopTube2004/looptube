
import { FetchYoutubeData } from '../scripts/FetchYoutubeData.js'
import { validateYouTubeLink } from '../scripts/YoutubeValidator.js';

document.getElementById('videoForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const url = document.getElementById('youtubeUrl').value;
    const startHour = parseInt(document.getElementById('startHour').value || 0);
    const startMinute = parseInt(document.getElementById('startMinute').value || 0);
    const startSecond = parseInt(document.getElementById('startSecond').value || 0);
    const endHour = parseInt(document.getElementById('endHour').value || 0);
    const endMinute = parseInt(document.getElementById('endMinute').value || 0);
    const endSecond = parseInt(document.getElementById('endSecond').value || 0);
    const customize = parseInt(document.getElementById('customize').value || 0);
    const errors = [];

    // Placeholder for your validateYouTubeLink function
    const isValidUrl = await validateYouTubeLink(url); // Simulate with actual AJAX call

    if (!isValidUrl) {
        errors.push("The URL is not a valid YouTube link.");
    } else {
        // Placeholder for your FetchYoutubeData function
        const youtubeLength = await FetchYoutubeData(url); // Simulate response

        if (endHour * 3600 + endMinute * 60 + endSecond < startHour * 3600 + startMinute * 60 + startSecond) {
            errors.push("End time should be greater than start time.");
        }

        if (endHour * 3600 + endMinute * 60 + endSecond > youtubeLength || startHour * 3600 + startMinute * 60 + startSecond > youtubeLength) {
            errors.push("Start time or end time exceeds the video length.");
        }
    }

    const errorContainer = document.getElementById('errorContainer');
    errorContainer.innerHTML = '';

    if (errors.length > 0) {
        errors.forEach(function(error) {
            const p = document.createElement('p');
            p.classList.add('error');
            p.textContent = error;
            errorContainer.appendChild(p);
        });
    } else {
        // Proceed with video rendering logic or other actions 
        //Currently is open youtube link, then we move to the looptube.com deployed websit
        console.log('No errors. Proceed with form submission:', url, startHour, startMinute, startSecond, endHour, endMinute, endSecond, customize);
        window.open(url, '_blank');
    }

});