-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('super_admin', 'school_admin', 'department_head', 'teacher', 'parent', 'student');

-- Create enum for subscription plans
CREATE TYPE public.subscription_plan AS ENUM ('free', 'premium', 'enterprise');

-- Create enum for subscription status
CREATE TYPE public.subscription_status AS ENUM ('active', 'cancelled', 'expired', 'trial');

-- Create institutions table
CREATE TABLE public.institutions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    logo_url TEXT,
    address TEXT,
    contact_email TEXT,
    contact_phone TEXT,
    region TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on institutions
ALTER TABLE public.institutions ENABLE ROW LEVEL SECURITY;

-- Create user_roles table (security definer pattern for role checks)
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    institution_id UUID REFERENCES public.institutions(id) ON DELETE CASCADE,
    role public.app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE(user_id, institution_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create subscriptions table
CREATE TABLE public.subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    institution_id UUID REFERENCES public.institutions(id) ON DELETE CASCADE NOT NULL UNIQUE,
    plan public.subscription_plan NOT NULL DEFAULT 'free',
    status public.subscription_status NOT NULL DEFAULT 'trial',
    start_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
    end_date TIMESTAMP WITH TIME ZONE,
    max_users INTEGER,
    max_storage_gb INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on subscriptions
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Create institution_usage_metrics table
CREATE TABLE public.institution_usage_metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    institution_id UUID REFERENCES public.institutions(id) ON DELETE CASCADE NOT NULL,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    total_users INTEGER DEFAULT 0,
    active_users INTEGER DEFAULT 0,
    whisper_count INTEGER DEFAULT 0,
    storage_used_mb NUMERIC(10,2) DEFAULT 0,
    ai_credits_used INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE(institution_id, date)
);

-- Enable RLS on institution_usage_metrics
ALTER TABLE public.institution_usage_metrics ENABLE ROW LEVEL SECURITY;

-- Create profiles table
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    institution_id UUID REFERENCES public.institutions(id) ON DELETE CASCADE,
    display_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check if user has a specific role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create security definer function to check if user has role in institution
CREATE OR REPLACE FUNCTION public.has_role_in_institution(_user_id UUID, _role public.app_role, _institution_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
      AND institution_id = _institution_id
  )
$$;

-- Create security definer function to get user's institution
CREATE OR REPLACE FUNCTION public.get_user_institution(_user_id UUID)
RETURNS UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT institution_id
  FROM public.profiles
  WHERE id = _user_id
  LIMIT 1
$$;

-- RLS Policies for institutions
CREATE POLICY "Super admins can view all institutions"
  ON public.institutions FOR SELECT
  USING (public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "School admins can view their institution"
  ON public.institutions FOR SELECT
  USING (
    id = public.get_user_institution(auth.uid())
    AND public.has_role(auth.uid(), 'school_admin')
  );

CREATE POLICY "Super admins can insert institutions"
  ON public.institutions FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "Super admins can update institutions"
  ON public.institutions FOR UPDATE
  USING (public.has_role(auth.uid(), 'super_admin'));

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Super admins can view all roles"
  ON public.user_roles FOR SELECT
  USING (public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "School admins can view roles in their institution"
  ON public.user_roles FOR SELECT
  USING (
    institution_id = public.get_user_institution(auth.uid())
    AND public.has_role(auth.uid(), 'school_admin')
  );

CREATE POLICY "Super admins can manage all roles"
  ON public.user_roles FOR ALL
  USING (public.has_role(auth.uid(), 'super_admin'));

-- RLS Policies for subscriptions
CREATE POLICY "Super admins can view all subscriptions"
  ON public.subscriptions FOR SELECT
  USING (public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "School admins can view their subscription"
  ON public.subscriptions FOR SELECT
  USING (
    institution_id = public.get_user_institution(auth.uid())
    AND public.has_role(auth.uid(), 'school_admin')
  );

CREATE POLICY "Super admins can manage subscriptions"
  ON public.subscriptions FOR ALL
  USING (public.has_role(auth.uid(), 'super_admin'));

-- RLS Policies for institution_usage_metrics
CREATE POLICY "Super admins can view all metrics"
  ON public.institution_usage_metrics FOR SELECT
  USING (public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "School admins can view their metrics"
  ON public.institution_usage_metrics FOR SELECT
  USING (
    institution_id = public.get_user_institution(auth.uid())
    AND public.has_role(auth.uid(), 'school_admin')
  );

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (id = auth.uid());

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (id = auth.uid());

CREATE POLICY "Super admins can view all profiles"
  ON public.profiles FOR SELECT
  USING (public.has_role(auth.uid(), 'super_admin'));

CREATE POLICY "School admins can view profiles in their institution"
  ON public.profiles FOR SELECT
  USING (
    institution_id = public.get_user_institution(auth.uid())
    AND public.has_role(auth.uid(), 'school_admin')
  );

-- Create trigger function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Create triggers for updated_at
CREATE TRIGGER update_institutions_updated_at
  BEFORE UPDATE ON public.institutions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at
  BEFORE UPDATE ON public.subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'display_name');
  RETURN NEW;
END;
$$;

-- Create trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();