const { Client } = require('@microsoft/microsoft-graph-client');

/**
 * Create Microsoft Graph client with access token
 */
function getGraphClient(accessToken) {
  return Client.init({
    authProvider: (done) => {
      done(null, accessToken);
    },
  });
}

/**
 * Send email using Microsoft Graph API
 */
async function sendEmail(accessToken, emailData) {
  const client = getGraphClient(accessToken);

  const message = {
    subject: emailData.subject,
    body: {
      contentType: 'HTML',
      content: emailData.body,
    },
    toRecipients: emailData.to.map(email => ({
      emailAddress: { address: email },
    })),
  };

  try {
    await client.api('/me/sendMail').post({ message });
    console.log(`✅ Email sent successfully to: ${emailData.to.join(', ')}`);
    return { success: true };
  } catch (error) {
    console.error('❌ Error sending email:', error);
    throw error;
  }
}

/**
 * Generate task assignment email HTML
 */
function generateTaskEmail(taskData) {
  const { managerName, managerEmail, taskDetails, assignedBy } = taskData;

  return {
    subject: `New Task Assigned: ${taskDetails.name}`,
    to: [managerEmail],
    body: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
          .task-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea; }
          .task-title { font-size: 20px; font-weight: bold; color: #1a202c; margin-bottom: 10px; }
          .task-detail { margin: 10px 0; }
          .label { font-weight: bold; color: #4a5568; }
          .button { display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
          .footer { text-align: center; margin-top: 30px; color: #718096; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">New Task Assigned</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">You have been assigned a new task</p>
          </div>
          <div class="content">
            <p>Hi ${managerName},</p>
            <p>${assignedBy} has assigned you a new task:</p>
            
            <div class="task-box">
              <div class="task-title">${taskDetails.name}</div>
              <div class="task-detail"><span class="label">Description:</span> ${taskDetails.description || 'No description provided'}</div>
              <div class="task-detail"><span class="label">Priority:</span> ${taskDetails.priority || 'Normal'}</div>
              <div class="task-detail"><span class="label">Deadline:</span> ${taskDetails.deadline || 'Not specified'}</div>
              <div class="task-detail"><span class="label">Category:</span> ${taskDetails.category || 'General'}</div>
            </div>

            <p>Please review the task details and start working on it at your earliest convenience.</p>
            
            <a href="${process.env.APP_URL || 'http://localhost:5174'}" class="button">View in Dashboard</a>

            <div class="footer">
              <p>This is an automated notification from Management Dashboard</p>
              <p>© 2024 Management Dashboard. All rights reserved.</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
  };
}

/**
 * Generate meeting assignment email HTML
 */
function generateMeetingEmail(meetingData) {
  const { attendees, meetingDetails, organizer } = meetingData;

  const attendeeEmails = attendees.map(a => a.email);
  const attendeeNames = attendees.map(a => a.name).join(', ');

  return {
    subject: `Meeting Invitation: ${meetingDetails.title}`,
    to: attendeeEmails,
    body: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
          .meeting-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea; }
          .meeting-title { font-size: 20px; font-weight: bold; color: #1a202c; margin-bottom: 10px; }
          .meeting-detail { margin: 10px 0; }
          .label { font-weight: bold; color: #4a5568; }
          .button { display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
          .footer { text-align: center; margin-top: 30px; color: #718096; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">Meeting Invitation</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">You have been invited to a meeting</p>
          </div>
          <div class="content">
            <p>Hi ${attendeeNames},</p>
            <p>${organizer} has invited you to a meeting:</p>
            
            <div class="meeting-box">
              <div class="meeting-title">${meetingDetails.title}</div>
              <div class="meeting-detail"><span class="label">Date:</span> ${meetingDetails.date}</div>
              <div class="meeting-detail"><span class="label">Time:</span> ${meetingDetails.time}</div>
              <div class="meeting-detail"><span class="label">Duration:</span> ${meetingDetails.duration || 'Not specified'}</div>
              <div class="meeting-detail"><span class="label">Location:</span> ${meetingDetails.location || 'Not specified'}</div>
              <div class="meeting-detail"><span class="label">Type:</span> ${meetingDetails.type || 'General'}</div>
              ${meetingDetails.description ? `<div class="meeting-detail"><span class="label">Description:</span> ${meetingDetails.description}</div>` : ''}
            </div>

            <p>Please mark your calendar and join the meeting at the scheduled time.</p>
            
            <a href="${process.env.APP_URL || 'http://localhost:5174'}" class="button">View in Dashboard</a>

            <div class="footer">
              <p>This is an automated notification from Management Dashboard</p>
              <p>© 2024 Management Dashboard. All rights reserved.</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
  };
}

module.exports = {
  sendEmail,
  generateTaskEmail,
  generateMeetingEmail,
};
