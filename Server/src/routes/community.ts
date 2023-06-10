import express from "express";
import {
  createCommunity,
  getAllCommunities,
  getCommunityById,
  joinCommunity,
  leaveCommunity,
} from "../controller/community";

const router = express.Router();

router.post("/createCommunity/:id", createCommunity);
router.post("/joinCommunity/:communityId", joinCommunity);
router.post("/leaveCommunity/:communityId", leaveCommunity);
router.get("/getAllCommunities", getAllCommunities);
router.get("/getCommunityById/:communityId", getCommunityById);

export default router;
