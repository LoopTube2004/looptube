
const jwt = require('jsonwebtoken')
const axios = require('axios')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.JWT_SECRET, { expiresIn: '3d' })
}

// login a user
const loginUser = async (req, res) => {
    const google_token = req.headers.authorization.split(" ")[1] 
    //How to decode google token
    try {
        const response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${google_token}`, { 
            headers: {
                Authorization: `Bearer ${google_token}`,
                Accept: 'application/json'
            }
        })
        const user_google_id = response.data.id 
        //dynamodb code
        //if dynamodb.find(user_good_id) == True:
        //    const user_id = dynamodb[user_good_id] 
        //else:
        //    dynamodb.insert([response.data - id, email, name, picture], auto-generated user_id)
        const jwt_token = createToken(user_google_id) //need to change to dynomodb_user_id
        const email = response.data.email
        res.status(200).json({token : jwt_token, email : email})

    } catch (err) {
        res.status(400).json({error: err.message})  
    }
}

// signup a user
const signupUser = async (req, res) => {
        res.status(200).json({mssg : "Sign up work fine"})
}

module.exports = { signupUser, loginUser }