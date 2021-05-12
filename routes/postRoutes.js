const upload = require('../utils/multer')

const postController = require('../controllers/postController')
const router = require('express').Router();


router
    // .get('/',postController.getAll)
    // .get('/id/:id',postController.getone)
    .post('/create',upload.single('file'),postController.create)
    // .delete('/delete/:id',postController.delete)

module.exports = router
