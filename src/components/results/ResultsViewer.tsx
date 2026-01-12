'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  getIcon,
  ArrowLeft,
  CheckCircle2,
  RefreshCw,
  FileText,
  Code,
  ScrollText,
  Download,
  Check,
  Copy,
  FileCode,
  FileX,
} from '@/lib/icons';
import ReactMarkdown from 'react-markdown';
import { ExecutionResult, Agent } from '@/types/agent';
import { categories } from '@/config/agents';
import { LucideIcon } from 'lucide-react';

interface ResultsViewerProps {
  result: ExecutionResult;
  agent: Agent;
  onNewExecution: () => void;
  onBack: () => void;
}

type TabId = 'summary' | 'content' | 'files';

export function ResultsViewer({ result, agent, onNewExecution, onBack }: ResultsViewerProps) {
  const [activeTab, setActiveTab] = useState<TabId>('summary');
  const [copiedContent, setCopiedContent] = useState(false);

  const AgentIcon = getIcon(agent.icon);
  const categoryColor = categories.find((c) => c.id === agent.categoryId)?.color || '#0090B5';

  const tabs: { id: TabId; label: string; icon: LucideIcon }[] = [
    { id: 'summary', label: 'Summary', icon: FileText },
    { id: 'content', label: result.type === 'code' ? 'Code' : 'Content', icon: result.type === 'code' ? Code : ScrollText },
    { id: 'files', label: 'Files', icon: Download },
  ];

  const handleCopy = async (content: string) => {
    await navigator.clipboard.writeText(content);
    setCopiedContent(true);
    setTimeout(() => setCopiedContent(false), 2000);
  };

  return (
    <motion.div
      className="w-full max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      {/* Header */}
      <motion.div
        className="flex items-center justify-between mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-4">
          <motion.button
            onClick={onBack}
            className="p-2 rounded-lg hover:bg-background-surface transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={20} className="text-foreground-secondary" />
          </motion.button>

          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${categoryColor}20, ${categoryColor}40)`,
              border: `2px solid ${categoryColor}60`,
            }}
          >
            <AgentIcon size={24} style={{ color: categoryColor }} />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
              {agent.name}
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-success/20 text-success text-xs">
                <CheckCircle2 size={12} />
                Complete
              </span>
            </h2>
            <p className="text-sm text-foreground-secondary">Results ready</p>
          </div>
        </div>

        <motion.button
          onClick={onNewExecution}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/20 text-primary hover:bg-primary/30 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <RefreshCw size={16} />
          Run Again
        </motion.button>
      </motion.div>

      {/* Tabs */}
      <motion.div
        className="flex gap-1 mb-6 p-1 bg-background-surface rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {tabs.map((tab) => {
          const TabIcon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-md
                font-medium text-sm transition-all duration-200
                ${isActive ? 'bg-background-elevated text-foreground shadow-sm' : 'text-foreground-secondary hover:text-foreground'}
              `}
            >
              <TabIcon size={16} />
              {tab.label}
            </button>
          );
        })}
      </motion.div>

      {/* Tab content */}
      <motion.div
        className="bg-background-surface rounded-lg border border-border overflow-hidden"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {/* Summary tab */}
        {activeTab === 'summary' && (
          <div className="p-6">
            <div className="prose prose-invert max-w-none">
              {result.summary ? (
                <ReactMarkdown>{result.summary}</ReactMarkdown>
              ) : (
                <p className="text-foreground-secondary">
                  Agent execution completed successfully. View the content tab for detailed results.
                </p>
              )}
            </div>
          </div>
        )}

        {/* Content tab */}
        {activeTab === 'content' && (
          <div className="relative">
            {/* Copy button */}
            {result.content && (
              <motion.button
                onClick={() => handleCopy(result.content!)}
                className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-md bg-background-elevated hover:bg-border transition-colors text-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {copiedContent ? (
                  <>
                    <Check size={14} className="text-success" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    Copy
                  </>
                )}
              </motion.button>
            )}

            <div className="p-6 max-h-[500px] overflow-y-auto">
              {result.type === 'code' ? (
                <pre className="font-mono text-sm text-foreground-secondary bg-background rounded-lg p-4 overflow-x-auto">
                  <code>{result.content || 'No code generated.'}</code>
                </pre>
              ) : (
                <div className="prose prose-invert max-w-none">
                  {result.content ? (
                    <ReactMarkdown>{result.content}</ReactMarkdown>
                  ) : (
                    <p className="text-foreground-secondary">No content available.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Files tab */}
        {activeTab === 'files' && (
          <div className="p-6">
            {result.files && result.files.length > 0 ? (
              <div className="space-y-3">
                {result.files.map((file, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg bg-background hover:bg-background-elevated transition-colors border border-border"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                        <FileCode size={20} className="text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{file.name}</p>
                        <p className="text-xs text-foreground-muted">{file.type}</p>
                      </div>
                    </div>
                    <motion.button
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/20 text-primary hover:bg-primary/30 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Download size={16} />
                      Download
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <FileX size={48} className="mx-auto text-foreground-muted mb-4" />
                <p className="text-foreground-secondary">No downloadable files for this execution.</p>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
