CREATE TABLE public.wedding_rsvps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(btrim(name)) BETWEEN 1 AND 80),
  attending boolean NOT NULL,
  guest_count integer CHECK (guest_count IS NULL OR guest_count BETWEEN 0 AND 10),
  device_id text NOT NULL CHECK (char_length(device_id) BETWEEN 16 AND 100),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (device_id)
);
GRANT SELECT, INSERT ON public.wedding_rsvps TO anon, authenticated;
GRANT ALL ON public.wedding_rsvps TO service_role;
ALTER TABLE public.wedding_rsvps ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Wedding RSVPs are publicly viewable" ON public.wedding_rsvps FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Guests can submit one RSVP per device" ON public.wedding_rsvps FOR INSERT TO anon, authenticated WITH CHECK (char_length(btrim(name)) BETWEEN 1 AND 80 AND char_length(device_id) BETWEEN 16 AND 100);

CREATE TABLE public.wedding_wishes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(btrim(name)) BETWEEN 1 AND 80),
  message text NOT NULL CHECK (char_length(btrim(message)) BETWEEN 2 AND 500),
  device_id text NOT NULL CHECK (char_length(device_id) BETWEEN 16 AND 100),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (device_id)
);
GRANT SELECT, INSERT ON public.wedding_wishes TO anon, authenticated;
GRANT ALL ON public.wedding_wishes TO service_role;
ALTER TABLE public.wedding_wishes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Wedding wishes are publicly viewable" ON public.wedding_wishes FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Guests can share one wish per device" ON public.wedding_wishes FOR INSERT TO anon, authenticated WITH CHECK (char_length(btrim(name)) BETWEEN 1 AND 80 AND char_length(btrim(message)) BETWEEN 2 AND 500 AND char_length(device_id) BETWEEN 16 AND 100);

CREATE OR REPLACE FUNCTION public.set_wedding_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER set_wedding_rsvps_updated_at
BEFORE UPDATE ON public.wedding_rsvps
FOR EACH ROW EXECUTE FUNCTION public.set_wedding_updated_at();

CREATE TRIGGER set_wedding_wishes_updated_at
BEFORE UPDATE ON public.wedding_wishes
FOR EACH ROW EXECUTE FUNCTION public.set_wedding_updated_at();

ALTER PUBLICATION supabase_realtime ADD TABLE public.wedding_rsvps;
ALTER PUBLICATION supabase_realtime ADD TABLE public.wedding_wishes;