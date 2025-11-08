
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


export const google = async (req, res, next) => {
	try {
		// Debug log: show incoming request so we can confirm the server receives the OAuth POST
		console.log('POST /api/auth/google hit - body:', JSON.stringify(req.body));

		const { email, Name, photo } = req.body || {};
		const user = await User.findOne({ email });
		const secret = process.env.JWT_SECRET || 'change-me';
		const cookieOptions = {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			maxAge: 7 * 24 * 60 * 60 * 1000,
		};

		if (user) {
			const token = jwt.sign({ userId: user._id, email: user.email }, secret, { expiresIn: '7d' });
			const { password, ...userWithoutPassword } = user.toObject();
			return res
				.cookie('token', token, cookieOptions)
				.status(200)
				.json({ success: true, user: userWithoutPassword });
		} else {
			// Create a new user for Google sign-in
			const displayName = (Name || '').toString() || (email ? email.split('@')[0] : 'user');
			const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).toUpperCase().slice(-8);
			const hashedPassword = await bcrypt.hash(generatedPassword, 10);
			const usernameBase = displayName.split(" ").join("").toLowerCase();
			const newUser = new User({
				username: usernameBase + Math.random().toString(36).slice(-4),
				email,
				password: hashedPassword,
				avatar: photo || undefined,
			});

			await newUser.save();
			const token = jwt.sign({ userId: newUser._id, email: newUser.email }, secret, { expiresIn: '7d' });
			const { password, ...userWithoutPassword } = newUser.toObject();
			return res
				.cookie('token', token, cookieOptions)
				.status(201)
				.json({ success: true, user: userWithoutPassword });
		}
	} catch (error) {
		console.error('Google auth error:', error);
		return next(errorHandler(500, 'Failed to authenticate with Google'));
	}
}