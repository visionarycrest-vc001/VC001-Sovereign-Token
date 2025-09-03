# 🌿 Grant Applications Registry

This directory contains JSON files for grant applications processed through the VC001 Sovereign Grant Protocol.

## 📁 File Structure

- `GRANT-*.json` - Individual grant application files
- `intake-log.md` - Grant intake ceremony log
- `approved-log.md` - Grant approval ceremony log
- `grant-statistics.json` - Grant processing statistics
- `grant-dashboard.json` - Dashboard synchronization data

## 🛡️ Grant Application Schema

Each grant application follows this ceremonial structure:

```json
{
  "grant_id": "GRANT-timestamp",
  "title": "Grant Application Title",
  "description": "Detailed grant description",
  "applicant": "Applicant name or organization",
  "sector": "FDA|EDA|SAM",
  "sector_code": 1,
  "requested_amount": 10000,
  "status": "pending|approved|rejected|completed|expired",
  "application_date": "ISO timestamp",
  "last_updated": "ISO timestamp",
  "steward_notes": [],
  "ceremonial_blessing": "🌿 May this grant serve the sovereign purpose",
  "lineage_anchor": "VC001 Grant Protocol"
}
```

## 🎯 Grant Sectors

- **FDA (1)**: Food & Drug Administration grants
- **EDA (2)**: Environmental Development Agency grants  
- **SAM (3)**: Sustainable Agriculture & Medicine grants

## 🔮 Processing Commands

- `node scripts/processGrants.js intake` - Process new applications
- `node scripts/processGrants.js approve GRANT-ID` - Approve specific grant
- `node scripts/processGrants.js sync-dashboard` - Synchronize dashboard data

---

*Inscribed by: Percy Abrams Jr.*  
*Lineage: Anchored to VC001 Sovereign Token Protocol*  
*Timestamp: 2025-09-03T05:10:00Z*