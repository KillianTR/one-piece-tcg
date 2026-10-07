import React, { useState } from 'react';
import { Repeat, Plus, MessageCircle, MapPin, Tag, ExternalLink, ShieldCheck } from 'lucide-react';
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
  const [trades, setTrades] = useState(INITIAL_TRADES);
  const [showNewTradeModal, setShowNewTradeModal] = useState(false);

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 py-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-neutral-900 via-neutral-900 to-amber-950/40 border border-neutral-800 rounded-3xl p-6 sm:p-8 mb-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-3">
            <Repeat className="w-3.5 h-3.5" />
            Comunidad P2P One Piece TCG
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Tablón de Intercambio & Mercado
          </h2>
          <p className="text-sm text-neutral-400 mt-2 max-w-2xl leading-relaxed">
            Cambia tus cartas repetidas con otros jugadores sin comisiones abusivas. Para compraventa profesional de singles y precios de mercado en tiempo real, conéctate directamente con CardTrader.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <button
            onClick={() => setShowNewTradeModal(true)}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-amber-500/20"
          >
            <Plus className="w-4 h-4" />
            Publicar Anuncio
          </button>
          <a
            href="https://www.cardtrader.com/es/games/one-piece-card-game"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-neutral-950 hover:bg-neutral-800 text-neutral-200 border border-neutral-800 font-semibold text-xs transition"
          >
            Ir a CardTrader
            <ExternalLink className="w-4 h-4 text-neutral-400" />
          </a>
        </div>
      </div>

      {/* Safety Notice */}
      <div className="mb-6 p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 flex items-start gap-3 text-xs text-neutral-400">
        <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-white">Consejo de seguridad:</strong> Para intercambios por correo, solicita siempre fotos con fecha y nick (timestamp) del estado de las cartas y utiliza envío certificado.
        </div>
      </div>

      {/* Trades Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {trades.map((trade) => (
          <div
            key={trade.id}
            className="bg-neutral-900 border border-neutral-800 rounded-3xl p-5 sm:p-6 flex flex-col justify-between shadow-lg hover:border-neutral-700 transition"
          >
            <div>
              {/* User Header */}
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center font-bold text-neutral-950 text-sm">
                    {trade.user.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{trade.user}</h4>
                    <div className="flex items-center gap-1 text-[11px] text-neutral-400">
                      <MapPin className="w-3 h-3 text-neutral-500" />
                      {trade.location}
                    </div>
                  </div>
                </div>
                <span className="text-[10px] text-neutral-500 font-mono">{trade.date}</span>
              </div>

              {/* Offer (OFRECE) */}
              <div className="mt-4">
                <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 flex items-center gap-1 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  OFRECE (REPETIDAS):
                </span>
                <div className="space-y-1.5">
                  {trade.has.map((card, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs p-2 rounded-xl bg-neutral-950 border border-neutral-800">
                      <span className="font-medium text-neutral-200">
                        {card.name} <span className="font-mono text-neutral-500">({card.id})</span>
                      </span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-neutral-800 text-amber-400">
                        {card.rarity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Seeks (BUSCA) */}
              <div className="mt-4">
                <span className="text-[10px] uppercase font-bold tracking-wider text-rose-400 flex items-center gap-1 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                  BUSCA:
                </span>
                <div className="space-y-1.5">
                  {trade.wants.map((card, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs p-2 rounded-xl bg-neutral-950 border border-neutral-800">
                      <span className="font-medium text-neutral-200">
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
                <div className="mt-4 p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/80 text-xs text-neutral-300 italic">
                  "{trade.notes}"
                </div>
              )}
            </div>

            {/* Contact Action */}
            <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between">
              <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {trade.status}
              </span>
              <button
                onClick={() => alert(`Para contactar a ${trade.user}, esta función se conectará directamente mediante chat interno en la versión v0.2.0 con Supabase Auth.`)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold transition"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                Contactar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* New Trade Modal Simulation */}
      {showNewTradeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-2">Crear Anuncio de Intercambio</h3>
            <p className="text-xs text-neutral-400 mb-4">
              En la versión actual Alpha v0.1.0 puedes explorar el tablón. La publicación en la nube se activará cuando enlacemos Supabase Auth.
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowNewTradeModal(false)}
                className="px-4 py-2 rounded-xl bg-amber-500 text-neutral-950 font-bold text-xs"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
