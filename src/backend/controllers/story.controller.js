import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError} from '../utils/ApiError.js';
import {ApiResponse} from '../utils/ApiResponse.js';
import {Story} from '../models/story.model.js';

const publishStory = asyncHandler(async (req, res) => {
    const { title, author, genre, story } = req.body;

    if (
        [title, author, genre].some((field) => !field || field?.trim() === "")
    ) {
        throw new ApiError(401, "Title, author and genre, all are required");
    }

    if (!story || story?.trim() === "") {
        throw new ApiError(401, "Story cannot be empty");
    }

    const existingStory = await Story.findOne({
        $or: [{title}, {story}]
    });

    if (existingStory) {
        throw new ApiError(409, "Either the title or the story content already exists");
    }

    const publishedStory = await Story.create({
        title,
        author,
        genre,
        story,
        numLikes: 0,
        numComments: 0
    });

    if (!publishStory) {
        throw new ApiError(500, "Error while publishing the story");
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {},
            "Successfully published the story"
        )
    );
});

const findStoryByTitle = asyncHandler(async (req, res) => {
    const { title } = req.query;

    if (!title || title?.trim() === "") {
        throw new ApiError(401, "Title empty or undefined");
    }

    const story = await Story.findOne({ title: title });

    if (!story) {
        throw new ApiError(404, "Story not found");
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {
                story: story
            },
            "Found the story"
        )
    );
});

const findStoriesByGenre = asyncHandler(async (req, res) => {
    const { genre } = req.query;

    if (!genre || genre?.trim() === '') {
        throw new ApiError(401, 'Genre empty or undefined');
    }

    const stories = await Story.find({ genre: genre });

    if (!stories) {
        throw new ApiError(404, "Not Found");
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {
                stories: stories
            },
            "Found stories with the given genre"
        )
    );
});

const likeStory = asyncHandler(async (req, res) => {
    const { title } = req.body;

    if (!title || title?.trim() === "") {
        throw new ApiError(401, "Title empty or undefined");
    }

    const story = await Story.findOne({ title });

    if (!story) {
        throw new ApiError(404, "Story does not exist");
    }
    
    const updatedStory = await Story.findOneAndUpdate(
        { title },
        {
            $inc: {
                numLikes: 1
            }
        },
        {
            new: true
        }
    );

    if (!updatedStory) {
        throw new ApiError(500, "Error while liking the story");
    }

    return res
    .status(200)
    .json(
        200,
        {
            newLikes: updatedStory.numLikes
        },
        "Successfully Liked The Story"
    );
});

const postComment = asyncHandler(async (req, res) => {
    const { title, comment } = req.body;

    if (!title || title?.trim() === '') {
        throw new ApiError(401, "Title empty or undefined");
    }

    if (!comment || comment?.trim() === '') {
        throw new ApiError(401, "Comment empty or undefined");
    }

    const story = await Story.findOne({ title });

    if (!story) {
        throw new ApiError(404, "Story Does Not Exist");
    }

    const updatedStory = await Story.findOneAndUpdate(
        { title },
        {
            $push: {
                comments: comment
            }
        },
        {
            new: true
        }
    );

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {
                comments: updatedStory.comments
            },
            "Comment Posted Successfully"
        )
    );
});

const viewComments = asyncHandler(async (req, res) => {
    const { title } = req.query;

    if (!title || title?.trim() === '') {
        throw new ApiError(401, "Title empty or undefined");
    }

    const story = await Story.findOne({ title });

    if (!story) {
        throw new ApiError(404, "Story does not exist");
    }

    const comments = story.comments;

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {
                comments: comments
            },
            "Comments fetched successfully"
        )
    );
});

export { 
    publishStory,
    findStoryByTitle,
    findStoriesByGenre,
    likeStory,
    postComment,
    viewComments
}