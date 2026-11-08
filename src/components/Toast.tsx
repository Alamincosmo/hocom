'use client';

import { useStore } from '@/store/useStore';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, X } from 'lucide-react';

export default function Toast() {
  const { toastMessage, clearToast } = useStore();

  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#282C3F] text-white px-5 py-3.5 rounded-lg shadow-2xl border border-slate-700/50 backdrop-blur-md max-w-sm"
        >
          <CheckCircle2 className="w-5 h-5 text-[#03A685] shrink-0" />
          <span className="text-sm font-medium">{toastMessage}</span>
          <button
            onClick={clearToast}
            className="ml-auto text-slate-400 hover:text-white p-1 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
