import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { uploadToCloudinary } from "../utils/cloudinay.js";

const registerUser = asyncHandler(async (req, res) => {
  // get user details form frontend
  // validate - not empty
  // check if user already exists: email
  // check for images, check for avatar
  // upload them to cloudinary
  // creeat user object - create entry in db
  // remove password and refresh token field from response
  //check for user created or not
  // return response

  const { username, email, password, fullName } = req.body;
  console.log(username, email, password, fullName);

  if (
    [fullName, , email, password, username].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ email }, { username }],
  });
  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }
  const avatarLocalPath = req.files["avatar"][0].path;
  const coverImageLocalPath = req.files["coverImage"][0].path;
  if (!avatarLocalPath || !coverImageLocalPath) {
    throw new ApiError(400, "All fields are required");
  }
  const avatar = await uploadToCloudinary(avatarLocalPath, "avatar");
  const coverImage = await uploadToCloudinary(
    coverImageLocalPath,
    "coverImage"
  );
  if (!avatar || !coverImage) {
    throw new ApiError(400, "All fields are required");
  }

  const user = await User.create({
    username: username.toLowerCase(),
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    fullName,
    password,
  });
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering user");
  }
  const response = new ApiResponse(
    201,
    createdUser,
    "User registered successfully"
  );
  return res.status(response.statusCode).json(response);
});

export { registerUser };
