export const adminOnly =async (req,res,next) => {
    const role=req.user?.role
    if(role !=="admin"){
        return res.status(401).json({ message: "you dont have accsess for this action" });
    }
    next()
}