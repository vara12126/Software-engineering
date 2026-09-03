import React, { useState } from 'react';
import { useCourt } from '../../context/CourtContext';
import { Modal } from '../common/Modal';
import { CaseType, PriorityLevel } from '../../types';
import { 
  FileText, 
  Users, 
  BookOpen, 
  UploadCloud, 
  CheckCircle2, 
  Sparkles, 
  Scale, 
  ArrowRight, 
  ArrowLeft 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const RegisterCaseModal: React.FC = () => {
  const { isRegisterModalOpen, setIsRegisterModalOpen, addCase } = useCourt();

  const [step, setStep] = useState<number>(1);
  const [title, setTitle] = useState('');
  const [caseType, setCaseType] = useState<CaseType>('Civil Suit');
  const [priority, setPriority] = useState<PriorityLevel>('Normal');
  const [courtroom, setCourtroom] = useState('Courtroom 1 (Chief Court)');
  const [assignedJudge, setAssignedJudge] = useState('Hon\'ble Justice Dr. Rajeshwar Swaminathan');
  const [nextHearing, setNextHearing] = useState('2026-09-28');

  // Litigants
  const [petitionerName, setPetitionerName] = useState('');
  const [petitionerAdvocate, setPetitionerAdvocate] = useState('Adv. Siddhartha Narain');
  const [petitionerBarReg, setPetitionerBarReg] = useState('D/1429/2012');
  const [respondentName, setRespondentName] = useState('');
  const [respondentAdvocate, setRespondentAdvocate] = useState('Adv. Standing Counsel');

  // Acts & Summary
  const [statutoryActs, setStatutoryActs] = useState('Constitution of India Art 226, IT Act 2000');
  const [summary, setSummary] = useState('');
  const [fileUploaded, setFileUploaded] = useState(false);

  const resetForm = () => {
    setStep(1);
    setTitle('');
    setPetitionerName('');
    setRespondentName('');
    setSummary('');
    setFileUploaded(false);
  };

  const handleClose = () => {
    resetForm();
    setIsRegisterModalOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !petitionerName || !respondentName) {
      alert('Please fill in the required case title and party details.');
      return;
    }

    addCase({
      title,
      caseType,
      priority,
      courtroom,
      assignedJudge,
      nextHearing,
      summary: summary || 'New digital case registration submitted through Smart Court portal.',
      statutoryActs: statutoryActs.split(',').map((s) => s.trim()),
      petitioner: {
        name: petitionerName,
        type: 'Petitioner',
        advocate: petitionerAdvocate,
        barRegistration: petitionerBarReg
      },
      respondent: {
        name: respondentName,
        type: 'Respondent',
        advocate: respondentAdvocate,
        barRegistration: 'D/204/1998'
      }
    });

    // Trigger celebratory confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    handleClose();
  };

  return (
    <Modal
      isOpen={isRegisterModalOpen}
      onClose={handleClose}
      title="E-Filing & Case Registration Wizard"
      subtitle="Register a new legal matter into the High Court Digital Docket System"
      maxWidth="3xl"
    >
      {/* Wizard Step Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-2">
          <span className={step >= 1 ? 'text-amber-700 font-bold' : ''}>1. Case Details</span>
          <span className={step >= 2 ? 'text-amber-700 font-bold' : ''}>2. Litigants & Bar</span>
          <span className={step >= 3 ? 'text-amber-700 font-bold' : ''}>3. Statutory Prayer</span>
          <span className={step >= 4 ? 'text-amber-700 font-bold' : ''}>4. Scrutiny & Seal</span>
        </div>
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-amber-500 to-court-700 h-full transition-all duration-300 rounded-full"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Step 1: Case Details */}
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Case Title / Cause of Action <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Apex Infrastructure Ltd. vs. National Highways Authority of India"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">Case Type</label>
                <select
                  value={caseType}
                  onChange={(e) => setCaseType(e.target.value as CaseType)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900"
                >
                  <option value="Civil Suit">Civil Suit</option>
                  <option value="Criminal Appeal">Criminal Appeal</option>
                  <option value="Writ Petition (Civil)">Writ Petition (Civil)</option>
                  <option value="Writ Petition (Criminal)">Writ Petition (Criminal)</option>
                  <option value="Commercial Dispute">Commercial Dispute</option>
                  <option value="Arbitration Petition">Arbitration Petition</option>
                  <option value="Family & Matrimonial">Family & Matrimonial</option>
                  <option value="Intellectual Property">Intellectual Property</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">Urgency / Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as PriorityLevel)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900"
                >
                  <option value="Normal">Normal Listing</option>
                  <option value="High">High Priority</option>
                  <option value="Urgent">Urgent Mentioning</option>
                  <option value="Critical">Critical (Bail / Life & Liberty)</option>
                  <option value="Expedited">Expedited Commercial</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">Assigned Bench</label>
                <select
                  value={assignedJudge}
                  onChange={(e) => {
                    setAssignedJudge(e.target.value);
                    if (e.target.value.includes('Swaminathan')) setCourtroom('Courtroom 1 (Chief Court)');
                    else if (e.target.value.includes('Sengupta')) setCourtroom('Courtroom 2 (Criminal Division)');
                    else if (e.target.value.includes('Rathore')) setCourtroom('Courtroom 3 (Commercial Division)');
                    else setCourtroom('Courtroom 4 (Appellate & Civil)');
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900"
                >
                  <option value="Hon'ble Justice Dr. Rajeshwar Swaminathan">Hon'ble Justice Dr. Rajeshwar Swaminathan (Bench I)</option>
                  <option value="Hon'ble Justice Ananya Sengupta">Hon'ble Justice Ananya Sengupta (Bench II)</option>
                  <option value="Hon'ble Justice Vikramaditya Rathore">Hon'ble Justice Vikramaditya Rathore (Bench III)</option>
                  <option value="Hon'ble Justice Meenakshi Sundaram">Hon'ble Justice Meenakshi Sundaram (Bench IV)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">Preliminary Hearing Date</label>
                <input
                  type="date"
                  value={nextHearing}
                  onChange={(e) => setNextHearing(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Litigants & Bar */}
        {step === 2 && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="p-3.5 bg-blue-50/60 rounded-xl border border-blue-200/80 space-y-3">
              <h4 className="text-xs font-bold text-blue-950 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-blue-700" />
                Petitioner / Appellant Particulars
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Petitioner Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={petitionerName}
                    onChange={(e) => setPetitionerName(e.target.value)}
                    placeholder="e.g. Bharat Cloud Networks Ltd."
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Advocate on Record</label>
                  <input
                    type="text"
                    value={petitionerAdvocate}
                    onChange={(e) => setPetitionerAdvocate(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900"
                  />
                </div>
              </div>
            </div>

            <div className="p-3.5 bg-amber-50/60 rounded-xl border border-amber-200/80 space-y-3">
              <h4 className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-amber-700" />
                Respondent / Defendant Particulars
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Respondent Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={respondentName}
                    onChange={(e) => setRespondentName(e.target.value)}
                    placeholder="e.g. Union of India & Cyber Directorate"
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Standing Counsel</label>
                  <input
                    type="text"
                    value={respondentAdvocate}
                    onChange={(e) => setRespondentAdvocate(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Acts & Prayer */}
        {step === 3 && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Statutory Acts & Relevant Legal Sections
              </label>
              <input
                type="text"
                value={statutoryActs}
                onChange={(e) => setStatutoryActs(e.target.value)}
                placeholder="e.g. Constitution of India Art 226, IT Act 2000 Sec 43A, CPC Order 39"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900"
              />
              <p className="text-[11px] text-slate-400 mt-1">Separate multiple sections with commas</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Synopsis of Dispute & Prayer Summary
              </label>
              <textarea
                rows={4}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="State the core grievance, interim prayer sought, and grounds of urgent relief..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500/30"
              />
            </div>
          </div>
        )}

        {/* Step 4: Verification & Auto CNR */}
        {step === 4 && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-emerald-950">Scrutiny Validation Passed</h4>
                <p className="text-[11px] text-emerald-800 mt-0.5">
                  Court fee stamp verified online. Auto-generating 16-digit National CNR identifier and preliminary listing on Courtroom cause list.
                </p>
              </div>
            </div>

            <div
              onClick={() => setFileUploaded(!fileUploaded)}
              className={`border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all ${
                fileUploaded ? 'border-emerald-400 bg-emerald-50/30' : 'border-slate-300 hover:border-amber-400 bg-slate-50'
              }`}
            >
              <UploadCloud className="w-8 h-8 mx-auto text-slate-400 mb-1" />
              <p className="text-xs font-bold text-slate-800">
                {fileUploaded ? 'Main_Petition_E_Filed_Certified.pdf (Attached)' : 'Attach Digitally Signed Petition (Optional)'}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {fileUploaded ? 'Digital certificate SHA-256 verified' : 'Drag and drop PDF or click to browse'}
              </p>
            </div>

            <div className="bg-slate-900 text-slate-100 p-3.5 rounded-xl text-xs font-mono space-y-1">
              <div className="text-amber-400 font-bold">PROVISIONAL CNR PREVIEW:</div>
              <div>CNR: DLHC01-00{(Math.floor(1000 + Math.random() * 9000))}-2026</div>
              <div>Bench: {assignedJudge} ({courtroom})</div>
            </div>
          </div>
        )}

        {/* Footer Navigation Buttons */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back
            </button>
          ) : (
            <div></div>
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={() => {
                if (step === 1 && !title) {
                  alert('Please enter a case title');
                  return;
                }
                if (step === 2 && (!petitionerName || !respondentName)) {
                  alert('Please enter petitioner and respondent names');
                  return;
                }
                setStep((s) => s + 1);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-court-900 hover:bg-court-850 text-white text-xs font-bold shadow-court"
            >
              <span>Next Step</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
            </button>
          ) : (
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-court-950 font-extrabold text-xs shadow-gold-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span>Confirm & Register Case</span>
            </button>
          )}
        </div>
      </form>
    </Modal>
  );
};
