const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
    try{
        if(req.headers.authorization){
            const token = req.headers.authorization.split(" ")[1];
            const isCustomAuth = token.length < 500;

            let decodedData;

            if(token && isCustomAuth){
                decodedData = jwt.verify(token, 'test');

                req.userId = decodedData?.id;
            }else{
                decodedData = jwt.decode(token);

                req.userId = decodedData?.sub;
            }
        }else{
            return res.json({ message: "User not logged in" });   
        }
        next();
    }catch(err){
        console.log(err);
    }
}

module.exports = auth;