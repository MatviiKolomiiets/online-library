const User = require('../models/User'); 

async function addNewUser(req, name, email, password) {
  try {
    const existingUser = await req.models.Users.findOne({ email: email });
    if (existingUser) {
      throw new Error('A user with this email already exists');
    }

    let currentDate = new Date();
    const user = new req.models.Users({
      name: name,
      email: email,
      password: password,
      created: currentDate,
      updated: currentDate,
        });
console.log (1)
        await user.save();
    console.log(`User created successfully with ID: ${user._id}`);
    return user;
  } catch (error) {
    console.error(`Error creating a new user: ${error}`);
    throw new Error(error.message);
  }
}


async function getUserById(req) {
    const Users = req.models.Users;

    const isValidId = Types.ObjectId.isValid(req.params.id);
    if (!isValidId) {
        throw new Error("Invalid user ID");
    }

    return Users.findById(req.params.id);
}

async function getUserByEmail(req, email) {
    const Users = req.models.Users;
    return Users.findOne({email: email});
}

async function getAllUsers(req) {
    const Users = req.models.Users;
    return Users.find({});
}

async function updateUser(req, name, email, password) {
    try {
        if (req.params.id !== req.user._id.toString()) {
            throw new Error("You're not allowed to update this user");
        }

        const currentUser = req.user;

        currentUser.name = name;
        currentUser.email = email;
        currentUser.password = password;
        currentUser.updated = new Date();

        await currentUser.save();

        return {
            status: "success",
            message: "User updated successfully",
            data: currentUser
        };
    } catch (error) {
        throw new Error(error.message);
    }
}

async function deleteUser(req) {
    const Users = req.models.Users;
    try {
        if(req.params.id !== req.user._id.toString()) {
            throw new Error("You're not allowed to delete this user");
        }

        const result = await Users.findByIdAndRemove(req.params.id);

        if (!result) {
            throw new Error("User not found");
        }

        return {
            status: "success",
            message: "User deleted successfully",
        };
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    addNewUser,
    getUserById,
    getUserByEmail,
    getAllUsers,
    updateUser,
    deleteUser
}
