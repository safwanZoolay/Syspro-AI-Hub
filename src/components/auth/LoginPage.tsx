'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, LogIn, Monitor, ArrowRight, Sparkles } from 'lucide-react';
import { useAppStore } from '@/store/app-store';

export function LoginPage() {
  const { setIsAuthenticated } = useAppStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsAuthenticated(true);
  };

  const handleWindowsLogin = async () => {
    setIsLoading(true);
    // Simulate Windows SSO
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsAuthenticated(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin(e);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-animated">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Radial gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(0, 144, 181, 0.08) 0%, transparent 50%)',
          }}
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />

        {/* Animated particles */}
        {[
          { left: 10, top: 20, duration: 3.5, delay: 0.2 },
          { left: 25, top: 80, duration: 4.2, delay: 1.1 },
          { left: 40, top: 15, duration: 3.8, delay: 0.5 },
          { left: 55, top: 70, duration: 4.5, delay: 1.8 },
          { left: 70, top: 30, duration: 3.2, delay: 0.8 },
          { left: 85, top: 60, duration: 4.0, delay: 1.4 },
          { left: 15, top: 50, duration: 3.6, delay: 0.3 },
          { left: 90, top: 55, duration: 4.4, delay: 1.9 },
        ].map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/30"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      {/* Login card */}
      <motion.div
        className="relative z-10 w-full max-w-md mx-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo and header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            className="inline-flex items-center justify-center px-6 py-4 rounded-2xl mb-4"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.9))',
              border: '1px solid rgba(0, 144, 181, 0.3)',
              boxShadow: '0 0 40px rgba(0, 144, 181, 0.2)',
            }}
            animate={{
              boxShadow: [
                '0 0 20px rgba(0, 144, 181, 0.2)',
                '0 0 40px rgba(0, 144, 181, 0.3)',
                '0 0 20px rgba(0, 144, 181, 0.2)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <img
              src="/syspro-logo.svg"
              alt="SYSPRO"
              className="h-10 w-auto"
            />
          </motion.div>
          <h1 className="text-2xl font-bold text-foreground mb-2">AI Hub</h1>
          <p className="text-foreground-muted text-sm">Agent Orchestration Platform</p>
        </motion.div>

        {/* Login form card */}
        <motion.div
          className="bg-background-surface/80 backdrop-blur-xl rounded-2xl border border-border p-8"
          style={{
            boxShadow: '0 0 60px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 144, 181, 0.1)',
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground-secondary">Email</label>
              <div className="relative">
                <User
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground-muted"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-3 bg-background rounded-xl border border-border text-foreground placeholder-foreground-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                />
              </div>
            </div>

            {/* Password field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground-secondary">Password</label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground-muted"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-4 py-3 bg-background rounded-xl border border-border text-foreground placeholder-foreground-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                />
              </div>
            </div>

            {/* Login button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium text-white transition-all disabled:opacity-50"
              style={{
                background: 'linear-gradient(135deg, #0090B5, #006d8a)',
                boxShadow: '0 4px 20px rgba(0, 144, 181, 0.3)',
              }}
              whileHover={{ scale: 1.02, boxShadow: '0 6px 30px rgba(0, 144, 181, 0.4)' }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? (
                <motion.div
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
              ) : (
                <>
                  <LogIn size={18} />
                  Sign In
                </>
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-foreground-muted">or continue with</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Windows login */}
          <motion.button
            onClick={handleWindowsLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl font-medium bg-background hover:bg-background-elevated border border-border text-foreground transition-all disabled:opacity-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Monitor size={18} className="text-primary" />
            Sign in with Windows
            <ArrowRight size={16} className="text-foreground-muted ml-auto" />
          </motion.button>
        </motion.div>

        {/* Footer */}
        <motion.p
          className="text-center text-xs text-foreground-muted mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Powered by Safwan Zoolay
        </motion.p>
      </motion.div>

      {/* Decorative orb in background */}
      <motion.div
        className="absolute z-0 w-96 h-96 rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(0, 144, 181, 0.3) 0%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}
