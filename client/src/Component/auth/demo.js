const axios = require("axios");

app.get("/api/search", async (req, res) => {
  const hashtag = req.query.hashtag;
  const accessToken = "YOUR_ACCESS_TOKEN";

  try {
    // First, use the `/v12.0/ig_hashtag_search` endpoint to find the hashtag ID based on the hashtag name.
    const searchResponse = await axios.get(
      `https://graph.instagram.com/v12.0/ig_hashtag_search?q=${hashtag}&access_token=${accessToken}`
    );

    if (
      searchResponse.data &&
      searchResponse.data.data &&
      searchResponse.data.data.length > 0
    ) {
      const hashtagId = searchResponse.data.data[0].id;

      // Next, use the `/v12.0/${hashtagId}/recent_media` endpoint to get recent media (posts) related to the hashtag.
      const mediaResponse = await axios.get(
        `https://graph.instagram.com/v12.0/${hashtagId}/recent_media?access_token=${accessToken}`
      );

      // Process the mediaResponse to extract relevant data such as profile links, captions, etc.
      const profileLinks = mediaResponse.data.data.map((media) => {
        // Extract profile link or other relevant data from media object
        return {
          profileLink: media.user.profile_link,
          // Add other relevant fields
        };
      });

      res.json({ profileLinks });
    } else {
      res.status(404).json({ error: "Hashtag not found" });
    }
  } catch (error) {
    console.error("Instagram Graph API error:", error);
    res.status(500).json({ error: "Instagram Graph API request failed" });
  }
});
