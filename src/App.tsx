/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import { 
  Chart as ChartJS, 
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title,
  Filler
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import { motion } from 'motion/react';
import { 
  Leaf, 
  Users, 
  ShieldCheck, 
  TrendingUp, 
  CircleCheck, 
  User, 
  Clock,
  ArrowUpRight,
  Target
} from 'lucide-react';

ChartJS.register(
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title,
  Filler
);

// --- Styled Components & Helpers ---

const Card = ({ children, title, icon: Icon, accentColor, footer }: { 
  children: React.ReactNode, 
  title: string, 
  icon: any, 
  accentColor: string,
  footer?: string
}) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.98 }}
    animate={{ opacity: 1, scale: 1 }}
    className="bg-card border border-white/5 rounded-sm p-5 flex flex-col h-full relative overflow-hidden group shadow-sm"
  >
    <div className="flex flex-col gap-1 mb-6">
      <span className="text-[11px] text-text-s uppercase tracking-[2px] font-bold leading-none">{title}</span>
      <div className="h-[1px] w-8 bg-current opacity-20" style={{ color: accentColor }}></div>
    </div>
    
    <div className="flex-grow flex flex-col justify-center">
      {children}
    </div>

    {footer && (
      <div className="mt-6 pt-4 border-t border-dashed border-theme-border flex items-center justify-between">
        <span className="text-[10px] text-text-s italic leading-tight">{footer}</span>
      </div>
    )}
  </motion.div>
);

const MetricValue = ({ current, target, unit, trend, trendLabel = "↑" }: { current: string | number, target: string | number, unit?: string, trend?: string, trendLabel?: string }) => (
  <div className="flex flex-col gap-2">
    <div className="flex items-baseline justify-between">
      <div className="flex items-baseline gap-1">
        <span className="text-[28px] font-semibold text-white leading-none">{current}{unit}</span>
      </div>
      {trend && (
        <span className={`text-xs font-bold ${trend.startsWith('+') ? 'text-p-green' : 'text-p-red'}`}>
          {trend} {trendLabel}
        </span>
      )}
    </div>
    <div className="text-[11px] text-text-s uppercase tracking-wider font-medium">
      Target: {target}{unit}
    </div>
  </div>
);

// --- Charts Configurations ---

const gaugeOptions = {
  circumference: 180,
  rotation: -90,
  cutout: '75%',
  plugins: {
    legend: { display: false },
    tooltip: { enabled: true }
  },
  maintainAspectRatio: false
};

const donutOptions = {
  cutout: '75%',
  plugins: {
    legend: { display: false },
    tooltip: { enabled: true }
  },
  maintainAspectRatio: false
};

const barOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: { 
      grid: { display: false },
      ticks: { color: '#666', font: { size: 10 } }
    },
    y: { 
      grid: { color: '#2A2A2A' },
      ticks: { color: '#666', font: { size: 10 } }
    }
  },
  plugins: {
    legend: { display: false }
  }
};

export default function App() {
  const timestamp = useMemo(() => {
    const now = new Date();
    return now.toLocaleString('en-US', { month: 'long', year: 'numeric' });
  }, []);

  return (
    <div className="min-h-screen bg-bg text-text-p font-sans">
      {/* Top Navigation */}
      <nav className="h-[60px] bg-card border-b border-theme-border flex items-center justify-between px-8 sticky top-0 z-50">
        <div className="flex items-center">
          <h1 className="text-sm font-bold tracking-[2px] uppercase text-white">
            Porsche AG <span className="font-extralight opacity-70 italic lowercase px-1">esg performance dashboard</span>
          </h1>
        </div>
        
        <div className="flex items-center gap-8 text-[12px] text-text-s">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-p-green"></span>
            <span>System Active: 2026-04-28</span>
          </div>
          <div className="flex items-center gap-4 pl-8 border-l border-theme-border">
            <span>Executive: O. Blume (CEO)</span>
            <div className="w-8 h-8 rounded-full bg-[#333] flex items-center justify-center text-white text-[10px] font-bold">
              P
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content - Technical Grid Layout */}
      <main className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-theme-border border-b border-theme-border">
        
        {/* --- ENVIRONMENTAL (GREEN) --- */}
        <section className="bg-bg p-6 flex flex-col gap-5">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[10px] bg-p-green/20 text-p-green px-2 py-1 rounded font-bold uppercase tracking-wider">Environmental</span>
            <h2 className="text-2xl font-extralight tracking-tight">Decarbonization</h2>
          </div>

          <Card title="Decarbonization Index (DCI)" icon={Leaf} accentColor="#22C55E" footer="Strategy 2030: Net Carbon Neutrality | Target reduction via production efficiency.">
            <div className="space-y-4 text-center">
              <MetricValue current="60.25" target="60.00" unit="" />
              <div className="h-40 relative flex justify-center">
                <svg className="w-48 h-24 mt-4" viewBox="0 0 100 50">
                  <path d="M 10 45 A 35 35 0 0 1 90 45" fill="none" stroke="#222" strokeWidth="6" />
                  <path 
                    d="M 10 45 A 35 35 0 0 1 90 45" 
                    fill="none" 
                    stroke="var(--color-p-green)" 
                    strokeWidth="6" 
                    strokeDasharray="125" 
                    strokeDashoffset="25" 
                  />
                  <circle cx="50" cy="45" r="3" fill="#fff" />
                </svg>
                <div className="absolute bottom-0 text-[10px] text-text-s uppercase font-mono">tCO2e / vehicle</div>
              </div>
            </div>
          </Card>

          <Card title="BEV Share (%)" icon={TrendingUp} accentColor="#22C55E">
            <div className="space-y-6">
              <MetricValue current="22.2" target="25.0" unit="%" trend="+2.8%" />
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-p-green w-[88%]" />
              </div>
              <div className="flex justify-between text-[11px] text-text-s">
                <span>Current Mix</span>
                <span>Goal: 25.0%</span>
              </div>
            </div>
          </Card>

          <Card title="Renewable Energy (%)" icon={CircleCheck} accentColor="#22C55E">
            <div className="flex items-center gap-6 py-4">
              <div className="relative w-16 h-16 shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#222" strokeWidth="3" />
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--color-p-green)" strokeWidth="3" strokeDasharray="100, 100" />
                </svg>
              </div>
              <div>
                <span className="text-2xl font-bold">100%</span>
                <p className="text-[11px] text-text-s uppercase">Core Production Sites</p>
              </div>
            </div>
          </Card>
        </section>

        {/* --- SOCIAL (BLUE/SLATE) --- */}
        <section className="bg-bg p-6 flex flex-col gap-5">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[10px] bg-p-blue/20 text-p-blue px-2 py-1 rounded font-bold uppercase tracking-wider">Social</span>
            <h2 className="text-2xl font-extralight tracking-tight">Responsibility</h2>
          </div>

          <Card title="Women in Management" icon={Users} accentColor="#64748B">
            <div className="space-y-4">
              <MetricValue current="20.5" target="21.0" unit="%" trend="+0.5%" />
              <div className="text-[11px] text-text-s leading-relaxed italic border-l border-p-blue/40 pl-3">
                Incremental expansion reflecting long-term commitment to leadership diversity and inclusion frameworks.
              </div>
            </div>
          </Card>

          <Card title="Workforce Gender Split" icon={Users} accentColor="#64748B">
            <div className="space-y-5">
              <div className="space-y-2">
                <div className="flex justify-between text-[11px] uppercase tracking-wide">
                  <span>Female</span>
                  <span>19.7%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-p-blue w-[19.7%]" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-[11px] uppercase tracking-wide">
                  <span>Male</span>
                  <span>80.3%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-white/20 w-[80.3%]" />
                </div>
              </div>
            </div>
          </Card>

          <Card title="Supplier S-Rating" icon={ShieldCheck} accentColor="#64748B" footer="Targets: EOS Score > 80% | Accident Frequency Index < 5.0">
            <div className="flex items-center gap-6 py-4">
              <div className="relative w-16 h-16 shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#222" strokeWidth="3" />
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--color-p-blue)" strokeWidth="3" strokeDasharray="100, 100" />
                </svg>
              </div>
              <div>
                <span className="text-2xl font-bold">100%</span>
                <p className="text-[11px] text-text-s uppercase">Critical Suppliers Validated</p>
              </div>
            </div>
          </Card>
        </section>

        {/* --- GOVERNANCE (RED) --- */}
        <section className="bg-bg p-6 flex flex-col gap-5">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[10px] bg-p-red/20 text-p-red px-2 py-1 rounded font-bold uppercase tracking-wider">Governance</span>
            <h2 className="text-2xl font-extralight tracking-tight">Compliance</h2>
          </div>

          <Card title="Compliance Training" icon={ShieldCheck} accentColor="#D5001C">
            <div className="space-y-4">
              <MetricValue current="98.2" target="99.0" unit="%" trend="In Progress" trendLabel="" />
              <div className="text-[11px] text-text-s uppercase">1,240 delegates pending completion for 2026 cycle</div>
            </div>
          </Card>

          <Card title="Code of Conduct" icon={CircleCheck} accentColor="#D5001C">
            <div className="flex items-center gap-6 py-4">
              <div className="relative w-16 h-16 shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#222" strokeWidth="3" />
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--color-p-red)" strokeWidth="3" strokeDasharray="100 100" />
                </svg>
              </div>
              <div>
                <span className="text-2xl font-bold">100%</span>
                <p className="text-[11px] text-text-s uppercase">Mandatory Training Complete</p>
              </div>
            </div>
          </Card>

          <Card title="ESG-Linked Exec Pay" icon={TrendingUp} accentColor="#D5001C" footer="Focus: Green Finance Bonds & EU Taxonomy Alignment for EV Platforms.">
            <div className="flex items-center gap-6 py-4">
              <div className="relative w-16 h-16 shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#222" strokeWidth="3" />
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--color-p-red)" strokeWidth="3" strokeDasharray="20 100" />
                </svg>
              </div>
              <div>
                <span className="text-2xl font-bold">20.0%</span>
                <p className="text-[11px] text-text-s uppercase">Long-Term Incentive (LTI)</p>
              </div>
            </div>
          </Card>
        </section>

      </main>

      {/* Global Footer */}
      <footer className="p-8 bg-[#0A0A0A]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 px-4">
          <div className="space-y-1">
            <p className="text-[10px] text-text-s uppercase tracking-widest font-bold">Confidential: External Board Reporting</p>
            <p className="text-[9px] text-gray-600 font-mono">Data integrity verified via 2026 Audit Cycle | Ref: PX-ESG-STRAT-99</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-[10px] text-text-s uppercase font-bold tracking-wider">Green Finance Bonds</p>
              <p className="text-[9px] text-p-green uppercase font-mono tracking-tighter">100% Alignment Active</p>
            </div>
            <div className="h-8 w-[1px] bg-theme-border"></div>
            <div className="text-right">
              <p className="text-[10px] text-text-s uppercase font-bold tracking-wider">EU Taxonomy</p>
              <p className="text-[9px] text-p-blue uppercase font-mono tracking-tighter">Platform Compliant</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
