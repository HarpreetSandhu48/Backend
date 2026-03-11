const User=require("../models/user")
const bcrypt=require('bcrypt')
const nodemailer=require("nodemailer")
const jwt=require("jsonwebtoken")




const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "hs9225642@gmail.com",
    pass: "dmas fwcb nwii skqc"
  },
  tls: {
    rejectUnauthorized: false
  }
});

const generateOTP=()=>{

    let digit="0123456789"
    let OTP=""
    for(let i=0 ; i<4;i++){
        OTP+=digit[Math.floor(Math.random()*10)]
    }
    return OTP
}
const Create=async(req,res)=>{
    try{        
        const {name,email,password}=req.body;
        const hashpassword=await bcrypt.hash(password,10)
        const newuser=new User({name,email,password:hashpassword})

        
        await newuser.save()
        res.status(201).json({message:"user created successfuly",newuser})

    }
    catch(error){
res.status(500).json({message:error.message})
    }
}
const loginusername=async(req,res)=>{
    try{
        const {name,password}=req.body
        const user=await User.findOne({name})
        if(!user){
            return res.status(404).json({message:"not found"})
        }
           const comparepass=await bcrypt.compare(password,user.password)
           if(!comparepass){
            return res.status(400).json({message:"p asswprd invalis"})
           }
           const token=jwt.sign({id:user._id,email:user.email},
            "wertyuiopdfg",
            {expiresIn:"1h"}
            
           )
           user.token=token
            await user.save()
           res.status(201).json({message:"Loginn Successfully"})
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const comparepass = await bcrypt.compare(password, user.password);

    if (!comparepass) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    const otp = generateOTP();
    user.otp = otp;
    await user.save();

    const mailoption = {
      from: "hs9225642@gmail.com",
      to: user.email,
      subject: "OTP VERIFICATION",
      text: `Your OTP is ${otp}`,
    };

    await transport.sendMail(mailoption);

    return res.status(200).json({ message: "OTP sent Successfully" });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const verify=async(req,res)=>{
    try{
        const {email,otp}=req.body;
        const user=await User.findOne({email})
        if(!user){
            res.status(404).json({message:"email not found"})
        }
        if(user.otp===otp){
            user.otp=null
            await user.save()
            res.status(201).json({message:"Login sucessfully"})
        }
        else{
            res.status(500).json({message:"interval server error"})
        }

    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}

const getbyid=async(req,res)=>{
    try{
        const id=req.params.id
        const user=await User.findById(id)
        if(!user){
            res.status(404).json({message:"User nor found"})
        }
        res.status(200).json({message:"Data fetched sucessfully",user})
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}

const getall=async(req,res)=>{
    const user=await User.find()
    if(!user){
        res.status(404).json({message:"User not found"})
    }
    res.status(200).json({message:"Data fetched successfully",user})
}

const update=async(req,res)=>{
    try{
        const id=req.params.id
        const user=await User.findByIdAndUpdate(id,
            req.body,
            {new:true} 
                )
                if(!user){
                    res.status(404).json({message:"User Not found"})
                }
                res.status(200).json({message:"Data Updated Successfully",user})
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}

const deleted = async(req,res)=>{
    try{
        const id=req.params.id
        const user=await User.findByIdAndDelete(id)
        if(!user){
            res.status(404).json({message:"User not found"})
        }
        res.status(200).json({message:"User Deleted Sucesssfully",user})
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}

const search=async(req,res)=>{
    try {
    const { keyword } = req.query;

    const users = await User.find({
      $or: [  
        { name: { $regex: keyword, $options: "i" } },
        { email: { $regex: keyword, $options: "i" } }
      ]
    });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error in search", error });
    console.log('error')
  }
}

module.exports={Create,loginusername,Login,verify,getbyid,getall,update,deleted,search}