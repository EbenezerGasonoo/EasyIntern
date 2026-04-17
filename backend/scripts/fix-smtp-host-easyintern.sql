-- One-time: use cPanel outgoing server hostname (domain), not mail.<domain>
-- Run on production DB if smtp_configurations still has the old host.

UPDATE smtp_configurations
SET host = 'easyintern.app'
WHERE LOWER(TRIM(host)) IN ('mail.easyintern.app', 'mail.easyintern.app.');
