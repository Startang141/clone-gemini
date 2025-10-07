export const BASE_URL =
  " https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";
export const API_KEY = "AIzaSyCl8lS56UZj9zX97hip9pV9PTGCeC6FJ_s";

export const getGeminiResponse = async (prompt) => {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": API_KEY,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }),
    });
    if (!response.ok) {
      const errorDetails = await response.text(); // Ambil detail error dari respons
      console.error(`Failed to fetch: ${response.status} - ${errorDetails}`);
      throw new Error(`Failed to fetch: ${response.status} - ${errorDetails}`);
    }

    const data = await response.json();
    console.log("API Response:", data);
    return data.candidates[0].content.parts[0].text; // Mengambil respons teks dari API
  } catch (error) {
    console.error("Error:", error); // Log error dengan detail lebih banyak
    return `Error: ${error.message}`; // Menampilkan pesan error yang lebih lengkap
  }
};
