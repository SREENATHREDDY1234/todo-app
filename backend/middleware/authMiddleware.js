const jwt = require('jsonwebtoken');

const authMiddleware  = (req,res,next)=>{
    //get token from header
    const token = req.headers.authorization?.split(' ')[1];//Format: "Bearer <token>"
    if(!token){
        return res.status(401).json({success: false, message: "No token, authorization denined!"});
    }
    
    try{
        //Verify token.
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.userId = decoded.userId;//Attach userId to the request.
        next();
    }catch(e){
        return res.status(401).json({success:false,message:"Invalid token!"});
    }
}

module.exports = authMiddleware;