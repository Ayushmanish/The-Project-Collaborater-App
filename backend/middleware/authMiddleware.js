// import jwt from 'jsonwebtoken';
// import User from '../models/User.js'
// const authMiddleware = async(req, res, next) => {
//   const token = req.header('Authorization');
  
  
  
//   if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

//   try {
    
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decoded.id);
    
    
   
//     next();
//   } catch (err) {
//     res.status(401).json({ message: 'Token is not valid' });
//   }
// };

// // Use default export
// export default authMiddleware;


import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const authMiddleware = async (req, res, next) => {
  // Get the token from the Authorization header
  const token = req.header('Authorization'); // Handles "Bearer <token>" format
  
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Decode the token using the secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach user information to the request object
    req.user = await User.findById(decoded.id).select('-password'); // Exclude password for security
    
    if (!req.user) {
      
      return res.status(404).json({ message: 'User not found' });
    }
    
    next(); // Move to the next middleware or route handler
  } catch (err) {
    
    console.error('Authentication error:', err.message);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Export the middleware
export default authMiddleware;
