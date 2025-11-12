-- Add length constraints for user-submitted text fields

-- Photo captions (500 characters max)
ALTER TABLE public.user_photos 
ADD CONSTRAINT user_photos_caption_length_check 
CHECK (caption IS NULL OR length(caption) <= 500);

-- Message content (5000 characters max)
ALTER TABLE public.messages 
ADD CONSTRAINT messages_content_length_check 
CHECK (length(content) <= 5000);

-- Report descriptions (1000 characters max)
ALTER TABLE public.reports 
ADD CONSTRAINT reports_description_length_check 
CHECK (description IS NULL OR length(description) <= 1000);

-- Report reasons (500 characters max)
ALTER TABLE public.reports 
ADD CONSTRAINT reports_reason_length_check 
CHECK (length(reason) <= 500);

-- Contact form messages (2000 characters max)
ALTER TABLE public.contacts 
ADD CONSTRAINT contacts_message_length_check 
CHECK (length(message) <= 2000);

-- Contact form names (100 characters max)
ALTER TABLE public.contacts 
ADD CONSTRAINT contacts_name_length_check 
CHECK (length(name) <= 100);

-- Contact form subjects (200 characters max)
ALTER TABLE public.contacts 
ADD CONSTRAINT contacts_subject_length_check 
CHECK (length(subject) <= 200);

-- Resource descriptions (2000 characters max)
ALTER TABLE public.resources 
ADD CONSTRAINT resources_description_length_check 
CHECK (length(description) <= 2000);

-- Resource titles (200 characters max)
ALTER TABLE public.resources 
ADD CONSTRAINT resources_title_length_check 
CHECK (length(title) <= 200);

-- Profile bios (1000 characters max)
ALTER TABLE public.profiles 
ADD CONSTRAINT profiles_bio_length_check 
CHECK (bio IS NULL OR length(bio) <= 1000);

-- News post excerpts (500 characters max)
ALTER TABLE public.news_posts 
ADD CONSTRAINT news_posts_excerpt_length_check 
CHECK (excerpt IS NULL OR length(excerpt) <= 500);