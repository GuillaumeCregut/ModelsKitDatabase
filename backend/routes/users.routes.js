const router=require('express').Router();
const {userCheck,checkLevel}=require('../middlewares/UserValidation');
const usersController=require('../controllers/users.controller');
const {createSubUpload}=require('../utils/fs');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { errorFileHandler}=require('../middlewares/errorHandler');

createSubUpload('users');

const storageUserAvatar=multer.diskStorage(
    {
        destination: function (req, file, cb) {
            const userFolderId=req.user.user_id;
            const userFolder = `assets/uploads/users/${userFolderId}`;
            const pathFolder=path.join(__dirname,'..',userFolder);
            fs.mkdirSync(pathFolder, { recursive: true })
            req.filePath=userFolder;
            cb(null, userFolder)
        },
        filename: function (req, file, cb) {
            if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
                let ext = '.png';
                if (file.mimetype === 'image/jpeg')
                    ext = '.jpg';
                const filename =`avatar${ext}`;
                req.fileName=filename;
                cb(null, filename)
            }
            else{
                return cb(new Error('File not good'));
            }                
        }
    }
)

const uploadAvatar=multer({storage:storageUserAvatar});

router.get('/',userCheck,checkLevel,usersController.getAll);
router.get('/visible', userCheck,usersController.getAllVisible);
router.get('/:id',userCheck,usersController.getOne);
router.post('/',usersController.addOne);
router.post('/model',userCheck,usersController.addModelStock);
router.patch('/admin/:id',userCheck,checkLevel,usersController.updateRank);
router.put('/avatar/:id',userCheck,uploadAvatar.single('avatar'),errorFileHandler,usersController.uploadAvatar);
router.put('/:id',userCheck,usersController.updateUser);
router.delete('/model/:id',userCheck,usersController.deleteModel);
router.delete('/:id',userCheck,usersController.deleteUser);

module.exports=router;