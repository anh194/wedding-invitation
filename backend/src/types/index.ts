export interface Guest {
  id: string;
  name: string;
  team: 'BRIDE' | 'GROOM';
  plus_one: boolean;
  after_party: boolean;
  created: Date;
}

export interface RequestLog {
  id: string;
  payload: string;
  created: Date;
}

export interface CreateGuestRequest {
  name: string;
  team: 'BRIDE' | 'GROOM';
  plus_one: boolean;
  after_party: boolean;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
}

export interface ServerConfig {
  port: number;
  nodeEnv: string;
  corsOrigin: string;
  rateLimitWindowMs: number;
  rateLimitMaxRequests: number;
} 