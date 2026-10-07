import React, { useState, useEffect } from 'react';
import { 
  X, 
  Download, 
  Upload, 
  Copy, 
  Check, 
  FileText, 
  Database, 
  FileJson,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useCollection } from '../context/CollectionContext';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

export default function BackupModal({ isOpen, onClose }) {
  const { 
    collection, 
    customBinders, 
    restoreBackup, 
    importTextList 
  } = useCollection();

  const { t } = useLanguage();
  const { isDark } = useTheme();

  const [activeTab, setActiveTab] = useState('export'); // 'export' | 'import'
  const [copiedText, setCopiedText] = useState(false);
  const [textToImport, setTextToImport] = useState('');
  const [importFeedback, setImportFeedback] = useState(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Generate plain text list (OPTCG Sim format: "4 OP01-001")
  const generatedTextList = Object.entries(collection)
    .filter(([_, item]) => (item.count || 0) > 0)
    .map(([cardId, item]) => `${item.count} ${cardId}`)
    .join('\n');

  // Handle Export Full JSON Backup
  const handleExportJson = () => {
    const backupData = {
      app: 'Grand Line Vault',
      version: '0.5.1',
      exportedAt: new Date().toISOString(),
      collection,
      customBinders,
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const dateStr = new Date().toISOString().split('T')[0];
    const a = document.createElement('a');
    a.href = url;
    a.download = `grand-line-vault-backup-${dateStr}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Handle Export Plain Text List
  const handleExportTxt = () => {
    const blob = new Blob([generatedTextList], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const dateStr = new Date().toISOString().split('T')[0];
    const a = document.createElement('a');
    a.href = url;
    a.download = `one-piece-collection-${dateStr}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Handle Copy Text to Clipboard
  const handleCopyText = async () => {
    if (!generatedTextList) return;
    try {
      await navigator.clipboard.writeText(generatedTextList);
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 3000);
    } catch (e) {
      console.error('Failed to copy to clipboard', e);
    }
  };

  // Handle File Upload JSON Import
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (!parsed || (!parsed.collection && !parsed.customBinders)) {
          throw new Error('Formato inválido');
        }
        restoreBackup(parsed);
        setImportFeedback({
          type: 'success',
          message: t('backupImportSuccess')
        });
      } catch (err) {
        setImportFeedback({
          type: 'error',
          message: t('backupImportError')
        });
      }
    };
    reader.onerror = () => {
      setImportFeedback({
        type: 'error',
        message: t('backupImportError')
      });
    };
    reader.readAsText(file);
    // Reset file input value so user can upload again
    e.target.value = '';
  };

  // Handle Import from Raw Text Paste
  const handleImportTextSubmit = (e) => {
    e.preventDefault();
    if (!textToImport.trim()) return;

    try {
      const added = importTextList(textToImport);
      setImportFeedback({
        type: 'success',
        message: `¡${added} ${t('backupTextImportSuccess')}`
      });
      setTextToImport('');
    } catch (err) {
      setImportFeedback({
        type: 'error',
        message: 'Error al procesar la lista de texto.'
      });
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div 
        className={`w-full max-w-xl max-h-[92vh] flex flex-col rounded-3xl border shadow-2xl overflow-hidden transition-colors ${
          isDark 
            ? 'bg-neutral-900 border-neutral-800 text-neutral-100' 
            : 'bg-white border-neutral-200 text-neutral-900 shadow-neutral-300/40'
        }`}
      >
        {/* Modal Header */}
        <div className={`flex items-center justify-between p-5 border-b shrink-0 ${
          isDark ? 'border-neutral-800 bg-neutral-950/60' : 'border-neutral-200 bg-neutral-50/80'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-600 to-yellow-500 p-0.5 shadow-md flex items-center justify-center shrink-0">
              <div className={`w-full h-full rounded-[14px] flex items-center justify-center ${
                isDark ? 'bg-neutral-900 text-amber-400' : 'bg-white text-amber-600'
              }`}>
                <Database className="w-5 h-5" />
              </div>
            </div>
            <div>
              <h2 className={`font-black text-lg tracking-tight ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                {t('backupModalTitle')}
              </h2>
              <p className={`text-xs ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                {t('backupModalSubtitle')}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-2 rounded-xl transition cursor-pointer ${
              isDark 
                ? 'hover:bg-neutral-800 text-neutral-400 hover:text-white' 
                : 'hover:bg-neutral-200 text-neutral-500 hover:text-neutral-900'
            }`}
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className={`flex border-b p-2 shrink-0 ${
          isDark ? 'border-neutral-800 bg-neutral-950/40' : 'border-neutral-200 bg-neutral-100/60'
        }`}>
          <button
            type="button"
            onClick={() => { setActiveTab('export'); setImportFeedback(null); }}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'export'
                ? 'bg-amber-500 text-neutral-950 shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Download className="w-4 h-4" />
            Exportar / Guardar Copia
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('import'); setImportFeedback(null); }}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'import'
                ? 'bg-amber-500 text-neutral-950 shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Upload className="w-4 h-4" />
            Restaurar / Importar
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
          {/* Feedback banner */}
          {importFeedback && (
            <div className={`p-3.5 rounded-xl border flex items-center gap-2.5 text-xs ${
              importFeedback.type === 'success'
                ? 'bg-emerald-950/30 border-emerald-800/50 text-emerald-300'
                : 'bg-rose-950/30 border-rose-800/50 text-rose-300'
            }`}>
              {importFeedback.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              )}
              <span>{importFeedback.message}</span>
            </div>
          )}

          {/* TAB 1: EXPORT */}
          {activeTab === 'export' ? (
            <div className="space-y-4">
              {/* Tarjeta 1: Backup JSON */}
              <div className={`p-4 rounded-2xl border space-y-3 ${
                isDark ? 'bg-neutral-950/40 border-neutral-800' : 'bg-neutral-50 border-neutral-200'
              }`}>
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
                    <FileJson className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold">{t('backupExportJsonTitle')}</h3>
                    <p className="text-xs text-neutral-400">{t('backupExportJsonDesc')}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleExportJson}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-neutral-950 transition flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  {t('backupExportJsonBtn')}
                </button>
              </div>

              {/* Tarjeta 2: Formato Texto / OPTCG Sim */}
              <div className={`p-4 rounded-2xl border space-y-3 ${
                isDark ? 'bg-neutral-950/40 border-neutral-800' : 'bg-neutral-50 border-neutral-200'
              }`}>
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold">{t('backupExportTextTitle')}</h3>
                    <p className="text-xs text-neutral-400">{t('backupExportTextDesc')}</p>
                  </div>
                </div>

                {/* Text Preview Box */}
                <div className={`p-3 rounded-xl border font-mono text-xs max-h-32 overflow-y-auto whitespace-pre ${
                  isDark ? 'bg-neutral-900 border-neutral-800 text-neutral-300' : 'bg-white border-neutral-300 text-neutral-800'
                }`}>
                  {generatedTextList || 'No tienes cartas registradas en tu colección todavía.'}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={handleCopyText}
                    disabled={!generatedTextList}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition flex items-center justify-center gap-1.5 cursor-pointer ${
                      copiedText
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                        : isDark
                          ? 'border-neutral-700 hover:bg-neutral-800 text-neutral-200'
                          : 'border-neutral-300 hover:bg-neutral-200 text-neutral-800'
                    }`}
                  >
                    {copiedText ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copiedText ? t('backupCopiedSuccess') : t('backupCopyTextBtn')}
                  </button>

                  <button
                    type="button"
                    onClick={handleExportTxt}
                    disabled={!generatedTextList}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition flex items-center justify-center gap-1.5 cursor-pointer ${
                      isDark
                        ? 'border-neutral-700 hover:bg-neutral-800 text-neutral-200'
                        : 'border-neutral-300 hover:bg-neutral-200 text-neutral-800'
                    }`}
                  >
                    <Download className="w-4 h-4" />
                    {t('backupDownloadTxtBtn')}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* TAB 2: IMPORT */
            <div className="space-y-4">
              {/* Tarjeta 1: Cargar Backup JSON */}
              <div className={`p-4 rounded-2xl border space-y-3 ${
                isDark ? 'bg-neutral-950/40 border-neutral-800' : 'bg-neutral-50 border-neutral-200'
              }`}>
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <Upload className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold">{t('backupImportTitle')}</h3>
                    <p className="text-xs text-neutral-400">{t('backupImportDesc')}</p>
                  </div>
                </div>

                <label className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-neutral-800 hover:bg-neutral-700 text-white transition flex items-center justify-center gap-2 cursor-pointer border border-neutral-700">
                  <Upload className="w-4 h-4 text-emerald-400" />
                  {t('backupImportBtn')}
                  <input
                    type="file"
                    accept=".json,application/json"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Tarjeta 2: Pegar Lista de Texto */}
              <form onSubmit={handleImportTextSubmit} className={`p-4 rounded-2xl border space-y-3 ${
                isDark ? 'bg-neutral-950/40 border-neutral-800' : 'bg-neutral-50 border-neutral-200'
              }`}>
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold">{t('backupTextImportTitle')}</h3>
                    <p className="text-xs text-neutral-400">{t('backupTextImportDesc')}</p>
                  </div>
                </div>

                <textarea
                  rows={4}
                  value={textToImport}
                  onChange={(e) => setTextToImport(e.target.value)}
                  placeholder={t('backupTextImportPlaceholder')}
                  className={`w-full p-3 rounded-xl border text-xs font-mono focus:outline-none focus:border-amber-500 transition ${
                    isDark 
                      ? 'bg-neutral-900 border-neutral-800 text-white placeholder:text-neutral-600' 
                      : 'bg-white border-neutral-300 text-neutral-900 placeholder:text-neutral-400'
                  }`}
                />

                <button
                  type="submit"
                  disabled={!textToImport.trim()}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-neutral-950 transition flex items-center justify-center gap-2 shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Check className="w-4 h-4" />
                  {t('backupTextImportBtn')}
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className={`p-4 border-t flex justify-end ${
          isDark ? 'border-neutral-800 bg-neutral-950/60' : 'border-neutral-200 bg-neutral-50/80'
        }`}>
          <button
            type="button"
            onClick={onClose}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              isDark 
                ? 'bg-neutral-800 hover:bg-neutral-700 text-white' 
                : 'bg-neutral-200 hover:bg-neutral-300 text-neutral-900'
            }`}
          >
            {t('profileCloseBtn')}
          </button>
        </div>
      </div>
    </div>
  );
}
