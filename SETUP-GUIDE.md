# 🚀 Management Dashboard - Login & Email Notifications Setup Guide

## ✅ What's Been Implemented

### Frontend
- ✅ Beautiful login page with Microsoft SSO
- ✅ Email/password fallback login
- ✅ Access token management for email notifications
- ✅ Logout functionality
- ✅ Notification service integration

### Backend
- ✅ Node.js Express server
- ✅ Microsoft Graph API integration
- ✅ Email notification endpoints
- ✅ In-memory logging
- ✅ CORS enabled

---

## 🎯 Current Status

### ✅ Running Now:
- **Frontend**: http://localhost:5173/
- **Backend**: http://localhost:3001

### ⚠️ Needs Configuration:
- Azure credentials (Client ID, Tenant ID, Client Secret)
- Mail.Send permission in Azure Portal
- Admin consent for Mail.Send permission

---

## 📋 Setup Instructions

### Step 1: Get Azure Credentials (5 minutes)

1. Go to https://portal.azure.com
2. Navigate to **Azure Active Directory** → **App registrations**
3. Select your app (or create a new one)
4. Copy these values:
   - **Client ID** (Application ID)
   - **Tenant ID** (Directory ID)
5. Create a **Client Secret**:
   - Go to **Certificates & secrets**
   - Click **New client secret**
   - Copy the secret value (⚠️ only shown once!)

### Step 2: Update Environment Files (2 minutes)

#### Frontend `.env`:
```env
REACT_APP_MICROSOFT_CLIENT_ID=your_actual_client_id
REACT_APP_MICROSOFT_TENANT_ID=your_actual_tenant_id
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_APP_URL=http://localhost:5173
```

#### Backend `backend/.env`:
```env
MICROSOFT_CLIENT_ID=your_actual_client_id
MICROSOFT_CLIENT_SECRET=your_actual_client_secret
MICROSOFT_TENANT_ID=your_actual_tenant_id
PORT=3001
FRONTEND_URL=http://localhost:5173
APP_URL=http://localhost:5173
NODE_ENV=development
```

### Step 3: Add Mail.Send Permission (3 minutes)

1. In Azure Portal, go to your app registration
2. Click **API permissions** (left sidebar)
3. Click **Add a permission**
4. Select **Microsoft Graph** → **Delegated permissions**
5. Search for and check: **`Mail.Send`**
6. Click **Add permissions**
7. **IMPORTANT**: Click **Grant admin consent for [Your Organization]**

### Step 4: Restart Servers (1 minute)

Stop both servers (Ctrl+C in terminals) and restart:

```bash
# Frontend
npm run dev

# Backend (in backend folder)
npm start
```

---

## 🧪 Testing the Setup

### Test 1: Login Page
1. Open http://localhost:5173/
2. You should see the login page
3. Try email/password login (works without Microsoft)
   - Email: any@email.com
   - Password: any password
4. You should see the dashboard

### Test 2: Microsoft SSO Login
1. Logout from the dashboard
2. Click "Sign in with Microsoft"
3. Login with your Microsoft account
4. Accept the Mail.Send permission (first time only)
5. You should see the dashboard
6. Check console for: "✅ Access token set for email notifications"

### Test 3: Backend Health Check
```bash
curl http://localhost:3001/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2024-...",
  "service": "notification-service"
}
```

### Test 4: Send Test Email (After Microsoft Login)
```bash
curl -X POST http://localhost:3001/api/notifications/test \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{"testEmail": "your@email.com"}'
```

---

## 📧 How Email Notifications Work

### Architecture:
```
User logs in with Microsoft SSO
    ↓
Frontend gets access token with Mail.Send permission
    ↓
Access token stored in sessionStorage
    ↓
When admin assigns task/meeting
    ↓
Frontend sends request to backend with access token
    ↓
Backend uses Microsoft Graph API to send email
    ↓
Manager receives email in Outlook
```

### Sending Task Notification:
```javascript
import { sendTaskNotification } from './services/notificationService';

await sendTaskNotification({
  managerEmail: 'manager@company.com',
  managerName: 'John Doe',
  taskDetails: {
    name: 'Complete project report',
    description: 'Finish Q4 report',
    priority: 'High',
    deadline: '2024-12-31',
    category: 'Reports'
  },
  assignedBy: 'Admin'
});
```

### Sending Meeting Notification:
```javascript
import { sendMeetingNotification } from './services/notificationService';

await sendMeetingNotification({
  attendees: [
    { name: 'John Doe', email: 'john@company.com' },
    { name: 'Jane Smith', email: 'jane@company.com' }
  ],
  meetingDetails: {
    title: 'Q4 Planning Meeting',
    date: '2024-12-15',
    time: '10:00 AM - 11:00 AM',
    duration: '60 min',
    location: 'Conference Room A',
    type: 'Strategic',
    description: 'Discuss Q4 goals'
  },
  organizer: 'Admin'
});
```

---

## 🔧 API Endpoints

### Backend API (http://localhost:3001)

#### 1. Health Check
```
GET /health
```

#### 2. Send Task Notification
```
POST /api/notifications/task-assigned
Headers: Authorization: Bearer {access_token}
Body: {
  managerEmail: string,
  managerName: string,
  taskDetails: {
    name: string,
    description: string,
    priority: string,
    deadline: string,
    category: string
  },
  assignedBy: string
}
```

#### 3. Send Meeting Notification
```
POST /api/notifications/meeting-assigned
Headers: Authorization: Bearer {access_token}
Body: {
  attendees: [{ name: string, email: string }],
  meetingDetails: {
    title: string,
    date: string,
    time: string,
    duration: string,
    location: string,
    type: string,
    description: string
  },
  organizer: string
}
```

#### 4. Get Notification Logs
```
GET /api/notifications/logs
```

#### 5. Send Test Notification
```
POST /api/notifications/test
Headers: Authorization: Bearer {access_token}
Body: { testEmail: string }
```

---

## 🐛 Troubleshooting

### Login page not showing?
- Check if frontend is running on http://localhost:5173/
- Clear browser cache
- Check browser console for errors

### "No access token" error?
- User must login with Microsoft SSO (not email/password)
- Check console for "Access token set" message
- Verify Mail.Send permission is granted in Azure

### Backend not responding?
- Check if backend is running on http://localhost:3001
- Test health endpoint: `curl http://localhost:3001/health`
- Check backend terminal for errors

### Can't send emails?
- Verify Azure credentials are correct in `.env` files
- Check Mail.Send permission is granted
- Check admin consent is granted
- Verify access token is being sent in Authorization header
- Check backend logs for detailed error messages

### "CORS error"?
- Verify FRONTEND_URL in backend/.env matches your frontend URL
- Restart backend after changing .env

---

## 📝 Important Notes

### Security:
- Access tokens are stored in sessionStorage (cleared on browser close)
- Tokens are only sent to your backend (not third parties)
- Backend validates tokens before sending emails

### Email Sending:
- Emails are sent from the logged-in user's Outlook account
- User must have Mail.Send permission
- Emails appear in user's "Sent Items" folder

### Limitations:
- User must login with Microsoft SSO to send emails
- Email/password login works but can't send emails
- Access token expires after 1 hour (user must re-login)

---

## ✨ Features

### Login Page:
- ✅ Microsoft SSO with popup
- ✅ Email/password fallback
- ✅ Beautiful gradient design
- ✅ Error handling
- ✅ Loading states

### Email Notifications:
- ✅ Task assignment emails
- ✅ Meeting invitation emails
- ✅ Beautiful HTML email templates
- ✅ Automatic logging
- ✅ Test email functionality

### Dashboard:
- ✅ Logout button in sidebar
- ✅ Access token management
- ✅ All existing features preserved

---

## 🎯 Next Steps

1. **Configure Azure** (get credentials and permissions)
2. **Update .env files** (both frontend and backend)
3. **Restart servers**
4. **Test Microsoft login**
5. **Send test email**
6. **Integrate with Tasks/Meetings pages** (call notification service when assigning)

---

## 📞 Need Help?

If you encounter any issues:
1. Check the troubleshooting section above
2. Check browser console for frontend errors
3. Check backend terminal for server errors
4. Verify all environment variables are set correctly
5. Ensure Azure permissions are granted

---

**Everything is ready!** Just add your Azure credentials and you're good to go! 🎉
