-- Enable pgcrypto extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA public;

-- Create the polls table
CREATE TABLE public.polls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create the poll_options table
CREATE TABLE public.poll_options (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  poll_id UUID REFERENCES public.polls(id) ON DELETE CASCADE,
  option_text TEXT NOT NULL
);

-- Create the votes table
CREATE TABLE public.votes (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  poll_id UUID REFERENCES public.polls(id) ON DELETE CASCADE,
  option_id UUID REFERENCES public.poll_options(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, poll_id) -- A user can only vote once per poll
);

-- Function to update the updated_at column
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update the updated_at column on polls table
CREATE TRIGGER on_polls_updated
BEFORE UPDATE ON public.polls
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- Enable Row Level Security (RLS)
ALTER TABLE public.polls ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.poll_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.votes ENABLE ROW LEVEL SECURITY;

-- Policies for polls table
CREATE POLICY "Allow all users to read polls" ON public.polls FOR SELECT USING (true);
CREATE POLICY "Allow authenticated users to create polls" ON public.polls FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow poll owner to update their polls" ON public.polls FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Allow poll owner to delete their polls" ON public.polls FOR DELETE USING (auth.uid() = user_id);

-- Policies for poll_options table
CREATE POLICY "Allow all users to read poll options" ON public.poll_options FOR SELECT USING (true);
CREATE POLICY "Allow authenticated users to create poll options" ON public.poll_options FOR INSERT WITH CHECK (
  auth.role() = 'authenticated' AND
  (SELECT user_id FROM public.polls WHERE id = poll_id) = auth.uid()
);
CREATE POLICY "Allow poll owner to update their poll options" ON public.poll_options FOR UPDATE USING (
  (SELECT user_id FROM public.polls WHERE id = poll_id) = auth.uid()
);
CREATE POLICY "Allow poll owner to delete their poll options" ON public.poll_options FOR DELETE USING (
  (SELECT user_id FROM public.polls WHERE id = poll_id) = auth.uid()
);

-- Policies for votes table
CREATE POLICY "Allow all users to read votes" ON public.votes FOR SELECT USING (true);
CREATE POLICY "Allow authenticated users to cast votes" ON public.votes FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow user to delete their own vote" ON public.votes FOR DELETE USING (auth.uid() = user_id);