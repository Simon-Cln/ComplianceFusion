import * as express from 'express';
import { Regulation } from '../models/Regulation';

const router = express.Router();

// Get all regulations
router.get('/', async (req: express.Request, res: express.Response) => {
  try {
    const regulations = await Regulation.find();
    res.json(regulations);
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : 'An error occurred' });
  }
});

// Get regulation by ID
router.get('/:id', async (req: express.Request, res: express.Response) => {
  try {
    const regulation = await Regulation.findById(req.params.id);
    if (!regulation) {
      return res.status(404).json({ message: 'Regulation not found' });
    }
    res.json(regulation);
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : 'An error occurred' });
  }
});

// Search regulations
router.get('/search', async (req: express.Request, res: express.Response) => {
  try {
    const { query, sector, size, criticalLevel, complianceLevel, estimatedCost } = req.query;
    
    let searchQuery: any = {};
    
    if (query && typeof query === 'string') {
      searchQuery.$or = [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { keyPoints: { $regex: query, $options: 'i' } }
      ];
    }
    
    if (sector) searchQuery['applicableTo.sectors'] = sector;
    if (size) searchQuery['applicableTo.size'] = size;
    if (criticalLevel) searchQuery['applicableTo.criticalLevel'] = criticalLevel;
    if (complianceLevel) searchQuery.complianceLevel = complianceLevel;
    if (estimatedCost) searchQuery.estimatedCost = estimatedCost;

    const regulations = await Regulation.find(searchQuery);
    res.json(regulations);
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : 'An error occurred' });
  }
});

export const regulationRoutes = router;
