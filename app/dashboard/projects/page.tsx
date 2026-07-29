"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Plus, ArrowLeft, ArrowRight, Check, ChevronRight, 
  Eye, CheckCircle2, FileText, Calendar, Users, Settings, 
  Trash2, Briefcase, Paperclip, MessageSquare, AlertCircle, Sparkles, Share2
} from "lucide-react";
import { supabaseAuth } from "@/lib/auth";
import { fetchProjects, createProject, deleteProject } from "@/app/actions/db";

interface ProjectData {
  id: string;
  name: string;
  client: string;
  status: "In Progress" | "Review" | "Completed" | "On Hold";
  progress: number;
  dueDate: string;
  owner: string;
  updated: string;
}

export default function ProjectsPage() {
  const [view, setView] = useState<"list" | "details" | "wizard">("list");
  const [userId, setUserId] = useState<string | null>(null);
  
  // Detail views
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [activeDetailTab, setActiveDetailTab] = useState<"Overview" | "Tasks" | "Milestones" | "Files" | "Team" | "Settings">("Overview");

  // Wizard States
  const [wizardStep, setWizardStep] = useState(1);
  const [projectName, setProjectName] = useState("Website Redesign");
  const [clientName, setClientName] = useState("Acme Corp");
  const [projectDesc, setProjectDesc] = useState("Redesign the corporate website to improve user experience and modernize the brand.");
  const [template, setTemplate] = useState("Website Project");
  
  // Task States
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [isTaskDetailsModalOpen, setIsTaskDetailsModalOpen] = useState(false);
  const [isInviteMemberModalOpen, setIsInviteMemberModalOpen] = useState(false);

  // List data
  const [projectsList, setProjectsList] = useState<ProjectData[]>([]);

  useEffect(() => {
    async function loadProjects() {
      const { data: { session } } = await supabaseAuth.auth.getSession();
      if (session?.user) {
        setUserId(session.user.id);
        const list = await fetchProjects(session.user.id);
        if (list && list.length > 0) {
          const mapped: ProjectData[] = list.map((p: any) => ({
            id: p.id,
            name: p.title,
            client: "Client",
            status: p.status || "In Progress",
            progress: p.status === "Completed" ? 100 : 35,
            dueDate: new Date(p.due_date).toLocaleDateString(),
            owner: "Alex John",
            updated: "Just now"
          }));
          setProjectsList(mapped);
        } else {
          setProjectsList([
            { id: "proj-1", name: "Website Redesign", client: "Acme Corp", status: "In Progress", progress: 60, dueDate: "May 30, 2024", owner: "Alex John", updated: "2h ago" },
            { id: "proj-2", name: "Mobile App Design", client: "TechNova Ltd.", status: "In Progress", progress: 25, dueDate: "Jun 15, 2024", owner: "Alex John", updated: "5h ago" }
          ]);
        }
      }
    }
    loadProjects();
  }, []);

  const handleCreateProject = async () => {
    let newId = `proj-${Date.now()}`;
    if (userId) {
      const saved = await createProject(
        userId,
        null,
        projectName,
        projectDesc,
        500000,
        "NGN",
        new Date().toISOString().split('T')[0],
        "2026-12-31",
        template,
        "Private"
      );
      if (saved) {
        newId = (saved as any).id;
      }
    }

    const newProject: ProjectData = {
      id: newId,
      name: projectName,
      client: clientName,
      status: "In Progress",
      progress: 0,
      dueDate: "Jun 30, 2024",
      owner: "Alex John",
      updated: "Just now"
    };
    setProjectsList([newProject, ...projectsList]);
    setSelectedProject(newProject);
    setView("details");
    setActiveDetailTab("Overview");
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* ----------------- LIST VIEW ----------------- */}
      {view === "list" && (
        <>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-extrabold text-[#0F172A] font-display">Projects</h1>
              <p className="text-text-secondary text-sm font-body">Organize and track all your work in one place.</p>
            </div>
            <button 
              onClick={() => { setView("wizard"); setWizardStep(1); }}
              className="bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 shadow-blue transition-all"
            >
              <Plus size={16} /> New Project
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Total Projects", count: "24", desc: "↑ 28% vs last month", color: "text-[#0F172A]" },
              { label: "In Progress", count: "8", desc: "↑ 14% vs last month", color: "text-blue-600" },
              { label: "Completed", count: "12", desc: "↑ 33% vs last month", color: "text-emerald-600" },
              { label: "On Hold", count: "4", desc: "↓ 20% vs last month", color: "text-amber-600" },
            ].map((stat, i) => (
              <div key={i} className="bg-white border border-[#E5EAF2] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
                <span className={`text-2xl font-black font-display ${stat.color}`}>{stat.count}</span>
                <p className="text-xs font-bold text-text-secondary uppercase tracking-wider mt-2">{stat.label}</p>
                <p className="text-[10px] text-text-muted mt-1 font-semibold">{stat.desc}</p>
              </div>
            ))}
          </div>

          {/* Table list */}
          <div className="bg-white border border-[#E5EAF2] rounded-2xl overflow-hidden shadow-sm">
            <div className="p-4 border-b border-[#E5EAF2] flex justify-between items-center gap-4 bg-[#F8FAFC]">
              <input 
                type="text" 
                placeholder="Search projects..." 
                className="bg-white border border-[#E5EAF2] text-text-dark text-xs rounded-xl px-4 py-2 outline-none w-64 shadow-sm focus:border-primary transition-colors font-semibold"
              />
              <select className="bg-white border border-[#E5EAF2] text-text-secondary text-xs rounded-xl px-3 py-2 outline-none font-bold shadow-sm cursor-pointer hover:bg-slate-50 transition-colors">
                <option>All Status</option>
                <option>In Progress</option>
                <option>Review</option>
                <option>Completed</option>
                <option>On Hold</option>
              </select>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-body">
                <thead>
                  <tr className="bg-[#F8FAFC] border-b border-[#E5EAF2] text-text-secondary text-[10px] uppercase tracking-wider font-bold">
                    <th className="p-4">Project Name</th>
                    <th className="p-4">Client</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Progress</th>
                    <th className="p-4">Due Date</th>
                    <th className="p-4">Owner</th>
                    <th className="p-4">Updated</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5EAF2] text-xs font-semibold">
                  {projectsList.map((proj) => (
                    <tr key={proj.id} className="hover:bg-slate-50 cursor-pointer transition-colors" onClick={() => {
                      setSelectedProject(proj);
                      setView("details");
                      setActiveDetailTab("Overview");
                    }}>
                      <td className="p-4 text-[#0F172A] font-bold">{proj.name}</td>
                      <td className="p-4 text-text-secondary">{proj.client}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                          proj.status === "Completed" ? "bg-emerald-50 text-[#10B981] border-emerald-100" :
                          proj.status === "In Progress" ? "bg-blue-50 text-primary border-blue-100" :
                          proj.status === "Review" ? "bg-purple-50 text-purple-600 border-purple-100" :
                          "bg-amber-50 text-amber-600 border-amber-100"
                        }`}>{proj.status}</span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${proj.status === "Completed" ? "bg-emerald-500" : "bg-primary"}`} style={{ width: `${proj.progress}%` }}></div>
                          </div>
                          <span className="text-xs font-bold text-[#0F172A]">{proj.progress}%</span>
                        </div>
                      </td>
                      <td className="p-4 text-text-muted">{proj.dueDate}</td>
                      <td className="p-4 text-text-secondary">{proj.owner}</td>
                      <td className="p-4 text-text-muted">{proj.updated}</td>
                      <td className="p-4 text-text-muted hover:text-primary transition-colors text-right">
                        <ChevronRight size={16} className="inline" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* ----------------- DETAILS VIEW ----------------- */}
      {view === "details" && selectedProject && (
        <div className="space-y-6 max-w-5xl mx-auto animate-fade-in">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-4 border-b border-[#E5EAF2]">
            <button onClick={() => setView("list")} className="flex items-center gap-2 text-text-secondary hover:text-[#0F172A] transition-colors text-sm font-bold">
              <ArrowLeft size={16} /> Back to Projects
            </button>
            <div className="flex gap-2">
              <span className={`text-[10px] font-bold px-3 py-1.5 rounded-xl border ${
                selectedProject.status === "Completed" ? "bg-emerald-50 text-[#10B981] border-emerald-100" :
                selectedProject.status === "In Progress" ? "bg-blue-50 text-primary border-blue-100" :
                selectedProject.status === "Review" ? "bg-purple-50 text-purple-600 border-purple-100" :
                "bg-amber-50 text-amber-600 border-amber-100"
              }`}>
                {selectedProject.status}
              </span>
              <button className="bg-white border border-[#E5EAF2] text-text-secondary hover:text-[#0F172A] px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1">
                <Share2 size={13} /> Share
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center bg-white border border-[#E5EAF2] rounded-2xl p-6 shadow-sm">
            <div className="flex gap-4 items-center">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center">
                <Briefcase size={22} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#0F172A] font-display">{selectedProject.name}</h2>
                <p className="text-xs text-text-secondary mt-1 font-semibold">{selectedProject.client} • May 13 - Jun 30, 2024</p>
              </div>
            </div>
          </div>

          {/* Details Navigation */}
          <div className="flex border-b border-[#E5EAF2]">
            {(["Overview", "Tasks", "Milestones", "Files", "Team", "Settings"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveDetailTab(tab)}
                className={`px-6 py-3 text-xs font-bold border-b-2 transition-colors ${
                  activeDetailTab === tab 
                    ? "border-primary text-primary" 
                    : "border-transparent text-text-secondary hover:text-[#0F172A]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              
              {/* Tab: Overview */}
              {activeDetailTab === "Overview" && (
                <div className="space-y-6">
                  {/* Progress info */}
                  <div className="bg-white border border-[#E5EAF2] rounded-2xl p-6 shadow-sm flex items-center justify-between gap-6">
                    <div className="space-y-2.5 flex-grow">
                      <span className="block text-xs font-bold text-text-secondary uppercase">Project Progress</span>
                      <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs font-semibold text-[#0F172A] pt-1">
                        <div className="flex justify-between border-b border-[#E5EAF2] pb-1.5"><span>Completed Tasks</span><span className="font-bold text-emerald-600">12</span></div>
                        <div className="flex justify-between border-b border-[#E5EAF2] pb-1.5"><span>In Progress</span><span className="font-bold text-primary">5</span></div>
                        <div className="flex justify-between border-b border-[#E5EAF2] pb-1.5"><span>Not Started</span><span className="font-bold text-text-secondary">2</span></div>
                        <div className="flex justify-between border-b border-[#E5EAF2] pb-1.5"><span>Overdue</span><span className="font-bold text-danger">0</span></div>
                      </div>
                    </div>
                    
                    <div className="relative w-28 h-28 flex-shrink-0 flex items-center justify-center">
                      <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                        <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#F1F5F9" strokeWidth="3.5" />
                        <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#10B981" strokeWidth="3.5" 
                                strokeDasharray="60 40" strokeDashoffset="0" />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-xl font-bold text-[#0F172A] font-display leading-none">60%</span>
                        <span className="text-[9px] text-text-secondary font-semibold mt-1">Complete</span>
                      </div>
                    </div>
                  </div>

                  {/* Summary description */}
                  <div className="bg-white border border-[#E5EAF2] rounded-2xl p-6 shadow-sm space-y-4 text-left">
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold text-[#0F172A] text-sm font-display">Project Summary</h3>
                      <Link href="#" className="text-xs font-bold text-primary hover:underline">View all</Link>
                    </div>
                    <p className="text-xs text-text-secondary leading-relaxed font-semibold">
                      Redesign the corporate website to improve user experience, showcase services clearly, and drive higher conversions.
                    </p>
                  </div>
                </div>
              )}

              {/* Tab: Tasks */}
              {activeDetailTab === "Tasks" && (
                <div className="bg-white border border-[#E5EAF2] rounded-2xl p-6 shadow-sm space-y-4 text-left">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-[#0F172A] text-sm font-display">Tasks</h3>
                    <button 
                      onClick={() => setIsNewTaskModalOpen(true)}
                      className="bg-primary hover:bg-primary-hover text-white px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1 transition-all shadow-blue"
                    >
                      <Plus size={14} /> New Task
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {[
                      { name: "Research & Discovery", assignee: "KC", status: "Completed", dueDate: "May 15, 2024", priority: "Medium", color: "text-[#10B981] bg-emerald-50 border-emerald-100" },
                      { name: "Sitemap & Wireframes", assignee: "KC", status: "In Progress", dueDate: "May 18, 2024", priority: "High", color: "text-primary bg-blue-50 border-blue-100" },
                      { name: "Homepage Design", assignee: "TA", status: "Review", dueDate: "May 22, 2024", priority: "High", color: "text-purple-600 bg-purple-50 border-purple-100" },
                      { name: "Inner Pages Design", assignee: "TA", status: "Not Started", dueDate: "May 25, 2024", priority: "Medium", color: "text-text-secondary bg-slate-50 border-slate-200" },
                      { name: "Responsive Design", assignee: "KC", status: "Not Started", dueDate: "May 28, 2024", priority: "Medium", color: "text-text-secondary bg-slate-50 border-slate-200" },
                    ].map((task, i) => (
                      <div 
                        key={i} 
                        onClick={() => setIsTaskDetailsModalOpen(true)}
                        className="flex justify-between items-center p-3 border border-[#E5EAF2] rounded-xl hover:bg-slate-50 cursor-pointer transition-colors"
                      >
                        <div className="flex gap-3 items-center">
                          <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold">
                            {task.assignee}
                          </div>
                          <span className="text-xs font-bold text-[#0F172A]">{task.name}</span>
                        </div>
                        <div className="flex items-center gap-4 text-xs font-semibold">
                          <span className="text-text-muted">{task.dueDate}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${task.color}`}>
                            {task.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab: Milestones */}
              {activeDetailTab === "Milestones" && (
                <div className="bg-white border border-[#E5EAF2] rounded-2xl p-6 shadow-sm space-y-4 text-left">
                  <h3 className="font-bold text-[#0F172A] text-sm font-display mb-4">Milestones</h3>
                  <div className="space-y-4">
                    {[
                      { name: "Discovery & Planning", date: "May 16, 2024", status: "Completed", progress: 100, color: "bg-emerald-500" },
                      { name: "Design Phase", date: "May 30, 2024", status: "In Progress", progress: 60, color: "bg-primary" },
                      { name: "Development Phase", date: "Jun 15, 2024", status: "Not Started", progress: 0, color: "bg-slate-300" },
                      { name: "Testing & Review", date: "Jun 25, 2024", status: "Not Started", progress: 0, color: "bg-slate-300" },
                      { name: "Launch", date: "Jun 30, 2024", status: "Not Started", progress: 0, color: "bg-slate-300" }
                    ].map((m, i) => (
                      <div key={i} className="flex justify-between items-center gap-6 py-2 border-b border-[#E5EAF2] last:border-0 last:pb-0 text-xs font-semibold">
                        <div className="w-1/3">
                          <span className="text-[#0F172A] block">{m.name}</span>
                          <span className="text-text-muted font-normal block mt-0.5">Due: {m.date}</span>
                        </div>
                        <div className="w-1/3 flex items-center gap-2">
                          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${m.progress}%`, backgroundColor: m.progress === 100 ? "#10B981" : "#2563EB" }}></div>
                          </div>
                          <span className="text-text-secondary">{m.progress}%</span>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                          m.status === "Completed" ? "bg-emerald-50 text-[#10B981] border-emerald-100" :
                          m.status === "In Progress" ? "bg-blue-50 text-primary border-blue-100" :
                          "bg-slate-100 text-text-secondary border-slate-200"
                        }`}>{m.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab: Files */}
              {activeDetailTab === "Files" && (
                <div className="bg-white border border-[#E5EAF2] rounded-2xl p-6 shadow-sm space-y-4 text-left">
                  <h3 className="font-bold text-[#0F172A] text-sm font-display mb-4">Files</h3>
                  <div className="space-y-2.5">
                    {[
                      { name: "Project Brief.pdf", uploader: "Alex John", date: "May 13, 2024", size: "1.2 MB" },
                      { name: "Sitemap.png", uploader: "Shane D.", date: "May 15, 2024", size: "850 KB" },
                      { name: "homepage_wireframe.pdf", uploader: "Tolu A.", date: "May 18, 2024", size: "2.4 MB" },
                      { name: "Brand Guidelines.pdf", uploader: "Alex John", date: "May 18, 2024", size: "3.1 MB" }
                    ].map((f, i) => (
                      <div key={i} className="flex justify-between items-center p-3 border border-[#E5EAF2] rounded-xl hover:bg-slate-50 transition-colors">
                        <div className="flex gap-2.5 items-center">
                          <FileText size={18} className="text-primary" />
                          <div>
                            <span className="text-xs font-bold text-[#0F172A] block">{f.name}</span>
                            <span className="text-[10px] text-text-secondary font-normal mt-0.5">Uploaded by {f.uploader} on {f.date}</span>
                          </div>
                        </div>
                        <span className="text-xs text-text-secondary font-semibold">{f.size}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab: Team */}
              {activeDetailTab === "Team" && (
                <div className="bg-white border border-[#E5EAF2] rounded-2xl p-6 shadow-sm space-y-4 text-left">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-[#0F172A] text-sm font-display">Team Members</h3>
                    <button 
                      onClick={() => setIsInviteMemberModalOpen(true)}
                      className="bg-primary hover:bg-primary-hover text-white px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1 transition-all shadow-blue"
                    >
                      Invite Member
                    </button>
                  </div>

                  <div className="space-y-3">
                    {[
                      { name: "Alex John", email: "alex.john@gmail.com", role: "Project Owner", access: "Full Access" },
                      { name: "Shane D.", email: "shane.d@gmail.com", role: "Editor", access: "Edit" },
                      { name: "Tolu A.", email: "tolu.a@gmail.com", role: "Viewer", access: "View Only" }
                    ].map((member, i) => (
                      <div key={i} className="flex justify-between items-center py-2.5 border-b border-[#E5EAF2] last:border-0">
                        <div className="flex gap-3 items-center">
                          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold font-display">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <span className="text-xs font-bold text-[#0F172A] block">{member.name}</span>
                            <span className="text-[10px] text-text-secondary font-semibold block mt-0.5">{member.role}</span>
                          </div>
                        </div>
                        <span className="text-xs text-[#0F172A] font-semibold">{member.access}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab: Settings */}
              {activeDetailTab === "Settings" && (
                <div className="bg-white border border-[#E5EAF2] rounded-2xl p-6 shadow-sm space-y-6 text-left">
                  <h3 className="font-bold text-[#0F172A] text-sm font-display mb-4">Project Settings</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Project Name</label>
                      <input 
                        type="text" 
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-sm rounded-xl px-4 py-2.5 outline-none font-medium focus:border-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Description</label>
                      <textarea 
                        rows={4}
                        value={projectDesc}
                        onChange={(e) => setProjectDesc(e.target.value)}
                        className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-sm rounded-xl px-4 py-2.5 outline-none font-medium resize-none leading-relaxed focus:border-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Status</label>
                      <select className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-sm rounded-xl px-4 py-2.5 outline-none font-semibold cursor-pointer focus:border-primary transition-colors">
                        <option>In Progress</option>
                        <option>Review</option>
                        <option>Completed</option>
                        <option>On Hold</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-between border-t border-[#E5EAF2] pt-6 mt-6">
                    <button className="bg-red-50 hover:bg-red-100 text-danger border border-red-100 px-4 py-2 rounded-xl text-xs font-bold transition-colors">
                      Delete Project
                    </button>
                    <button onClick={() => alert("Project settings saved!")} className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-full text-xs font-bold shadow-blue transition-colors">
                      Save Changes
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* Right Details Summary Sidebar */}
            <div className="space-y-6">
              <div className="bg-white border border-[#E5EAF2] rounded-2xl p-6 shadow-sm space-y-6 text-left font-body">
                <span className="block text-xs font-bold text-text-secondary uppercase tracking-wider">Project Summary</span>
                <div className="space-y-3.5 border-b border-[#E5EAF2] pb-4 text-xs font-semibold">
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary font-display">Project Owner</span>
                    <span className="text-[#0F172A] font-bold">Alex John</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary font-display">Budget</span>
                    <span className="text-[#0F172A] font-bold">₦1,500,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary font-display">Start Date</span>
                    <span className="text-[#0F172A] font-bold">May 30, 2024</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary font-display">Due Date</span>
                    <span className="text-[#0F172A] font-bold">Jun 30, 2024</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="block text-[10px] font-bold text-text-secondary uppercase tracking-wider mb-2">Tags</span>
                  <div className="flex gap-2 flex-wrap">
                    <span className="bg-[#EFF6FF] text-[#2563EB] text-[10px] font-bold px-2.5 py-1 rounded-md border border-blue-50">Design</span>
                    <span className="bg-[#E8F8F0] text-[#10B981] text-[10px] font-bold px-2.5 py-1 rounded-md border border-green-50">Website</span>
                    <span className="bg-amber-50 text-amber-600 text-[10px] font-bold px-2.5 py-1 rounded-md border border-amber-50">Priority High</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ----------------- WIZARD FLOW ----------------- */}
      {view === "wizard" && (
        <div className="bg-white border border-[#E5EAF2] rounded-2xl p-6 shadow-sm max-w-2xl mx-auto animate-fade-in text-left">
          {/* Stepper Header */}
          <div className="flex justify-between items-center mb-8 border-b border-[#E5EAF2] pb-4">
            <span className="font-bold text-[#0F172A] font-display text-lg font-semibold">New Project</span>
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center gap-1.5">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                    wizardStep === step 
                      ? "bg-primary text-white" 
                      : wizardStep > step 
                      ? "bg-primary/10 text-primary" 
                      : "bg-[#F8FAFC] text-text-muted border border-[#E5EAF2]"
                  }`}>
                    {wizardStep > step ? <Check size={13} /> : step}
                  </div>
                  <span className={`text-xs font-semibold hidden md:inline ${
                    wizardStep === step ? "text-primary" : "text-text-muted"
                  }`}>
                    {step === 1 ? "Details" : step === 2 ? "Team" : step === 3 ? "Settings" : "Review"}
                  </span>
                  {step < 4 && <div className="w-4 border-t border-[#E5EAF2] hidden md:block"></div>}
                </div>
              ))}
            </div>
          </div>

          {/* STEP 1: Details */}
          {wizardStep === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-[#0F172A] text-lg font-display mb-1">Add project details</h3>
                <p className="text-text-secondary text-sm font-semibold">Fill in the basic information for your project.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Project Name</label>
                  <input 
                    type="text" 
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-sm rounded-xl px-4 py-2.5 outline-none font-medium focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Client</label>
                  <select 
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-sm rounded-xl px-4 py-2.5 outline-none font-semibold cursor-pointer focus:border-primary transition-colors"
                  >
                    <option>Acme Corp</option>
                    <option>TechNova Ltd.</option>
                    <option>Greenlife NG</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Description</label>
                  <textarea 
                    rows={4}
                    value={projectDesc}
                    onChange={(e) => setProjectDesc(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-sm rounded-xl px-4 py-2.5 outline-none font-medium resize-none leading-relaxed focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Project Template (Optional)</label>
                  <select 
                    value={template}
                    onChange={(e) => setTemplate(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-sm rounded-xl px-4 py-2.5 outline-none font-semibold cursor-pointer focus:border-primary transition-colors"
                  >
                    <option>Website Project</option>
                    <option>Mobile Application</option>
                    <option>Branding Guidelines</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-between border-t border-[#E5EAF2] pt-6">
                <button onClick={() => setView("list")} className="px-5 py-2.5 rounded-full border border-[#E5EAF2] text-text-secondary text-sm font-semibold hover:bg-slate-50 transition-colors">
                  Cancel
                </button>
                <button onClick={() => setWizardStep(2)} className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-blue">
                  Next
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Team */}
          {wizardStep === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-[#0F172A] text-lg font-display mb-1">Add team members</h3>
                <p className="text-text-secondary text-sm font-semibold">Invite people who will work on this project.</p>
              </div>

              <div className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Search team members..." 
                  className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-sm rounded-xl px-4 py-2.5 outline-none font-medium focus:border-primary transition-colors"
                />

                <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                  {[
                    { name: "Alex John", email: "alex.john@gmail.com", role: "Project Owner" },
                    { name: "Shane D.", email: "shane.d@gmail.com", role: "Editor" },
                    { name: "Tolu A.", email: "tolu.a@gmail.com", role: "Viewer" },
                    { name: "Mike L.", email: "mike.l@gmail.com", role: "Viewer" },
                  ].map((member, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-[#E5EAF2] last:border-0">
                      <div className="flex gap-3 items-center">
                        <input type="checkbox" defaultChecked={i < 3} className="rounded text-primary focus:ring-primary h-4 w-4" />
                        <div>
                          <span className="text-xs font-bold text-[#0F172A] block">{member.name}</span>
                          <span className="text-[10px] text-text-secondary font-semibold block">{member.email}</span>
                        </div>
                      </div>
                      <select className="bg-white border border-[#E5EAF2] text-text-secondary text-xs rounded-lg px-2 py-1 outline-none font-semibold cursor-pointer">
                        <option>{member.role}</option>
                        <option>Project Owner</option>
                        <option>Editor</option>
                        <option>Viewer</option>
                      </select>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between border-t border-[#E5EAF2] pt-6">
                <button onClick={() => setWizardStep(1)} className="px-5 py-2.5 rounded-full border border-[#E5EAF2] text-text-secondary text-sm font-semibold hover:bg-slate-50 transition-colors">
                  Back
                </button>
                <button onClick={() => setWizardStep(3)} className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-blue">
                  Next
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Settings */}
          {wizardStep === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-[#0F172A] text-lg font-display mb-1">Set project settings</h3>
                <p className="text-text-secondary text-sm font-semibold">Configure budget, timeline and other settings.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 font-body">
                <div>
                  <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Start Date</label>
                  <input 
                    type="text" 
                    value="May 13, 2024" 
                    readOnly
                    className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-sm rounded-xl px-4 py-2.5 outline-none font-semibold text-center select-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Due Date</label>
                  <input 
                    type="text" 
                    value="Jun 30, 2024" 
                    readOnly
                    className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-sm rounded-xl px-4 py-2.5 outline-none font-semibold text-center select-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Budget (Optional)</label>
                  <input 
                    type="text" 
                    value="₦1,500,000" 
                    readOnly
                    className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-sm rounded-xl px-4 py-2.5 outline-none font-semibold select-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Visibility</label>
                  <select className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-sm rounded-xl px-4 py-2.5 outline-none font-semibold cursor-pointer focus:border-primary transition-colors">
                    <option>Private</option>
                    <option>Public</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-between border-t border-[#E5EAF2] pt-6">
                <button onClick={() => setWizardStep(2)} className="px-5 py-2.5 rounded-full border border-[#E5EAF2] text-text-secondary text-sm font-semibold hover:bg-slate-50 transition-colors">
                  Back
                </button>
                <button onClick={() => setWizardStep(4)} className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-blue">
                  Next
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Review */}
          {wizardStep === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-[#0F172A] text-lg font-display mb-1">Review and create</h3>
                <p className="text-text-secondary text-sm font-semibold">Review your project details before creating.</p>
              </div>

              <div className="bg-[#F8FAFC] border border-[#E5EAF2] rounded-2xl p-6 space-y-4">
                <div className="flex gap-4 items-center border-b border-[#E5EAF2] pb-4">
                  <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                    <Briefcase size={20} />
                  </div>
                  <div>
                    <span className="font-bold text-[#0F172A] text-sm block font-display">{projectName}</span>
                    <span className="text-[10px] text-text-secondary font-semibold">Client: {clientName}</span>
                  </div>
                </div>

                <div className="space-y-3.5 text-xs font-semibold text-[#0F172A]">
                  <div className="flex justify-between">
                    <span className="text-text-secondary font-display">Project Template</span>
                    <span>{template}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary font-display">Start Date</span>
                    <span>May 13, 2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary font-display">Due Date</span>
                    <span>Jun 30, 2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary font-display">Budget</span>
                    <span>₦1,500,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary font-display">Visibility</span>
                    <span>Private</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between border-t border-[#E5EAF2] pt-6">
                <button onClick={() => setWizardStep(3)} className="px-5 py-2.5 rounded-full border border-[#E5EAF2] text-text-secondary text-sm font-semibold hover:bg-slate-50 transition-colors">
                  Back
                </button>
                <button onClick={handleCreateProject} className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-blue">
                  Create Project
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Task Details Modal */}
      {isTaskDetailsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-lg border border-[#E5EAF2] relative animate-dropdown space-y-5 text-left">
            <button onClick={() => setIsTaskDetailsModalOpen(false)} className="absolute top-4 right-4 text-text-muted hover:text-text-dark font-bold transition-colors">
              ✕
            </button>
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-[#0F172A] text-base font-display">Homepage Design</h3>
              <span className="bg-amber-50 text-amber-600 text-[10px] font-bold px-2 py-0.5 rounded-md border border-amber-100 uppercase">In Progress</span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs font-semibold text-[#0F172A]">
              <div>
                <span className="text-[10px] text-text-secondary block mb-1">Assignee</span>
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[9px] font-bold font-display">TA</div>
                  <span>Tolu A.</span>
                </div>
              </div>
              <div>
                <span className="text-[10px] text-text-secondary block mb-1">Due Date</span>
                <span>May 22, 2024</span>
              </div>
              <div>
                <span className="text-[10px] text-text-secondary block mb-1">Priority</span>
                <span className="text-danger font-bold">High</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] text-text-secondary font-bold uppercase block">Description</span>
              <p className="text-xs text-text-secondary leading-relaxed font-semibold">
                Design the homepage layout based on the approved wireframes and brand guidelines.
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-[#E5EAF2]">
              <span className="text-[10px] text-text-secondary font-bold uppercase block">Checklist</span>
              {[
                { name: "Create initial concepts", checked: true },
                { name: "Review with team", checked: true },
                { name: "Incorporate feedback", checked: false },
                { name: "Finalize design", checked: false },
              ].map((item, i) => (
                <div key={i} className="flex gap-2.5 items-center text-xs font-semibold text-[#0F172A]">
                  <input type="checkbox" defaultChecked={item.checked} className="rounded text-primary focus:ring-primary h-4 w-4" />
                  <span className={item.checked ? "line-through text-text-muted" : ""}>{item.name}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2 pt-2 border-t border-[#E5EAF2]">
              <span className="text-[10px] text-text-secondary font-bold uppercase block">Attachments</span>
              <div className="flex justify-between items-center p-2.5 bg-[#F8FAFC] border border-[#E5EAF2] rounded-xl text-xs font-semibold text-[#0F172A]">
                <div className="flex gap-2 items-center">
                  <Paperclip size={14} className="text-primary" />
                  <span>homepage_wireframe.pdf</span>
                </div>
                <span className="text-[10px] text-text-muted">2.4 MB</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Task Modal */}
      {isNewTaskModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-lg border border-[#E5EAF2] relative animate-dropdown space-y-4 text-left">
            <button onClick={() => setIsNewTaskModalOpen(false)} className="absolute top-4 right-4 text-text-muted hover:text-text-dark font-bold transition-colors">
              ✕
            </button>
            <h3 className="font-bold text-[#0F172A] text-base font-display pb-2 border-b border-[#E5EAF2]">New Task</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Task Name</label>
                <input 
                  type="text" 
                  placeholder="Add task name"
                  className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-sm rounded-xl px-4 py-2.5 outline-none font-medium focus:border-primary transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Assignee</label>
                  <select className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-sm rounded-xl px-4 py-2.5 outline-none font-semibold cursor-pointer focus:border-primary transition-colors">
                    <option>Select assignee</option>
                    <option>Alex John</option>
                    <option>Shane D.</option>
                    <option>Tolu A.</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Milestone</label>
                  <select className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-sm rounded-xl px-4 py-2.5 outline-none font-semibold cursor-pointer focus:border-primary transition-colors">
                    <option>Select milestone</option>
                    <option>Discovery & Planning</option>
                    <option>Design Phase</option>
                    <option>Development Phase</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Due Date</label>
                  <input 
                    type="text" 
                    placeholder="Select due date"
                    className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-sm rounded-xl px-4 py-2.5 outline-none font-semibold text-center focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Priority</label>
                  <select className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-sm rounded-xl px-4 py-2.5 outline-none font-semibold cursor-pointer focus:border-primary transition-colors">
                    <option>Medium</option>
                    <option>Low</option>
                    <option>High</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Description</label>
                <textarea 
                  rows={3}
                  placeholder="Add description..."
                  className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-sm rounded-xl px-4 py-2.5 outline-none font-medium resize-none leading-relaxed focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div className="flex justify-between border-t border-[#E5EAF2] pt-4 mt-6">
              <button 
                onClick={() => setIsNewTaskModalOpen(false)}
                className="px-5 py-2.5 rounded-full border border-[#E5EAF2] text-text-secondary text-sm font-semibold hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => { setIsNewTaskModalOpen(false); alert("Task successfully created!"); }}
                className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-blue transition-colors"
              >
                Create Task
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Invite Member Modal */}
      {isInviteMemberModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-lg border border-[#E5EAF2] relative animate-dropdown space-y-4 text-left">
            <button onClick={() => setIsInviteMemberModalOpen(false)} className="absolute top-4 right-4 text-text-muted hover:text-text-dark font-bold transition-colors">
              ✕
            </button>
            <h3 className="font-bold text-[#0F172A] text-base font-display pb-2 border-b border-[#E5EAF2]">Invite Team Member</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Email Address</label>
                <input 
                  type="email" 
                  placeholder="Enter email address"
                  className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-sm rounded-xl px-4 py-2.5 outline-none font-medium focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Role</label>
                <select className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-sm rounded-xl px-4 py-2.5 outline-none font-semibold cursor-pointer focus:border-primary transition-colors">
                  <option>Viewer</option>
                  <option>Editor</option>
                  <option>Project Owner</option>
                </select>
              </div>
              <div className="bg-[#EFF6FF] border border-blue-50 text-[#2563EB] rounded-xl p-3.5 text-xs font-semibold leading-relaxed flex gap-2 items-start">
                <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                <span>Viewers can see project details and files but cannot make changes.</span>
              </div>
              <div>
                <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Personal Message (Optional)</label>
                <textarea 
                  rows={3}
                  placeholder="Please join our team for this project."
                  className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-sm rounded-xl px-4 py-2.5 outline-none font-medium resize-none leading-relaxed focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div className="flex justify-between border-t border-[#E5EAF2] pt-4 mt-6">
              <button 
                onClick={() => setIsInviteMemberModalOpen(false)}
                className="px-5 py-2.5 rounded-full border border-[#E5EAF2] text-text-secondary text-sm font-semibold hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => { setIsInviteMemberModalOpen(false); alert("Invitation successfully sent!"); }}
                className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-blue transition-colors"
              >
                Send Invite
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
