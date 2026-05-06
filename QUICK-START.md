# ⚡ Quick Start Guide

## ✅ What's Running

- **Frontend**: http://localhost:5173/ (Login page)
- **Backend**: http://localhost:3001 (Email API)

## 🔑 To Enable Email Notifications

### 1. Get Azure Credentials
- Go to https://portal.azure.com
- Azure AD → App registrations → Your app
- Copy: **Client ID**, **Tenant ID**, **Client Secret**

### 2. Update `.env` Files

**Frontend `.env`:**
```env
REACT_APP_MICROSOFT_CLIENT_ID=your_client_id
REACT_APP_MICROSOFT_TENANT_ID=your_tenant_id
```

**Backend `backend/.env`:**
```env
MICROSOFT_CLIENT_ID=your_client_id
MICROSOFT_CLIENT_SECRET=your_client_secret
MICROSOFT_TENANT_ID=your_tenant_id
```

### 3. Add Mail.Send Permission
- Azure Portal → Your app → API permissions
- Add permission → Microsoft Graph → Delegated → Mail.Send
- Grant admin consent

### 4. Restart Servers
```bash
# Stop both (Ctrl+C), then:
npm run dev              # Frontend
cd backend && npm start  # Backend
```

## 🧪 Test It

1. Open http://localhost:5173/
2. Click "Sign in with Microsoft"
3. Login and accept permissions
4. You're in! Check console for "Access token set"

## 📧 Send Email (Example)

```javascript
import { sendTaskNotification } from './services/notificationService';

await sendTaskNotification({
  managerEmail: 'manager@company.com',
  managerName: 'John Doe',
  taskDetails: {
    name: 'Complete report',
    description: 'Q4 report',
    priority: 'High',
    deadline: '2024-12-31'
  },
  assignedBy: 'Admin'
});
```

## 🐛 Issues?

- **No login page?** → Check http://localhost:5173/
- **Can't send emails?** → Login with Microsoft (not email/password)
- **Backend error?** → Check http://localhost:3001/health
- **CORS error?** → Verify FRONTEND_URL in backend/.env

## 📚 Full Documentation

See `SETUP-GUIDE.md` for complete details.

---

**That's it!** Add Azure credentials and start sending emails! 🚀
