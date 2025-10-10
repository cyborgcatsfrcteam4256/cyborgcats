-- Seed team_members table with sample data

-- Insert team leadership
INSERT INTO public.team_members (name, role, bio, display_order, is_active) VALUES
('Sarah Johnson', 'Team Captain', 'Senior at Westminster Christian Academy. Leading the team for 2 years with a focus on mechanical design and team coordination.', 1, true),
('Michael Chen', 'Programming Lead', 'Passionate about autonomous systems and computer vision. Leads our software development team.', 2, true),
('Emma Rodriguez', 'Mechanical Lead', 'Expert in CAD design and fabrication. Designs and builds key robot mechanisms.', 3, true),
('David Park', 'Electrical Lead', 'Specializes in circuit design and robot wiring. Ensures all systems work seamlessly.', 4, true),
('Jessica Martinez', 'Business Lead', 'Manages sponsorships, fundraising, and community outreach initiatives.', 5, true);

-- Insert mentors
INSERT INTO public.team_members (name, role, bio, display_order, is_active) VALUES
('Dr. Robert Thompson', 'Lead Mentor', 'Aerospace engineer with 15 years of experience. Guides students in mechanical design and project management.', 10, true),
('Lisa Anderson', 'Programming Mentor', 'Software engineer at Boeing. Mentors students in Java programming and autonomous systems.', 11, true),
('James Wilson', 'Business Mentor', 'Marketing director and WCA parent. Helps with fundraising and community partnerships.', 12, true);

-- Insert student members from different departments
INSERT INTO public.team_members (name, role, bio, display_order, is_active) VALUES
('Alex Thompson', 'Mechanical Team', 'Junior specializing in drivetrain design and fabrication.', 20, true),
('Olivia Davis', 'Programming Team', 'Sophomore focused on vision processing and autonomous navigation.', 21, true),
('Nathan Wright', 'Electrical Team', 'Junior working on sensors and control systems.', 22, true),
('Sophia Lee', 'Business Team', 'Senior managing social media and sponsorship outreach.', 23, true),
('Ethan Brown', 'Mechanical Team', 'Freshman learning CAD and machine shop operations.', 24, true),
('Isabella Garcia', 'Programming Team', 'Junior developing teleoperated control systems.', 25, true),
('Mason Clark', 'Electrical Team', 'Sophomore specializing in pneumatics and power distribution.', 26, true),
('Ava Miller', 'Business Team', 'Junior coordinating community outreach events.', 27, true);