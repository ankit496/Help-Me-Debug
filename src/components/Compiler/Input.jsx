
const Input = ({input,setInput}) => {
    return (
        // <div>
            <div className="h-full p-2 mb-2 overflow-auto">
                <h3 className="text-lg font-semibold text-green-400">Input</h3>
                <textarea spellCheck={false} className="w-full resize-none outline-none mt-4 p-4 bg-gray-700 rounded shadow border border-gray-600 h-4/5 text-sm leading-relaxed text-gray-200" placeholder="Input data or parameters will appear here..." onChange={(e) => setInput(e.target.value)}>
                </textarea>
            </div>
        // </div>
    )
}

export default Input
