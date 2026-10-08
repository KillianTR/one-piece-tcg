-- ==============================================================================
-- GRAND LINE VAULT — MIGRATION v0.6.4
-- Bug Reports & User Feedback System
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.bug_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  reporter_email TEXT,
  system_info JSONB,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'investigating', 'resolved', 'dismissed')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  resolved_at TIMESTAMPTZ
);

-- Index for querying by status and date
CREATE INDEX IF NOT EXISTS idx_bug_reports_status ON public.bug_reports(status);
CREATE INDEX IF NOT EXISTS idx_bug_reports_created ON public.bug_reports(created_at DESC);

-- Enable Row Level Security
ALTER TABLE public.bug_reports ENABLE ROW LEVEL SECURITY;

-- Policy: Allow any user (authenticated or anonymous guest) to submit bug reports
CREATE POLICY "Anyone can submit a bug report" 
  ON public.bug_reports
  FOR INSERT 
  WITH CHECK (true);

-- Policy: Only administrators or project owner can view bug reports
CREATE POLICY "Admins can view bug reports" 
  ON public.bug_reports
  FOR SELECT 
  USING (
    auth.role() = 'service_role' 
    OR auth.jwt() ->> 'email' = 'killiantorrell@gmail.com'
  );
