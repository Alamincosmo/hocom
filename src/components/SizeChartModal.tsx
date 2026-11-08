'use client';

import { X } from 'lucide-react';

interface SizeChartModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: string;
}

export default function SizeChartModal({ isOpen, onClose }: SizeChartModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 relative animate-scaleIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#535766] hover:text-[#282C3F] p-1 rounded-md hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-lg font-black text-[#282C3F] uppercase tracking-tight">
          Size & Fit Guide
        </h3>
        <p className="text-xs text-[#535766] mt-0.5">
          Garment measurements (Standard regular fit in Inches & Centimeters)
        </p>

        {/* Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-[#F5F5F6] text-[#282C3F] font-bold uppercase text-[11px] border-b border-[#EAEAEC]">
                <th className="p-3">Size</th>
                <th className="p-3">Chest (Inches)</th>
                <th className="p-3">Shoulder (Inches)</th>
                <th className="p-3">Length (Inches)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAEAEC] font-medium text-[#535766]">
              <tr className="hover:bg-pink-50/40">
                <td className="p-3 font-bold text-[#282C3F]">S</td>
                <td className="p-3">38.0&quot; (96 cm)</td>
                <td className="p-3">17.0&quot; (43 cm)</td>
                <td className="p-3">28.0&quot; (71 cm)</td>
              </tr>
              <tr className="hover:bg-pink-50/40">
                <td className="p-3 font-bold text-[#282C3F]">M</td>
                <td className="p-3">40.0&quot; (101 cm)</td>
                <td className="p-3">17.5&quot; (44 cm)</td>
                <td className="p-3">29.0&quot; (73 cm)</td>
              </tr>
              <tr className="hover:bg-pink-50/40">
                <td className="p-3 font-bold text-[#282C3F]">L</td>
                <td className="p-3">42.0&quot; (106 cm)</td>
                <td className="p-3">18.0&quot; (46 cm)</td>
                <td className="p-3">30.0&quot; (76 cm)</td>
              </tr>
              <tr className="hover:bg-pink-50/40">
                <td className="p-3 font-bold text-[#282C3F]">XL</td>
                <td className="p-3">44.0&quot; (112 cm)</td>
                <td className="p-3">18.5&quot; (47 cm)</td>
                <td className="p-3">30.5&quot; (77 cm)</td>
              </tr>
              <tr className="hover:bg-pink-50/40">
                <td className="p-3 font-bold text-[#282C3F]">XXL</td>
                <td className="p-3">46.0&quot; (117 cm)</td>
                <td className="p-3">19.0&quot; (48 cm)</td>
                <td className="p-3">31.0&quot; (79 cm)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-5 p-3 bg-slate-50 rounded-lg text-[11px] text-[#535766] space-y-1">
          <p>• <strong>How to measure:</strong> Measure around the fullest part of your chest, keeping the tape horizontal.</p>
          <p>• Hassle-free 14-day exchange available if the size doesn&apos;t fit your silhouette.</p>
        </div>

        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="bg-[#282C3F] text-white font-bold text-xs px-6 py-2 rounded uppercase tracking-wider hover:bg-black transition"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
}
