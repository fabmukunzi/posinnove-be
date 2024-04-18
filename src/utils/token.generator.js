import jwt from 'jsonwebtoken';
const generateToken = (user) => {
    return jwt.sign({
        email: user.email,
        id: user.id
    }, process.env.JWT_SECRET, {
        expiresIn: '24h' 
    });
}

export { generateToken };
