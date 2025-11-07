import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';


export const signup = async (req, res) => {
 const { username, email, password } = req.body;
 const hashedPassword = await bcryptjs.hash(password, 10);
 const newUser = new User({ username, email, password: hashedPassword });
 try {
   await newUser.save();
   res.status(201).send({ message: 'User registered successfully!' });
 } catch (error) {
   res.status(500).send(error.message);
 }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await bcryptjs.compare(password, user.password))) {
    res.send('User logged in!');
  } else {
    res.status(401).send('Invalid credentials');
  }
};


