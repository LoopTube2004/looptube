// Reference: https://www.reddit.com/r/learnprogramming/comments/7ioxra/how_to_check_if_a_youtube_link_is_valid_or_not/
import axios from 'axios'

export async function validateYouTubeLink(youtube_url) {
  const regex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
  if (!regex.test(youtube_url)) {
    console.log("Not a Youtube link")
    return false;
  }
  const url = `https://www.youtube.com/oembed?format=json&url=${youtube_url}`;

  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      console.log("Valid Youtube link")
      return true
    } else {
      console.log("Not a valid Youtube link")
      return false
    }
  } catch (error) {
    console.log(`Not a valid youtube link ${error}`)
    return false
  }
}

