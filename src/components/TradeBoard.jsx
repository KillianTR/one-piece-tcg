import React, { useState } from 'react';
import { Repeat, Plus, MessageCircle, MapPin, ExternalLink, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { CARDTRADER_BASE_URL } from '../data/mockCards';

const INITIAL_TRADES = [
  {
    id: 'tr-1',
    user: 'Mugiwara_99',
    location: 'Barcelona, España (y envíos)',
    has: [
      { name: 'Monkey.D.Luffy (Gear 5)', id: 'OP05-060', count: 1, rarity: 'SEC' },
      { name: 'Kaido', id: 'OP01-094', count: 2, rarity: 'SR' }
    ],
    wants: [
      { name: 'Gol.D.Roger', id: 'OP09-118', rarity: 'SEC' },
      { name: 'Roronoa Zoro (Rush)', id: 'OP01-025', rarity: 'SR' }
    ],
    notes: 'Intercambio en mano en tiendas locales o envío certificado con seguimiento.',
    date: 'Hace 2 horas',
    status: 'Activo'
  },
  {
    id: 'tr-2',
    user: 'Trafalgar_Collector',
    location: 'Madrid, España',
    has: [
      { name: 'Trafalgar Law (Leader)', id: 'OP01-002', count: 1, rarity: 'L' },
      { name: 'Dracule Mihawk', id: 'OP01-070', count: 2, rarity: 'SR' }
    ],
    wants: [
      { name: 'Enel (Leader)', id: 'OP05-098', rarity: 'L' }
    ],
    notes: 'Busco Enel en perfecto estado (Near Mint). Tengo referencias de compras en Wallapop y Cardmarket.',
    date: 'Ayer',
    status: 'Activo'
  },
  {
    id: 'tr-3',
    user: 'Kurohige_TCG',
    location: 'Valencia, España',
    has: [
      { name: 'Marshall.D.Teach', id: 'OP09-001', count: 2, rarity: 'L' }
    ],
    wants: [
      { name: 'Shanks (Secret)', id: 'OP01-120', rarity: 'SEC' }
    ],
    notes: 'Abierto también a venta si no hay cambio directo.',
    date: 'Hace 3 días',
    status: 'Activo'
  }
];

export default function TradeBoard() {
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const [trades] = useState(INITIAL_TRADES);
  const [showNewTradeModal, setShowNewTradeModal] = useState(false);

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 py-6">
      {/* Header Banner */}
      <div className={`border rounded-3xl p-6 sm:p-8 mb-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 ${
        isDark 
          ? 'bg-gradient-to-r from-neutral-900 via-neutral-900 to-amber-950/40 border-neutral-800' 
          : 'bg-gradient-to-r from-white via-neutral-50 to-amber-50 border-neutral-200'
      }`}>
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-semibold mb-3">
            <Repeat className="w-3.5 h-3.5" />
            {t('tradesBadge')}
          </div>
          <h2 className={`text-2xl sm:text-3xl font-extrabold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
            {t('tradesTitle')}
          </h2>
          <p className="text-sm text-neutral-400 mt-2 max-w-2xl leading-relaxed">
            {t('tradesDescription')}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <button
            onClick={() => setShowNewTradeModal(true)}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-amber-500/20 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            {t('tradesPostButton')}
          </button>
          <a
            href="https://www.cardtrader.com/es/games/one-piece-card-game"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center gap-2 px-5 py-3 rounded-2xl border font-semibold text-xs transition ${
              isDark ? 'bg-neutral-950 hover:bg-neutral-800 text-neutral-200 border-neutral-800' : 'bg-white hover:bg-neutral-100 text-neutral-800 border-neutral-300'
            }`}
          >
            {t('tradesCardTraderButton')}
            <ExternalLink className="w-4 h-4 text-neutral-400" />
          </a>
        </div>
      </div>

      {/* Safety Notice */}
      <div className={`mb-6 p-4 rounded-2xl border flex items-start gap-3 text-xs ${
        isDark ? 'bg-neutral-900/60 border-neutral-800/80 text-neutral-400' : 'bg-white border-neutral-200 text-neutral-600'
      }`}>
        <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
        <div>
          <strong className={isDark ? 'text-white' : 'text-neutral-900'}>{t('tradesSafetyTitle')} </strong> 
          {t('tradesSafetyText')}
        </div>
      </div>

      {/* Trades Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {trades.map((trade) => (
          <div
            key={trade.id}
            className={`border rounded-3xl p-5 sm:p-6 flex flex-col justify-between shadow-lg transition ${
              isDark ? 'bg-neutral-900 border-neutral-800 hover:border-neutral-700' : 'bg-white border-neutral-200 hover:border-neutral-400'
            }`}
          >
            <div>
              {/* User Header */}
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800/80">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center font-bold text-neutral-950 text-sm">
                    {trade.user.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>{trade.user}</h4>
                    <div className="flex items-center gap-1 text-[11px] text-neutral-400">
                      <MapPin className="w-3 h-3 text-neutral-500" />
                      {trade.location}
                    </div>
                  </div>
                </div>
                <span className="text-[10px] text-neutral-500 font-mono">{trade.date}</span>
              </div>

              {/* Offer */}
              <div className="mt-4">
                <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-500 flex items-center gap-1 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {t('tradesOffers')}
                </span>
                <div className="space-y-1.5">
                  {trade.has.map((card, idx) => (
                    <div key={idx} className={`flex items-center justify-between text-xs p-2 rounded-xl border ${
                      isDark ? 'bg-neutral-950 border-neutral-800' : 'bg-neutral-50 border-neutral-200'
                    }`}>
                      <span className={`font-medium ${isDark ? 'text-neutral-200' : 'text-neutral-800'}`}>
                        {card.name} <span className="font-mono text-neutral-500">({card.id})</span>
                      </span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-neutral-800 text-amber-400">
                        {card.rarity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Seeks */}
              <div className="mt-4">
                <span className="text-[10px] uppercase font-bold tracking-wider text-rose-500 flex items-center gap-1 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  {t('tradesSeeks')}
                </span>
                <div className="space-y-1.5">
                  {trade.wants.map((card, idx) => (
                    <div key={idx} className={`flex items-center justify-between text-xs p-2 rounded-xl border ${
                      isDark ? 'bg-neutral-950 border-neutral-800' : 'bg-neutral-50 border-neutral-200'
                    }`}>
                      <span className={`font-medium ${isDark ? 'text-neutral-200' : 'text-neutral-800'}`}>
                        {card.name} <span className="font-mono text-neutral-500">({card.id})</span>
                      </span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300">
                        {card.rarity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              {trade.notes && (
                <div className={`mt-4 p-3 rounded-xl border text-xs italic ${
                  isDark ? 'bg-neutral-950/60 border-neutral-800 text-neutral-300' : 'bg-neutral-50 border-neutral-200 text-neutral-600'
                }`}>
                  "{trade.notes}"
                </div>
              )}
            </div>

            {/* Contact Action */}
            <div className="mt-6 pt-4 border-t border-neutral-800/80 flex items-center justify-between">
              <span className="text-xs text-emerald-500 font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                {trade.status}
              </span>
              <button
                onClick={() => alert('Para contactar en vivo, la mensajería P2P estará activa en v1.0.')}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold transition cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                {t('tradesContact')}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showNewTradeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className={`border rounded-3xl p-6 max-w-md w-full shadow-2xl ${
            isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'
          }`}>
            <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-neutral-900'}`}>{t('tradesModalTitle')}</h3>
            <p className="text-xs text-neutral-400 mb-4">{t('tradesModalDesc')}</p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowNewTradeModal(false)}
                className="px-4 py-2 rounded-xl bg-amber-500 text-neutral-950 font-bold text-xs"
              >
                {t('tradesModalClose')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
