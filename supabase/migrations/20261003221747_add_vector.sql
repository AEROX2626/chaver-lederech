-- Enable the pgvector extension to work with embedding vectors
create extension if not exists vector;

-- Add an embedding column to our content_items table (using 1536 dimensions for OpenAI/standard embeddings)
alter table content_items add column if not exists embedding vector(1536);

-- Create a function to search for relevant content (Semantic Search)
create or replace function match_content_items (
  query_embedding vector(1536),
  match_threshold float,
  match_count int
)
returns table (
  id uuid,
  title text,
  type text,
  slug text,
  summary text,
  body text,
  similarity float
)
language sql stable
as $$
  select
    content_items.id,
    content_items.title,
    content_items.type,
    content_items.slug,
    content_items.summary,
    content_items.body,
    1 - (content_items.embedding <=> query_embedding) as similarity
  from content_items
  -- Only search published items
  where content_items.status = 'PUBLISHED' 
  and 1 - (content_items.embedding <=> query_embedding) > match_threshold
  order by (content_items.embedding <=> query_embedding) asc
  limit match_count;
$$;
