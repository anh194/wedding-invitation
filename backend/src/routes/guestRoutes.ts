import { Router } from 'express';
import { GuestController } from '../controllers/guestController';
import { validateCreateGuest, validateRequest } from '../middleware/validation';

const router = Router();
const guestController = new GuestController();

// POST /api/guests - Create a new guest
router.post('/', validateCreateGuest, validateRequest, guestController.createGuest.bind(guestController));

// GET /api/guests - Get all guests
router.get('/', guestController.getAllGuests.bind(guestController));

// GET /api/guests/stats - Get guest statistics (MUST come before /:id)
router.get('/stats', guestController.getStats.bind(guestController));

// GET /api/guests/logs - Get request logs (MUST come before /:id)
router.get('/logs', guestController.getRequestLogs.bind(guestController));

// GET /api/guests/team/:team - Get guests by team (BRIDE or GROOM)
router.get('/team/:team', guestController.getGuestsByTeam.bind(guestController));

// GET /api/guests/:id - Get guest by ID (MUST come last)
router.get('/:id', guestController.getGuestById.bind(guestController));

export default router; 