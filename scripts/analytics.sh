#!/bin/bash
# ═══════════════════════════════════════════════════════════════
# PSP Analytics CLI
#
# Pull analytics data from the production API.
# Usage:
#   ./scripts/analytics.sh report sss          # Full text report for SSS
#   ./scripts/analytics.sh report all          # Reports for all shows
#   ./scripts/analytics.sh report sss json     # JSON format
#   ./scripts/analytics.sh sync sss            # Sync YouTube data for SSS
#   ./scripts/analytics.sh episodes sss        # List episodes for SSS
#   ./scripts/analytics.sh kpis sss            # KPI summary for SSS
# ═══════════════════════════════════════════════════════════════

set -euo pipefail

BASE_URL="${ANALYTICS_BASE_URL:-https://perfectsenseproductions.com}"
PASSWORD="${ANALYTICS_PASSWORD}"

if [ -z "${PASSWORD:-}" ]; then
  # Try loading from .env.local
  ENV_FILE="$(dirname "$0")/../.env.local"
  if [ -f "$ENV_FILE" ]; then
    PASSWORD=$(grep ANALYTICS_PASSWORD "$ENV_FILE" | cut -d '=' -f2)
  fi
fi

if [ -z "${PASSWORD:-}" ]; then
  echo "Error: ANALYTICS_PASSWORD not set. Set it as an env var or in .env.local"
  exit 1
fi

AUTH="Authorization: Bearer $PASSWORD"

case "${1:-help}" in
  report)
    SHOW="${2:-all}"
    FORMAT="${3:-text}"
    curl -s -H "$AUTH" "$BASE_URL/api/analytics/analysis?show=$SHOW&format=$FORMAT"
    ;;
  sync)
    SHOW="${2:?Usage: analytics.sh sync <show_slug>}"
    curl -s -H "$AUTH" "$BASE_URL/api/analytics/sync-youtube?show=$SHOW" | python3 -m json.tool 2>/dev/null || cat
    ;;
  episodes)
    SHOW="${2:?Usage: analytics.sh episodes <show_slug>}"
    curl -s -H "$AUTH" "$BASE_URL/api/analytics/episodes?show=$SHOW" | python3 -m json.tool 2>/dev/null || cat
    ;;
  kpis)
    SHOW="${2:?Usage: analytics.sh kpis <show_slug>}"
    curl -s -H "$AUTH" "$BASE_URL/api/analytics/report?show=$SHOW" | python3 -m json.tool 2>/dev/null || cat
    ;;
  migrate)
    curl -s -X POST -H "$AUTH" "$BASE_URL/api/analytics/migrate" | python3 -m json.tool 2>/dev/null || cat
    ;;
  add-metrics)
    # Usage: analytics.sh add-metrics '{"post_id":1,"views":1000,"likes":50}'
    DATA="${2:?Usage: analytics.sh add-metrics '<json>'}"
    curl -s -X POST -H "$AUTH" -H "Content-Type: application/json" -d "$DATA" "$BASE_URL/api/analytics/metrics"
    ;;
  add-post)
    # Usage: analytics.sh add-post '{"episode_id":1,"platform":"tiktok","asset_type":"video"}'
    DATA="${2:?Usage: analytics.sh add-post '<json>'}"
    curl -s -X POST -H "$AUTH" -H "Content-Type: application/json" -d "$DATA" "$BASE_URL/api/analytics/posts"
    ;;
  add-account)
    # Usage: analytics.sh add-account '{"show_slug":"sss","platform":"tiktok","date":"2026-03-31","followers":100}'
    DATA="${2:?Usage: analytics.sh add-account '<json>'}"
    curl -s -X POST -H "$AUTH" -H "Content-Type: application/json" -d "$DATA" "$BASE_URL/api/analytics/accounts"
    ;;
  help|*)
    echo "PSP Analytics CLI"
    echo ""
    echo "Commands:"
    echo "  report <show|all> [text|json]  Full performance analysis"
    echo "  sync <show>                    Sync YouTube metrics"
    echo "  episodes <show>                List episodes with metrics"
    echo "  kpis <show>                    KPI report"
    echo "  migrate                        Initialize/seed database"
    echo "  add-metrics '<json>'           Record metric snapshot"
    echo "  add-post '<json>'              Log a post"
    echo "  add-account '<json>'           Log account daily stats"
    echo ""
    echo "Shows: sss, dnn, theyard, processing"
    echo ""
    echo "Environment:"
    echo "  ANALYTICS_PASSWORD   Required. Your dashboard password."
    echo "  ANALYTICS_BASE_URL   Optional. Default: https://perfectsenseproductions.com"
    ;;
esac
