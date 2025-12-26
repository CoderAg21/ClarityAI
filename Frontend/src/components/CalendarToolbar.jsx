import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function CalendarToolbar(toolbar) {
    const goToBack = () => {
        toolbar.onNavigate('PREV');
    };

    const goToNext = () => {
        toolbar.onNavigate('NEXT');
    };

    const goToCurrent = () => {
        toolbar.onNavigate('TODAY');
    };

    const label = () => {
        const date = moment(toolbar.date);
        return (
            <span className="text-xl font-bold dark:text-white text-slate-800">
                {date.format('MMMM YYYY')}
            </span>
        );
    };

    // Helper for date libraries
    const moment = require('moment');

    return (
        <div className="flex items-center justify-between mb-6 px-2">
            <div className="flex items-center gap-4">
                {label()}
                <div className="flex bg-slate-100 dark:bg-white/10 rounded-lg p-1">
                    <button onClick={goToBack} className="p-1 hover:bg-white dark:hover:bg-white/10 rounded-md transition"><ChevronLeft size={20} className="dark:text-white" /></button>
                    <button onClick={goToCurrent} className="px-3 text-sm font-medium dark:text-white">Today</button>
                    <button onClick={goToNext} className="p-1 hover:bg-white dark:hover:bg-white/10 rounded-md transition"><ChevronRight size={20} className="dark:text-white" /></button>
                </div>
            </div>

            <div className="flex bg-slate-100 dark:bg-white/10 rounded-lg p-1 text-sm font-medium">
                <button onClick={() => toolbar.onView('day')} className={`px-4 py-1.5 rounded-md transition ${toolbar.view === 'day' ? 'bg-white shadow-sm dark:text-slate-900' : 'text-slate-500 dark:text-slate-300'}`}>Day</button>
                <button onClick={() => toolbar.onView('week')} className={`px-4 py-1.5 rounded-md transition ${toolbar.view === 'week' ? 'bg-white shadow-sm dark:text-slate-900' : 'text-slate-500 dark:text-slate-300'}`}>Week</button>
                <button onClick={() => toolbar.onView('month')} className={`px-4 py-1.5 rounded-md transition ${toolbar.view === 'week' ? 'bg-white shadow-sm dark:text-slate-900' : 'text-slate-500 dark:text-slate-300'}`}>Month</button>
            </div>
        </div>
    );
}