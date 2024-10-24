export const POST = async (request, { params }) => {
    const endpoint = "https://emkc.org/api/v2/piston/execute";

    // Get the request body as JSON
    const body = await request.json();  // Use await to resolve the promise
    //console.log("Request Body:", body); // Log the request body for debugging

    try {
        const response = await fetch(endpoint, {
            method: 'POST',  // Set the request method to POST
            headers: {
                'Content-Type': 'application/json',  // Specify the content type
            },
            body: JSON.stringify(body)  // Convert the request data to a JSON string
        });

        // Check if the response is OK (status in the range 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();  // Parse the JSON response
        return new Response(JSON.stringify(data), { status: 200 });  // Return the response with a 200 status
    } catch (error) {
        console.error("Error:", error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });  // Return error with a 500 status
    }
};
