import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import Community, { CommunityAttributes } from '../model/commuintyModel';
import User from '../model/userModel';

export const createCommunity = async (req:Request, res:Response) => {
    const { communityName, about } = req.body;

  if (!communityName) {
    return res.status(400).json({ error: 'Community Name is required' });
  }

  if (!about) {
    return res.status(400).json({ error: 'About is required' });
  }
    try {
        // const userId = (req.user as { id: string }).id;
        // if (!userId) {
        //     return res.status(401).json({ error: 'You are not allowed to create a group' });
        //   }
      
        //   const communityData: CommunityAttributes = {
        //     id: uuidv4(),
        //     communityName,
        //     about,
        //     userId,
        //     walletId,
        //     users: [],
        //   };

        //   const community = await Community.create(communityData);

        //   return res.status(201).json({
        //     community,
        //     message: `${communityName} has been created`,
        //   });
        } catch (err) {
          console.error(err);
          return res.status(500).json({ error: 'Server Error' });
        }
      };
  