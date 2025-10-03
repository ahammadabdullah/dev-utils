import { useState, useMemo } from "react";

export interface GitignoreTemplate {
  id: string;
  name: string;
  category: "languages" | "frameworks" | "tools" | "os" | "editors";
  content: string[];
}

export interface GitignoreGeneratorState {
  selectedTemplates: string[];
  customRules: string;
  generatedContent: string;
  searchTerm: string;
}

// Helper function to remove duplicate lines while preserving order and comments
const removeDuplicates = (lines: string[]): string[] => {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const line of lines) {
    const trimmedLine = line.trim();

    // Always keep comments and empty lines
    if (trimmedLine.startsWith("#") || trimmedLine === "") {
      result.push(line);
      continue;
    }

    // For actual rules, check for duplicates
    if (!seen.has(trimmedLine)) {
      seen.add(trimmedLine);
      result.push(line);
    }
  }

  return result;
};

const GITIGNORE_TEMPLATES: GitignoreTemplate[] = [
  // Languages
  {
    id: "node",
    name: "Node.js",
    category: "languages",
    content: [
      "# Dependencies",
      "node_modules/",
      "npm-debug.log*",
      "yarn-debug.log*",
      "yarn-error.log*",
      "lerna-debug.log*",
      "",
      "# Runtime data",
      "pids",
      "*.pid",
      "*.seed",
      "*.pid.lock",
      "",
      "# Coverage directory used by tools like istanbul",
      "coverage/",
      "*.lcov",
      "",
      "# nyc test coverage",
      ".nyc_output",
      "",
      "# Dependency directories",
      "jspm_packages/",
      "",
      "# Optional npm cache directory",
      ".npm",
      "",
      "# Optional eslint cache",
      ".eslintcache",
      "",
      "# Output of 'npm pack'",
      "*.tgz",
      "",
      "# Yarn Integrity file",
      ".yarn-integrity",
      "",
      "# dotenv environment variables file",
      ".env",
      ".env.test",
      ".env.local",
      ".env.production",
      "",
      "# Stores VSCode versions used for testing VSCode extensions",
      ".vscode-test",
      "",
    ],
  },
  {
    id: "python",
    name: "Python",
    category: "languages",
    content: [
      "# Byte-compiled / optimized / DLL files",
      "__pycache__/",
      "*.py[cod]",
      "*$py.class",
      "",
      "# C extensions",
      "*.so",
      "",
      "# Distribution / packaging",
      ".Python",
      "build/",
      "develop-eggs/",
      "dist/",
      "downloads/",
      "eggs/",
      ".eggs/",
      "lib/",
      "lib64/",
      "parts/",
      "sdist/",
      "var/",
      "wheels/",
      "*.egg-info/",
      ".installed.cfg",
      "*.egg",
      "MANIFEST",
      "",
      "# PyInstaller",
      "*.manifest",
      "*.spec",
      "",
      "# Unit test / coverage reports",
      "htmlcov/",
      ".tox/",
      ".nox/",
      ".coverage",
      ".coverage.*",
      ".cache",
      "nosetests.xml",
      "coverage.xml",
      "*.cover",
      ".hypothesis/",
      ".pytest_cache/",
      "",
      "# Environments",
      ".env",
      ".venv",
      "env/",
      "venv/",
      "ENV/",
      "env.bak/",
      "venv.bak/",
      "",
      "# mypy",
      ".mypy_cache/",
      ".dmypy.json",
      "dmypy.json",
    ],
  },
  {
    id: "java",
    name: "Java",
    category: "languages",
    content: [
      "# Compiled class file",
      "*.class",
      "",
      "# Log file",
      "*.log",
      "",
      "# BlueJ files",
      "*.ctxt",
      "",
      "# Mobile Tools for Java (J2ME)",
      ".mtj.tmp/",
      "",
      "# Package Files",
      "*.jar",
      "*.war",
      "*.nar",
      "*.ear",
      "*.zip",
      "*.tar.gz",
      "*.rar",
      "",
      "# virtual machine crash logs",
      "hs_err_pid*",
      "",
      "# Maven",
      "target/",
      "pom.xml.tag",
      "pom.xml.releaseBackup",
      "pom.xml.versionsBackup",
      "pom.xml.next",
      "release.properties",
      "dependency-reduced-pom.xml",
      "buildNumber.properties",
      ".mvn/timing.properties",
      ".mvn/wrapper/maven-wrapper.jar",
      "",
      "# Gradle",
      ".gradle",
      "build/",
      "!gradle/wrapper/gradle-wrapper.jar",
      "!**/src/main/**/build/",
      "!**/src/test/**/build/",
    ],
  },
  {
    id: "csharp",
    name: "C#",
    category: "languages",
    content: [
      "# Build results",
      "[Dd]ebug/",
      "[Dd]ebugPublic/",
      "[Rr]elease/",
      "[Rr]eleases/",
      "x64/",
      "x86/",
      "[Ww][Ii][Nn]32/",
      "[Aa][Rr][Mm]/",
      "[Aa][Rr][Mm]64/",
      "bld/",
      "[Bb]in/",
      "[Oo]bj/",
      "[Ll]og/",
      "[Ll]ogs/",
      "",
      "# Visual Studio 2015/2017 cache/options directory",
      ".vs/",
      "",
      "# MSTest test Results",
      "[Tt]est[Rr]esult*/",
      "[Bb]uild[Ll]og.*",
      "",
      "# NUnit",
      "*.VisualState.xml",
      "TestResult.xml",
      "nunit-*.xml",
      "",
      "# .NET Core",
      "project.lock.json",
      "project.fragment.lock.json",
      "artifacts/",
      "",
      "# ASP.NET Scaffolding",
      "ScaffoldingReadMe.txt",
      "",
      "# User-specific files",
      "*.rsuser",
      "*.suo",
      "*.user",
      "*.userosscache",
      "*.sln.docstates",
    ],
  },
  {
    id: "go",
    name: "Go",
    category: "languages",
    content: [
      "# Binaries for programs and plugins",
      "*.exe",
      "*.exe~",
      "*.dll",
      "*.so",
      "*.dylib",
      "",
      "# Test binary, built with `go test -c`",
      "*.test",
      "",
      "# Output of the go coverage tool",
      "*.out",
      "",
      "# Dependency directories",
      "vendor/",
      "",
      "# Go workspace file",
      "go.work",
    ],
  },
  {
    id: "rust",
    name: "Rust",
    category: "languages",
    content: [
      "# Generated by Cargo",
      "/target/",
      "",
      "# Remove Cargo.lock from gitignore if creating an executable",
      "Cargo.lock",
      "",
      "# These are backup files generated by rustfmt",
      "**/*.rs.bk",
      "",
      "# MSVC Windows builds of rustc generate these",
      "*.pdb",
    ],
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "languages",
    content: [
      "# TypeScript cache",
      "*.tsbuildinfo",
      "",
      "# TypeScript declaration files",
      "*.d.ts",
      "!src/**/*.d.ts",
      "",
      "# Build outputs",
      "dist/",
      "build/",
      "out/",
      "",
      "# TypeScript config",
      "tsconfig.tsbuildinfo",
    ],
  },
  {
    id: "php",
    name: "PHP",
    category: "languages",
    content: [
      "# Composer",
      "/vendor/",
      "composer.lock",
      "",
      "# Laravel",
      "/node_modules",
      "/public/hot",
      "/public/storage",
      "/storage/*.key",
      ".env",
      ".env.backup",
      ".phpunit.result.cache",
      "Homestead.json",
      "Homestead.yaml",
      "npm-debug.log",
      "yarn-error.log",
      "",
      "# PHP",
      "*.log",
      "*.cache",
      "*.swp",
    ],
  },
  {
    id: "ruby",
    name: "Ruby",
    category: "languages",
    content: [
      "# Ruby",
      "*.gem",
      "*.rbc",
      "/.config",
      "/coverage/",
      "/InstalledFiles",
      "/pkg/",
      "/spec/reports/",
      "/spec/examples.txt",
      "/test/tmp/",
      "/test/version_tmp/",
      "/tmp/",
      "",
      "# RDoc",
      "/doc/",
      "/rdoc/",
      "",
      "# Bundler",
      "/.bundle/",
      "/vendor/bundle",
      "/lib/bundler/man/",
      "",
      "# Environment",
      ".env",
      ".env.local",
    ],
  },
  // Frameworks
  {
    id: "react",
    name: "React",
    category: "frameworks",
    content: [
      "# dependencies",
      "/node_modules",
      "/.pnp",
      ".pnp.js",
      "",
      "# testing",
      "/coverage",
      "",
      "# production",
      "/build",
      "",
      "# misc",
      ".DS_Store",
      ".env.local",
      ".env.development.local",
      ".env.test.local",
      ".env.production.local",
      "",
      "npm-debug.log*",
      "yarn-debug.log*",
      "yarn-error.log*",
    ],
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "frameworks",
    content: [
      "# dependencies",
      "/node_modules",
      "/.pnp",
      ".pnp.js",
      "",
      "# testing",
      "/coverage",
      "",
      "# next.js",
      "/.next/",
      "/out/",
      "",
      "# production",
      "/build",
      "",
      "# misc",
      ".DS_Store",
      "*.tsbuildinfo",
      "next-env.d.ts",
      "",
      "# debug",
      "npm-debug.log*",
      "yarn-debug.log*",
      "yarn-error.log*",
      "",
      "# local env files",
      ".env*.local",
      "",
      "# vercel",
      ".vercel",
      "",
      "# typescript",
      "*.tsbuildinfo",
      "next-env.d.ts",
    ],
  },
  {
    id: "vue",
    name: "Vue.js",
    category: "frameworks",
    content: [
      "# Logs",
      "logs",
      "*.log",
      "npm-debug.log*",
      "yarn-debug.log*",
      "yarn-error.log*",
      "pnpm-debug.log*",
      "lerna-debug.log*",
      "",
      "node_modules",
      ".DS_Store",
      "dist",
      "dist-ssr",
      "coverage",
      "*.local",
      "",
      "# Editor directories and files",
      ".vscode/*",
      "!.vscode/extensions.json",
      ".idea",
      "*.suo",
      "*.ntvs*",
      "*.njsproj",
      "*.sln",
      "*.sw?",
    ],
  },
  {
    id: "angular",
    name: "Angular",
    category: "frameworks",
    content: [
      "# compiled output",
      "/dist",
      "/tmp",
      "/out-tsc",
      "/bazel-out",
      "",
      "# dependencies",
      "/node_modules",
      "",
      "# profiling files",
      "chrome-profiler-events*.json",
      "",
      "# IDEs and editors",
      "/.idea",
      ".project",
      ".classpath",
      ".c9/",
      "*.launch",
      ".settings/",
      "*.sublime-workspace",
      "",
      "# IDE - VSCode",
      ".vscode/*",
      "!.vscode/settings.json",
      "!.vscode/tasks.json",
      "!.vscode/launch.json",
      "!.vscode/extensions.json",
      ".history/*",
      "",
      "# misc",
      "/.angular/cache",
      ".sass-cache/",
      "/connect.lock",
      "/coverage",
      "/libpeerconnection.log",
      "npm-debug.log",
      "yarn-error.log",
      "",
      "# System Files",
      ".DS_Store",
      "Thumbs.db",
    ],
  },
  {
    id: "svelte",
    name: "Svelte/SvelteKit",
    category: "frameworks",
    content: [
      "# dependencies",
      "/node_modules",
      "",
      "# build output",
      "/.svelte-kit",
      "/build",
      "/dist",
      "",
      "# environment variables",
      ".env",
      ".env.*",
      "!.env.example",
      "",
      "# misc",
      ".DS_Store",
      "vite.config.js.timestamp-*",
      "vite.config.ts.timestamp-*",
    ],
  },
  {
    id: "laravel",
    name: "Laravel",
    category: "frameworks",
    content: [
      "# Laravel",
      "/node_modules",
      "/public/hot",
      "/public/storage",
      "/storage/*.key",
      "/vendor",
      ".env",
      ".env.backup",
      ".phpunit.result.cache",
      "Homestead.json",
      "Homestead.yaml",
      "npm-debug.log",
      "yarn-error.log",
      "",
      "# IDE",
      "/.idea",
      "/.vscode",
    ],
  },
  {
    id: "django",
    name: "Django",
    category: "frameworks",
    content: [
      "# Django",
      "*.log",
      "*.pot",
      "*.pyc",
      "__pycache__/",
      "local_settings.py",
      "db.sqlite3",
      "db.sqlite3-journal",
      "/media",
      "/static",
      "",
      "# Environment",
      ".env",
      "venv/",
      "env/",
    ],
  },
  {
    id: "fastapi",
    name: "FastAPI",
    category: "frameworks",
    content: [
      "# FastAPI",
      "__pycache__/",
      "*.py[cod]",
      "*$py.class",
      "",
      "# Virtual Environment",
      "venv/",
      "env/",
      "ENV/",
      ".venv",
      "",
      "# Environment variables",
      ".env",
      ".env.local",
      ".env.*.local",
      "",
      "# Database",
      "*.db",
      "*.sqlite",
      "*.sqlite3",
      "",
      "# FastAPI specific",
      "alembic/",
      "alembic.ini",
      "",
      "# Testing",
      ".pytest_cache/",
      ".coverage",
      "htmlcov/",
      "",
      "# IDE",
      ".vscode/",
      ".idea/",
      "*.swp",
      "*.swo",
      "",
      "# Logs",
      "*.log",
      "logs/",
    ],
  },
  {
    id: "flask",
    name: "Flask",
    category: "frameworks",
    content: [
      "# Flask",
      "instance/",
      ".webassets-cache",
      "",
      "# Python",
      "__pycache__/",
      "*.py[cod]",
      "*$py.class",
      "",
      "# Virtual Environment",
      "venv/",
      "env/",
      "ENV/",
      ".venv",
      "",
      "# Environment variables",
      ".env",
      ".flaskenv",
      "",
      "# Database",
      "*.db",
      "*.sqlite",
      "*.sqlite3",
      "",
      "# Testing",
      ".pytest_cache/",
      ".coverage",
      "htmlcov/",
      "",
      "# Logs",
      "*.log",
    ],
  },
  {
    id: "express",
    name: "Express.js",
    category: "frameworks",
    content: [
      "# Dependencies",
      "node_modules/",
      "",
      "# Environment variables",
      ".env",
      ".env.local",
      ".env.*.local",
      "",
      "# Logs",
      "logs/",
      "*.log",
      "npm-debug.log*",
      "yarn-debug.log*",
      "yarn-error.log*",
      "",
      "# Runtime data",
      "pids/",
      "*.pid",
      "*.seed",
      "",
      "# Coverage",
      "coverage/",
      ".nyc_output/",
      "",
      "# Build outputs",
      "dist/",
      "build/",
      "",
      "# Database",
      "*.sqlite",
      "*.db",
    ],
  },
  // Tools
  {
    id: "docker",
    name: "Docker",
    category: "tools",
    content: [
      "# Docker",
      "*.dockerignore",
      "Dockerfile*",
      "docker-compose*.yml",
      "docker-compose*.yaml",
      ".docker/",
    ],
  },
  {
    id: "git",
    name: "Git",
    category: "tools",
    content: ["# Git", ".git/", "*.orig"],
  },
  {
    id: "mongodb",
    name: "MongoDB",
    category: "tools",
    content: [
      "# MongoDB",
      "*.mdb",
      "*.ldb",
      "/data/db/",
      "dump/",
      "",
      "# MongoDB logs",
      "mongod.log",
    ],
  },
  {
    id: "redis",
    name: "Redis",
    category: "tools",
    content: ["# Redis", "dump.rdb", "redis.log", "*.aof"],
  },
  // OS
  {
    id: "windows",
    name: "Windows",
    category: "os",
    content: [
      "# Windows thumbnail cache files",
      "Thumbs.db",
      "Thumbs.db:encryptable",
      "ehthumbs.db",
      "ehthumbs_vista.db",
      "",
      "# Dump file",
      "*.stackdump",
      "",
      "# Folder config file",
      "[Dd]esktop.ini",
      "",
      "# Recycle Bin used on file shares",
      "$RECYCLE.BIN/",
      "",
      "# Windows Installer files",
      "*.cab",
      "*.msi",
      "*.msix",
      "*.msm",
      "*.msp",
      "",
      "# Windows shortcuts",
      "*.lnk",
    ],
  },
  {
    id: "macos",
    name: "macOS",
    category: "os",
    content: [
      "# General",
      ".DS_Store",
      ".AppleDouble",
      ".LSOverride",
      "",
      "# Icon must end with two \\r",
      "Icon",
      "",
      "# Thumbnails",
      "._*",
      "",
      "# Files that might appear in the root of a volume",
      ".DocumentRevisions-V100",
      ".fseventsd",
      ".Spotlight-V100",
      ".TemporaryItems",
      ".Trashes",
      ".VolumeIcon.icns",
      ".com.apple.timemachine.donotpresent",
      "",
      "# Directories potentially created on remote AFP share",
      ".AppleDB",
      ".AppleDesktop",
      "Network Trash Folder",
      "Temporary Items",
      ".apdisk",
    ],
  },
  {
    id: "linux",
    name: "Linux",
    category: "os",
    content: [
      "*~",
      "",
      "# temporary files which can be created if a process still has a handle open of a deleted file",
      ".fuse_hidden*",
      "",
      "# KDE directory preferences",
      ".directory",
      "",
      "# Linux trash folder which might appear on any partition or disk",
      ".Trash-*",
      "",
      "# .nfs files are created when an open file is removed but is still being accessed",
      ".nfs*",
    ],
  },
  // Editors
  {
    id: "vscode",
    name: "VS Code",
    category: "editors",
    content: [
      ".vscode/*",
      "!.vscode/settings.json",
      "!.vscode/tasks.json",
      "!.vscode/launch.json",
      "!.vscode/extensions.json",
      "!.vscode/*.code-snippets",
      "",
      "# Local History for Visual Studio Code",
      ".history/",
      "",
      "# Built Visual Studio Code Extensions",
      "*.vsix",
    ],
  },
  {
    id: "intellij",
    name: "IntelliJ IDEA",
    category: "editors",
    content: [
      "# Covers JetBrains IDEs: IntelliJ, RubyMine, PhpStorm, AppCode, PyCharm, CLion, Android Studio, WebStorm and Rider",
      "",
      "*.iml",
      "*.ipr",
      "*.iws",
      "",
      "# IntelliJ",
      "out/",
      "",
      "# User-specific stuff",
      ".idea/**/workspace.xml",
      ".idea/**/tasks.xml",
      ".idea/**/usage.statistics.xml",
      ".idea/**/dictionaries",
      ".idea/**/shelf",
      "",
      "# AWS User-specific",
      ".idea/**/aws.xml",
      "",
      "# Generated files",
      ".idea/**/contentModel.xml",
      "",
      "# Sensitive or high-churn files",
      ".idea/**/dataSources/",
      ".idea/**/dataSources.ids",
      ".idea/**/dataSources.local.xml",
      ".idea/**/sqlDataSources.xml",
      ".idea/**/dynamic.xml",
      ".idea/**/uiDesigner.xml",
      ".idea/**/dbnavigator.xml",
    ],
  },
];

export const useGitignoreGenerator = () => {
  const [state, setState] = useState<GitignoreGeneratorState>({
    selectedTemplates: [],
    customRules: "",
    generatedContent: "",
    searchTerm: "",
  });

  const filteredTemplates = useMemo(() => {
    if (!state.searchTerm) return GITIGNORE_TEMPLATES;

    const searchLower = state.searchTerm.toLowerCase();
    return GITIGNORE_TEMPLATES.filter(
      (template) =>
        template.name.toLowerCase().includes(searchLower) ||
        template.category.toLowerCase().includes(searchLower)
    );
  }, [state.searchTerm]);

  const templatesByCategory = useMemo(() => {
    const categories = [
      "languages",
      "frameworks",
      "tools",
      "os",
      "editors",
    ] as const;

    return categories.reduce(
      (acc, category) => {
        acc[category] = filteredTemplates.filter(
          (template) => template.category === category
        );
        return acc;
      },
      {} as Record<string, GitignoreTemplate[]>
    );
  }, [filteredTemplates]);

  const generateGitignore = () => {
    console.log(
      "Generating gitignore with selected templates:",
      state.selectedTemplates
    );
    console.log("Custom rules:", state.customRules);

    const selectedTemplateObjects = GITIGNORE_TEMPLATES.filter((template) =>
      state.selectedTemplates.includes(template.id)
    );

    console.log(
      "Found template objects:",
      selectedTemplateObjects.map((t) => t.name)
    );

    const sections: string[] = [];

    if (selectedTemplateObjects.length > 0) {
      selectedTemplateObjects.forEach((template) => {
        sections.push(`# ${template.name}`);
        sections.push(...template.content);
        sections.push("");
      });
    }

    if (state.customRules.trim()) {
      sections.push("# Custom Rules");
      sections.push(...state.customRules.trim().split("\n"));
      sections.push("");
    }

    // Remove duplicate rules while preserving comments and structure
    const uniqueLines = removeDuplicates(sections);
    const content = uniqueLines.join("\n").trim();

    console.log("Generated content length:", content.length);
    console.log(
      "Generated content preview:",
      content.substring(0, 200) + "..."
    );

    setState((prev) => ({
      ...prev,
      generatedContent: content,
    }));
  };

  const toggleTemplate = (templateId: string) => {
    setState((prev) => ({
      ...prev,
      selectedTemplates: prev.selectedTemplates.includes(templateId)
        ? prev.selectedTemplates.filter((id) => id !== templateId)
        : [...prev.selectedTemplates, templateId],
    }));
  };

  const selectMultipleTemplates = (templateIds: string[]) => {
    setState((prev) => ({
      ...prev,
      selectedTemplates: templateIds,
    }));
  };

  const setCustomRules = (rules: string) => {
    setState((prev) => ({
      ...prev,
      customRules: rules,
    }));
  };

  const setSearchTerm = (term: string) => {
    setState((prev) => ({
      ...prev,
      searchTerm: term,
    }));
  };

  const clearAll = () => {
    setState({
      selectedTemplates: [],
      customRules: "",
      generatedContent: "",
      searchTerm: "",
    });
  };

  const downloadGitignore = () => {
    if (!state.generatedContent) {
      console.error("No content to download");
      return;
    }

    try {
      console.log(
        "Downloading gitignore with content length:",
        state.generatedContent.length
      );

      const blob = new Blob([state.generatedContent], {
        type: "text/plain;charset=utf-8",
      });

      // Check if the browser supports the download attribute
      const a = document.createElement("a");

      if ("download" in a) {
        const url = URL.createObjectURL(blob);
        a.href = url;
        a.download = ".gitignore";
        a.style.display = "none";

        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        // Clean up the URL object
        setTimeout(() => URL.revokeObjectURL(url), 100);
      } else {
        // Fallback for older browsers
        const reader = new FileReader();
        reader.onload = () => {
          const dataUrl = reader.result as string;
          const a = document.createElement("a");
          a.href = dataUrl;
          a.download = ".gitignore";
          a.click();
        };
        reader.readAsDataURL(blob);
      }
    } catch (error) {
      console.error("Error downloading gitignore:", error);

      // Alternative approach using data URL
      try {
        const dataStr =
          "data:text/plain;charset=utf-8," +
          encodeURIComponent(state.generatedContent);
        const a = document.createElement("a");
        a.href = dataStr;
        a.download = ".gitignore";
        a.click();
      } catch (fallbackError) {
        console.error("Fallback download also failed:", fallbackError);
        // As a last resort, open content in new window
        const newWindow = window.open();
        if (newWindow) {
          newWindow.document.write(`<pre>${state.generatedContent}</pre>`);
          newWindow.document.title = ".gitignore";
        }
      }
    }
  };

  const copyToClipboard = async () => {
    if (!state.generatedContent) {
      console.error("No content to copy");
      return false;
    }

    try {
      await navigator.clipboard.writeText(state.generatedContent);
      console.log("Content copied to clipboard");
      return true;
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);

      // Fallback for older browsers
      try {
        const textArea = document.createElement("textarea");
        textArea.value = state.generatedContent;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        document.body.appendChild(textArea);
        textArea.select();
        const success = document.execCommand("copy");
        document.body.removeChild(textArea);
        return success;
      } catch (fallbackError) {
        console.error("Fallback copy also failed:", fallbackError);
        return false;
      }
    }
  };

  return {
    ...state,
    filteredTemplates,
    templatesByCategory,
    generateGitignore,
    toggleTemplate,
    selectMultipleTemplates,
    setCustomRules,
    setSearchTerm,
    clearAll,
    downloadGitignore,
    copyToClipboard,
  };
};
