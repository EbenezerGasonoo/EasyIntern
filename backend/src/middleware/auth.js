import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    req.userType = decoded.userType;
    req.isAdmin = decoded.isAdmin === true;
    req.adminEmail = decoded.email;
    req.adminRole = decoded.adminRole || (decoded.isAdmin ? 'SUPER_ADMIN' : null);
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

export const requireCompany = (req, res, next) => {
  if (req.userType !== 'COMPANY') {
    return res.status(403).json({ error: 'Company access required' });
  }
  next();
};

export const requireIntern = (req, res, next) => {
  if (req.userType !== 'INTERN') {
    return res.status(403).json({ error: 'Intern access required' });
  }
  next();
};

export const requireAdmin = (req, res, next) => {
  if (!req.isAdmin) {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

export const requireSuperAdmin = (req, res, next) => {
  if (!req.isAdmin || req.adminRole !== 'SUPER_ADMIN') {
    return res.status(403).json({ error: 'Super admin access required' });
  }
  next();
};
