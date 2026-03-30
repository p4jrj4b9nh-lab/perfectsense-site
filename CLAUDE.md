@AGENTS.md

# Perfect Sense Productions — Project Context

## About
Perfect Sense Productions is an AI-generated short-form comedy video production company.
Website: perfectsenseproductions.com (Next.js on Vercel)

## Shows
- **Sit Stay Spill (SSS)** — Pepper & Sage. Two dogs, one couch, zero filter. Color: #ff6eb4
- **DNN** — Dog News Network. Barkley McSnoot, Diane Pawson + 18 correspondents. Color: #4a9eff
- **The Yard** — Tank & Lou. Straight talk. Color: #d4a24e
- **...processing** — host://7b2.α3 and host://9x4.f7. Two AI bots. Color: #00d4ff

## Analytics Engine

The site has a built-in analytics engine for tracking show performance across TikTok, Instagram, and YouTube.

### How to access analytics data

**Pull a full text report (best for analysis):**
```bash
curl -s -H "Authorization: Bearer $ANALYTICS_PASSWORD" \
  "https://perfectsenseproductions.com/api/analytics/analysis?show=sss&format=text"
```

**Pull all shows at once:**
```bash
curl -s -H "Authorization: Bearer $ANALYTICS_PASSWORD" \
  "https://perfectsenseproductions.com/api/analytics/analysis?show=all&format=text"
```

**Pull structured JSON data:**
```bash
curl -s -H "Authorization: Bearer $ANALYTICS_PASSWORD" \
  "https://perfectsenseproductions.com/api/analytics/analysis?show=sss&format=json"
```

**Sync YouTube metrics:**
```bash
curl -s -H "Authorization: Bearer $ANALYTICS_PASSWORD" \
  "https://perfectsenseproductions.com/api/analytics/sync-youtube?show=sss"
```

**Or use the CLI script:**
```bash
ANALYTICS_PASSWORD=<password> ./scripts/analytics.sh report sss
ANALYTICS_PASSWORD=<password> ./scripts/analytics.sh sync sss
```

The ANALYTICS_PASSWORD is stored in .env.local.

### API Endpoints
- `GET /api/analytics/analysis?show=<slug>&format=text|json` — Full analysis with insights and recommendations
- `GET /api/analytics/report?show=<slug>` — Raw dashboard data (KPIs, platform breakdown, trends)
- `GET /api/analytics/episodes?show=<slug>` — Episodes with metrics
- `GET /api/analytics/sync-youtube?show=<slug>` — Pull latest YouTube stats
- `POST /api/analytics/metrics` — Record metric snapshot `{post_id, views, likes, comments, shares, saves, avg_watch_pct}`
- `PUT /api/analytics/metrics` — Bulk update `{metrics: [{post_id, views, ...}]}`
- `POST /api/analytics/posts` — Log a post `{episode_id, platform, asset_type, external_url, posted_at}`
- `POST /api/analytics/accounts` — Log account stats `{show_slug, platform, date, followers, new_followers, profile_visits}`
- `POST /api/analytics/migrate` — Initialize database and seed shows/episodes

All endpoints require `Authorization: Bearer <ANALYTICS_PASSWORD>` header.

### KPI Targets (from SSS launch plan)
- Average watch time: >75% of video length
- Share rate: >2% of views
- Follower conversion: >3% of profile visits
- Comment rate: >1% of views

### Analysis Capabilities
The analysis engine generates:
- Health score (0-100)
- KPI performance vs targets with status indicators
- Episode rankings with per-episode insights
- Platform comparison (which platform drives views vs engagement)
- Content type analysis (dog_life vs hot_take vs arc performance)
- Trend analysis (growing/stable/declining)
- Prioritized recommendations (content, platform, engagement, growth, timing)
- Alerts for critical issues

### When analyzing data for the user
1. Always pull the latest data first (sync YouTube, then pull report)
2. Lead with the most actionable insight, not the summary
3. Connect data to specific production decisions ("Episode X outperformed because of Y — do more of that")
4. Reference the KPI targets when discussing metrics
5. Be direct about what's not working — the user wants honest feedback that shapes production

### Show Slugs
- `sss` — Sit Stay Spill
- `dnn` — DNN
- `theyard` — The Yard
- `processing` — ...processing

### Platforms
- `tiktok` — TikTok
- `instagram_reels` — Instagram Reels
- `instagram_feed` — Instagram Feed (carousels, photos)
- `instagram_stories` — Instagram Stories
- `youtube_shorts` — YouTube Shorts

### Social Handles
- SSS: @sitstayspill_show (TT, IG), @SitStaySpill (YT)
- DNN: @dnn_show (TT, IG), @dnnshow (YT)
- The Yard: @the.yard12 (TT), @theyard_show (IG, YT)
- Processing: @processing_show (TT, YT), @processing.show (IG)
