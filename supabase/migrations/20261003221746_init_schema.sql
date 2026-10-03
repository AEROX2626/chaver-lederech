-- Enum types
CREATE TYPE user_stage AS ENUM ('NEW', 'CURIOUS', 'BEGINNER', 'EXPLORING', 'GROWING', 'RETURNING', 'STRUGGLING', 'DEEP_LEARNING', 'SEEKING_HELP');
CREATE TYPE content_status AS ENUM ('DRAFT', 'AI_DRAFT', 'EDITOR_REVIEW', 'RABBI_REVIEW', 'PROFESSIONAL_REVIEW', 'APPROVED', 'PUBLISHED', 'ARCHIVED');
CREATE TYPE intent_type AS ENUM ('START', 'QUESTION', 'DOUBT', 'FAITH', 'PRAYER', 'SHABBAT', 'MITZVOT', 'TESHUVA', 'GROWTH', 'FALL', 'GUILT', 'MEANING', 'RELATIONSHIP', 'FAMILY', 'COMMUNITY', 'LONELINESS', 'GRIEF', 'GUIDANCE', 'HELP', 'LEARNING', 'ACTION', 'TRACK');
CREATE TYPE relation_type AS ENUM ('RELATED', 'NEXT', 'DEEPER', 'ACTION', 'TRACK', 'STORY', 'HELP');

-- Profiles (extends auth.users)
CREATE TABLE profiles (
    id UUID PRIMARY KEY, -- References auth.users
    current_stage user_stage,
    current_topic TEXT,
    current_intent intent_type,
    completed_content UUID[] DEFAULT '{}',
    saved_content UUID[] DEFAULT '{}',
    completed_actions TEXT[] DEFAULT '{}',
    recent_queries TEXT[] DEFAULT '{}',
    recent_topics TEXT[] DEFAULT '{}',
    preferred_duration TEXT,
    returning_user BOOLEAN DEFAULT FALSE,
    last_active TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Unified Content Items (Base Table)
CREATE TABLE content_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type TEXT NOT NULL, -- 'QUESTION', 'GUIDE', 'TRACK', 'BOOSTER', 'STORY'
    title TEXT NOT NULL,
    slug TEXT UNIQUE,
    summary TEXT,
    body TEXT,
    category TEXT,
    tags TEXT[] DEFAULT '{}',
    stage user_stage,
    intent intent_type,
    status content_status DEFAULT 'DRAFT',
    reading_time INTEGER,
    difficulty TEXT,
    seo_title TEXT,
    seo_description TEXT,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Specific Content Type Tables (1:1 with content_items)
CREATE TABLE questions (
    id UUID PRIMARY KEY REFERENCES content_items(id) ON DELETE CASCADE,
    short_answer TEXT,
    full_answer TEXT,
    practical_step TEXT
);

CREATE TABLE guides (
    id UUID PRIMARY KEY REFERENCES content_items(id) ON DELETE CASCADE,
    hero_title TEXT,
    hero_description TEXT,
    intro TEXT,
    takeaway TEXT,
    practical_action TEXT,
    faq JSONB DEFAULT '[]'::jsonb
);

CREATE TABLE tracks (
    id UUID PRIMARY KEY REFERENCES content_items(id) ON DELETE CASCADE,
    description TEXT,
    goal TEXT,
    duration_days INTEGER NOT NULL,
    cover_image TEXT,
    completion_message TEXT,
    next_track UUID REFERENCES tracks(id)
);

CREATE TABLE track_days (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    track_id UUID REFERENCES tracks(id) ON DELETE CASCADE,
    day_number INTEGER NOT NULL,
    title TEXT NOT NULL,
    intro TEXT,
    content TEXT NOT NULL,
    action TEXT NOT NULL,
    reflection TEXT,
    micro_goal TEXT,
    estimated_minutes INTEGER
);

CREATE TABLE boosters (
    id UUID PRIMARY KEY REFERENCES content_items(id) ON DELETE CASCADE,
    action TEXT,
    mood TEXT
);

CREATE TABLE stories (
    id UUID PRIMARY KEY REFERENCES content_items(id) ON DELETE CASCADE,
    excerpt TEXT,
    topic TEXT
);

-- Sources and Help Resources
CREATE TABLE sources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type TEXT,
    author TEXT,
    book TEXT,
    chapter TEXT,
    section TEXT,
    quote TEXT NOT NULL,
    url TEXT,
    verified BOOLEAN DEFAULT FALSE,
    verified_by UUID REFERENCES profiles(id),
    review_status content_status DEFAULT 'DRAFT',
    notes TEXT
);

CREATE TABLE help_resources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    description TEXT,
    topics TEXT[] DEFAULT '{}',
    availability TEXT,
    contact_method TEXT NOT NULL,
    language TEXT,
    location TEXT,
    professional_type TEXT,
    verified BOOLEAN DEFAULT FALSE,
    active BOOLEAN DEFAULT TRUE,
    review_status content_status DEFAULT 'DRAFT'
);

-- Content Relations (The Graph)
CREATE TABLE content_relations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_content_id UUID REFERENCES content_items(id) ON DELETE CASCADE,
    target_content_id UUID REFERENCES content_items(id) ON DELETE CASCADE,
    relation_type relation_type NOT NULL,
    priority INTEGER DEFAULT 0,
    UNIQUE(source_content_id, target_content_id, relation_type)
);

-- User Tracking & Progress
CREATE TABLE user_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    track_id UUID REFERENCES tracks(id) ON DELETE CASCADE,
    current_day INTEGER DEFAULT 1,
    completed BOOLEAN DEFAULT FALSE,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(user_id, track_id)
);

CREATE TABLE user_activity (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    event TEXT NOT NULL,
    content_id UUID REFERENCES content_items(id) ON DELETE SET NULL,
    track_id UUID REFERENCES tracks(id) ON DELETE SET NULL,
    query TEXT,
    metadata JSONB,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Content Gaps & Analytics
CREATE TABLE content_gaps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    query TEXT NOT NULL,
    count INTEGER DEFAULT 1,
    intent intent_type,
    topic TEXT,
    matched_content UUID[],
    success_rate DECIMAL,
    priority TEXT,
    suggested_content_type TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI Sessions
CREATE TABLE ai_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_message TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    current_topic TEXT,
    current_intent intent_type,
    current_stage user_stage,
    resolved BOOLEAN DEFAULT FALSE,
    human_handoff BOOLEAN DEFAULT FALSE
);

CREATE TABLE ai_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES ai_sessions(id) ON DELETE CASCADE,
    role TEXT NOT NULL, -- 'user' or 'assistant'
    content TEXT NOT NULL,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
