import React from 'react';
import { useTheme } from './ThemeContext';

export default function GradientBackground({ children, variant = 'primary', className = '' }) {
  const { isDark } = useTheme();

  const gradients = {
    primary: isDark 
      ? 'bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950'
      : 'bg-gradient-to-br from-white via-indigo-50 to-purple-50',
    hero: isDark
      ? 'bg-gradient-to-br from-slate-900 via-purple-950 to-indigo-950'
      : 'bg-gradient-to-br from-indigo-50 via-white to-purple-50',
    accent: isDark
      ? 'bg-gradient-to-br from-indigo-950 via-slate-900 to-rose-950'
      : 'bg-gradient-to-br from-purple-50 via-white to-rose-50',
    subtle: isDark
      ? 'bg-gradient-to-b from-slate-900 to-slate-800'
      : 'bg-gradient-to-b from-white to-slate-50',
    teal: isDark
      ? 'bg-gradient-to-br from-slate-900 via-teal-950 to-cyan-950'
      : 'bg-gradient-to-br from-teal-50 via-white to-cyan-50',
  };

  return (
    <div className={`min-h-screen ${gradients[variant]} transition-colors duration-500 ${className}`}>
      {children}
    </div>
  );
}