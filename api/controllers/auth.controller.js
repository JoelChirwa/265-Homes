
import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';


export const signup = async (req, res, next) => {
	try {
		const { username, email, password } = req.body || {};

		if (!username || !email || !password) {
			return next(errorHandler(400, 'username, email and password are required'));
		}

    // Check if email or username already exists and return a specific message
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return next(errorHandler(409, 'User with that email already exists'));
    }
    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return next(errorHandler(409, 'User with that username already exists'));
    }

		// Hash password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const user = new User({ username, email, password: hashedPassword });
		await user.save();

		const userObj = user.toObject();
		delete userObj.password;

		return res.status(201).json({ success: true, user: userObj });
	} catch (err) {
		// If error has a statusCode already, forward it; otherwise return 500
		return next(errorHandler(err.statusCode || 500, err.message || 'Failed to create user'));
	}
};

export const signin = async (req, res, next) => {
	try {
		const { email, password } = req.body || {};

		if (!email || !password) {
			return next(errorHandler(400, 'email and password are required'));
		}

		const user = await User.findOne({ email });
		if (!user) {
			return next(errorHandler(404, 'User not found'));
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return next(errorHandler(401, 'Invalid credentials'));
		}

		const userObj = user.toObject();
		delete userObj.password;

		// Sign token with expiration
		const token = jwt.sign(
			{ userId: user._id, email: user.email },
			process.env.JWT_SECRET || 'change-me',
			{ expiresIn: '7d' }
		);

		// Cookie options - secure in production
		const cookieOptions = {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			maxAge: 7 * 24 * 60 * 60 * 1000
		};

		const { password: pwd, ...userWithoutPassword } = userObj;
		return res
			.cookie('token', token, cookieOptions)
			.status(200)
			.json({ success: true, user: userWithoutPassword });

	} catch (err) {
		return next(errorHandler(err.statusCode || 500, err.message || 'Failed to login'));
	}
};


