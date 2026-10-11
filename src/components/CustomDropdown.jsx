import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function CustomDropdown({
  value,
  onChange,
  options = [],
  placeholder = 'Seleccionar...',
  icon: Icon = null,
  className = '',
  buttonClassName = '',
  dropdownClassName = '',
  align = 'left',
  size = 'sm'
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [openUpward, setOpenUpward] = useState(false);
  const containerRef = useRef(null);
  const { isDark } = useTheme();

  // Normalize options: can be array of strings or { value, label, count, icon }
  const normalizedOptions = options.map((opt) => {
    if (typeof opt === 'object' && opt !== null) {
      return {
        value: opt.value,
        label: opt.label ?? String(opt.value),
        count: opt.count,
        badge: opt.badge
      };
    }
    return { value: opt, label: String(opt) };
  });

  const selectedOption = normalizedOptions.find((opt) => String(opt.value) === String(value));
  const displayLabel = selectedOption ? selectedOption.label : placeholder;

  // Auto-detect whether to open upwards or downwards to prevent screen clipping
  useEffect(() => {
    if (isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      if (spaceBelow < 280 && spaceAbove > spaceBelow) {
        setOpenUpward(true);
      } else {
        setOpenUpward(false);
      }
    }
  }, [isOpen]);

  // Close on click outside or Escape
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (val) => {
    onChange(val);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={`relative inline-block text-left ${isOpen ? 'z-50' : 'z-10'} ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`w-full flex items-center justify-between gap-2 rounded-xl border font-semibold transition cursor-pointer select-none ${
          size === 'sm' ? 'px-2.5 py-1.5 text-xs' : 'px-3.5 py-2 text-sm'
        } ${
          isOpen
            ? isDark
              ? 'border-amber-500/80 bg-[#121c33] text-amber-400 shadow-md shadow-amber-500/10'
              : 'border-amber-600 bg-[#f3ebd7] text-amber-900 shadow-md'
            : isDark
              ? 'bg-[#0a0f1d]/90 hover:bg-[#10182c] border-slate-800 text-neutral-200 hover:border-amber-500/40'
              : 'bg-[#faf6ed] hover:bg-white border-[#dfd2be] text-[#142036] hover:border-amber-600/50 shadow-2xs'
        } ${buttonClassName}`}
      >
        <div className="flex items-center gap-1.5 min-w-0 truncate">
          {Icon && <Icon className="w-3.5 h-3.5 text-amber-500 shrink-0" />}
          <span className="truncate">{displayLabel}</span>
        </div>
        <ChevronDown
          className={`w-3.5 h-3.5 text-neutral-400 shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-amber-500' : ''
          }`}
        />
      </button>

      {/* Floating Popover Dropdown Card (Image 4 style) */}
      {isOpen && (
        <div
          role="listbox"
          className={`absolute ${align === 'right' ? 'right-0' : 'left-0'} ${
            openUpward ? 'bottom-full mb-1.5' : 'top-full mt-1.5'
          } z-[100] min-w-[200px] max-w-[92vw] w-max rounded-2xl border shadow-2xl backdrop-blur-xl p-1.5 transition-all duration-150 animate-in fade-in zoom-in-95 ${
            isDark
              ? 'bg-[#0d1527]/98 border-amber-500/30 text-neutral-200 shadow-black/80'
              : 'bg-[#faf6ed]/98 border-[#d8c8ab] text-[#142036] shadow-[#382b14]/15'
          } ${dropdownClassName}`}
        >
          <div className="max-h-80 sm:max-h-96 overflow-y-auto custom-scrollbar space-y-0.5 pr-0.5">
            {normalizedOptions.map((opt) => {
              const isSelected = String(opt.value) === String(value);
              return (
                <button
                  key={String(opt.value)}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(opt.value)}
                  className={`w-full flex items-center justify-between gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-left transition cursor-pointer ${
                    isSelected
                      ? isDark
                        ? 'bg-amber-500/15 text-amber-400 font-bold border border-amber-500/30'
                        : 'bg-amber-500/20 text-[#8a5d13] font-bold border border-amber-600/30'
                      : isDark
                        ? 'text-neutral-300 hover:text-white hover:bg-slate-800/60'
                        : 'text-[#2a3852] hover:text-black hover:bg-[#ede3cf]/80'
                  }`}
                >
                  <span className="truncate">{opt.label}</span>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {opt.count !== undefined && (
                      <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full border ${
                        isDark 
                          ? 'bg-slate-900 border-slate-700 text-neutral-400' 
                          : 'bg-white border-[#dfd2be] text-neutral-500'
                      }`}>
                        {opt.count}
                      </span>
                    )}
                    {isSelected && (
                      <Check className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
