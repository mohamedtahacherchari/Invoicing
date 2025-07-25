const Users = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const sendMail = require('./sendMail')
const sendMail2 = require('./sendMail2')
const generateToken = require('../utils/generateToken')
const { CLIENT_URL } = process.env 
const session = require('express-session');

const userController = {
    register: async (req, res) => {
        try {
            const { firstName, lastName, email, password } = req.body

            if (!email || !password || !firstName || !lastName)
                return res.status(400).json({ msg: "Please fill in all fields." })

            if (!validateEmail(email))
                return res.status(400).json({ msg: "Invalid email." })

            const user = await Users.findOne({ email })
            if (user) return res.status(400).json({ msg: "This email already exists." })

            if (password.length < 6)
                return res.status(400).json({ msg: "Password must be at least 6 characters." })

            const passwordHash = await bcrypt.hash(password, 12)

            const newUser = {
                firstName, lastName, email, password: passwordHash
            }

            const activation_token = createActivationToken(newUser)

            const url = `${CLIENT_URL}/active/${activation_token}`

            sendMail(email, url, firstName, lastName)

            // Stockez les informations de l'utilisateur dans la session
            req.session.user = newUser;

            res.json({ msg: "Please activate mail to start" })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }

    },
    activateEmail: async (req, res) => {
        try {
            const { activation_token } = req.body
            const user = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN_SECRET)

            const { firstName, lastName, email, password } = user

            const check = await Users.findOne({ email })
            if (check) return res.status(400).json({ msg: "This email already exists." })

            const newUser = new Users({
                firstName, lastName, email, password
            })

            await newUser.save()

            res.json({ msg: "Account has been activated" })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
               const user = await Users.findOne({ email });
            if (user.accountLocked && user.lockedUntil && new Date() < new Date(user.lockedUntil)) {
                return res.status(400).json({ msg: "Account is locked. Please contact support." });
            }const isMatch = await bcrypt.compare(password, user.password);
                   if (!isMatch) {
                user.failedLoginAttempts += 1;
                await user.save();
                if (user.failedLoginAttempts >= 5) {
                    user.accountLocked = true;
                    user.lockedUntil = new Date(Date.now() + (24 * 60 * 60 * 1000)); 
                    await user.save();
                    return res.status(400).json({ msg: "Account is locked. Please contact support." });}
                    return res.status(400).json({ msg: "Password is incorrect." });}
                    user.failedLoginAttempts = 0;
                    await user.save();
                    req.session.user = {
                   _id: user._id,
                   firstName: user.firstName,
                   email: user.email,
                   role: user.role,
                   avatar: user.avatar,
                   lockedUntil: user.lockedUntil};
                   res.json({
                   _id: user._id,
                   firstName: user.firstName,
                   email: user.email,
                   role: user.role,
                   avatar: user.avatar,
                   token: createRefreshToken1(user._id),
                   lockedUntil: user.lockedUntil});
        }catch (err) {
        return res.status(500).json({ msg: err.message });}
    },
    storeSession :(req,res) => {
        if (req.session && req.body.userInfo) {
            // Stockez les informations de l'utilisateur dans la session
            req.session.userInfo = req.body.userInfo;
            res.status(200).json({ message: 'Session stored successfully' });
        } else {
            res.status(400).json({ error: 'Failed to store session' });
        }
    },
    getAccessToken: (req, res) => {
        try {
            // Vérifiez si l'utilisateur est connecté en vérifiant s'il y a une session active
            if (!req.session.user) return res.status(400).json({ msg: "Please login now!" });

            // Générez un nouvel access token basé sur l'ID de l'utilisateur stocké dans la session
            const access_token = createAccessToken({ id: req.session.user._id });

            res.json({ access_token });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    // Les autres méthodes restent inchangées...
    forgotPassword: async (req, res) => {
        try {
            const {email} = req.body
            const user = await Users.findOne({email})
            if(!user) return res.status(400).json({msg: "This email does not exist."})

            const access_token = createAccessToken({id: user._id})
            const url = `${CLIENT_URL}/api/${access_token}`
            sendMail2(email,url,"Reset your password")
            res.json({msg: "Re-send the password, please check your email."})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    resetPassword: async (req, res) => {
        try {
            const {password} = req.body

            const passwordHash = await bcrypt.hash(password, 12)

            await Users.findOneAndUpdate({_id: req.user.id}, {
                password: passwordHash
            })

            res.json({msg: "Password successfully changed!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getUserInfor: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id).select('-password')

            res.json(user)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getUsersAllInfor: async (req, res) => {
        try {
            const users = await Users.find().select('-password')

            res.json(users)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie('refreshtoken', {path: '/api/user/refresh_token'})
            return res.json({msg: "Logged out."})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
      updateUser: async (req, res) => {
        try {
            const {firstName, lastName, phoneNumber,password,email,avatar,accountLocked} = req.body
            const passwordHash = await bcrypt.hash(password, 12)
            await Users.findOneAndUpdate({_id: req.user.id}, {
                firstName, lastName, phoneNumber,avatar,accountLocked, password :passwordHash,email 
            })

            res.json({msg: "Update Success!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateUser2: async (req, res) => {
        try {
            const userId = req.params.id; // Récupérer l'ID de l'utilisateur à partir des paramètres de la requête
            const { firstName, lastName, phoneNumber, password, email, avatar, accountLocked } = req.body;
            const passwordHash = await bcrypt.hash(password, 12);
            await Users.findOneAndUpdate({ _id: userId }, {
                firstName, lastName, phoneNumber, avatar, password: passwordHash, email, accountLocked
            });
    
            res.json({ msg: "Update Success!" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
     updateUserAccountLocked : async (req, res) => {
        try {
            const userId = req.params.id;
            const { accountLocked } = req.body;
    
            await Users.findOneAndUpdate(
                { _id: userId },
                { accountLocked: accountLocked },
                { new: true }
            );
    
            res.json({ msg: "Update Success!" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
       updateAvatar: async (req, res) => {
        try {
            const {avatar} = req.body
            //const passwordHash = await bcrypt.hash(password, 12)
            await Users.findOneAndUpdate({_id: req.user.id}, {
                avatar
            })

            res.json({msg: "Update Success!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateUsersRole: async (req, res) => {
        try {
            const {role} = req.body

            await Users.findOneAndUpdate({_id: req.params.id}, {
                role
            })

            res.json({msg: "Update Success!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteUser: async (req, res) => {
        try {
            await Users.findByIdAndDelete(req.params.id)

            res.json({msg: "Deleted Success!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getUserInformation: async (req, res) => {
        try {

            const user = await Users.findById(req.params.id).select('-password')

            res.json(user)
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    loginGoogle: async (req, res) =>{
        res.status(201).json({ success: true, result: { id: 123, title: 'test room' } });
    },
    allUsers : async (req, res) => {
        const keyword = req.query.search
          ? {
              $or: [
                { firstName: { $regex: req.query.search, $options: "i" } },
                { email: { $regex: req.query.search, $options: "i" } },
              ],
            }
          : {};
      
        const users = await Users.find(keyword).find({ _id: { $ne: req.user._id } });
        res.send(users);       

      },
      allUser : async (req, res) => {
        const keyword = req.query.search
        console.log(keyword)    

      },

      
// @desc    Get user profile
// @route   GET user/profile
// @access  Private

 getUserProfile  :async (req, res) => {
    const user = await Users.findById(req.user.id)
  
    if (user) {
      res.json({
        _id: user._id,
        firstName: user.firstName,
        email: user.email,
        lastName : user.lastName,
        phoneNumber : user.phoneNumber,
        password : user.password

      })
    //  res.status(400).json({_id})



    } else {
      res.status(404)

      throw new Error('User not found')
    }
  },

    // @desc    Update user profile
// @route   PUT user/profile
// @access  Private
  updateUserProfile : async (req, res) => {
    const user = await Users.findById(req.user.id)
  
    if (user) {
      user.firstName = req.body.firstName || user.firstName
      user.email = req.body.email || user.email
      user.lastName = req.body.lastName || user.lastName
      user.phoneNumber = req.body.phoneNumber || user.phoneNumber
      user.avatar = req.body.avatar || user.avatar
      user.accountLocked= req.body.accountLocked || user.accountLocked

   //   const passwordHash = await bcrypt.hash(password, 12)

      if (req.body.password) {
        user.password = req.body.password
      }
  
      const updatedUser = await user.save()
  
      res.json({
        _id: updatedUser._id,
        firstName: updatedUser.firstName,
        email: updatedUser.email,   
        lastName : updatedUser.lastName,
        phoneNumber : updatedUser.phoneNumber,
        token: createActivationToken(updatedUser),

      })
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  }
      






};

const createActivationToken = (payload) => {
    return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, { expiresIn: '5m' });
} 

const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
}
const createRefreshToken1= (id) => {
    return jwt.sign({id}, process.env.REFRESH_TOKEN_SECRET,{expiresIn :'7d'});
}
const createRefreshToken= (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET)
}
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

module.exports = userController;
