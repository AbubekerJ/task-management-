
import pool from "../db.js";
import bcryptjs from "bcryptjs";
import { createError } from "../utils/createError.js";
import jwt from 'jsonwebtoken'


//Register User
export const register = async(req, res , next)=>{

    try {
        const { username, email, password } = req.body;
        const hashedPass = bcryptjs.hashSync(password , 10)
        const result = await pool.query(
          'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
          [username, email, hashedPass]
        );
        res.json('user Created Successfully ');
      } catch (err) {
          next(err)
      }

}



//SignIn User
export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
 

    const userQuery = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

   

    const validUser = userQuery.rows[0];

    if (!validUser) {
      return next(createError(404, "User Not Found!"));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);

    if (!validPassword) {
      return next(createError(401, "Invalid email or password"));
    }

    const token = jwt.sign({ id: validUser.id }, process.env.JWT_TOKEN);

    const { password: removedPassword, ...rest } = validUser;

    res.cookie("access_token", token, { httpOnly: true, sameSite: "strict" }).json(rest);

  } catch (error) {
    next(error);
  }
};