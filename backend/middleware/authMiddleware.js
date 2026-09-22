import { createClient } from '@supabase/supabase-js';
import prisma from '../prismaClient.js';

// Initialize Supabase client for backend verification
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tjdykkqhwtsyqvcdgybp.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];
    
    // Verify token with Supabase directly (handles ES256, RS256, JWKS automatically)
    const { data: { user: supabaseUser }, error } = await supabase.auth.getUser(token);
    
    if (error || !supabaseUser) {
      console.error('Supabase token verification failed:', error?.message);
      return res.status(401).json({ error: 'Invalid token' });
    }

    // The user ID from Supabase Auth
    const userId = supabaseUser.id;
    
    // Find the user in our Prisma database
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) return res.status(401).json({ error: 'User not found in public.User table' });
    if (user.status === 'deactivated') return res.status(403).json({ error: 'Account deactivated' });

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Invalid token' });
  }
};

export const requireAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Forbidden: Admins only' });
  }
};
