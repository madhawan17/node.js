const express = require("express");
const {handleGetAllUsers,
    handleCreateNewUser,
    handleDeleteUserById,
    handleGetUserById,
    handleUpdateUserById} = require("../controllers/user")

const router = express.Router();

//REST Api

router
.route("/")
.get(handleGetAllUsers)
.post(handleCreateNewUser);

// routes 
router
.route("/:id")
.get(handleGetUserById)
.patch(handleUpdateUserById)
.delete(handleDeleteUserById);

module.exports = router;