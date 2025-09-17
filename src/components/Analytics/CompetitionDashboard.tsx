import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Award, Target, TrendingUp, Users, Zap, Star, Calendar } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { EnhancedCard } from '@/components/EnhancedCard';
import { AnimatedNumber } from '@/components/AnimatedNumber';

// Mock competition data
const competitionResults = [
  { year: '2020', rank: 15, points: 245, matches: 12, wins: 8 },
  { year: '2021', rank: 8, points: 312, matches: 14, wins: 11 },
  { year: '2022', rank: 12, points: 289, matches: 13, wins: 9 },
  { year: '2023', rank: 6, points: 378, matches: 15, wins: 12 },
  { year: '2024', rank: 3, points: 425, matches: 16, wins: 14 },
  { year: '2025', rank: 1, points: 485, matches: 18, wins: 16 }
];

const robotPerformance = [
  { name: 'Autonomous', score: 85, target: 90 },
  { name: 'Teleop', score: 92, target: 95 },
  { name: 'Endgame', score: 78, target: 85 },
  { name: 'Defense', score: 88, target: 90 },
  { name: 'Strategy', score: 95, target: 95 }
];

const teamSkillsData = [
  { skill: 'Programming', value: 35, color: '#0082c9' },
  { skill: 'Mechanical', value: 28, color: '#00beff' },
  { skill: 'Electrical', value: 20, color: '#40e0ff' },
  { skill: 'CAD Design', value: 17, color: '#87ceeb' }
];

const awards = [
  { name: 'Impact Award', year: 2025, level: 'Regional', icon: Trophy },
  { name: 'Excellence in Engineering', year: 2024, level: 'District', icon: Award },
  { name: 'Innovation in Control', year: 2024, level: 'Regional', icon: Zap },
  { name: 'Gracious Professionalism', year: 2023, level: 'District', icon: Star }
];

export const CompetitionDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="w-full space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-orbitron font-bold text-glow">Competition Analytics</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Track our robot performance, competition results, and team growth over the years
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Trophy className="w-4 h-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="trends" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Trends
          </TabsTrigger>
          <TabsTrigger value="awards" className="flex items-center gap-2">
            <Award className="w-4 h-4" />
            Awards
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <EnhancedCard className="text-center">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-orbitron text-primary">
                  <AnimatedNumber value={485} />
                </CardTitle>
                <CardDescription>Total Competition Points</CardDescription>
              </CardHeader>
            </EnhancedCard>
            
            <EnhancedCard className="text-center">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-orbitron text-primary">
                  <AnimatedNumber value={1} />
                </CardTitle>
                <CardDescription>Current Regional Rank</CardDescription>
              </CardHeader>
            </EnhancedCard>
            
            <EnhancedCard className="text-center">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-orbitron text-primary">
                  <AnimatedNumber value={16} />
                </CardTitle>
                <CardDescription>Matches Won This Season</CardDescription>
              </CardHeader>
            </EnhancedCard>
            
            <EnhancedCard className="text-center">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-orbitron text-primary">
                  <AnimatedNumber value={89} />%
                </CardTitle>
                <CardDescription>Win Rate</CardDescription>
              </CardHeader>
            </EnhancedCard>
          </div>

          {/* Competition Results Chart */}
          <EnhancedCard>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Competition Performance Over Time
              </CardTitle>
              <CardDescription>Our ranking and points progression across seasons</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={competitionResults}>
                  <defs>
                    <linearGradient id="pointsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0082c9" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#0082c9" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="points" 
                    stroke="#0082c9" 
                    strokeWidth={2}
                    fill="url(#pointsGradient)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </EnhancedCard>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Robot Performance Metrics */}
            <EnhancedCard>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Robot Performance Analysis
                </CardTitle>
                <CardDescription>Current season performance vs targets</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {robotPerformance.map((metric) => (
                  <div key={metric.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{metric.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {metric.score}% / {metric.target}%
                      </span>
                    </div>
                    <Progress value={metric.score} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </EnhancedCard>

            {/* Team Skills Distribution */}
            <EnhancedCard>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Team Skills Distribution
                </CardTitle>
                <CardDescription>Member expertise across technical areas</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={teamSkillsData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {teamSkillsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {teamSkillsData.map((skill) => (
                    <div key={skill.skill} className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: skill.color }}
                      />
                      <span className="text-sm">{skill.skill}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </EnhancedCard>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          {/* Match Wins Trend */}
          <EnhancedCard>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Match Performance Trends
              </CardTitle>
              <CardDescription>Win rate and ranking progression</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={competitionResults}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="wins" 
                    stroke="#0082c9" 
                    strokeWidth={3}
                    dot={{ fill: '#0082c9', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </EnhancedCard>
        </TabsContent>

        <TabsContent value="awards" className="space-y-6">
          {/* Awards Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {awards.map((award, index) => {
              const IconComponent = award.icon;
              return (
                <EnhancedCard key={index} className="hover:scale-105 transition-transform">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <IconComponent className="w-8 h-8 text-primary" />
                      <Badge variant="secondary">{award.level}</Badge>
                    </div>
                    <CardTitle className="text-lg">{award.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {award.year}
                    </CardDescription>
                  </CardHeader>
                </EnhancedCard>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};