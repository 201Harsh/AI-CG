import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  FiMenu,
  FiX,
  FiPlus,
  FiFile,
  FiCode,
  FiLogOut,
  FiCopy,
} from "react-icons/fi";

import axios from "../config/Axios";
import { useNavigate } from "react-router-dom";
import { LuSendHorizontal } from "react-icons/lu";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import SkeletonLoading from "./SkeletonLoading";

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [IsLoading, setIsLoading] = useState(false);
  const [typedDescription, setTypedDescription] = useState("");
  const [typedCode, setTypedCode] = useState("");

  const Navigate = useNavigate();

  const createNewProject = () => {
    if (projectName.trim()) {
      const newProject = {
        id: Date.now(),
        name: projectName,
        code: "",
        description: "",
        createdAt: new Date().toISOString(),
        tags: [],
      };
      setProjects([...projects, newProject]);
      setSelectedProject(newProject.id);
      setShowProjectModal(false);
      setProjectName("");
    }
  };

  const handlePromptSubmit = async (e) => {
    e.preventDefault();
    setTypedCode("");
    setIsLoading(true);
    try {
      const response = await axios.post("/ai/codegen", { prompt });
      if (response.status === 200) {
        const updatedProjects = projects.map((proj) =>
          proj.id === selectedProject
            ? {
                ...proj,
                projectName: prompt || "New Project",
                code: response.data.code || "// No code generated",
                description:
                  response.data.description || "No description provided",
                createdAt: proj.createdAt || new Date().toISOString(),
                hasTyped: false,
              }
            : proj
        );
        setProjects(updatedProjects);
      }
      setPrompt("");
      setIsLoading(false);
    } catch (err) {
      console.error("Code generation failed", err);
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    const response = await axios.get("/users/logout", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    if (response.status === 200) {
      localStorage.removeItem("token");
      alert("Logout successful!");
      Navigate("/login");
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      const notification = document.createElement("div");
      notification.classList.add(
        "fixed",
        "top-1/2",
        "left-1/2",
        "transform",
        "-translate-x-1/2",
        "-translate-y-1/2",
        "bg-gray-700",
        "text-white",
        "px-4",
        "py-2",
        "rounded",
        "z-20"
      );
      notification.textContent = "Code copied to clipboard! 🗒️";
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 1500);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const selected = projects.find((p) => p.id === selectedProject);

  useEffect(() => {
    setTypedDescription("");
    setTypedCode("");

    let descInterval;
    let codeInterval;

    if (!selected || selected.hasTyped) {
      // If already typed before, skip typing
      setTypedDescription(selected?.description || "");
      setTypedCode(selected?.code || "");
      return;
    }

    if (selected?.description) {
      let i = 0;
      descInterval = setInterval(() => {
        setTypedDescription((prev) => prev + selected.description[i]);
        i++;
        if (i >= selected.description.length) {
          clearInterval(descInterval);

          if (selected?.code) {
            let j = 0;
            codeInterval = setInterval(() => {
              setTypedCode((prev) => prev + selected.code[j]);
              j++;
              if (j >= selected.code.length) clearInterval(codeInterval);
            }, 10);
          }

          // Mark project as "typed"
          setProjects((prev) =>
            prev.map((proj) =>
              proj.id === selected.id ? { ...proj, hasTyped: true } : proj
            )
          );
        }
      }, 5);
    }

    return () => {
      clearInterval(descInterval);
      clearInterval(codeInterval);
    };
  }, [selected]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex overflow-auto max-w-screen">
      {/* Project Creation Modal */}
      {showProjectModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-40">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              createNewProject();
            }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 w-full max-w-md mx-4"
          >
            <h3 className="text-xl font-bold text-white mb-4">New Project</h3>
            <div className="space-y-4">
              <input
                id="projectName"
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Enter project name"
                className="w-full bg-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
                required
                minLength="3"
                maxLength="10"
              />
              <p className="text-gray-400 text-sm mt-1">
                Between 3-10 characters
              </p>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowProjectModal(false)}
                  className="px-4 py-2 text-gray-300 hover:text-white transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
                  disabled={!projectName.trim()}
                >
                  <FiPlus className="w-4 h-4" />
                  Create Project
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Sidebar Menu */}
      <div
        className={`bg-white/10 backdrop-blur-lg transition-all duration-300 fixed z-20 top-0 left-0 bottom-0 md:relative md:z-20 ${
          isMenuOpen ? "w-80" : "w-0"
        } md:w-64`}
      >
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:block h-full flex flex-col`}
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-white">End AI-CG</h2>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-white hover:text-purple-400 cursor-pointer"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>
            <button
              onClick={() => setShowProjectModal(true)}
              className="cursor-pointer w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg mb-6 flex items-center justify-center gap-2 hover:opacity-90"
            >
              <FiPlus className="w-5 h-5" />
              New Project
            </button>
          </div>

          {/* Projects List */}
          <div className="flex-1 overflow-y-auto p-4 pt-0 space-y-2">
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project.id)}
                className={`p-3 rounded-lg cursor-pointer ${
                  selectedProject === project.id
                    ? "bg-white/20"
                    : "hover:bg-white/10"
                }`}
              >
                <div className="flex items-center gap-2 text-white">
                  <FiFile className="flex-shrink-0" />
                  <span className="truncate">{project.name}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Logout */}
          <div className="p-4 border-t border-white/10">
            <button
              onClick={handleLogout}
              className="cursor-pointer w-full bg-gradient-to-r from-red-600 to-orange-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:opacity-90"
            >
              <FiLogOut className="w-5 h-5" />
              Log Out
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Menu Button */}
        <div className="p-4 md:hidden border-b border-white/10">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white hover:text-purple-400 cursor-pointer"
          >
            <FiMenu className="w-6 h-6" />
          </button>
        </div>

        {/* Main Project Area */}
        <div className="flex-1 p-4 md:p-8">
          {selected ? (
            IsLoading ? ( // Show skeleton only during loading
              <SkeletonLoading />
            ) : selected.code ? ( // Show code when available
              <div className="space-y-6">
                <div className="bg-white/5 p-4 rounded-xl overflow-hidden">
                  <h2 className="text-white text-2xl font-semibold">
                    Project Name : {selected.name}
                  </h2>
                  <p className="text-gray-300 text-sm mt-1">
                    Project Topic : {selected.projectName}
                  </p>
                  <p className="text-gray-300 text-sm mt-1">
                    Created on: {new Date(selected.createdAt).toLocaleString()}
                  </p>

                  {selected.description && (
                    <div className="text-gray-100 mt-3 relative space-y-4 prose prose-invert prose-sm break-words">
                      <ReactMarkdown>
                        {(typedDescription || "").toString()}
                      </ReactMarkdown>
                    </div>
                  )}

                  {selected.tags?.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {selected.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="bg-purple-600/20 text-purple-300 text-xs px-2 py-1 rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <h1 className="text-white text-2xl font-semibold">
                  Code Here 🧑‍💻 :-
                </h1>
                <div className="relative bg-gray-900 rounded-3xl">
                  <button
                    onClick={() => copyToClipboard(selected.code)}
                    className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:opacity-90 z-10"
                  >
                    <FiCopy className="inline-block mr-2" /> Copy Code
                  </button>
                  <SyntaxHighlighter
                    language="javascript"
                    className="text-sm whitespace-pre-wrap h-full w-full p-6"
                    customStyle={{ borderRadius: 15, background: "#1a1a1a" }}
                    style={atomDark}
                    wrapLongLines={true}
                  >
                    {(typedCode || "").toString()}
                  </SyntaxHighlighter>
                </div>
              </div>
            ) : (
              // Show prompt form when no code
              <form
                onSubmit={handlePromptSubmit}
                className="h-full flex flex-col"
              >
                <div className="flex-1 bg-gray-800 rounded-xl p-6">
                  <textarea
                    required
                    autoFocus
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Enter your Code Prompt Here..."
                    className="w-full h-full bg-transparent text-white resize-none focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="cursor-pointer mt-4 bg-gradient-to-r flex items-center justify-center gap-2 from-blue-600 to-purple-600 text-white py-3 px-8 rounded-lg self-end hover:opacity-90"
                >
                  Generate Code{" "}
                  <LuSendHorizontal className="w-5 h-5 font-semibold" />
                </button>
              </form>
            )
          ) : (
            // Show empty state when no project selected
            <div className="h-full flex items-center justify-center text-gray-400">
              <div className="text-center">
                <FiCode className="w-16 h-16 mx-auto mb-4" />
                <p className="text-xl">Select or create a project to begin</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
