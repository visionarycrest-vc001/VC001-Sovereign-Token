/**
 * 🎯 GrantCard Component
 * 
 * Displays individual grant information in the console
 * Supports both subscriber and admin views
 * 
 * @file components/GrantCard.js
 * @author Visionary Inc.
 */

export default function GrantCard({ grant, isAdmin = false }) {
  const statusEmoji = {
    'pending': '⏳',
    'under_review': '🔍',
    'approved': '✅',
    'rejected': '❌',
    'minted': '🪙'
  };

  return (
    <div className={`grant-card ${grant.status}`}>
      <div className="grant-header">
        <h3>{statusEmoji[grant.status]} {grant.title}</h3>
        <span className="grant-id">#{grant.id}</span>
      </div>
      
      <div className="grant-details">
        <p><strong>Sector:</strong> {grant.sector}</p>
        <p><strong>Amount:</strong> {grant.amount} L-Tokens</p>
        <p><strong>Submitted:</strong> {grant.submitted_date}</p>
      </div>

      {isAdmin && (
        <div className="admin-actions">
          <button className="review-btn">📋 Review</button>
          <button className="approve-btn">✅ Approve</button>
          <button className="reject-btn">❌ Reject</button>
        </div>
      )}

      {!isAdmin && grant.status === 'approved' && (
        <div className="mint-section">
          <button className="mint-btn">🪙 Mint Glyph</button>
        </div>
      )}
    </div>
  );
}