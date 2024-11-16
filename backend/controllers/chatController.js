const createGroupChat = async (req, res) => {
  try {
    const user = req.user;

    const { title, description, image = null, private } = req.body;

    if (!title) {
      throw new Error("Group name is required");
    }

    const group = {
      title,
      description: description || "",
      image:
        image ||
        `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABAAAAAQACAIAAADwf7zUAAAFH2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIgogICAgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIgogICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgeG1wOkNyZWF0ZURhdGU9IjIwMjQtMTEtMDVUMjI6MDU6MTQrMDUzMCIKICAgeG1wOk1vZGlmeURhdGU9IjIwMjQtMTEtMDVUMjI6MDY6MjcrMDU6MzAiCiAgIHhtcDpNZXRhZGF0YURhdGU9IjIwMjQtMTEtMDVUMjI6MDY6MjcrMDU6MzAiCiAgIHBob3Rvc2hvcDpEYXRlQ3JlYXRlZD0iMjAyNC0xMS0wNVQyMjowNToxNCswNTMwIgogICBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIgogICBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiCiAgIGV4aWY6UGl4ZWxYRGltZW5zaW9uPSIxMDI0IgogICBleGlmOlBpeGVsWURpbWVuc2lvbj0iMTAyNCIKICAgZXhpZjpDb2xvclNwYWNlPSIxIgogICB0aWZmOkltYWdlV2lkdGg9IjEwMjQiCiAgIHRpZmY6SW1hZ2VMZW5ndGg9IjEwMjQiCiAgIHRpZmY6UmVzb2x1dGlvblVuaXQ9IjIiCiAgIHRpZmY6WFJlc29sdXRpb249IjE0NC8xIgogICB0aWZmOllSZXNvbHV0aW9uPSIxNDQvMSI+CiAgIDx4bXBNTTpIaXN0b3J5PgogICAgPHJkZjpTZXE+CiAgICAgPHJkZjpsaQogICAgICBzdEV2dDphY3Rpb249InByb2R1Y2VkIgogICAgICBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZmZpbml0eSBEZXNpZ25lciAyIDIuMS4xIgogICAgICBzdEV2dDp3aGVuPSIyMDI0LTExLTA1VDIyOjA2OjI3KzA1OjMwIi8+CiAgICA8L3JkZjpTZXE+CiAgIDwveG1wTU06SGlzdG9yeT4KICA8L3JkZjpEZXNjcmlwdGlvbj4KIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+Cjw/eHBhY2tldCBlbmQ9InIiPz7cnWqcAAABgGlDQ1BzUkdCIElFQzYxOTY2LTIuMQAAKJF1kctLQkEUhz81KcooqEWLFhbWyqIHSG2ClKhAQswgq41eX4GPy71KSNugrVAQtem1qL+gtkHrICiKIFq3LmpTcjtXBSPyDGfON7+Zc5g5A9ZQWsnoTSOQyea14KzXuRxecTa/0oadTvogoujqdCDgp6F9PmAx492QWavxuX+tLRbXFbC0CE8pqpYXnhP2b+RVk3eFu5VUJCZ8LuzW5ILC96YerfKryckqf5ushYI+sHYKO5O/OPqLlZSWEZaX48qkC0rtPuZLHPHs0qLEfvFedILM4sXJPDP48DDKpMwehhhjWFY0yB+p5C+Qk1xFZpUiGuskSZHHLWpBqsclJkSPy0hTNPv/t696YnysWt3hBfuLYbwPQPMOlEuG8XVsGOUTsD3DVbaenzuCiQ/RS3XNdQgdW3BxXdeie3C5DT1PakSLVCSbuDWRgLczaA9D1y20rlZ7Vtvn9BFCm/JVN7B/AINyvmPtBwuFZ7yURWMEAAAACXBIWXMAABYlAAAWJQFJUiTwAAAgAElEQVR4nOzdeXiW933ney1IgITYBZKQBEhikQRmsfEWx+Al3u3EW2I7xnaWtpOmPV0mnfa0Z3r1dNLpdNJJp52mTZqeNHHsOE6cOHa8r/G+s9kgdgQIsa9iR9Jz/sBNYpcHs+jW79H9e73+Il6k95XLl9AHfZ/7yf/KX2fyAACAOBSEDgAAAHqPAQAAABExAAAAICIGAAAARMQAAACAiBgAAAAQEQMAAAAiYgAAAEBEDAAAAIiIAQAAABExAAAAICIGAAAARMQAAACAiBgAAAAQEQMAAAAiYgAAAEBEDAAAAIiIAQAAABExAAAAICIGAAAARMQAAACAiBgAAAAQEQMAAAAiYgAAAEBEDAAAAIiIAQAAABExAAAAICIGAAAARMQAAACAiBgAAAAQEQMAAAAiYgAAAEBEDAAAAIiIAQAAABExAAAAICIGAAAARMQAAACAiBgAAAAQEQMAAAAiYgAAAEBEDAAAAIiIAQAAABExAAAAICIGAAAARMQAAACAiBgAAAAQEQMAAAAiYgAAAEBEDAAAAIiIAQAAABExAAAAICIGAAAARMQAAACAiBgAAAAQEQMAAAAiYgAAAEBEDAAAAIiIAQAAABExAAAAICIGAAAARMQAAACAiBgAAAAQEQMAAAAiYgAAAEBEDAAAAIiIAQAAABExAAAAICIGAAAARMQAAACAiBgAAAAQEQMAAAAiYgAAAEBEDAAAAIiIAQAAABExAAAAICIGAAAARMQAAACAiBgAAAAQEQMAAAAiYgAAAEBEDAAAAIiIAQAAABExAAAAICIGAAAARMQAAACAiBgAAAAQEQMAAAAiYgAAAEBEDAAAAIiIAQAAABExAAAAICIGAAAARMQAAACAiBgAAAAQEQMAAAAiYgAAAEBEDAAAAIiIAQAAABExAAAAICIGAAAARMQAAACAiBgAAAAQEQMAAAAiYgAAAEBEDAAAAIiIAQAAABExAAAAICIGAAAARMQAAACAiBgAAAAQEQMAAAAiYgAAAEBEDAAAAIiIAQAAABExAAAAICIGAAAARMQAAACAiBgAAAAQEQMAAAAiYgAAAEBEDAAAAIiIAQAAABExAAAAICIGAAAARMQAAACAiBgAAAAQEQMAAAAiYgAAAEBEDAAAAIiIAQAAABExAAAAICIGAAAARMQAAACAiBgAAAAQEQMAAAAiYgAAAEBEDAAAAIiIAQAAABExAAAAICIGAAAARMQAAACAiBgAAAAQEQMAAAAiYgAAAEBEDAAAAIiIAQAAABExAAAAICIGAAAARMQAAACAiBgAAAAQEQMAAAAiYgAAAEBEDAAAAIiIAQAAABExAAAAICIGAAAARMQAAACAiBgAAAAQEQMAAAAiYgAAAEBEDAAAAIiIAQAAABExAAAAICIGAAAARMQAAACAiBgAAAAQEQMAAAAiYgAAAEBEDAAAAIiIAQAAABExAAAAICIGAAAARMQAAACAiBgAAAAQEQMAAAAiYgAAAEBEDAAAAIiIAQAAABExAAAAICIGAAAARMQAAACAiBgAAAAQEQMAAAAiYgAAAEBEDAAAAIiIAQAAABExAAAAICIGAAAARMQAAACAiBgAAAAQEQMAAAAiYgAAAEBEDAAAAIiIAQAAABExAAAAICIGAAAARMQAAACAiBgAAAAQEQMAAAAiYgAAAEBEDAAAAIiIAQAAABExAAAAICIGAAAARMQAAACAiBgAAAAQEQMAAAAiYgAAAEBEDAAAAIiIAQAAABExAAAAICIGAAAARMQAAACAiBgAAAAQEQMAAAAiYgAAAEBEDAAAAIiIAQAAABExAAAAICIGAAAARMQAAACAiBgAAAAQEQMAAAAiYgAAAEBEDAAAAIiIAQAAABExAAAAICIGAAAARMQAAACAiBgAAAAQEQMAAAAiYgAAAEBEDAAAAIiIAQAAABExAAAAICIGAAAARMQAAACAiBgAAAAQEQMAAAAiYgAAAEBEDAAAAIiIAQAAABExAAAAICIGAAAARMQAAACAiBgAAAAQEQMAAAAiYgAAAEBEDAAAAIiIAQAAABExAAAAICIGAAAARMQAAACAiBgAAAAQEQMAAAAiYgAAAEBEDAAAAIiIAQAAABExAAAAICIGAAAARMQAAACAiBgAAAAQEQMAAAAiYgAAAEBEDAAAAIiIAQAAABExAAAAICIGAAAARMQAAACAiBgAAAAQEQMAAAAiYgAAAEBEDAAAAIiIAQAAABExAAAAICIGAAAARMQAAACAiBgAAAAQEQMAAAAiYgAAAEBEDAAAAIiIAQAAABExAAAAICIGAAAARMQAAACAiBgAAAAQEQMAAAAiYgAAAEBEDAAAAIiIAQAAABExAAAAICIGAAAARMQAAACAiBgAAAAQEQMAAAAiYgAAAEBEDAAAAIiIAQAAABExAAAAICIGAAAARMQAAACA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RgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEM34z8wAABLlJREFUAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgQAAABGBAAAAEYEAAAARgLR8p2H0XaykQAAAABJRU5ErkJggg==`,
      private: private || false,
    };

    const createdGroup = await user.chat.group.create(title, group);

    return createdGroup.chatId;
  } catch (error) {
    console.error("Error creating group chat:", error.message);
    return { success: false, message: error.message };
  }
};

const joinGroupChat = async (req, res) => {
  try {
    const user = req.user;
    const chatId = req.chatId;
    const address = req.address;

    if (!chatId || !address) {
      return res
        .status(400)
        .json({ message: "Chat ID and user address are required" });
    }

    await user.chat.group.add(chatId, {
      role: "MEMBER",
      accounts: [address],
    });

    return {
      message: "User successfully joined the group",
    };
  } catch (error) {
    console.error("Error joining group chat:", error.message);

    return { message: "Internal Server Error", error: error.message };
  }
};

const leaveGroupChat = async (req, res) => {
  try {
    const user = req.user;
    const chatId = req.chatId;
    const address = req.address;

    if (!chatId || !address) {
      return res
        .status(400)
        .json({ message: "Chat ID and user address are required" });
    }

    const removeMemberFromGroup = await user.chat.group.remove(chatId, {
      role: "MEMBER",
      accounts: [address],
    });

    return {
      message: "User successfully left the group",
      group: removeMemberFromGroup,
    };
  } catch (error) {
    console.error("Error leaving group chat:", error.message);
    return { message: "Internal Server Error", error: error.message };
  }
};

module.exports = {
  leaveGroupChat,
  joinGroupChat,
  createGroupChat,
};
