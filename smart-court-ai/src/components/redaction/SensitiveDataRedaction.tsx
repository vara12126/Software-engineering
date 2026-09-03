import React, { useState } from 'react';
import { useCourt } from '../../context/CourtContext';
import { SAMPLE_REDACTION_DOC } from '../../data/mockDocuments';
import { SensitiveEntity } from '../../types';
import { LegalDisclaimer } from '../common/LegalDisclaimer';
import { 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  Undo, 
  Download, 
  AlertTriangle, 
  Lock, 
  FileText, 
  Sparkles,
  RefreshCw,
  Sliders,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const SensitiveDataRedaction: React.FC = () => {
  const { showToast, addAuditLog } = useCourt();

  const [entities, setEntities] = useState<SensitiveEntity[]>([]);
  const [docLoaded, setDocLoaded] = useState<boolean>(false);
  const [showMaskPreview, setShowMaskPreview] = useState<boolean>(true);
  const [selectedEntity, setSelectedEntity] = useState<SensitiveEntity | null>(null);

  const totalDetected = entities.length;
  const redactedCount = entities.filter((e) => e.isRedacted).length;
  const manualReviewCount = entities.filter((e) => !e.isRedacted).length;

  const handleScanSampleDoc = () => {
    setEntities(SAMPLE_REDACTION_DOC.entities);
    setDocLoaded(true);
    showToast('success', 'Document Scanned', 'AI PII Guard detected 12 sensitive entities requiring statutory redaction.');
    addAuditLog('Scanned Criminal Complaint document for sensitive PII', 'SC-2026-1089', 'Success');
  };

  const toggleRedactSingle = (id: string) => {
    setEntities((prev) =>
      prev.map((e) => (e.id === id ? { ...e, isRedacted: !e.isRedacted } : e))
    );
  };

  const handleRedactAll = () => {
    setEntities((prev) => prev.map((e) => ({ ...e, isRedacted: true })));
    showToast('success', 'All PII Redacted', `${entities.length} sensitive entities have been masked under CJIS & Data Privacy guidelines.`);
    addAuditLog('Applied Redact All on document', undefined, 'Success');
  };

  const handleUndoAll = () => {
    setEntities((prev) => prev.map((e) => ({ ...e, isRedacted: false })));
    showToast('info', 'Redactions Cleared', 'All redaction masks temporarily removed for manual audit.');
  };

  const handleExportCleanDocument = () => {
    if (entities.length === 0) {
      showToast('info', 'No Document Loaded', 'Load or upload a document first to export a certified redacted copy.');
      return;
    }
    confetti({ particleCount: 70, spread: 60 });
    showToast('success', 'Redacted Certified Copy Exported', 'Certified Redacted Document (SHA-256 sealed) is ready for public cause list.');
    addAuditLog('Exported public certified copy with PII masked', undefined, 'Success');
  };


  // Render document text with interactive highlight spans
  const renderDocumentWithHighlights = () => {
    let docText = SAMPLE_REDACTION_DOC.text;

    // Sort entities descending by startIndex to replace cleanly or render line-by-line
    return (
      <div className="bg-white p-6 rounded-xl border border-slate-300 font-mono text-xs leading-relaxed text-slate-800 shadow-inner whitespace-pre-wrap select-text">
        {entities.map((entity) => {
          return (
            <div key={entity.id} className="hidden" />
          );
        })}
        {/* Render text with inline sensitive chips */}
        {renderHighlightedText(docText, entities, showMaskPreview, toggleRedactSingle, setSelectedEntity)}
      </div>
    );
  };

  function renderHighlightedText(
    fullText: string,
    entityList: SensitiveEntity[],
    mask: boolean,
    onToggle: (id: string) => void,
    onSelect: (e: SensitiveEntity) => void
  ) {
    const sorted = [...entityList].sort((a, b) => a.startIndex - b.startIndex);
    const elements: React.ReactNode[] = [];
    let lastIndex = 0;

    sorted.forEach((ent) => {
      // Push text before entity
      if (ent.startIndex > lastIndex) {
        elements.push(fullText.substring(lastIndex, ent.startIndex));
      }

      // Render entity
      const isRedacted = ent.isRedacted;
      elements.push(
        <span
          key={ent.id}
          onClick={() => {
            onToggle(ent.id);
            onSelect(ent);
          }}
          title={`${ent.type} (${ent.confidence}% confidence) - Click to ${isRedacted ? 'Reveal' : 'Redact'}`}
          className={`cursor-pointer inline-block mx-0.5 px-1.5 py-0.5 rounded transition-all ${
            isRedacted
              ? mask
                ? 'bg-slate-950 text-slate-950 hover:text-slate-200 border border-slate-900 select-none'
                : 'bg-rose-100 text-rose-800 border border-rose-300 line-through'
              : 'bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200 font-semibold'
          }`}
        >
          {isRedacted && mask ? '████████' : ent.text}
        </span>
      );

      lastIndex = ent.endIndex;
    });

    if (lastIndex < fullText.length) {
      elements.push(fullText.substring(lastIndex));
    }

    return elements;
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-court flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">AI Sensitive Data Redaction Suite</h2>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-rose-600" />
              PII & CJIS Guard
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Automated detection & cryptographic masking of Aadhaar, PAN, Bank Accounts, Phone, Minors & Protected Identifiers
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowMaskPreview(!showMaskPreview)}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            {showMaskPreview ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{showMaskPreview ? 'Mask Mode (Blacked Out)' : 'Audit Mode (Revealed)'}</span>
          </button>

          <button
            onClick={handleExportCleanDocument}
            className="px-4 py-2 rounded-xl bg-court-900 hover:bg-court-850 text-white text-xs font-bold shadow-court flex items-center gap-1.5 transition-all"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span>Export Redacted Copy</span>
          </button>
        </div>
      </div>

      {/* Redaction Metrics KPI Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-court flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase">Sensitive Entities Detected</p>
            <p className="text-2xl font-extrabold text-slate-900 mt-1">{totalDetected}</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-court flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-emerald-700 uppercase">Automatically Redacted</p>
            <p className="text-2xl font-extrabold text-emerald-700 mt-1">{redactedCount}</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-court flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-amber-800 uppercase">Pending Manual Review</p>
            <p className="text-2xl font-extrabold text-amber-800 mt-1">{manualReviewCount}</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center font-bold">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main Workspace: Side-by-side / Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Document Preview Canvas */}
        <div className="lg:col-span-2 space-y-4">
          {!docLoaded && entities.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200/90 p-12 shadow-court text-center space-y-3">
              <ShieldCheck className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-sm font-bold text-slate-800">Redaction Workspace is Clean (0 PII Flags)</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                No active documents loaded into the redaction suite. Click below to load and scan a sample judicial complaint or upload an e-filing.
              </p>
              <button
                onClick={handleScanSampleDoc}
                className="mt-2 px-4 py-2 rounded-xl bg-court-900 hover:bg-court-850 text-white text-xs font-bold shadow-court inline-flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                Scan Sample Legal Document for PII
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-court space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 font-sans">{SAMPLE_REDACTION_DOC.title}</h3>
                  <p className="text-xs text-slate-500 font-mono">Docket Ref: {SAMPLE_REDACTION_DOC.caseNumber}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handleRedactAll}
                    className="px-3 py-1.5 rounded-lg bg-court-900 hover:bg-court-850 text-white text-xs font-semibold shadow-2xs cursor-pointer"
                  >
                    Redact All (100%)
                  </button>
                  <button
                    onClick={handleUndoAll}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-semibold cursor-pointer"
                  >
                    Undo All
                  </button>
                </div>
              </div>

              {/* Document Canvas */}
              {renderDocumentWithHighlights()}

              <p className="text-[11px] text-slate-400 italic">
                * Click any highlighted entity above to toggle its redaction state. Black blocks represent masked data on exported certified copies.
              </p>
            </div>
          )}
        </div>

        {/* Sensitive Entities Inspector */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-court space-y-4">
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider text-slate-500">
                Detected Entity Registry ({entities.length})
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {entities.length > 0 ? 'Click any entity to inspect statutory reason' : '0 sensitive identifiers detected'}
              </p>
            </div>

            {entities.length === 0 ? (
              <div className="p-6 text-center text-slate-400 text-xs border border-dashed border-slate-200 rounded-xl bg-slate-50">
                <p className="font-semibold text-slate-600">0 Entities Flagged</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Scan a document to populate the entity registry.</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                {entities.map((entity) => (
                  <div
                    key={entity.id}
                    onClick={() => setSelectedEntity(entity)}
                    className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                      selectedEntity?.id === entity.id
                        ? 'border-court-700 bg-court-50 shadow-xs'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-800">
                        {entity.type}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleRedactSingle(entity.id);
                        }}
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md cursor-pointer ${
                          entity.isRedacted
                            ? 'bg-slate-900 text-white'
                            : 'bg-amber-100 text-amber-900'
                        }`}
                      >
                        {entity.isRedacted ? 'Masked' : 'Exposed'}
                      </button>
                    </div>

                    <p className="font-mono text-slate-900 text-xs truncate">{entity.text}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">{entity.reason}</p>
                    <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-400">
                      <span>Confidence: {entity.confidence}%</span>
                      <span className="text-court-700 font-semibold">Click to toggle</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <LegalDisclaimer variant="subtle" />
          </div>
        </div>
      </div>
    </div>
  );
};

