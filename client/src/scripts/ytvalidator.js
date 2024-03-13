// Reference: https://www.reddit.com/r/learnprogramming/comments/7ioxra/how_to_check_if_a_youtube_link_is_valid_or_not/

const axios = require("axios");

async function validateYouTubeLink(youtube_url) {
  const regex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
  if (!regex.test(youtube_url)) {
    console.log("Not a Youtube link");
    return;
  }
  const url = `https://www.youtube.com/oembed?format=json&url=${youtube_url}`;

  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      console.log("Valid Youtube link");
    } else {
      console.log("Not a valid Youtube link");
    }
  } catch (error) {
    console.log(`Not a valid youtube link ${error}`);
  }
}

// Example usage
const test = [
  "https://www.youtube.com/watch?v=1vVvDdBnCos", //ok
  "https://www.youtube.com/watch?v=LAraqZvY6KY", //OK
  "https://www.youtube.com/watch?v=1", //not ok
  "https://www.youtube.com/watch?v=1vVvDdBnCoa", //not ok
  "https://www.youtube.com/watch?v=1vVDvdBnCos", //not ok
  "https://www.youtube.com/watch?v=1vVDdBnCos", //not ok
  "https://www.facebook.com/", //not ok
];

async function testYouTubeLinks(links) {
  for (let i = 0; i < links.length; i++) {
    await validateYouTubeLink(links[i]);
  }
}

testYouTubeLinks(test);
