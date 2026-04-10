-- Sample data for development/testing

INSERT INTO demands (reference, exporter_id, exporter_name, currency, amount, status, bill_of_lading, invoice_number, description)
VALUES
    ('DEM-001TEST', 'EXP-001', 'Morocco Export Company', 'USD', 50000.00, 'SUBMITTED', 'BL-2024-001', 'INV-2024-001', 'Export of automotive parts'),
    ('DEM-002TEST', 'EXP-002', 'Atlas Trading SARL', 'EUR', 75000.00, 'UNDER_REVIEW', 'BL-2024-002', 'INV-2024-002', 'Textile export to France'),
    ('DEM-003TEST', 'EXP-001', 'Morocco Export Company', 'USD', 120000.00, 'APPROVED', 'BL-2024-003', 'INV-2024-003', 'Chemical exports')
ON CONFLICT (reference) DO NOTHING;
