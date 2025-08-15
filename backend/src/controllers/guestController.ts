import { Request, Response } from 'express';
import { GuestService } from '../services/guestService';
import { ApiResponse, CreateGuestRequest } from '../types';

export class GuestController {
  private guestService: GuestService;

  constructor() {
    this.guestService = new GuestService();
  }

  async createGuest(req: Request, res: Response): Promise<void> {
    try {
      const guestData: CreateGuestRequest = req.body;
      
      // Log the raw request payload
      await this.guestService.logRequest(JSON.stringify(req.body));
      
      // Create the guest
      const guest = await this.guestService.createGuest(guestData);
      
      const response: ApiResponse<typeof guest> = {
        success: true,
        message: 'Guest created successfully',
        data: guest,
      };
      
      res.status(201).json(response);
    } catch (error) {
      console.error('Error in createGuest controller:', error);
      const response: ApiResponse = {
        success: false,
        message: 'Failed to create guest',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
      res.status(500).json(response);
    }
  }

  async getAllGuests(req: Request, res: Response): Promise<void> {
    try {
      const guests = await this.guestService.getAllGuests();
      
      const response: ApiResponse<typeof guests> = {
        success: true,
        message: 'Guests retrieved successfully',
        data: guests,
      };
      
      res.status(200).json(response);
    } catch (error) {
      console.error('Error in getAllGuests controller:', error);
      const response: ApiResponse = {
        success: false,
        message: 'Failed to retrieve guests',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
      res.status(500).json(response);
    }
  }

  async getGuestById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const guest = await this.guestService.getGuestById(id);
      
      if (!guest) {
        const response: ApiResponse = {
          success: false,
          message: 'Guest not found',
        };
        res.status(404).json(response);
        return;
      }
      
      const response: ApiResponse<typeof guest> = {
        success: true,
        message: 'Guest retrieved successfully',
        data: guest,
      };
      
      res.status(200).json(response);
    } catch (error) {
      console.error('Error in getGuestById controller:', error);
      const response: ApiResponse = {
        success: false,
        message: 'Failed to retrieve guest',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
      res.status(500).json(response);
    }
  }

  async getGuestsByTeam(req: Request, res: Response): Promise<void> {
    try {
      const { team } = req.params;
      
      if (team !== 'BRIDE' && team !== 'GROOM') {
        const response: ApiResponse = {
          success: false,
          message: 'Invalid team parameter',
          error: 'Team must be either BRIDE or GROOM',
        };
        res.status(400).json(response);
        return;
      }
      
      const guests = await this.guestService.getGuestsByTeam(team);
      
      const response: ApiResponse<typeof guests> = {
        success: true,
        message: `Guests for team ${team} retrieved successfully`,
        data: guests,
      };
      
      res.status(200).json(response);
    } catch (error) {
      console.error('Error in getGuestsByTeam controller:', error);
      const response: ApiResponse = {
        success: false,
        message: 'Failed to retrieve guests by team',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
      res.status(500).json(response);
    }
  }

  async getStats(req: Request, res: Response): Promise<void> {
    try {
      const stats = await this.guestService.getStats();
      
      const response: ApiResponse<typeof stats> = {
        success: true,
        message: 'Stats retrieved successfully',
        data: stats,
      };
      
      res.status(200).json(response);
    } catch (error) {
      console.error('Error in getStats controller:', error);
      const response: ApiResponse = {
        success: false,
        message: 'Failed to retrieve stats',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
      res.status(500).json(response);
    }
  }

  async getRequestLogs(req: Request, res: Response): Promise<void> {
    try {
      const logs = await this.guestService.getRequestLogs();
      
      const response: ApiResponse<typeof logs> = {
        success: true,
        message: 'Request logs retrieved successfully',
        data: logs,
      };
      
      res.status(200).json(response);
    } catch (error) {
      console.error('Error in getRequestLogs controller:', error);
      const response: ApiResponse = {
        success: false,
        message: 'Failed to retrieve request logs',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
      res.status(500).json(response);
    }
  }
} 