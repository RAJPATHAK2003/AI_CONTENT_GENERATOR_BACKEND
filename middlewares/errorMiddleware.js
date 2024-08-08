const errorHandler=(err,req,res,next)=>{
    const statusCode=res.statusCode===200 ? 500:res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: "production"==="production" ? err.stack :{}
        // stack: development==="development" ? err.stack :{}
    })
}
module.exports={
    errorHandler,
}