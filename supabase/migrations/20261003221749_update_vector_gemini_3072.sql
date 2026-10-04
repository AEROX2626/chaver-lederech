-- Drop the old function
drop function if exists match_content_items(vector(768), float, int);
drop function if exists match_content_items(vector(1536), float, int);

-- Change the embedding column to 3072 dimensions for Gemini
alter table content_items drop column if exists embedding;
alter table content_items add column embedding vector(3072);

-- Create the new function for 3072 dimensions
create or replace function match_content_items (
  query_embedding vector(3072),
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
  where content_items.status = 'PUBLISHED' 
  and 1 - (content_items.embedding <=> query_embedding) > match_threshold
  order by (content_items.embedding <=> query_embedding) asc
  limit match_count;
$$;
