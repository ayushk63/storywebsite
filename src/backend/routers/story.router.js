import { Router } from "express";
import { publishStory, 
    findStoriesByGenre, 
    findStoryByTitle, 
    likeStory,
    postComment,
    viewComments
} from "../controllers/story.controller.js";

const router = Router();

router.route("/publish").post(publishStory);
router.route("/findstorybytitle").get(findStoryByTitle);
router.route("/findstoriesbygenre").get(findStoriesByGenre);
router.route("/likestory").post(likeStory);
router.route("/postcomment").post(postComment);
router.route("/viewcomments").get(viewComments);

export { router as storyRouter }