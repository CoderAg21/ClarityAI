import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeContext';

export default function FeatureCard({ icon: Icon, title, description, delay = 0 }) {
  const { isDark } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -8, scale: 1.02 }}
      className={`group relative p-8 rounded-3xl backdrop-blur-xl transition-all duration-500 ${
        isDark
          ? 'bg-gradient-to-br from-white/10 to-white/5 border border-white/10 hover:border-purple-500/50'
          : 'bg-gradient-to-br from-white to-white/80 border border-slate-200/50 hover:border-indigo-300 shadow-xl shadow-slate-200/50'
      }`}
    >
      <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
        isDark
          ? 'bg-gradient-to-br from-indigo-600/10 to-purple-600/10'
          : 'bg-gradient-to-br from-indigo-100/50 to-purple-100/50'
      }`} />
      
      <div className="relative z-10">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
          isDark
            ? 'bg-gradient-to-br from-indigo-600 to-purple-600'
            : 'bg-gradient-to-br from-indigo-500 to-purple-500'
        }`}>
          <Icon className="w-7 h-7 text-white" />
        </div>
        
        <h3 className={`text-xl font-bold mb-3 ${
          isDark ? 'text-white' : 'text-slate-800'
        }`}>
          {title}
        </h3>
        
        <p className={`leading-relaxed ${
          isDark ? 'text-slate-300' : 'text-slate-600'
        }`}>
          {description}
        </p>
      </div>
    </motion.div>
  );
}