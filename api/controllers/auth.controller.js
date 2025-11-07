import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';


export const signup = async (req, res, next) => {
 const { username, email, password } = req.body;
 const hashedPassword = await bcryptjs.hash(password, 10);
 const newUser = new User({ username, email, password: hashedPassword });
 try {
  await newUser.save();
  return res.status(201).json({ message: 'User registered successfully!' });
 } catch (error) {
    next(error);
 }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await bcryptjs.compare(password, user.password))) {
    return res.json({ message: 'User logged in!' });
  } else {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
};


