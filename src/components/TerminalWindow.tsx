import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface TerminalWindowProps {
  title?: string;
  className?: string;
  autoType?: boolean;
  content?: string[];
}

export const TerminalWindow = ({ 
  title = "CYBORG_CATS.exe", 
  className,
  autoType = false,
  content = [
    "Initializing Cyborg Cats Protocol...",
    "Loading team data... [OK]",
    "Connecting to FRC database... [OK]", 
    "Status: ACTIVE • Team: 4256 • Location: St. Louis, MO",
    "Mission: Building robots, building futures.",
    "System ready. Welcome to the future."
  ]
}: TerminalWindowProps) => {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);

  useEffect(() => {
    if (!autoType || currentLine >= content.length) return;

    const timer = setTimeout(() => {
      const line = content[currentLine];
      
      if (currentChar < line.length) {
        setDisplayedLines(prev => {
          const newLines = [...prev];
          newLines[currentLine] = line.substring(0, currentChar + 1);
          return newLines;
        });
        setCurrentChar(currentChar + 1);
      } else {
        // Move to next line
        setTimeout(() => {
          setCurrentLine(currentLine + 1);
          setCurrentChar(0);
        }, 1000);
      }
    }, 50 + Math.random() * 100); // Variable typing speed

    return () => clearTimeout(timer);
  }, [autoType, content, currentLine, currentChar]);

  return (
    <div className={cn(
      "bg-black border-2 border-green-400 rounded-lg overflow-hidden shadow-[0_0_20px_rgba(0,255,0,0.3)]",
      className
    )}>
      {/* Terminal header */}
      <div className="bg-green-400/20 border-b border-green-400/50 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400 animate-pulse"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
        </div>
        <span className="text-green-400 font-mono text-sm">{title}</span>
        <div className="w-16"></div>
      </div>

      {/* Terminal content */}
      <div className="p-4 font-mono text-sm text-green-400 min-h-[200px]">
        {autoType ? (
          <div>
            {displayedLines.map((line, index) => (
              <div key={index} className="mb-1">
                <span className="text-green-600">{'>'}</span> {line}
                {index === currentLine && currentChar === content[currentLine]?.length && (
                  <span className="animate-[terminal-blink_1s_infinite] ml-1">_</span>
                )}
              </div>
            ))}
            {currentLine < content.length && currentChar === 0 && (
              <div>
                <span className="text-green-600">{'>'}</span>
                <span className="animate-[terminal-blink_1s_infinite] ml-1">_</span>
              </div>
            )}
          </div>
        ) : (
          <div>
            {content.map((line, index) => (
              <div key={index} className="mb-1">
                <span className="text-green-600">{'>'}</span> {line}
              </div>
            ))}
            <div>
              <span className="text-green-600">{'>'}</span>
              <span className="animate-[terminal-blink_1s_infinite] ml-1">_</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};