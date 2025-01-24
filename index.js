// Cloudflare Worker-style server handler

const DATABASE = [
	{
		name: "Mumbai",
		description: "The financial capital of India, known for Bollywood, the Gateway of India, and Marine Drive.",
		state: "Maharashtra"
	},
	{
		name: "Delhi",
		description: "The capital of India, famous for its historical monuments like the Red Fort, India Gate, and Qutub Minar.",
		state: "Delhi"
	},
	{
		name: "Bengaluru",
		description: "Known as the Silicon Valley of India, it is a hub for IT companies and startups.",
		state: "Karnataka"
	},
	{
		name: "Kolkata",
		description: "The cultural capital of India, known for its colonial architecture, art galleries, and Howrah Bridge.",
		state: "West Bengal"
	},
	{
		name: "Chennai",
		description: "A coastal city famous for its temples, Marina Beach, and vibrant Tamil culture.",
		state: "Tamil Nadu"
	},
	{
		name: "Hyderabad",
		description: "Known for its historic Charminar, delicious biryani, and the IT corridor.",
		state: "Telangana"
	},
	{
		name: "Jaipur",
		description: "The Pink City, famous for its palaces, forts, and vibrant markets.",
		state: "Rajasthan"
	},
	{
		name: "Ahmedabad",
		description: "Known for its rich heritage, Sabarmati Ashram, and vibrant textile industry.",
		state: "Gujarat"
	},
	{
		name: "Pune",
		description: "A major education hub, known for its pleasant climate and cultural significance.",
		state: "Maharashtra"
	},
	{
		name: "Varanasi",
		description: "One of the oldest cities in the world, renowned for its ghats, temples, and spiritual importance.",
		state: "Uttar Pradesh"
	}
];

export default {
	async fetch(request) {
		const { url, method } = request;
		const { pathname } = new URL(url);

		console.log("Request received", pathname, "method", method, "timestamp", new Date());

		// Handle /api/v1/city/all
		if (pathname === "/api/v1/city/all" && method === "GET") {
			const result = {
				success: true,
				data: DATABASE
			};
			return new Response(JSON.stringify(result), {
				headers: { "Content-Type": "application/json" },
			});
		}

		// Handle /api/v1/city/add
		else if (pathname === "/api/v1/city/add" && method === "POST") {
			const body = await request.text();
			let data;

			try {
				data = JSON.parse(body);
			} catch (error) {
				return new Response(
					JSON.stringify({ success: false, message: "Invalid JSON" }),
					{ status: 400, headers: { "Content-Type": "application/json" } }
				);
			}

			const { name, description, state } = data;

			// Validate the incoming data
			if (!name) {
				return new Response(
					JSON.stringify({ success: false, message: "Name is required" }),
					{ status: 400, headers: { "Content-Type": "application/json" } }
				);
			}

			if (!description) {
				return new Response(
					JSON.stringify({ success: false, message: "Description is required" }),
					{ status: 400, headers: { "Content-Type": "application/json" } }
				);
			}

			if (!state) {
				return new Response(
					JSON.stringify({ success: false, message: "State is required" }),
					{ status: 400, headers: { "Content-Type": "application/json" } }
				);
			}

			// Add the new city to the DATABASE
			DATABASE.push(data);

			return new Response(
				JSON.stringify({
					success: true,
					message: `${DATABASE.length} cities available`,
				}),
				{ status: 201, headers: { "Content-Type": "application/json" } }
			);
		}

		// Handle unmatched routes
		return new Response(
			JSON.stringify({ success: false, message: "API endpoint not defined" }),
			{ status: 404, headers: { "Content-Type": "application/json" } }
		);
	},
};
