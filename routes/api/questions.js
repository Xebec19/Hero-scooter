import express from 'express';
const router = express.Router();

router.get('/',(req,res) => res.json({test: "questions is success"}))

export default router;