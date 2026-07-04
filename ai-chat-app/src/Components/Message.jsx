import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function Message({ role, text }) {

  const isUser = role === "user";

  const formattedText = text
    .replace(/\n{4,}/g, "\n\n")
    .replace(/•/g, "-")
    .replace(/^\d+\.\s+(\*\*[^*]+\*\*:?)/gm, "### $1")
    .replace(/^\d+\.\s+([A-Z][^:\n]+:)/gm, "### $1")
    .trim();

  return (

    <div className={`w-full flex ${isUser ? "justify-end" : "justify-center"} mb-8 px-4`}>

      {isUser ? (

        <div className="max-w-[80%] bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-3 rounded-[28px] text-[15px] leading-7 shadow-lg shadow-blue-500/20 whitespace-pre-wrap break-words">
          {text}
        </div>

      ) : (

        <div className="w-full max-w-[900px] rounded-[32px] border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.02] backdrop-blur-2xl shadow-2xl shadow-black/30 overflow-hidden">

          <div className="h-[2px] bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500" />

          <div className="px-7 py-6 overflow-x-auto">

            <div className="text-gray-200 text-[16px] leading-8 break-words">

              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{

                  p: ({ children }) => (
                    <p className="text-gray-200 leading-8 mb-3 text-[16px]">
                      {children}
                    </p>
                  ),

                  h1: ({ children }) => (
                    <h1 className="text-3xl font-bold text-white mt-7 mb-4">
                      {children}
                    </h1>
                  ),

                  h2: ({ children }) => (
                    <h2 className="text-2xl font-semibold text-cyan-300 mt-6 mb-3">
                      {children}
                    </h2>
                  ),

                  h3: ({ children }) => (
                    <h3 className="text-xl font-semibold text-blue-300 mt-5 mb-2">
                      {children}
                    </h3>
                  ),

                  ol: ({ children }) => (
                    <ol className="list-decimal pl-6 mt-3 mb-4 space-y-1 marker:text-cyan-300 marker:font-semibold">
                      {children}
                    </ol>
                  ),

                  ul: ({ children }) => (
                    <ul className="list-disc pl-6 mt-2 mb-3 space-y-1 marker:text-cyan-300">
                      {children}
                    </ul>
                  ),

                  li: ({ children }) => (
                    <li className="text-gray-200 leading-7 text-[16px]">
                      {children}
                    </li>
                  ),

                  strong: ({ children }) => (
                    <strong className="text-white font-semibold">
                      {children}
                    </strong>
                  ),

                  hr: () => (
                    <div className="my-6 border-t border-white/10" />
                  ),

                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-cyan-400 pl-4 italic text-gray-300 my-4">
                      {children}
                    </blockquote>
                  ),

                  code: ({ inline, children }) => (
                    inline
                      ? <code className="bg-black/30 text-green-300 px-1.5 py-0.5 rounded-md text-sm">
                          {children}
                        </code>
                      : <code className="text-green-300 text-sm">
                          {children}
                        </code>
                  ),

                  pre: ({ children }) => (
                    <pre className="bg-black/40 border border-white/10 rounded-2xl p-4 overflow-x-auto my-5">
                      {children}
                    </pre>
                  ),

                  table: ({ children }) => (
                    <div className="overflow-x-auto my-6 rounded-2xl border border-white/10">
                      <table className="w-full border-collapse">
                        {children}
                      </table>
                    </div>
                  ),

                  thead: ({ children }) => (
                    <thead className="bg-white/[0.05]">
                      {children}
                    </thead>
                  ),

                  tr: ({ children }) => (
                    <tr className="border-t border-white/10">
                      {children}
                    </tr>
                  ),

                  th: ({ children }) => (
                    <th className="px-5 py-4 text-left text-white font-semibold">
                      {children}
                    </th>
                  ),

                  td: ({ children }) => (
                    <td className="px-5 py-4 text-gray-200">
                      {children}
                    </td>
                  ),

                }}
              >
                {formattedText}
              </ReactMarkdown>

            </div>
          </div>
        </div>

      )}

    </div>
  );
}

export default Message;