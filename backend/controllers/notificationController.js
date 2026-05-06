const { sendEmail, generateTaskEmail, generateMeetingEmail } = require('../services/graphService');

// In-memory storage for notification logs (replace with database in production)
const notificationLogs = [];

/**
 * Send task assignment notification
 */
async function sendTaskNotification(req, res) {
  try {
    const { managerEmail, managerName, taskDetails, assignedBy } = req.body;
    const accessToken = req.headers.authorization?.replace('Bearer ', '');

    if (!accessToken) {
      return res.status(401).json({ error: 'No access token provided' });
    }

    if (!managerEmail || !managerName || !taskDetails) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Generate email content
    const emailData = generateTaskEmail({
      managerEmail,
      managerName,
      taskDetails,
      assignedBy: assignedBy || 'Admin',
    });

    // Send email via Microsoft Graph
    await sendEmail(accessToken, emailData);

    // Log notification
    const log = {
      id: Date.now(),
      type: 'task',
      to: managerEmail,
      subject: emailData.subject,
      timestamp: new Date().toISOString(),
      status: 'sent',
    };
    notificationLogs.push(log);

    res.json({
      success: true,
      message: 'Task notification sent successfully',
      log,
    });
  } catch (error) {
    console.error('Error sending task notification:', error);
    res.status(500).json({
      error: 'Failed to send task notification',
      message: error.message,
    });
  }
}

/**
 * Send meeting assignment notification
 */
async function sendMeetingNotification(req, res) {
  try {
    const { attendees, meetingDetails, organizer } = req.body;
    const accessToken = req.headers.authorization?.replace('Bearer ', '');

    if (!accessToken) {
      return res.status(401).json({ error: 'No access token provided' });
    }

    if (!attendees || !meetingDetails) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Generate email content
    const emailData = generateMeetingEmail({
      attendees,
      meetingDetails,
      organizer: organizer || 'Admin',
    });

    // Send email via Microsoft Graph
    await sendEmail(accessToken, emailData);

    // Log notification
    const log = {
      id: Date.now(),
      type: 'meeting',
      to: attendees.map(a => a.email),
      subject: emailData.subject,
      timestamp: new Date().toISOString(),
      status: 'sent',
    };
    notificationLogs.push(log);

    res.json({
      success: true,
      message: 'Meeting notification sent successfully',
      log,
    });
  } catch (error) {
    console.error('Error sending meeting notification:', error);
    res.status(500).json({
      error: 'Failed to send meeting notification',
      message: error.message,
    });
  }
}

/**
 * Get notification logs
 */
function getNotificationLogs(req, res) {
  res.json({
    success: true,
    logs: notificationLogs,
    count: notificationLogs.length,
  });
}

/**
 * Send test notification
 */
async function sendTestNotification(req, res) {
  try {
    const { testEmail } = req.body;
    const accessToken = req.headers.authorization?.replace('Bearer ', '');

    if (!accessToken) {
      return res.status(401).json({ error: 'No access token provided' });
    }

    if (!testEmail) {
      return res.status(400).json({ error: 'Test email address required' });
    }

    const emailData = {
      subject: 'Test Notification from Management Dashboard',
      to: [testEmail],
      body: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
            .success-icon { font-size: 48px; margin-bottom: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="success-icon">✅</div>
              <h1 style="margin: 0;">Test Successful!</h1>
            </div>
            <div class="content">
              <p>Congratulations! Your email notification system is working correctly.</p>
              <p>This test email confirms that:</p>
              <ul>
                <li>Microsoft Graph API integration is configured properly</li>
                <li>Access tokens are being passed correctly</li>
                <li>Email sending functionality is operational</li>
              </ul>
              <p>You can now send task and meeting notifications to your team members.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await sendEmail(accessToken, emailData);

    const log = {
      id: Date.now(),
      type: 'test',
      to: testEmail,
      subject: emailData.subject,
      timestamp: new Date().toISOString(),
      status: 'sent',
    };
    notificationLogs.push(log);

    res.json({
      success: true,
      message: 'Test notification sent successfully',
      log,
    });
  } catch (error) {
    console.error('Error sending test notification:', error);
    res.status(500).json({
      error: 'Failed to send test notification',
      message: error.message,
    });
  }
}

module.exports = {
  sendTaskNotification,
  sendMeetingNotification,
  getNotificationLogs,
  sendTestNotification,
};
