import { v4 as uuidv4 } from 'uuid';
import { db } from '../database/connection';
import { Guest, CreateGuestRequest, RequestLog } from '../types';

export class GuestService {
  async createGuest(guestData: CreateGuestRequest): Promise<Guest> {
    try {
      const { name, team, plus_one, after_party } = guestData;
      
      const result = await db.query(
        'INSERT INTO guests (id, name, team, plus_one, after_party) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [uuidv4(), name, team, plus_one, after_party]
      );

      return result.rows[0];
    } catch (error) {
      console.error('Error creating guest:', error);
      throw new Error('Failed to create guest');
    }
  }

  async getAllGuests(): Promise<Guest[]> {
    try {
      const result = await db.query('SELECT * FROM guests ORDER BY created DESC');
      return result.rows;
    } catch (error) {
      console.error('Error fetching guests:', error);
      throw new Error('Failed to fetch guests');
    }
  }

  async getGuestById(id: string): Promise<Guest | null> {
    try {
      const result = await db.query('SELECT * FROM guests WHERE id = $1', [id]);
      return result.rows[0] || null;
    } catch (error) {
      console.error('Error fetching guest by ID:', error);
      throw new Error('Failed to fetch guest');
    }
  }

  async getGuestsByTeam(team: 'BRIDE' | 'GROOM'): Promise<Guest[]> {
    try {
      const result = await db.query('SELECT * FROM guests WHERE team = $1 ORDER BY created DESC', [team]);
      return result.rows;
    } catch (error) {
      console.error('Error fetching guests by team:', error);
      throw new Error('Failed to fetch guests by team');
    }
  }

  async logRequest(payload: string): Promise<RequestLog> {
    try {
      const result = await db.query(
        'INSERT INTO request_logs (id, payload) VALUES ($1, $2) RETURNING *',
        [uuidv4(), payload]
      );

      return result.rows[0];
    } catch (error) {
      console.error('Error logging request:', error);
      throw new Error('Failed to log request');
    }
  }

  async getRequestLogs(): Promise<RequestLog[]> {
    try {
      const result = await db.query('SELECT * FROM request_logs ORDER BY created DESC');
      return result.rows;
    } catch (error) {
      console.error('Error fetching request logs:', error);
      throw new Error('Failed to fetch request logs');
    }
  }

  async getStats(): Promise<{
    totalGuests: number;
    brideTeam: number;
    groomTeam: number;
    withPlusOne: number;
    withoutPlusOne: number;
    withAfterParty: number;
    withoutAfterParty: number;
  }> {
    try {
      const totalResult = await db.query('SELECT COUNT(*) as total FROM guests');
      const teamResult = await db.query('SELECT team, COUNT(*) as count FROM guests GROUP BY team');
      const plusOneResult = await db.query('SELECT plus_one, COUNT(*) as count FROM guests GROUP BY plus_one');
      const afterPartyResult = await db.query('SELECT after_party, COUNT(*) as count FROM guests GROUP BY after_party');

      const totalGuests = parseInt(totalResult.rows[0].total);
      const brideTeam = teamResult.rows.find((row: any) => row.team === 'BRIDE')?.count || 0;
      const groomTeam = teamResult.rows.find((row: any) => row.team === 'GROOM')?.count || 0;
      const withPlusOne = plusOneResult.rows.find((row: any) => row.plus_one === true)?.count || 0;
      const withoutPlusOne = plusOneResult.rows.find((row: any) => row.plus_one === false)?.count || 0;
      const withAfterParty = afterPartyResult.rows.find((row: any) => row.after_party === true)?.count || 0;
      const withoutAfterParty = afterPartyResult.rows.find((row: any) => row.after_party === false)?.count || 0;

      return {
        totalGuests,
        brideTeam: parseInt(brideTeam),
        groomTeam: parseInt(groomTeam),
        withPlusOne: parseInt(withPlusOne),
        withoutPlusOne: parseInt(withoutPlusOne),
        withAfterParty: parseInt(withAfterParty),
        withoutAfterParty: parseInt(withoutAfterParty),
      };
    } catch (error) {
      console.error('Error fetching stats:', error);
      throw new Error('Failed to fetch stats');
    }
  }
} 