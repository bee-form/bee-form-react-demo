module.exports = {
  "index": "src/demo/index.html",
  "staticAssets": [
    {"dir": "dist", "as": "/assets"}
  ],
  "indexServingPaths": [
    // "/request-logs"
  ],
  "proxy": {
    "host": "https://ticketdist.staging.groupmatics.co"
  },
};