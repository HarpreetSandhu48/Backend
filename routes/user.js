const express=require("express")
const { Create, loginusername, Login, verify, getbyid, getall, update, deleted, search } = require("../controller/user")
const { uploads } = require("../multer/multer")

const router=express.Router()


/**
 * @swagger
 * /api/create:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 */

router.post("/create", Create);


/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: user login
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Login successfully
 *       400:
 *         description: Bad request
 */

router.post("/login",loginusername)

router.post("/loginwithotp",Login)
router.post("/verify",verify)

router.get("/getbyid/:id",getbyid)
router.get("/getall",getall)

router.put("/update/:id",update)
router.delete("/delete/:id",deleted)

router.get("/search",search)

router.post("/upload",uploads.array("image",4),
(req, res) => {
  res.json({
    message: "File uploaded",
    file: req.file
  });
})
module.exports=router