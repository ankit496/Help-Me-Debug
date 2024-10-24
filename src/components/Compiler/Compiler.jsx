import { useState } from "react";
import { Editor } from "@monaco-editor/react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { FaCode } from "react-icons/fa";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "./constants";
import { Loader } from "lucide-react";
import Output from "./Output";
import Input from "./Input";
import Image from "next/image";
import { compileCode } from "@/lib/action";
import debugPic from '@/public/images/debug.png'
import { LANGUAGE_VERSIONS } from "./constants";
import { useRouter } from "next/navigation";

const Compiler = () => {
  const [language, setLanguage] = useState("javascript");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [code, setCode] = useState(CODE_SNIPPETS[language]);
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error state
  const router=useRouter();
  const escapeString = (str) => {
    return str
      .replace(/\\/g, '\\\\')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/\t/g, '\\t');
  };

  const onSelect = (language) => {
    setLanguage(language);
    setCode(CODE_SNIPPETS[language]);
  };

  async function executeCode() {
    const requestData = {
      language: language,
      version: LANGUAGE_VERSIONS[language], // Accessing the correct version
      files: [
        {
          content: code, // Sending the code content
        },
      ],
      stdin: input
    };

    try {
      setLoading(true); // Set loading to true
      setError(""); // Clear previous errors
      const result = await compileCode(requestData);
      if (result.run.stderr) {
        setError(result.run.stderr)
      }
      setOutput(result.run.stdout);

    } catch (error) {
      console.error("Compilation Error:", error);
      setError("Compilation failed. Please check your code."); // Set error message
    } finally {
      setLoading(false); // Set loading to false
    }
  }

  const handleRun = () => {
    executeCode();
  };

  return (
    <div className="flex flex-col h-screen bg-black">
      <div className="p-4 bg-gray-800 text-white flex justify-between items-center">
        <h2 className="text-lg font-semibold ml-4">Code Editor</h2>
        <Image
          alt='Help me Debug'
          src={debugPic}
          width={30}
          height={30}
          className='hover:cursor-pointer'
          onClick={() => router.push("/")}
        >
        </Image>
        <LanguageSelector language={language} onSelect={onSelect} />
      </div>
      <div className="h-full p-2">
        <ResizablePanelGroup direction="horizontal" className="flex-grow w-full">
          <ResizablePanel defaultSize={50} className="bg-gray-800 p-2">
            <div className="h-full rounded-xl">
              <Editor
                theme="vs-dark"
                height="100%"
                language={language}
                value={code}
                defaultValue={`// Write your ${language} code here`}
                onChange={(value) => setCode(value)} // Update code state on editor change
              />
            </div>
          </ResizablePanel>

          <ResizableHandle
            withHandle
            className="bg-gray-600 hover:bg-gray-500 cursor-col-resize w-1"
          />

          <ResizablePanel defaultSize={50} className="bg-gray-800 text-white rounded-r-xl">
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={50} className="border-b border-gray-700">
                <div className="p-2 h-full overflow-auto">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-semibold text-gray-200 p-1">Output</h3>
                    <div onClick={handleRun} className={`flex justify-center items-center cursor-pointer ${loading ? 'bg-blue-500' : 'bg-blue-700'} pr-2 pl-2 rounded-xl`}>
                      {loading ? <Loader className="w-4 h-4 mr-2 animate-spin" /> : <FaCode />}
                      <button disabled={loading} className={`mr-2 rounded-xl ml-2`}>{loading ? 'Compiling' : 'Run'}</button>
                    </div>
                  </div>

                  {/* {error && <div className="text-red-500">{error}</div>} Error message */}

                  <Output output={output} error={error} />
                </div>
              </ResizablePanel>

              <ResizableHandle
                withHandle
                className="hover:bg-gray-500 cursor-row-resize border-2 border-gray-600"
              />

              <ResizablePanel defaultSize={50}>
                <Input input={input} setInput={setInput} />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default Compiler;
