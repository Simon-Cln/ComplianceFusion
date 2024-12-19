import * as express from 'express';
import { Assessment } from '../models/Assessment';

const router = express.Router();

// Create new assessment
router.post('/', async (req: express.Request, res: express.Response) => {
  try {
    const assessment = new Assessment(req.body);
    const newAssessment = await assessment.save();
    res.status(201).json(newAssessment);
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'An error occurred' });
  }
});

// Get assessment by ID
router.get('/:id', async (req: express.Request, res: express.Response) => {
  try {
    const assessment = await Assessment.findById(req.params.id)
      .populate('user')
      .populate('regulation');
    if (!assessment) {
      return res.status(404).json({ message: 'Assessment not found' });
    }
    res.json(assessment);
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : 'An error occurred' });
  }
});

// Update assessment
router.patch('/:id', async (req: express.Request, res: express.Response) => {
  try {
    const assessment = await Assessment.findById(req.params.id);
    if (!assessment) {
      return res.status(404).json({ message: 'Assessment not found' });
    }

    // Add current status to history before updating
    if (req.body.complianceStatus && req.body.complianceStatus !== assessment.complianceStatus) {
      assessment.history.push({
        status: assessment.complianceStatus,
        date: new Date(),
        notes: req.body.notes || ''
      });
    }

    // Update fields
    Object.assign(assessment, req.body);
    assessment.updatedAt = new Date();

    const updatedAssessment = await assessment.save();
    res.json(updatedAssessment);
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'An error occurred' });
  }
});

// Get assessments for a user
router.get('/user/:userId', async (req: express.Request, res: express.Response) => {
  try {
    const assessments = await Assessment.find({ user: req.params.userId })
      .populate('regulation')
      .sort({ updatedAt: -1 });
    res.json(assessments);
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : 'An error occurred' });
  }
});

export const assessmentRoutes = router;
