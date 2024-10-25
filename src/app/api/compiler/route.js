export const POST = async (request, { params }) => {
    const endpoint = "https://emkc.org/api/v2/piston/execute";

    // Get the request body as JSON
    const body = await request.json();  

    try {
        const response = await fetch(endpoint, {
            method: 'POST',  
            headers: {
                'Content-Type': 'application/json',  
            },
            body: JSON.stringify(body)  
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();  // Parse the JSON response
        return new Response(JSON.stringify(data), { status: 200 });  
    } catch (error) {
        // console.error("Error:", error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });  // Return error with a 500 status
    }
};
