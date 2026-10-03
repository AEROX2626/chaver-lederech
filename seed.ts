import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { TRACKS_DB } from './src/data/tracks.js'; // Assuming we compile this or run with tsx

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing Supabase env vars");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function seed() {
  console.log("Seeding Tracks to Supabase...");
  
  for (const track of Object.values(TRACKS_DB)) {
    // 1. Insert into content_items
    const { data: contentData, error: contentError } = await supabase
      .from('content_items')
      .insert({
        type: 'TRACK',
        title: track.title,
        slug: track.id,
        summary: track.description,
        category: track.category,
        tags: track.tags,
        difficulty: track.difficulty,
        status: 'PUBLISHED'
      })
      .select('id')
      .single();

    if (contentError) {
      console.error(`Error inserting content_item for ${track.title}:`, contentError.message);
      continue;
    }
    const contentId = contentData.id;

    // 2. Insert into tracks
    const { error: trackError } = await supabase
      .from('tracks')
      .insert({
        id: contentId,
        description: track.description,
        goal: track.goal,
        duration_days: track.durationDays,
        completion_message: track.completionMessage
      });

    if (trackError) {
      console.error(`Error inserting track for ${track.title}:`, trackError.message);
      continue;
    }

    // 3. Insert track days
    if (track.days) {
      const daysToInsert = track.days.map(d => ({
        track_id: contentId,
        day_number: d.dayNumber,
        title: d.title,
        content: d.content,
        action: d.action,
        estimated_minutes: d.estimatedMinutes
      }));

      const { error: daysError } = await supabase
        .from('track_days')
        .insert(daysToInsert);

      if (daysError) {
        console.error(`Error inserting days for ${track.title}:`, daysError.message);
      }
    }
    
    console.log(`Successfully seeded track: ${track.title} (UUID: ${contentId})`);
  }
  console.log("Seeding complete!");
}

seed();
