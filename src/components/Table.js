export default function Table({ headers, data, renderRow, actions }) {
    return (
        <div className="table-container glass">
            <div className="table-scroll">
                <table className="custom-table">
                    <thead>
                        <tr>
                            {headers.map((header, index) => (
                                <th key={index}>{header}</th>
                            ))}
                            {actions && <th>Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((item, index) => (
                            <tr key={index} className="table-row">
                                {renderRow(item)}
                                {actions && (
                                    <td className="actions-cell">
                                        {actions(item)}
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <style jsx>{`
        .table-container {
          border-radius: var(--radius-lg);
          overflow: hidden;
          width: 100%;
          max-width: 100%;
          border: 1px solid var(--border-color);
        }

        .table-scroll {
          width: 100%;
          max-width: 100%;
          overflow-x: auto;
          overflow-y: hidden;
          -webkit-overflow-scrolling: touch;
        }

        .custom-table {
          width: 100%;
          min-width: 640px;
          border-collapse: collapse;
          text-align: left;
        }

        th {
          padding: 1.25rem 1.5rem;
          background: rgba(255,255,255,0.02);
          color: var(--text-secondary);
          font-weight: 500;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-bottom: 1px solid var(--border-color);
        }

        td {
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid var(--border-color);
          color: var(--text-primary);
        }

        .table-row {
          transition: background 0.2s ease;
        }

        .table-row:last-child td {
          border-bottom: none;
        }

        .table-row:hover {
          background: rgba(255,255,255,0.02);
        }

        @media (max-width: 768px) {
          th {
            padding: 0.875rem 0.9rem;
            font-size: 0.72rem;
          }

          td {
            padding: 0.9rem;
            font-size: 0.88rem;
            white-space: nowrap;
          }
        }
      `}</style>
        </div>
    );
}
