/**
 * http://usejsdoc.org/
 */
const express=require('express');
const router=express.Router();
const controller=require('../controllers/login_controller');
router.post('/test',controller.te);
router.post('/newuser',controller.newuser);
module.exports=router;