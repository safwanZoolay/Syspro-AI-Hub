'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { getIcon, ArrowLeft, Upload, Loader2, Zap } from '@/lib/icons';
import { Agent, InputField } from '@/types/agent';
import { categories } from '@/config/agents';

interface DynamicFormProps {
  agent: Agent;
  onSubmit: (data: Record<string, unknown>) => void;
  onBack: () => void;
  isSubmitting?: boolean;
}

export function DynamicForm({ agent, onSubmit, onBack, isSubmitting }: DynamicFormProps) {
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const IconComponent = getIcon(agent.icon);
  const categoryColor = categories.find((c) => c.id === agent.categoryId)?.color || '#0090B5';

  const handleChange = (name: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    const newErrors: Record<string, string> = {};
    agent.inputs.forEach((input) => {
      if (input.required && !formData[input.name]) {
        newErrors[input.name] = `${input.label} is required`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
  };

  const renderInput = (input: InputField, index: number) => {
    const baseInputClass = `
      w-full px-4 py-3 rounded-lg
      bg-background-surface border border-border
      text-foreground placeholder-foreground-muted
      focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary
      transition-all duration-200
    `;

    return (
      <motion.div
        key={input.name}
        className="space-y-2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 }}
      >
        <label className="block text-sm font-medium text-foreground">
          {input.label}
          {input.required && <span className="text-error ml-1">*</span>}
        </label>

        {input.description && (
          <p className="text-xs text-foreground-muted">{input.description}</p>
        )}

        {input.type === 'text' && (
          <input
            type="text"
            className={baseInputClass}
            placeholder={input.placeholder}
            value={(formData[input.name] as string) || ''}
            onChange={(e) => handleChange(input.name, e.target.value)}
          />
        )}

        {input.type === 'number' && (
          <input
            type="number"
            className={baseInputClass}
            placeholder={input.placeholder}
            value={(formData[input.name] as number) || ''}
            onChange={(e) => handleChange(input.name, e.target.valueAsNumber)}
          />
        )}

        {input.type === 'textarea' && (
          <textarea
            className={`${baseInputClass} resize-none`}
            placeholder={input.placeholder}
            rows={input.rows || 4}
            value={(formData[input.name] as string) || ''}
            onChange={(e) => handleChange(input.name, e.target.value)}
          />
        )}

        {input.type === 'select' && (
          <select
            className={baseInputClass}
            value={(formData[input.name] as string) || ''}
            onChange={(e) => handleChange(input.name, e.target.value)}
          >
            <option value="">{input.placeholder || 'Select an option'}</option>
            {input.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}

        {input.type === 'file' && (
          <div className="relative">
            <input
              type="file"
              className="hidden"
              id={`file-${input.name}`}
              accept={input.accept}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  handleChange(input.name, file);
                }
              }}
            />
            <label
              htmlFor={`file-${input.name}`}
              className={`
                ${baseInputClass} cursor-pointer flex items-center gap-3
                hover:border-primary/50
              `}
            >
              <Upload size={20} className="text-foreground-muted" />
              <span className="text-foreground-muted">
                {(formData[input.name] as File)?.name || 'Choose file...'}
              </span>
            </label>
          </div>
        )}

        {errors[input.name] && (
          <motion.p
            className="text-sm text-error"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {errors[input.name]}
          </motion.p>
        )}
      </motion.div>
    );
  };

  return (
    <motion.div
      className="w-full max-w-xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      {/* Header */}
      <motion.div
        className="flex items-center gap-4 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
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
          <IconComponent size={24} style={{ color: categoryColor }} />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-foreground">{agent.name}</h2>
          <p className="text-sm text-foreground-secondary">{agent.description}</p>
        </div>
      </motion.div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {agent.inputs.map((input, index) => renderInput(input, index))}

        {/* Submit button */}
        <motion.div
          className="pt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: agent.inputs.length * 0.1 }}
        >
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className={`
              w-full py-4 rounded-lg font-semibold text-white
              transition-all duration-300 relative overflow-hidden
              ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-lg'}
            `}
            style={{
              background: `linear-gradient(135deg, ${categoryColor}, ${categoryColor}CC)`,
              boxShadow: `0 4px 20px ${categoryColor}40`,
            }}
            whileHover={!isSubmitting ? { scale: 1.02, boxShadow: `0 6px 30px ${categoryColor}60` } : {}}
            whileTap={!isSubmitting ? { scale: 0.98 } : {}}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  <Loader2 size={20} />
                </motion.span>
                Initiating...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <Zap size={20} />
                Execute Agent
              </span>
            )}

            {/* Animated gradient overlay */}
            <motion.div
              className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity"
              style={{
                background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)`,
              }}
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          </motion.button>
        </motion.div>
      </form>
    </motion.div>
  );
}
