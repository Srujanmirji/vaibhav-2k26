import React, { useMemo } from 'react';
import {
    BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import { AdminRegistrationRecord } from '../types';
import { EVENTS } from '../constants';
import {
    TrendingUp, Users, DollarSign, Award,
    PieChart as PieChartIcon, BarChart3, Calendar, School, Building2
} from 'lucide-react';

interface AdminAnalyticsDashboardProps {
    data: AdminRegistrationRecord[];
}

const COLORS = ['#FF0055', '#00F0FF', '#9D00FF', '#FFB800', '#00FF94', '#FF4D00'];

const AdminAnalyticsDashboard: React.FC<AdminAnalyticsDashboardProps> = ({ data }) => {
    // ── Data Transformations ──

    // 1. Registrations over time
    const dailyData = useMemo(() => {
        const counts: Record<string, number> = {};
        data.forEach(row => {
            // Expecting timestamp like "MM/DD/YYYY HH:MM:SS" or ISO
            const dateStr = row.timestamp ? row.timestamp.split(' ')[0] : 'Unknown';
            counts[dateStr] = (counts[dateStr] || 0) + 1;
        });

        return Object.entries(counts)
            .map(([date, count]) => ({ date, count }))
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }, [data]);

    // 2. Registrations and Revenue by Event
    const eventData = useMemo(() => {
        const stats: Record<string, { count: number, revenue: number }> = {};

        data.forEach(row => {
            if (!row.eventTitle) return;
            if (!stats[row.eventTitle]) stats[row.eventTitle] = { count: 0, revenue: 0 };

            stats[row.eventTitle].count += 1;

            if (row.razorpayPaymentId) {
                const eventDef = EVENTS.find(e => e.title === row.eventTitle);
                stats[row.eventTitle].revenue += eventDef?.fee || 0;
            }
        });

        return Object.entries(stats)
            .map(([name, { count, revenue }]) => ({ name, count, revenue }))
            .sort((a, b) => b.count - a.count);
    }, [data]);

    // 3. Department Distribution
    const deptData = useMemo(() => {
        const counts: Record<string, number> = {};
        data.forEach(row => {
            const dept = row.department || 'Other';
            counts[dept] = (counts[dept] || 0) + 1;
        });
        return Object.entries(counts)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 8); // Top 8 depts
    }, [data]);

    // 4. College Distribution
    const collegeData = useMemo(() => {
        const counts: Record<string, number> = {};
        data.forEach(row => {
            const college = row.college || 'Other';
            counts[college] = (counts[college] || 0) + 1;
        });
        return Object.entries(counts)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 5); // Top 5 colleges
    }, [data]);

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-black/90 border border-white/20 backdrop-blur-md p-3 rounded-xl shadow-2xl">
                    <p className="text-white font-bold text-xs mb-1 uppercase tracking-wider">{label}</p>
                    {payload.map((entry: any, index: number) => (
                        <p key={index} className="text-sm font-mono" style={{ color: entry.color }}>
                            <span className="opacity-70">{entry.name}:</span> {entry.value}
                            {entry.name === 'revenue' ? ' \u20B9' : ''}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="space-y-8 animate-fade-in-up">
            {/* ── Top Charts Row ── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Daily Registrations */}
                <div className="bg-card/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 shadow-xl overflow-hidden relative group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none group-hover:bg-primary/10 transition-colors" />
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-white font-bold flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-primary" />
                            Registration Trend
                        </h3>
                        <span className="text-[10px] bg-primary/20 text-primary px-2 py-1 rounded-full font-bold uppercase tracking-widest">Daily Heat</span>
                    </div>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={dailyData}>
                                <defs>
                                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#FF0055" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#FF0055" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                                <XAxis
                                    dataKey="date"
                                    stroke="#666"
                                    fontSize={10}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(val) => val.split('/').slice(0, 2).join('/')}
                                />
                                <YAxis stroke="#666" fontSize={10} tickLine={false} axisLine={false} />
                                <Tooltip content={<CustomTooltip />} />
                                <Area
                                    type="monotone"
                                    dataKey="count"
                                    stroke="#FF0055"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorCount)"
                                    animationDuration={1500}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Event Performance */}
                <div className="bg-card/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-secondary/30 transition-all duration-300 shadow-xl overflow-hidden relative group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full blur-3xl pointer-events-none group-hover:bg-secondary/10 transition-colors" />
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-white font-bold flex items-center gap-2">
                            <BarChart3 className="w-5 h-5 text-secondary" />
                            Event Performance
                        </h3>
                        <div className="flex gap-2">
                            <div className="flex items-center gap-1.5">
                                <div className="w-2 h-2 rounded-full bg-secondary" />
                                <span className="text-[10px] text-gray-500 font-bold uppercase">Registrations</span>
                            </div>
                        </div>
                    </div>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={eventData.slice(0, 8)}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                                <XAxis
                                    dataKey="name"
                                    stroke="#666"
                                    fontSize={8}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(val) => val.length > 10 ? val.substring(0, 10) + '...' : val}
                                />
                                <YAxis stroke="#666" fontSize={10} tickLine={false} axisLine={false} />
                                <Tooltip content={<CustomTooltip />} />
                                <Bar
                                    dataKey="count"
                                    fill="#00F0FF"
                                    radius={[4, 4, 0, 0]}
                                    barSize={30}
                                    animationDuration={1500}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* ── Bottom Charts Row ── */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Revenue Share */}
                <div className="bg-card/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-green-500/30 transition-all duration-300 shadow-xl overflow-hidden relative group">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-white font-bold flex items-center gap-2 text-sm">
                            <DollarSign className="w-4 h-4 text-green-400" />
                            Revenue Share
                        </h3>
                    </div>
                    <div className="h-56 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={eventData.filter(e => e.revenue > 0)}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={50}
                                    outerRadius={70}
                                    paddingAngle={5}
                                    dataKey="revenue"
                                    animationDuration={1500}
                                >
                                    {eventData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-2 space-y-1">
                        {eventData.filter(e => e.revenue > 0).slice(0, 3).map((e, i) => (
                            <div key={e.name} className="flex items-center justify-between text-[10px]">
                                <div className="flex items-center gap-2 truncate pr-2">
                                    <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                                    <span className="text-gray-400 truncate">{e.name}</span>
                                </div>
                                <span className="text-white font-mono font-bold">₹{e.revenue}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Department Distribution */}
                <div className="bg-card/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-purple-500/30 transition-all duration-300 shadow-xl">
                    <h3 className="text-white font-bold flex items-center gap-2 text-sm mb-6">
                        <Building2 className="w-4 h-4 text-purple-400" />
                        Departments
                    </h3>
                    <div className="h-56 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={deptData}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={70}
                                    dataKey="value"
                                    animationDuration={1500}
                                >
                                    {deptData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[(index + 3) % COLORS.length]} stroke="none" />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-2 text-center text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                        Registration Split
                    </div>
                </div>

                {/* Top Colleges */}
                <div className="bg-card/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-yellow-500/30 transition-all duration-300 shadow-xl">
                    <h3 className="text-white font-bold flex items-center gap-2 text-sm mb-6">
                        <School className="w-4 h-4 text-yellow-500" />
                        Top Colleges
                    </h3>
                    <div className="space-y-4">
                        {collegeData.map((college, idx) => {
                            const maxVal = collegeData[0].value;
                            const percent = (college.value / maxVal) * 100;
                            return (
                                <div key={college.name} className="space-y-1.5">
                                    <div className="flex items-center justify-between text-[10px] font-bold">
                                        <span className="text-gray-400 truncate max-w-[140px]">{college.name}</span>
                                        <span className="text-white">{college.value}</span>
                                    </div>
                                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-yellow-500/50 to-yellow-500 transition-all duration-1000"
                                            style={{ width: `${percent}%` }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminAnalyticsDashboard;
