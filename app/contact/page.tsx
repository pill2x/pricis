"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "General Inquiry",
        message: ""
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-bg-dark text-white font-sans">
      <Navbar />

      {/* Hero */}
      <section className="py-24 px-6 bg-bg-dark text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 font-display leading-tight">
            Let's talk.
          </h1>
          <p className="text-lg text-text-muted mb-10 leading-relaxed font-body max-w-2xl mx-auto">
            Have a question, partnership idea, or feedback? We read every message.
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 px-6 bg-surface text-text-dark">
        <div className="max-w-xl mx-auto">
          <div className="bg-surface border border-border-light rounded-2xl shadow-sm p-8 md:p-10">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={32} className="text-success" />
                </div>
                <h2 className="text-2xl font-bold text-text-dark font-display mb-4">Message sent!</h2>
                <p className="text-text-secondary font-body">
                  Thanks for reaching out. We'll get back to you within 48 hours.
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="mt-8 text-primary font-semibold font-body text-sm hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-text-dark font-body">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-surface border border-border-light rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary font-body text-text-dark"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-text-dark font-body">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-surface border border-border-light rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary font-body text-text-dark"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2 text-text-dark font-body">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-surface border border-border-light rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary font-body text-text-dark appearance-none"
                  >
                    <option>General Inquiry</option>
                    <option>Partnership</option>
                    <option>Bug Report</option>
                    <option>Feature Request</option>
                    <option>Press</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2 text-text-dark font-body">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-surface border border-border-light rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary font-body text-text-dark resize-y"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-3.5 rounded-lg transition-colors font-body shadow-sm"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
          
          {/* Alternative Contact */}
          <div className="mt-12 flex flex-col md:flex-row justify-center gap-8 md:gap-12 text-center text-sm font-body">
            <div>
              <p className="text-text-muted mb-1 font-medium">Email</p>
              <a href="mailto:hello@pricis.co" className="text-text-dark font-semibold hover:text-primary transition-colors">hello@pricis.co</a>
            </div>
            <div>
              <p className="text-text-muted mb-1 font-medium">Twitter / X</p>
              <a href="#" className="text-text-dark font-semibold hover:text-primary transition-colors">@pricishq</a>
            </div>
            <div>
              <p className="text-text-muted mb-1 font-medium">Response Time</p>
              <span className="text-text-dark font-semibold">24–48 hrs (biz days)</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
