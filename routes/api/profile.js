import express from 'express';
const router = express.Router();

router.get('/',(req,res) => res.json({test: "Profile is success"}))

export default router;