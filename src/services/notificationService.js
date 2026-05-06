const API_URL = import.meta.env.REACT_APP_API_URL || 'http://localhost:3001/api';

/**
 * Get the access token from session storage
 */
function getAccessToken() {
  return sessionStorage.getItem('msalAccessToken');
}

/**
 * Send task assignment notification email
 */
export async function sendTaskNotification(taskData) {
  const accessToken = getAccessToken();
  
  if (!accessToken) {
    console.warn('⚠️ No access token available. User must login with Microsoft to send emails.');
    return { success: false, error: 'No access token' };
  }

  try {
    const response = await fetch(`${API_URL}/notifications/task-assigned`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(taskData),
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Task notification sent successfully');
      return { success: true, data };
    } else {
      console.error('❌ Failed to send task notification:', data);
      return { success: false, error: data.error };
    }
  } catch (error) {
    console.error('❌ Error sending task notification:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Send meeting assignment notification email
 */
export async function sendMeetingNotification(meetingData) {
  const accessToken = getAccessToken();
  
  if (!accessToken) {
    console.warn('⚠️ No access token available. User must login with Microsoft to send emails.');
    return { success: false, error: 'No access token' };
  }

  try {
    const response = await fetch(`${API_URL}/notifications/meeting-assigned`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(meetingData),
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Meeting notification sent successfully');
      return { success: true, data };
    } else {
      console.error('❌ Failed to send meeting notification:', data);
      return { success: false, error: data.error };
    }
  } catch (error) {
    console.error('❌ Error sending meeting notification:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Send test notification
 */
export async function sendTestNotification(testEmail) {
  const accessToken = getAccessToken();
  
  if (!accessToken) {
    console.warn('⚠️ No access token available. User must login with Microsoft to send emails.');
    return { success: false, error: 'No access token' };
  }

  try {
    const response = await fetch(`${API_URL}/notifications/test`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ testEmail }),
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Test notification sent successfully');
      return { success: true, data };
    } else {
      console.error('❌ Failed to send test notification:', data);
      return { success: false, error: data.error };
    }
  } catch (error) {
    console.error('❌ Error sending test notification:', error);
    return { success: false, error: error.message };
  }
}
