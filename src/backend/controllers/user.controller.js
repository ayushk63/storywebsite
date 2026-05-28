import {asyncHandler} from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { User } from '../models/user.model.js';

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave: false});

        return {accessToken, refreshToken}
    } catch(error) {
        throw new ApiError(500, "Something went wrong while generating access and refresh tokens");
    }
}

const userRegister = asyncHandler(async (req, res) => {
    const { name, username, email, password } = req.body;

    if (
        [name, username, email, password].some((field) => !field || field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required");
    }

    const existingUser = await User.findOne({
        $or: [{username}, {email}]
    });

    if (existingUser) {
        throw new ApiError(409, "User already exists");
    }

    const user = await User.create({
        name,
        username: username.toLowerCase(),
        email: email.toLowerCase(),
        password
    });

    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if (!createdUser) {
        throw new ApiError(500, "Error while registering");
    }

    return res
    .status(201)
    .json(new ApiResponse(
        200,
        createdUser,
        "Successfully Registered"
    ));
});

const userLogin = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    if (
        [email, password].some((field) => !field || field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required");
    }

    const user = await User.findOne({ email: email });

    if (!user) {
        throw new ApiError(404, "User not found");
    } 

    const isPasswordCorrect = await user.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
        throw new ApiError(401, "Incorrect Password");
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id);

    const loggedInUser = await User.findById(user._id)
    .select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: false,
        sameSite: 'lax'
    };

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(200,
        {
            user: loggedInUser, accessToken, refreshToken
        },
        "Logged In Successfully"
    ));
});

const userLogout = asyncHandler(async (req, res) => {
    await User.findOneAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    );

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: 'lax'
    };

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
        new ApiResponse(200, {}, "User Logged Out")
    );
});

const updateName = asyncHandler(async (req, res) => {
    const { username, newName } = req.body;

    if (!username || username?.trim() === "") {
        throw new ApiError(401, "Username empty or undefined");
    }

    if (!newName || newName?.trim() === '') {
        throw new ApiError(401, "New Name Empty or Undefined");
    }

    const user = await User.findOne({ username }).select("-password -refreshToken");

    if (!user) {
        throw new ApiError(404, "User does not exist");
    }

    const updatedUser = await User.findByIdAndUpdate(
        user._id,
        {
            $set: {
                name: newName
            }
        },
        {
            new: true
        }
    ).select("-password -refreshToken");

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {
                updatedUser: updatedUser
            },
            "Successfully Updated Name"
        )
    );
});

const updatePassword = asyncHandler(async (req, res) => {
    const { username, oldPassword, newPassword } = req.body;

    if (!username || username?.trim() === '') {
        throw new ApiError(401, 'Username empty or undefined');
    }

    if (
        [oldPassword, newPassword].some((field) => !field || field?.trim() === '')
    ) {
        throw new ApiError(401, "All fields are required");
    }

    const user = await User.findOne({ username });

    if (!user) {
        throw new ApiError(404, "User does not exist");
    }

    const isPasswordValid = await user.isPasswordCorrect(oldPassword);

    if (!isPasswordValid) {
        throw new ApiError(409, "Incorrect Password");
    }

    user.password = newPassword;
    await user.save();

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {},
            "Password Updated Successfully"
        )
    );
});

export { userRegister, userLogin, userLogout, updateName, updatePassword }