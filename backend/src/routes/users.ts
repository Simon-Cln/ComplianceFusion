import * as express from 'express';
import { User } from '../models/User';
import { Types } from 'mongoose';

const router = express.Router();

// Create new user
router.post('/', async (req: express.Request, res: express.Response) => {
  try {
    const user = new User(req.body);
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'An error occurred' });
  }
});

// Get user profile
router.get('/:id', async (req: express.Request, res: express.Response) => {
  try {
    const user = await User.findById(new Types.ObjectId(req.params.id))
      .populate('savedRegulations')
      .populate('assessments');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : 'An error occurred' });
  }
});

// Update user profile
router.patch('/:id', async (req: express.Request, res: express.Response) => {
  try {
    const user = await User.findByIdAndUpdate(new Types.ObjectId(req.params.id), req.body, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'An error occurred' });
  }
});

// Save regulation for user
router.post('/:id/save-regulation/:regulationId', async (req: express.Request, res: express.Response) => {
  try {
    const user = await User.findById(new Types.ObjectId(req.params.id));
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const regulationObjectId = new Types.ObjectId(req.params.regulationId);
    if (!user.savedRegulations.includes(regulationObjectId)) {
      user.savedRegulations.push(regulationObjectId);
      await user.save();
    }
    
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'An error occurred' });
  }
});

export const userRoutes = router;
