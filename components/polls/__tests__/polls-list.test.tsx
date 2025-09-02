import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PollsList } from '../polls-list';
import { createClient } from '@/lib/supabase/client';

// Mock the Supabase client
jest.mock('@/lib/supabase/client', () => ({
  createClient: jest.fn()
}));

// Mock the next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

describe('PollsList Component', () => {
  const mockSupabase = {
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    order: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (createClient as jest.Mock).mockReturnValue(mockSupabase);
  });

  test('renders loading state initially', () => {
    mockSupabase.select.mockResolvedValue({ data: [], error: null });
    
    render(<PollsList />);
    
    // Check if loading cards are displayed
    const loadingCards = screen.getAllByRole('article');
    expect(loadingCards).toHaveLength(6);
    expect(loadingCards[0]).toHaveClass('animate-pulse');
  });

  test('renders error message when fetch fails', async () => {
    const errorMessage = 'Failed to fetch polls';
    mockSupabase.select.mockResolvedValue({ data: null, error: { message: errorMessage } });
    
    render(<PollsList />);
    
    await waitFor(() => {
      expect(screen.getByText(`Error loading polls: ${errorMessage}`)).toBeInTheDocument();
    });
  });

  test('renders empty state when no polls are found', async () => {
    mockSupabase.select.mockResolvedValue({ data: [], error: null });
    mockSupabase.eq.mockResolvedValue({ count: 0, error: null });
    
    render(<PollsList />);
    
    await waitFor(() => {
      expect(screen.getByText('No polls found. Create your first poll!')).toBeInTheDocument();
    });
  });

  test('renders polls when data is fetched successfully', async () => {
    const mockPolls = [
      {
        id: '1',
        title: 'Test Poll 1',
        description: 'Test Description 1',
        category: 'Technology',
        created_at: '2023-01-01T00:00:00Z',
        user_id: 'user1',
        profiles: {
          username: 'testuser',
          full_name: 'Test User'
        }
      },
      {
        id: '2',
        title: 'Test Poll 2',
        description: 'Test Description 2',
        category: 'Education',
        created_at: '2023-01-02T00:00:00Z',
        user_id: 'user2',
        profiles: null
      }
    ];
    
    mockSupabase.select.mockResolvedValue({ data: mockPolls, error: null });
    mockSupabase.eq.mockImplementation((field, value) => {
      return {
        count: 10,
        error: null
      };
    });
    
    render(<PollsList />);
    
    await waitFor(() => {
      expect(screen.getByText('Test Poll 1')).toBeInTheDocument();
      expect(screen.getByText('Test Poll 2')).toBeInTheDocument();
      expect(screen.getByText('by testuser')).toBeInTheDocument();
      expect(screen.getByText('by Anonymous')).toBeInTheDocument();
      expect(screen.getAllByText('10 votes')).toHaveLength(2);
      expect(screen.getByText('Technology')).toBeInTheDocument();
      expect(screen.getByText('Education')).toBeInTheDocument();
    });
  });

  test('displays correct date format for poll creation time', async () => {
    const mockPoll = [{
      id: '1',
      title: 'Test Poll',
      description: 'Test Description',
      category: 'Technology',
      created_at: '2023-01-01T00:00:00Z',
      user_id: 'user1',
      profiles: {
        username: 'testuser',
        full_name: 'Test User'
      }
    }];
    
    mockSupabase.select.mockResolvedValue({ data: mockPoll, error: null });
    mockSupabase.eq.mockResolvedValue({ count: 5, error: null });
    
    render(<PollsList />);
    
    await waitFor(() => {
      // The exact format will depend on the user's locale, so we check for the presence of the date
      const dateString = new Date('2023-01-01T00:00:00Z').toLocaleDateString();
      expect(screen.getByText(dateString)).toBeInTheDocument();
    });
  });
});