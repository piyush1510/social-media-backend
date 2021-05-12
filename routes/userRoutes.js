const userController = require('../controllers/userController');
const router = require('express').Router();
const upload = require('../utils/multer');

router
  .post('/user/login', userController.login)
  .post('/user/create', upload.single('file'), userController.create)
  .use('/posts',userController.validate)
module.exports = router;
