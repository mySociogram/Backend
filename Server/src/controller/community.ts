import console from "console";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import Community, { CommunityAttributes } from "../model/commuintyModel";
import User from "../model/userModel";

export const createCommunity = async (req: Request, res: Response) => {
  const { communityName, about } = req.body;

  if (!communityName) {
    return res.status(400).json({ error: "Community Name is required" });
  }

  if (!about) {
    return res.status(400).json({ error: "About is required" });
  }

  try {
    const {id} = req.params;
    const userId = id
    console.log(id, "id")
  //  const walletId = id
    if (!userId) {
      return res
        .status(401)
        .json({ error: "You are not allowed to create a community" });
    }

    const user = await User.findOne({ where: { id: userId as string}  });
    console.log(user, "user");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    //const userId = user.id;
  console.log(userId, "here");

    const communityData: CommunityAttributes = {
       id: uuidv4(),
      communityName,
      about,
      userId,
      walletId:user.walletId,
      users: [],
    };
console.log("meeeee")
    const community = await Community.create(communityData);
    console.log(community)

    return res.status(201).json({
      community,
      message: `${communityName} has been created`,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server Error" });
  }
};

export const joinCommunity = async (req: Request, res: Response) => {
  try {
    const { communityId } = req.params;
    const { userId } = req.body; 
    const community = await Community.findByPk(communityId);
    console.log(community);
    if (!community) {
      return res.status(404).json({
        message: 'Community not found',
      });
    }
    const membersArr = [...community.users];
    if (membersArr.includes(userId)) {
      return res.status(400).json({
        message: 'You are already a member of the community',
      });
    }
    if (!userId) {
      return res.status(401).json({message:'Kindly connect your wallet'})
    }
    const updatedMembers = [...membersArr, userId];
    const timeOfUpdate = new Date();

    await community.update({
      users: [...updatedMembers],
    });

    return res.status(200).json({
      message: `You have joined ${community.communityName} successfully`,
      community: {
        id: communityId,
        userId,
        communityName: community.communityName,
        about: community.about,
        users: [...updatedMembers],
        createdAt: community.createdAt,
        updatedAt: timeOfUpdate,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Server Error' });
  }
};

export const leaveCommunity = async (req: Request|any, res: Response) => {
    const {communityId} = req.params;
    const{ userId} = req.body;
    console.log(communityId, "communityId")
    console.log(userId, "user")

    try {
      const community = await Community.findOne({where:{id:communityId}});
      console.log(community);
      
      if (!community) {
        return res.status(404).json({
          message: 'Community not found',
        });
      }
      console.log("logout user Id")
      if (!community.users.includes(userId)) {
        return res.status(404).json({
          message: 'You are not a member of this community',
        });
      }
      community.users = community.users.filter((id: string) => id !== userId);
     
      
      await community.save();
      return res.status(200).json({
        message: 'You have left the community successfully',
        community,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        err: 'Server Error',
      });
    }
  };


  export const getCommunityById = async (req: Request, res: Response) => {
    const {communityId} = req.params;
    console.log(communityId, "communityId");
    try {
      const community = await Community.findOne({where:{id:communityId}});
      console.log(community, "community")
      if (!community) {
        return res.status(404).json({
          message: 'Community not found',
        });
      }
      return res.status(200).json({
       community,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        err: 'Server Error',
      });
    }
  };


  export const getAllCommunities = async (req: Request, res: Response) => {
    try {
      console.log('gettall');
      const communities = await Community.findAll();
      console.log(communities, "here")
      if (!communities) {
        return res.status(404).json({ message: 'No communities found' });
      }
      return res.status(200).json({
        message: 'All communities have been successfully fetched',
        result: communities,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        error: err,
      });
    }
  };