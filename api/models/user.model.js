import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { 
    type: String,  
    required: true, 
    unique: true
},
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  avatar: { 
    type: String,
    default: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAAAMFBMVEXk5ueutLersbTFyczn6erJzc/g4uPa3d62u77T1tiorrG+w8Wyt7q5vsHQ09XN0NIdPYYiAAAEBElEQVR4nO2b3ZKsIAyEQSMgP/r+b7voqKOO4wgk4FbZN2fvzldNEwNkGHv06NGjR48ePXr06FGKAIAxIcT01w0EINrGGDfI1E3LinN5IMMrL/7S+GfdioJcIGu78LxVVaouhAWsVfoDaObSri3BJNynRxsuk9stYPVXl95uNSwnFkh1btOEpTKaBf1Pm2asPhcVmCs2TVRNJqofCd9RmRxUEMTkqeoMUAFrl8urkDwtVMS5gu7qvttQdZRUICOQBipBCMXimDh3dEhQhwdqsoouVjKWiXABQUUz+bpAxNTGG+WpJA1VglFeiiRVSUYRWZWSqBGKIlUJW28S/gaMr1GLVQQNX+LqcYqop68e/vpBnw6F3iyASzcKvwdNZ0LvFWIbqa2Qv8rQYUBp3KIODcLmQ69UEeeFAyjkVg8FiiMfthAqAkev6ekfmdtC2QfqP0MhZwpn97kb1inkS6H0ZniEwq3oON8+jXvhDy0CE3aXwFD6KewmHTCYsG+pYu4698K/pIq67NypxYYS6UwcGYkhlE+C+3ToU31CrlIvpUIpAqbU/UdzQSwSQ0WAxBKjXtU0N+lJVlmii/SUVNE9OQgbbxTZMwh00W8z6F+YFVXkAtI+Q4q4Uw3Na8MsiLqPpdp5C1VEX1xJ8pft8MaKMOQLVeDlNeXGWynsOSsP05Crq1gVJ8/TQnVtUskzuZyDXZdOzBXPNRI0U/02S6tsS/dWd4pV2UwJ3wpEb/UXLm27rPN4Gy5pbLWf9Ky4MrLkWOw4o+sqrfUwCzv+65qiA7ErMtn1jVcrbzPSzMbp6pdKgzCYRr6lbGdJr3Ij4MP/KvvaOGXta7h6ErdWOWf8SmYFGyNUK5/qkzo1ZN6aXooc4+meqDeKHwx8H5F531xNWx6G/V9XZ/4cF1LteklUSoG17mgk/pJlXDX4xcsTeY+igGYu7Tpkrl5d7utOuCze3DzIJnLVPrG0a1FiLwyCSW+syiXvRpA1lkuLEt0C1mC6NGtwK57p+qklFEtH/rAGBM5r6BcsHnOBDQ0h0ohlQqs8CJw5klMqG2YWSKo0bbFCzoU4j7NXqAJeIeiXbqGyVw+sFy8KkLAunVlFVqZrg5YYj42BVD+H4hLu7+OpfnhVgukXVejvrNCozvZgISavr21Dtpp5oG9VFFqE0YNYfXuKLxPyheo47OUC9aI6eMApungj1MFsXNnFG6m6DyiU+bZEfRhVePEG7Xs+jPGodO0eK3Gm21K1s+oOiRq0ceomTOsKGvdDXgqtaxXlWThM727hHjEftIp69LQIvpaxinsUqZf0kvPSJCvppTG+y97j74G04k3LRlNRKNmaf0qJKeelQdaaPsr+sHcjzeWzr+8k79Qf/OM5UhRtT/QAAAAASUVORK5CYII='
  }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;
