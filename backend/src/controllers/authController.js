const { verifyGoogleToken } = require('../config/oauth');
const { generateToken } = require('../utils/jwtHelper');
const User = require('../models/User');

function normalizeGoogleUser(payload) {
  const email = (payload.email || '').toLowerCase().trim();
  const name =
    (payload.name && String(payload.name).trim()) ||
    (email ? email.split('@')[0] : 'User');
  return {
    sub: payload.sub,
    email,
    name,
    picture: payload.picture || '',
  };
}

exports.googleLogin = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token || typeof token !== 'string') {
      return res.status(400).json({ message: 'Google credential token is required' });
    }

    const raw = await verifyGoogleToken(token);
    const googleUser = normalizeGoogleUser(raw);

    if (!googleUser.sub || !googleUser.email) {
      return res.status(400).json({ message: 'Invalid Google account: missing id or email' });
    }

    let user = await User.findOne({ googleId: googleUser.sub });

    if (!user) {
      try {
        user = await User.create({
          googleId: googleUser.sub,
          email: googleUser.email,
          name: googleUser.name,
          profilePicture: googleUser.picture,
          lastLogin: new Date(),
        });
      } catch (err) {
        if (err.code === 11000) {
          const field = err.keyPattern?.email ? 'email' : 'googleId';
          return res.status(409).json({
            message:
              field === 'email'
                ? 'An account with this email already exists with a different sign-in method.'
                : 'This Google account is already linked.',
          });
        }
        throw err;
      }
    } else {
      user.lastLogin = new Date();
      user.name = googleUser.name;
      user.profilePicture = googleUser.picture;
      if (googleUser.email && user.email !== googleUser.email) {
        const taken = await User.findOne({
          email: googleUser.email,
          _id: { $ne: user._id },
        });
        if (!taken) user.email = googleUser.email;
      }
      await user.save();
    }

    const jwtToken = generateToken(user._id);

    res.json({
      token: jwtToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
        isPremium: user.isPremium,
      },
    });
  } catch (error) {
    const message = error.message || 'Google sign-in failed';
    res.status(400).json({ message });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-googleId');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateMe = async (req, res) => {
  try {
    const { name, bio, location, isStudent, studentCollegeName } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (name !== undefined) {
      const n = String(name).trim();
      if (!n) {
        return res.status(400).json({ message: 'Name cannot be empty' });
      }
      user.name = n;
    }

    if (bio !== undefined) {
      user.bio = String(bio).trim().slice(0, 500);
    }

    if (location !== undefined && typeof location === 'object' && location !== null) {
      user.location = user.location || {};
      if (location.city !== undefined) {
        user.location.city = String(location.city).trim();
      }
      if (location.state !== undefined) {
        user.location.state = String(location.state).trim();
      }
    }

    if (isStudent !== undefined) {
      user.isStudent = Boolean(isStudent);
    }
    if (studentCollegeName !== undefined && user.isStudent) {
      user.studentCollegeName = String(studentCollegeName).trim().slice(0, 200);
    }
    if (!user.isStudent) {
      user.studentCollegeName = '';
    }

    await user.save();

    const fresh = await User.findById(req.user.id).select('-googleId');
    res.json(fresh);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
