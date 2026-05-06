const express = require('express');
const router = express.Router();
const {
  sendTaskNotification,
  sendMeetingNotification,
  getNotificationLogs,
  sendTestNotification,
} = require('../controllers/notificationController');

// Send task assignment notification
router.post('/task-assigned', sendTaskNotification);

// Send meeting assignment notification
router.post('/meeting-assigned', sendMeetingNotification);

// Get notification logs
router.get('/logs', getNotificationLogs);

// Send test notification
router.post('/test', sendTestNotification);

module.exports = router;
