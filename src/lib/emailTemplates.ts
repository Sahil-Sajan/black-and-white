export const getOrderEmailTemplate = (order: any, status: string, trackingNumber?: string, cancellationReason?: string) => {
  const statusColors: any = {
    PENDING: "#f59e0b",
    SHIPPED: "#3b82f6",
    DELIVERED: "#10b981",
    CANCELLED: "#ef4444",
  };

  const statusMessages: any = {
    PENDING: "Your order has been confirmed and is currently being processed.",
    SHIPPED: `Exciting news! Your order is on its way. We've handed it over to <strong>Leopard Courier Service</strong>.`,
    DELIVERED: "Your order has been successfully delivered. We hope you enjoy your purchase!",
    CANCELLED: "We're sorry to inform you that your order has been cancelled.",
  };

  const color = statusColors[status] || "#6366f1";
  const message = statusMessages[status];

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Inter', -apple-system, blinkmacsystemfont, 'Segoe UI', roboto, oxygen, ubuntu, cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; line-height: 1.6; color: #334155; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
        .header { text-align: center; padding-bottom: 40px; }
        .content { background: #ffffff; border-radius: 24px; padding: 40px; border: 1px solid #f1f5f9; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05); }
        .status-badge { display: inline-block; padding: 8px 16px; border-radius: 99px; font-weight: 800; font-size: 12px; letter-spacing: 0.1em; color: white; background-color: ${color}; text-transform: uppercase; margin-bottom: 24px; }
        h1 { font-size: 24px; font-weight: 900; color: #0f172a; margin: 0 0 16px 0; letter-spacing: -0.025em; }
        p { margin: 0 0 24px 0; font-size: 16px; color: #64748b; }
        .order-box { background: #f8fafc; border-radius: 16px; padding: 24px; margin-bottom: 24px; }
        .order-id { font-size: 14px; font-weight: 800; color: #0f172a; margin-bottom: 4px; }
        .tracking-box { border: 2px dashed ${color}33; background: ${color}05; padding: 20px; border-radius: 16px; text-align: center; margin-bottom: 24px; }
        .tracking-label { font-size: 12px; font-weight: 800; color: ${color}; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 8px; }
        .tracking-number { font-size: 20px; font-weight: 900; color: #0f172a; }
        .reason-box { background: #fee2e2; border-left: 4px solid #ef4444; padding: 16px; border-radius: 8px; margin-bottom: 24px; }
        .footer { text-align: center; padding-top: 40px; font-size: 12px; color: #94a3b8; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div style="font-size: 24px; font-weight: 900; color: #0f172a; letter-spacing: -0.05em;">B&W VAPORS</div>
        </div>
        <div class="content">
          <div class="status-badge">${status}</div>
          <h1>Hi ${order.firstName},</h1>
          <p>${message}</p>

          ${status === 'SHIPPED' && trackingNumber ? `
            <div class="tracking-box">
              <div class="tracking-label">LEOPARD TRACKING NUMBER</div>
              <div class="tracking-number">${trackingNumber}</div>
              <div style="margin-top: 12px; font-size: 13px; font-weight: 600; color: #64748b;">
                You can track your order on the Leopard Courier website.
              </div>
            </div>
          ` : ''}

          ${status === 'CANCELLED' && cancellationReason ? `
            <div class="reason-box">
              <div style="font-weight: 800; color: #991b1b; font-size: 12px; text-transform: uppercase; margin-bottom: 4px;">Reason for Cancellation</div>
              <div style="color: #ef4444; font-weight: 500;">${cancellationReason}</div>
            </div>
          ` : ''}

          <div class="order-box">
            <div class="order-id">Order ID: ${order.orderId}</div>
            <div style="font-size: 13px; color: #64748b;">Place on ${new Date(order.createdAt).toLocaleDateString()}</div>
          </div>

          <p style="margin-bottom: 0;">If you have any questions, feel free to reply to this email.</p>
        </div>
        <div class="footer">
          &copy; ${new Date().getFullYear()} B&W Vapors. All rights reserved.
        </div>
      </div>
    </body>
    </html>
  `;
};
