import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export const validateCreateGuest = [
  body('name')
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage('Name is required and must be between 1 and 255 characters'),
  
  body('team')
    .isIn(['BRIDE', 'GROOM'])
    .withMessage('Team must be either BRIDE or GROOM'),
  
  body('plus_one')
    .isBoolean()
    .withMessage('plus_one must be a boolean value'),
];

export const validateRequest = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      message: 'Validation failed',
      error: errors.array()[0].msg,
    });
    return;
  }
  next();
}; 