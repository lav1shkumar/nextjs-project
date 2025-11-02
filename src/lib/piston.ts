// Piston API is a service for code execution

import { Language } from "@/data/problems";

const PISTON_API = "https://emkc.org/api/v2/piston";

type LANGUAGE_VERSIONS_CONFIG = {
  [key in Language]: {
    language: key;
    version: string;
  };
};

const LANGUAGE_VERSIONS: LANGUAGE_VERSIONS_CONFIG = {
  javascript: { language: "javascript", version: "18.15.0" },
  python: { language: "python", version: "3.10.0" },
  java: { language: "java", version: "15.0.2" },
};

/**
 * @param {string} language - programming language
 * @param {string} code - source code to executed
 * @returns {Promise<{success:boolean, output?:string, error?: string}>}
 */

export type ExecuteCodeResult = {success:true, output:string} | {success:false,output?:string, error: string}

export async function executeCode(language: Language, code: string):Promise<ExecuteCodeResult> {
  try {
    const languageConfig = LANGUAGE_VERSIONS[language];

    if (!languageConfig) {
      return {
        success: false,
        error: `Unsupported language: ${language}`,
      };
    }

    const response = await fetch(`${PISTON_API}/execute`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language: languageConfig.language,
        version: languageConfig.version,
        files: [
          {
            name: `main.${getFileExtension(language)}`,
            content: code,
          },
        ],
      }),
    });

    if (!response.ok) {
      return {
        success: false,
        error: `HTTP error! status: ${response.status}`,
      };
    }

    const data = await response.json();

    const output = data.run.output || "";
    const stderr = data.run.stderr || "";

    if (stderr) {
      return {
        success: false,
        output: output,
        error: stderr,
      };
    }

    return {
      success: true,
      output: output || "No output",
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        error: `Failed to execute code: ${error.message}`,
      };
    }

    return {
      success: false,
      error: `Failed to execute code: Unknown Error`,
    };
  }
}

function getFileExtension(language: Language) {
  const extensions = {
    javascript: "js",
    python: "py",
    java: "java",
  };

  return extensions[language] || "txt";
}
