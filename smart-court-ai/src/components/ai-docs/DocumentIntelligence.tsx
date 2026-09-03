import React, { useState } from 'react';
import { useCourt } from '../../context/CourtContext';
import { DocumentItem } from '../../types';
import { LegalDisclaimer } from '../common/LegalDisclaimer';
import { 
  UploadCloud, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  RefreshCw, 
  Download, 
  Send, 
  FileSearch, 
  ShieldCheck, 
  Hash, 
  Calendar, 
  Users, 
  BookOpen,
  Check,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const DocumentIntelligence: React.FC = () => {
  const { documents, addDocument, updateDocument, cases, showToast, addAuditLog, setActiveTab } = useCourt();

  const [selectedDoc, setSelectedDoc] = useState<DocumentItem | null>(documents[0] || null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [targetCaseId, setTargetCaseId] = useState<string>(cases[0]?.id || '');

  // Keep selectedDoc in sync if documents change
  React.useEffect(() => {
    if (!selectedDoc && documents.length > 0) {
      setSelectedDoc(documents[0]);
    } else if (documents.length === 0) {
      setSelectedDoc(null);
    }
  }, [documents]);

  const handleSimulatedUpload = (fileType: string) => {
    setIsProcessing(true);
    setTimeout(() => {
      const newDoc: DocumentItem = {
        id: `DOC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        title: `Uploaded Legal Document - ${fileType.toUpperCase()}`,
        type: fileType.includes('affidavit') ? 'Affidavit' : fileType.includes('order') ? 'Order' : 'Petition',
        fileName: `Court_Filing_${fileType}_2026_${Math.floor(100 + Math.random() * 900)}.pdf`,
        fileSize: `${(1.2 + Math.random() * 8).toFixed(1)} MB`,
        uploadedBy: 'Advocate on Record',
        uploadDate: new Date().toISOString().replace('T', ' ').substring(0, 16),
        confidenceScore: Number((96.5 + Math.random() * 3).toFixed(1)),
        extractedEntities: {
          caseNumber: 'WP(C)/2026/' + Math.floor(1000 + Math.random() * 9000),
          filingDate: new Date().toISOString().split('T')[0],
          petitioner: 'National Infrastructure Consortium Ltd.',
          respondent: 'Ministry of Road Transport & Highways',
          statutoryActs: ['Commercial Courts Act 2015 Sec 12A', 'Arbitration & Conciliation Act Sec 9'],
          courtSealVerified: true,
          stampDutyPaid: '₹ 10,000 (e-Stamp Ref: DL89210923)'
        },
        redactionStatus: 'Pending',
        redactedEntitiesCount: 8,
        contentSnippet: `BEFORE THE HIGH COURT OF JUDICATURE\nCOMMERCIAL DIVISION JURISDICTION\n\nIN THE MATTER OF:\nNational Infrastructure Consortium Ltd.\nVersus\nMinistry of Road Transport & Highways\n\nAPPLICATION UNDER SECTION 9 FOR INTERIM RELIEF...`
      };

      addDocument(newDoc);
      setSelectedDoc(newDoc);
      setIsProcessing(false);
      showToast('success', 'AI Document Processing Complete', `Successfully extracted structured entities from ${newDoc.fileName}`);
    }, 1200);
  };

  const handleReclassify = (newType: DocumentItem['type']) => {
    if (!selectedDoc) return;
    updateDocument(selectedDoc.id, { type: newType, confidenceScore: 99.0 });
    setSelectedDoc((prev) => (prev ? { ...prev, type: newType, confidenceScore: 99.0 } : null));
    showToast('info', 'Document Reclassified', `Document type updated to ${newType}`);
    addAuditLog(`Reclassified document ${selectedDoc.fileName} to ${newType}`, undefined, 'Success');
  };

  const handleSendToCase = () => {
    if (!selectedDoc) return;
    confetti({ particleCount: 50, spread: 60 });
    showToast('success', 'Document Attached to Case', `${selectedDoc.fileName} has been formally linked to docket #${targetCaseId || 'Docket'}.`);
    addAuditLog(`Attached document ${selectedDoc.fileName} to Case #${targetCaseId || 'New'}`, targetCaseId, 'Success');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-court flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">AI Document Intelligence & NLP Classification</h2>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-indigo-600" />
              Legal-NLP v3.2
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Automated legal document classification, statutory entity extraction, court stamp verification & CNR mapping
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('redaction')}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-rose-600" />
            <span>Open Redaction Suite</span>
          </button>
        </div>
      </div>

      {/* Upload Zone & Quick Sample Triggers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          {/* Drag and drop zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            onDrop={(e) => { e.preventDefault(); setDragActive(false); handleSimulatedUpload('petition'); }}
            onClick={() => handleSimulatedUpload('petition')}
            className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
              dragActive ? 'border-amber-500 bg-amber-50/50' : 'border-slate-300 hover:border-amber-400 bg-white'
            } shadow-court`}
          >
            <UploadCloud className="w-10 h-10 text-court-700 mx-auto mb-2" />
            <h4 className="text-xs font-bold text-slate-900">
              {isProcessing ? 'Processing AI Entity Stream...' : 'Upload PDF / DOCX / Scanned Files'}
            </h4>
            <p className="text-[11px] text-slate-500 mt-1">
              {isProcessing ? 'Extracting statutory acts & CNR references...' : 'Drag and drop legal files or click to simulate upload'}
            </p>
            <span className="inline-block mt-3 px-3 py-1 rounded-lg bg-court-900 text-white text-[11px] font-semibold">
              {isProcessing ? 'Analyzing...' : 'Browse Document'}
            </span>
          </div>

          {/* Quick Demo Pre-sets */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-court space-y-2.5">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <FileSearch className="w-3.5 h-3.5 text-amber-600" />
                Processed Document Ledger ({documents.length})
              </h4>
            </div>

            {documents.length === 0 ? (
              <div className="p-4 text-center text-slate-400 text-xs border border-dashed border-slate-200 rounded-xl bg-slate-50">
                <p className="font-semibold text-slate-600">0 Documents Uploaded</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Use the upload box above to classify your first legal document.</p>
              </div>
            ) : (
              <div className="space-y-1.5">
                {documents.map((doc) => (
                  <button
                    key={doc.id}
                    onClick={() => setSelectedDoc(doc)}
                    className={`w-full text-left p-2.5 rounded-xl border transition-all text-xs flex items-center justify-between cursor-pointer ${
                      selectedDoc?.id === doc.id
                        ? 'border-court-700 bg-court-50/80 font-semibold text-court-950'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="min-w-0 pr-2">
                      <p className="truncate text-xs font-bold text-slate-900">{doc.title}</p>
                      <p className="text-[10px] text-slate-500 font-mono">{doc.type} • {doc.fileSize}</p>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded shrink-0">
                      {doc.confidenceScore}%
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Selected Document AI Analysis Card */}
        <div className="lg:col-span-2 space-y-4">
          {!selectedDoc ? (
            <div className="bg-white rounded-2xl border border-slate-200/90 p-12 shadow-court text-center space-y-3">
              <FileText className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-sm font-bold text-slate-800">No Document Selected (0 Processed)</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Upload a petition, affidavit, or court notice using the upload box to trigger OCR parsing, entity extraction, and NLP statutory classification.
              </p>
              <button
                onClick={() => handleSimulatedUpload('petition')}
                className="mt-2 px-4 py-2 rounded-xl bg-court-900 text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer shadow-court"
              >
                <UploadCloud className="w-4 h-4 text-amber-400" />
                Upload Sample Legal Petition
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-court space-y-5">
              {/* Header info */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {selectedDoc.id}
                    </span>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                      Detected: {selectedDoc.type}
                    </span>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Confidence: {selectedDoc.confidenceScore}%
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mt-2 font-sans">{selectedDoc.title}</h3>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">
                    File: {selectedDoc.fileName} • Uploaded by {selectedDoc.uploadedBy} on {selectedDoc.uploadDate}
                  </p>
                </div>

                {/* Confidence Meter */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center shrink-0">
                  <div className="text-xl font-extrabold text-court-900">{selectedDoc.confidenceScore}%</div>
                  <div className="text-[10px] text-slate-500 uppercase font-semibold">AI Match Score</div>
                </div>
              </div>

              {/* Extracted Entities Grid */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider text-slate-500 mb-3">
                  Extracted Structured Entities (NLP Engine)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2.5">
                    <Hash className="w-4 h-4 text-court-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] font-semibold text-slate-400 block">Detected Case Number</span>
                      <span className="font-bold text-slate-900 font-mono">{selectedDoc.extractedEntities?.caseNumber || 'N/A'}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2.5">
                    <Calendar className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] font-semibold text-slate-400 block">Filing / Order Date</span>
                      <span className="font-bold text-slate-900 font-mono">{selectedDoc.extractedEntities?.filingDate || 'N/A'}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2.5">
                    <Users className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] font-semibold text-slate-400 block">Petitioner Party</span>
                      <span className="font-bold text-slate-900">{selectedDoc.extractedEntities?.petitioner || 'N/A'}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2.5">
                    <Users className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] font-semibold text-slate-400 block">Respondent Party</span>
                      <span className="font-bold text-slate-900">{selectedDoc.extractedEntities?.respondent || 'N/A'}</span>
                    </div>
                  </div>

                  <div className="sm:col-span-2 p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2.5">
                    <BookOpen className="w-4 h-4 text-court-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] font-semibold text-slate-400 block">Statutory Acts & Legal References Identified</span>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {selectedDoc.extractedEntities?.statutoryActs?.map((act, idx) => (
                          <span key={idx} className="bg-white border border-slate-200 text-slate-800 px-2 py-0.5 rounded text-[11px] font-medium">
                            {act}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-2 p-3 bg-emerald-50/60 rounded-xl border border-emerald-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span className="text-xs font-semibold text-emerald-950">
                        Court Seal: <span className="font-bold">Verified</span> • Stamp Duty: {selectedDoc.extractedEntities?.stampDutyPaid}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-800 uppercase">Cryptographically Signed</span>
                  </div>
                </div>
              </div>

              {/* Document Snippet Preview */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider text-slate-500 mb-2">
                  Document Text OCR Stream Preview
                </h4>
                <div className="bg-slate-950 text-slate-200 p-4 rounded-xl font-mono text-[11px] leading-relaxed max-h-48 overflow-y-auto whitespace-pre-wrap">
                  {selectedDoc.contentSnippet}
                </div>
              </div>

              {/* Action Bar */}
              <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 font-semibold">Reclassify As:</span>
                  <select
                    value={selectedDoc.type}
                    onChange={(e) => handleReclassify(e.target.value as any)}
                    className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-800 font-semibold"
                  >
                    <option value="Petition">Petition</option>
                    <option value="Affidavit">Affidavit</option>
                    <option value="Evidence">Evidence</option>
                    <option value="Order">Order</option>
                    <option value="Judgment">Judgment</option>
                    <option value="Notice">Notice</option>
                    <option value="Application">Application</option>
                    <option value="Charge Sheet">Charge Sheet</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  {cases.length > 0 ? (
                    <select
                      value={targetCaseId}
                      onChange={(e) => setTargetCaseId(e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 font-semibold"
                    >
                      {cases.map((c) => (
                        <option key={c.id} value={c.id}>{c.id} ({c.title.substring(0, 24)}...)</option>
                      ))}
                    </select>
                  ) : (
                    <span className="text-xs text-slate-400 italic">No cases registered yet</span>
                  )}
                  <button
                    onClick={handleSendToCase}
                    className="px-4 py-2 rounded-xl bg-court-900 hover:bg-court-850 text-white font-bold text-xs shadow-court flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5 text-amber-400" />
                    <span>Send to Case</span>
                  </button>
                </div>
              </div>

              <LegalDisclaimer />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

