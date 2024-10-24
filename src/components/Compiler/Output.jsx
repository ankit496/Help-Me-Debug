const Output = ({ output,error }) => {
    return (
        <pre className={`mt-4 p-4 text-wrap bg-gray-700 rounded shadow border border-gray-600 text-sm leading-relaxed h-4/5 ${error? 'text-red-500' : 'text-gray-200'}`}>
            {error
                ? error
                : output || error}
        </pre>
    );
};

export default Output;
