import { useState, useEffect, useMemo } from 'react';
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, Filter, Calendar, Users, Award, Zap, FileText, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: 'pages' | 'team' | 'competitions' | 'news' | 'achievements';
  url: string;
  tags: string[];
  priority: number;
}

// Mock search data - in a real app, this would come from an API
const searchData: SearchResult[] = [
  {
    id: '1',
    title: 'About Our Team',
    description: 'Learn about Cyborg Cats 4256 and our mission',
    category: 'pages',
    url: '/about',
    tags: ['team', 'mission', 'history'],
    priority: 1
  },
  {
    id: '2',
    title: 'Competition Results',
    description: '2025 FIRST Impact Award winners and competition history',
    category: 'competitions',
    url: '/competitions',
    tags: ['awards', 'competitions', 'results', 'impact award'],
    priority: 2
  },
  {
    id: '4',
    title: 'Community Impact',
    description: 'Our outreach programs and STEM education initiatives',
    category: 'pages',
    url: '/impact',
    tags: ['community', 'outreach', 'STEM', 'education'],
    priority: 2
  },
  {
    id: '5',
    title: 'Sponsors & Partners',
    description: 'Companies and organizations supporting our mission',
    category: 'pages',
    url: '/sponsors',
    tags: ['sponsors', 'partners', 'support'],
    priority: 3
  },
  {
    id: '6',
    title: 'Contact Information',
    description: 'Get in touch with our team',
    category: 'pages',
    url: '/contact',
    tags: ['contact', 'email', 'location'],
    priority: 3
  },
  {
    id: '7',
    title: 'Competition Analytics',
    description: 'Interactive charts and performance metrics',
    category: 'competitions',
    url: '/analytics',
    tags: ['analytics', 'data', 'performance', 'metrics'],
    priority: 2
  }
];

const categoryIcons = {
  pages: FileText,
  team: Users,
  competitions: Award,
  news: Calendar,
  achievements: Zap
};

const categoryColors = {
  pages: 'bg-blue-500/20 text-blue-400',
  team: 'bg-green-500/20 text-green-400',
  competitions: 'bg-yellow-500/20 text-yellow-400',
  news: 'bg-purple-500/20 text-purple-400',
  achievements: 'bg-orange-500/20 text-orange-400'
};

export const SmartSearch = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const navigate = useNavigate();

  const filteredResults = useMemo(() => {
    let results = searchData;

    // Filter by query
    if (query) {
      results = results.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory) {
      results = results.filter(item => item.category === selectedCategory);
    }

    // Sort by priority and relevance
    return results.sort((a, b) => {
      if (query) {
        const aRelevance = (
          (a.title.toLowerCase().includes(query.toLowerCase()) ? 10 : 0) +
          (a.description.toLowerCase().includes(query.toLowerCase()) ? 5 : 0) +
          a.tags.filter(tag => tag.toLowerCase().includes(query.toLowerCase())).length
        );
        const bRelevance = (
          (b.title.toLowerCase().includes(query.toLowerCase()) ? 10 : 0) +
          (b.description.toLowerCase().includes(query.toLowerCase()) ? 5 : 0) +
          b.tags.filter(tag => tag.toLowerCase().includes(query.toLowerCase())).length
        );
        
        if (aRelevance !== bRelevance) return bRelevance - aRelevance;
      }
      
      return a.priority - b.priority;
    });
  }, [query, selectedCategory]);

  // Keyboard shortcut to open search
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(true);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const handleSelect = (result: SearchResult) => {
    setOpen(false);
    navigate(result.url);
  };

  const categories = Array.from(new Set(searchData.map(item => item.category)));

  return (
    <>
      {/* Search Trigger Button */}
      <Button
        variant="outline"
        className="relative w-full max-w-sm justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 h-4 w-4" />
        <span className="hidden lg:inline-flex">Search...</span>
        <span className="inline-flex lg:hidden">Search</span>
        <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <div className="flex items-center border-b px-3">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <CommandInput
            placeholder="Search pages, team members, competitions..."
            value={query}
            onValueChange={setQuery}
            className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 p-3 border-b">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <div className="flex flex-wrap gap-1">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(null)}
              className="h-6 text-xs"
            >
              All
            </Button>
            {categories.map((category) => {
              const Icon = categoryIcons[category as keyof typeof categoryIcons];
              return (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="h-6 text-xs"
                >
                  <Icon className="mr-1 h-3 w-3" />
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Button>
              );
            })}
          </div>
        </div>

        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          
          {categories.map((category) => {
            const categoryResults = filteredResults.filter(item => item.category === category);
            if (categoryResults.length === 0) return null;

            const Icon = categoryIcons[category as keyof typeof categoryIcons];
            
            return (
              <CommandGroup key={category} heading={
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </div>
              }>
                {categoryResults.map((result) => (
                  <CommandItem
                    key={result.id}
                    value={result.title}
                    onSelect={() => handleSelect(result)}
                    className="flex items-center justify-between p-3 cursor-pointer hover:bg-accent/50"
                  >
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{result.title}</span>
                        <Badge 
                          variant="secondary" 
                          className={`text-xs ${categoryColors[result.category as keyof typeof categoryColors]}`}
                        >
                          {result.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{result.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {result.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </CommandItem>
                ))}
              </CommandGroup>
            );
          })}
        </CommandList>
      </CommandDialog>
    </>
  );
};