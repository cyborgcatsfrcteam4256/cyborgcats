-- Enable realtime for news_posts table so homepage updates automatically
ALTER PUBLICATION supabase_realtime ADD TABLE public.news_posts;