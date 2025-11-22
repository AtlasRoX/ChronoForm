import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  CheckCircle, Loader2, ChevronRight, Github, Cpu, Terminal,
  Layers, Wifi, Database, Brain, Shield, PenTool, Zap, Globe, Code, Rocket
} from 'lucide-react';

import { databases, DATABASE_ID, COLLECTION_ID } from './appwrite';
import { ID } from 'appwrite';

export default function App() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    university: '',
    positionApplied: '',
    skillLevel: '',
    portfolio: '',
    hackathonExp: '',
    whyJoin: '',
    availability: ''
  });

  const [status, setStatus] = useState('idle'); // idle, submitting, success, error
  const [errorMessage, setErrorMessage] = useState('');
  const [focusedField, setFocusedField] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    const startTime = Date.now();
    const MIN_DURATION = 1500; // 1.5 seconds minimum for "Processing" state

    try {
      // Perform the actual upload
      const payload = {
        ...formData,
        mainSkill: formData.positionApplied // Send both to satisfy potential schema variations
      };

      await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        payload
      );

      // Calculate remaining time to wait
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, MIN_DURATION - elapsed);

      // Wait for the rest of the animation
      await new Promise(resolve => setTimeout(resolve, remaining));

      setStatus('success');

    } catch (error) {
      console.error('Appwrite Error:', error);

      // Even on error, let the animation finish so it's not jarring
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, MIN_DURATION - elapsed);
      await new Promise(resolve => setTimeout(resolve, remaining));

      setErrorMessage(error.message || 'Unknown error occurred');
      setStatus('error');
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: '', email: '', phone: '', university: '',
      positionApplied: '', skillLevel: '', portfolio: '',
      hackathonExp: '', whyJoin: '', availability: ''
    });
    setStatus('idle');
  };

  return (
    <div className="min-h-screen w-full relative text-slate-200 selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden">

      {/* Dynamic Background Effects */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: `radial-gradient(600px at ${mousePos.x}px ${mousePos.y}px, rgba(0, 243, 255, 0.07), transparent 80%)`
        }}
      />

      {/* Grid Overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Success Card Overlay */}
      {status === 'success' && <SuccessCard onReset={handleReset} />}

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-12 md:py-20">

        {/* Hero Section with Banner */}
        <div className="mb-12 animate-float relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <img
              src="https://i.postimg.cc/QMRhJrbp/banner.png"
              alt="ChronoStrider Banner"
              className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>

        {/* Rolling Text Description */}
        <div className="mb-12 relative overflow-hidden h-12 flex items-center">
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#0a0a12] via-transparent to-[#0a0a12] pointer-events-none"></div>
          <div className="animate-marquee text-cyan-300/80 font-mono text-sm tracking-wider relative z-20">
            Welcome to the ChronoStrider Hackathon Team recruitment form! We’re building a long-term tech team focused on winning hackathons, research, and innovation. We’re looking for serious, flexible, and passionate learners who love teamwork and a friendly environment. If you want to grow, build together, and be part of ChronoStrider’s journey, fill out this form. Let’s create something amazing! 🚀
          </div>
        </div>

        {/* Main Form Container */}
        <div className="glass-panel rounded-2xl p-1 md:p-2 relative overflow-hidden">
          {/* Decorative top bar */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>

          <form onSubmit={handleSubmit} className="bg-[#0a0a12]/80 rounded-xl p-6 md:p-10 space-y-8 backdrop-blur-xl">

            {/* Personal Details */}
            <Section title="Identity Verification" icon={<Terminal size={20} />}>
              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  label="Full Name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  focused={focusedField}
                  setFocused={setFocusedField}
                  icon={<UserIcon />}
                />
                <Input
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  focused={focusedField}
                  setFocused={setFocusedField}
                  icon={<MailIcon />}
                />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Optional"
                  focused={focusedField}
                  setFocused={setFocusedField}
                  icon={<PhoneIcon />}
                />
                <Input
                  label="University / Department"
                  name="university"
                  value={formData.university}
                  onChange={handleChange}
                  required
                  focused={focusedField}
                  setFocused={setFocusedField}
                  icon={<Globe size={18} />}
                />
              </div>
            </Section>

            {/* Technical Skillset */}
            <Section title="Technical Matrix" icon={<Cpu size={20} />}>
              <RadioGroup
                label="Primary Specialization"
                name="positionApplied"
                options={[
                  { label: 'Frontend Dev', icon: <Layers size={16} /> },
                  { label: 'Backend Dev', icon: <Database size={16} /> },
                  { label: 'Full-Stack', icon: <Code size={16} /> },
                  { label: 'UI/UX Design', icon: <PenTool size={16} /> },
                  { label: 'AI / ML', icon: <Brain size={16} /> },
                  { label: 'Cybersecurity', icon: <Shield size={16} /> },
                  { label: 'IoT / Hardware', icon: <Wifi size={16} /> },
                  { label: 'Management', icon: <Terminal size={16} /> },
                ]}
                value={formData.positionApplied}
                onChange={handleChange}
                required
                withConfetti
              />

              <div className="grid md:grid-cols-2 gap-8 mt-6">
                <RadioGroup
                  label="Proficiency Level"
                  name="skillLevel"
                  options={[
                    { label: 'Novice' },
                    { label: 'Adept' },
                    { label: 'Expert' }
                  ]}
                  value={formData.skillLevel}
                  onChange={handleChange}
                  required
                  horizontal
                />

                <RadioGroup
                  label="Hackathon Experience"
                  name="hackathonExp"
                  options={[
                    { label: 'Yes' },
                    { label: 'No' }
                  ]}
                  value={formData.hackathonExp}
                  onChange={handleChange}
                  required
                  horizontal
                />
              </div>

              <div className="mt-6">
                <Input
                  label="Portfolio / GitHub URL"
                  name="portfolio"
                  value={formData.portfolio}
                  onChange={handleChange}
                  placeholder="https://github.com/username"
                  icon={<Github size={18} />}
                  focused={focusedField}
                  setFocused={setFocusedField}
                />
              </div>
            </Section>

            {/* Motivation */}
            <Section title="Mission Alignment" icon={<Zap size={20} />}>
              <TextArea
                label="Why join ChronoStrider?"
                name="whyJoin"
                value={formData.whyJoin}
                onChange={handleChange}
                required
                focused={focusedField}
                setFocused={setFocusedField}
                placeholder="Tell us what drives you..."
              />

              <div className="mt-6">
                <RadioGroup
                  label="Availability for Sessions"
                  name="availability"
                  options={[
                    { label: 'Full' },
                    { label: 'Partial' },
                    { label: 'Limited' }
                  ]}
                  value={formData.availability}
                  onChange={handleChange}
                  required
                  horizontal
                />
              </div>
            </Section>

            {/* Submit Area */}
            <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-500 font-mono">
                SECURE_CONNECTION_ESTABLISHED<br />
                ID: {Math.random().toString(36).substring(7).toUpperCase()}
              </div>

              <button
                type="submit"
                disabled={status === 'submitting' || status === 'success'}
                className={`
                  relative overflow-hidden group px-10 py-4 rounded-xl font-bold text-white shadow-lg transition-all duration-300 w-full md:w-auto
                  ${status === 'success'
                    ? 'bg-green-500/20 border border-green-500/50 cursor-default'
                    : 'bg-cyan-600 hover:bg-cyan-500 hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:-translate-y-1 border border-cyan-400/30'}
                  disabled:opacity-70 disabled:cursor-not-allowed
                `}
              >
                <div className="relative z-10 flex items-center justify-center gap-3">
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      <span>PROCESSING...</span>
                    </>
                  ) : status === 'success' ? (
                    <>
                      <CheckCircle size={20} className="text-green-400" />
                      <span className="text-green-100">APPLICATION SENT</span>
                    </>
                  ) : (
                    <>
                      <Rocket size={20} className="animate-rocket-float" />
                      <span>INITIATE UPLOAD</span>
                      <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </div>

                {/* Button Glow Effect */}
                {status === 'idle' && (
                  <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0"></div>
                )}
              </button>
            </div>

            {/* Messages */}
            {status === 'error' && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-200 px-6 py-4 rounded-xl flex items-start gap-3 animate-fade-in">
                <div className="mt-1 shrink-0 text-red-400">⚠️</div>
                <div>
                  <h4 className="font-bold text-red-400">Transmission Failed</h4>
                  <p className="text-sm mt-1 opacity-80">Uplink unstable. Please check your connection and retry.</p>
                  <p className="text-xs mt-2 font-mono bg-black/30 p-2 rounded text-red-300">{errorMessage}</p>
                </div>
              </div>
            )}

          </form>
        </div>

        <footer className="text-center py-12 text-slate-600 text-xs font-mono">
          <p>CHRONOSTRIDER SYSTEMS // EST. 2025</p>
          <p className="mt-2">SECURE // ENCRYPTED // DECENTRALIZED</p>
        </footer>
      </div>
    </div>
  );
}

/* --- Components --- */

function Section({ title, children, icon }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 border-b border-white/10 pb-2">
        <span className="text-cyan-400">{icon}</span>
        <h2 className="font-bold text-slate-200 uppercase tracking-wider text-sm font-mono">{title}</h2>
      </div>
      <div className="space-y-6">
        {children}
      </div>
    </div>
  );
}

Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  icon: PropTypes.node
};

function Input({ label, name, type = "text", value, onChange, required, placeholder, icon, focused, setFocused }) {
  const isFocused = focused === name;
  const hasValue = value && value.length > 0;

  return (
    <div className="relative group">
      <label
        htmlFor={name}
        className={`
          absolute left-0 transition-all duration-300 pointer-events-none font-mono
          ${isFocused || hasValue ? '-top-6 text-xs text-cyan-400' : 'top-3 text-slate-500'}
        `}
      >
        {label} {required && <span className="text-red-400/70">*</span>}
      </label>
      <div className="relative">
        <input
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(name)}
          onBlur={() => setFocused(null)}
          required={required}
          placeholder={isFocused ? placeholder : ""}
          className={`
            w-full bg-white/5 border-b-2 rounded-t-lg px-4 py-3 outline-none transition-all duration-300 text-slate-200 placeholder-slate-600
            ${isFocused ? 'border-cyan-500 bg-white/10' : 'border-white/10 hover:border-white/20'}
          `}
        />
        {icon && (
          <div className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-300 ${isFocused ? 'text-cyan-400' : 'text-slate-600'}`}>
            {icon}
          </div>
        )}
        {/* Animated underline */}
        <div className={`absolute bottom-0 left-0 h-[2px] bg-cyan-500 transition-all duration-500 ${isFocused ? 'w-full' : 'w-0'}`}></div>
      </div>
    </div>
  );
}

Input.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  icon: PropTypes.node,
  focused: PropTypes.string,
  setFocused: PropTypes.func.isRequired
};

function TextArea({ label, name, value, onChange, required, placeholder, focused, setFocused }) {
  const isFocused = focused === name;
  const hasValue = value && value.length > 0;

  return (
    <div className="relative group">
      <label
        htmlFor={name}
        className={`
          absolute left-0 transition-all duration-300 pointer-events-none font-mono
          ${isFocused || hasValue ? '-top-6 text-xs text-cyan-400' : 'top-3 text-slate-500'}
        `}
      >
        {label} {required && <span className="text-red-400/70">*</span>}
      </label>
      <div className="relative">
        <textarea
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(name)}
          onBlur={() => setFocused(null)}
          required={required}
          placeholder={isFocused ? placeholder : ""}
          rows={4}
          className={`
            w-full bg-white/5 border-b-2 rounded-t-lg px-4 py-3 outline-none transition-all duration-300 text-slate-200 placeholder-slate-600 resize-none
            ${isFocused ? 'border-cyan-500 bg-white/10' : 'border-white/10 hover:border-white/20'}
          `}
        />
        <div className={`absolute bottom-0 left-0 h-[2px] bg-cyan-500 transition-all duration-500 ${isFocused ? 'w-full' : 'w-0'}`}></div>
      </div>
    </div>
  );
}

TextArea.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  focused: PropTypes.string,
  setFocused: PropTypes.func.isRequired
};

function RadioGroup({ label, name, options, value, onChange, required, horizontal, withConfetti }) {
  return (
    <div className="space-y-4">
      <div className="text-slate-400 font-mono text-xs uppercase tracking-wider">
        {label} {required && <span className="text-red-400/70">*</span>}
      </div>
      <div className={`grid gap-3 ${horizontal ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-4'}`}>
        {options.map((option) => (
          <label
            key={option.label}
            className={`
              relative flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all duration-300 overflow-hidden group
              ${value === option.label
                ? 'border-cyan-500/50 bg-cyan-500/10 text-cyan-300'
                : 'border-white/10 hover:border-white/30 bg-white/5 text-slate-400'}
            `}
          >
            <div className="relative flex items-center justify-center shrink-0">
              <input
                type="radio"
                name={name}
                value={option.label}
                checked={value === option.label}
                onChange={onChange}
                className="appearance-none w-4 h-4 rounded-full border border-slate-500 checked:border-cyan-400 checked:bg-cyan-400 transition-all"
              />
              <div className="absolute inset-0 rounded-full scale-150 bg-cyan-400 opacity-0 checked:animate-ping pointer-events-none"></div>
            </div>
            <div className="flex items-center gap-2 z-10 relative">
              {option.icon && <span className={`transition-colors ${value === option.label ? "text-cyan-400" : "text-slate-500 group-hover:text-slate-300"}`}>{option.icon}</span>}
              <span className="text-sm font-medium">{option.label}</span>

              {/* Confetti Explosion on Selection */}
              {withConfetti && value === option.label && <ConfettiExplosion />}
            </div>

            {/* Hover Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          </label>
        ))}
      </div>
    </div>
  );
}

RadioGroup.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    icon: PropTypes.node
  })).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  horizontal: PropTypes.bool,
  withConfetti: PropTypes.bool
};

function ConfettiExplosion() {
  // Generate 40 particles with random properties
  const particles = Array.from({ length: 40 }).map((_, i) => {
    const angle = Math.random() * 360;
    const distance = 30 + Math.random() * 50; // Slightly tighter spread
    const tx = Math.cos(angle * (Math.PI / 180)) * distance;
    const ty = Math.sin(angle * (Math.PI / 180)) * distance;

    const colors = ['#06b6d4', '#22d3ee', '#f472b6', '#fbbf24', '#ffffff', '#a78bfa'];
    const color = colors[Math.floor(Math.random() * colors.length)];

    // Smaller, finer particles (2px - 5px)
    const size = 2 + Math.random() * 3;
    const rot = -180 + Math.random() * 360;
    const dur = 0.5 + Math.random() * 0.5; // Faster, snappier
    const delay = Math.random() * 0.1;

    // More squares for "confetti" feel
    const borderRadius = Math.random() > 0.7 ? '50%' : '1px';

    return { id: i, tx, ty, color, size, rot, dur, delay, borderRadius };
  });

  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            '--tx': `${p.tx}px`,
            '--ty': `${p.ty}px`,
            '--rot': `${p.rot}deg`,
            '--color': p.color,
            '--size': `${p.size}px`,
            '--dur': `${p.dur}s`,
            borderRadius: p.borderRadius,
            animationDelay: `${p.delay}s`
          }}
        />
      ))}
    </div>
  );
}





function SuccessCard({ onReset }) {
  return (
    <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 animate-fade-in">
      <div className="relative bg-[#0a0a12] border border-cyan-500/30 rounded-2xl p-8 md:p-12 max-w-lg w-full text-center overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.2)] group">

        {/* Holographic Border Effect */}
        <div className="absolute inset-0 rounded-2xl border border-cyan-500/20 shadow-[inset_0_0_20px_rgba(6,182,212,0.1)] pointer-events-none"></div>

        {/* Corner Brackets */}
        <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-cyan-500 rounded-tl-lg opacity-50"></div>
        <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-cyan-500 rounded-br-lg opacity-50"></div>

        {/* Scanning Line */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
          <div className="absolute left-0 w-full h-[2px] bg-cyan-400 shadow-[0_0_10px_#22d3ee] animate-scan-card"></div>
        </div>

        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-cyan-500/20 blur-[50px] pointer-events-none"></div>

        <div className="relative z-10 flex flex-col items-center gap-6">

          {/* Icon with Pulse Ring */}
          <div className="relative mb-4">
            <div className="absolute inset-0 bg-cyan-500 rounded-full animate-ping opacity-20"></div>
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-cyan-500 to-teal-400 flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.6)] relative z-10">
              <CheckCircle size={40} className="text-white drop-shadow-md" />
            </div>
          </div>

          {/* Status Label */}
          <div className="font-mono text-xs text-cyan-400 tracking-[0.2em] uppercase opacity-80">
            // Transmission_Complete
          </div>

          {/* Glitch Title */}
          <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-cyan-300 tracking-tight drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
            PERFECT
          </h2>

          <p className="text-slate-300 text-lg leading-relaxed font-light max-w-sm mx-auto">
            Thank you for wanting to be part of our fascinating journey. We will contact you soon.
          </p>

          <div className="pt-8 w-full">
            <button
              onClick={onReset}
              className="w-full py-4 rounded-xl bg-cyan-950/30 hover:bg-cyan-900/50 border border-cyan-500/30 hover:border-cyan-400 transition-all duration-300 text-cyan-300 font-mono text-sm tracking-widest uppercase group-hover:shadow-[0_0_20px_rgba(6,182,212,0.2)]"
            >
              <span className="mr-2">[</span> Return to Base <span className="ml-2">]</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Simple icons for inputs
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
const MailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>;
const PhoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>;