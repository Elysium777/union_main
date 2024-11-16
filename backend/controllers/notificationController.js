const { CONSTANTS, payloads } = require("@pushprotocol/restapi");

const getNotification = async (req, res) => {
  try {
    const user = req.user;

    const { page = 1, limit = 10, filter = "broadcast" } = req.query;

    const filterMapping = {
      broadcast: CONSTANTS.NOTIFICATION.TYPE.BROADCAST,
      targeted: CONSTANTS.NOTIFICATION.TYPE.TARGETED,
      subset: CONSTANTS.NOTIFICATION.TYPE.SUBSET,
    };

    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      filter: filter ? filterMapping[filter.toLowerCase()] : null,
    };

    const allNotifications = await user.channel.notifications(
      "0xA2d6267B5b167Ee27174BfDa808408F90391D949",
      options
    );

    const notifications = allNotifications.notifications.map(
      (notification) => notification.message.payload
    );

    return res.json({
      success: true,
      notifications,
      pagination: {
        page: options.page,
        limit: options.limit,
        total: allNotifications.total,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const sendPushNotification = async (req, res) => {
  try {
    const user = req.user;

    const { title, description, chainId, cta, summary } = req.body;

    if (summary) {
      const notificationOptions = {
        notification: {
          title: title || "Default Title",
          body: `${description}\n${summary} ~ ${chainId}` || "Default Body",
        },
        payload: {
          cta: cta || undefined,
        },
      };

      await user.channel.send(["*"], notificationOptions);
    } else {
      const notificationOptions = {
        notification: {
          title: title || "Default Title",
          body: description + "~" + chainId || "Default Body",
        },
        payload: {
          cta: cta || undefined,
        },
      };

      await user.channel.send(["*"], notificationOptions);
    }

    // return res.json({
    //   success: true,
    //   message: "Notification sent successfully",
    // });
  } catch (error) {
    console.error("Error sending notification:", error.message);
    // res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  getNotification,
  sendPushNotification,
};
