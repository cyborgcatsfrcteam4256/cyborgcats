import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ArrowRight, Calendar, Trophy, Users, Globe, Award } from 'lucide-react';

export const NewsSection = () => {
  const news = [
    {
      title: "Team Continues STEM Advocacy Work",
      excerpt: "Our team continues to engage with Missouri legislators about STEM education funding, building on our meetings with 19 representatives and the Lieutenant Governor to support bills that expand STEM opportunities statewide.",
      date: "March 15, 2025",
      category: "Outreach",
      featured: true,
      icon: Users,
      readTime: "3 min read"
    },
    {
      title: "New Competition Season Begins",
      excerpt: "The 2025 FIRST Robotics Competition season is underway. Our team is preparing for regional competitions with our new robot design and strategy.",
      date: "March 15, 2025", 
      category: "Competition",
      featured: false,
      icon: Award,
      readTime: "2 min read"
    },
    {
      title: "100th Woman in STEM Seminar Participant",
      excerpt: "We celebrated a major milestone as our Women in STEM seminars welcomed their 100th participant over the past three years. All of our business and engineering upper leadership is female.",
      date: "February 28, 2025",
      category: "Outreach",
      featured: false,
      icon: Users,
      readTime: "4 min read"
    },
    {
      title: "International STEM Impact: South Korea & Ethiopia",
      excerpt: "Helped establish South Korea's 4th FRC team at Samuel School and conducted STEM activities for 115 students in Ethiopia, addressing the gap where only 2 active FRC teams existed in all of Africa.",
      date: "February 10, 2025",
      category: "Partnership",
      featured: false,
      icon: Globe,
      readTime: "3 min read"
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Award": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "Competition": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Outreach": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "Partnership": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      default: return "bg-primary/20 text-primary border-primary/30";
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 circuit-pattern opacity-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between mb-16 animate-slide-up">
          <div>
            <Badge variant="outline" className="mb-4 font-orbitron">
              Latest Updates
            </Badge>
            <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-glow">
              Team News & Updates
            </h2>
            <p className="text-xl text-muted-foreground mt-4 font-inter">
              Stay up to date with our latest achievements and initiatives.
            </p>
          </div>
          <Button variant="cyber" size="lg" className="hidden md:flex">
            View All News
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Featured Article */}
          <Card className="lg:row-span-2 bg-card/80 backdrop-blur-lg border-border/50 overflow-hidden hover-glow transition-cyber interactive-card holographic-border">
            <div className="p-8 h-full flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <Badge className={getCategoryColor(news[0].category)}>
                  {React.createElement(news[0].icon, { className: "w-4 h-4 mr-2" })}
                  {news[0].category}
                </Badge>
                <span className="text-sm text-muted-foreground font-inter">Featured</span>
              </div>
              
              <h3 className="text-2xl font-orbitron font-bold mb-4 text-glow">
                {news[0].title}
              </h3>
              
              <p className="text-muted-foreground font-inter text-lg mb-6 flex-grow">
                {news[0].excerpt}
              </p>
              
              <div className="flex items-center justify-between pt-6 border-t border-border">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground font-inter">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{news[0].date}</span>
                  </div>
                  <span>•</span>
                  <span>{news[0].readTime}</span>
                </div>
                <Button variant="ghost" size="sm" className="group">
                  Read More
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Other Articles */}
          <div className="space-y-6">
            {news.slice(1).map((article, index) => (
              <Card 
                key={index} 
                className="p-6 bg-card/60 backdrop-blur-lg border-border/30 hover-glow transition-cyber"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center glow-subtle">
                    {React.createElement(article.icon, { className: "w-6 h-6 text-primary" })}
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex items-center space-x-3 mb-2">
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getCategoryColor(article.category)}`}
                      >
                        {article.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground font-inter">
                        {article.date}
                      </span>
                    </div>
                    
                    <h4 className="text-lg font-orbitron font-semibold mb-2 hover:text-primary transition-cyber">
                      {article.title}
                    </h4>
                    
                    <p className="text-sm text-muted-foreground font-inter mb-3">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground font-inter">
                        {article.readTime}
                      </span>
                      <Button variant="ghost" size="sm" className="text-xs p-0 h-auto">
                        Read More →
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Button variant="silver" size="lg" className="md:hidden">
            View All News
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};
