# Poll App Project Rules

## Folder Structure
- All poll-related components must be placed in `/app/polls/`
- API routes should be organized under `/app/api/`
- Authentication pages go in `/app/auth/`
- Reusable components belong in `/components/`
- Database types and schemas in `/types/`

## Form Implementation
- Use react-hook-form for all form handling
- Implement form validation using zod schemas
- Use shadcn/ui components for consistent UI
- Follow controlled components pattern for form inputs

## Supabase Integration
- All database queries must use Supabase client
- Implement Row Level Security (RLS) policies
- Use Supabase Auth for user authentication
- Store user session in AuthContext
- Handle real-time subscriptions with Supabase

## Code Style
- Use TypeScript for all new components
- Implement error boundaries for API calls
- Follow atomic design principles
- Use server components where possible
- Keep component files under 200 lines

## State Management
- Use React Context for global state
- Implement optimistic updates for polls
- Cache poll results using SWR
- Handle loading states with suspense
- Implement proper error handling
