"use client";

import { useState, useEffect } from "react";
import { Switch } from "@/app/settings/settings/notification/switch";   

// Lấy dữ liệu từ localStorage hoặc sử dụng dữ liệu mặc định
const loadSettings = () => {
  const savedSettings = localStorage.getItem("notificationSettings");
  return savedSettings ? JSON.parse(savedSettings) : [
    {
      category: "General",
      options: [
        { name: "Community notifications", enabled: false },
        { name: "Web push notifications", enabled: false },
      ],
    },
    {
      category: "Messages",
      options: [
        { name: "Private messages", enabled: true },
        { name: "Chat messages", enabled: true },
        { name: "Chat requests", enabled: true },
      ],
    },
    {
      category: "Activity",
      options: [
        { name: "Mentions of u/username", enabled: true },
        { name: "Comments on your posts", enabled: true },
        { name: "Replies to your comments", enabled: true },
        { name: "Upvotes on your posts", enabled: true },
        { name: "Upvotes on your comments", enabled: true },
      ],
    },
  ];
};

export default function NotificationPage() {
  const [settings, setSettings] = useState(loadSettings);

  // Lưu cài đặt vào localStorage mỗi khi có thay đổi
  useEffect(() => {
    localStorage.setItem("notificationSettings", JSON.stringify(settings));
  }, [settings]);

  // Hàm để bật/tắt switch
  const toggleSwitch = (categoryIndex: number, optionIndex: number, checked: boolean) => {
    setSettings((prev) => {
      const updated = [...prev];
      updated[categoryIndex].options[optionIndex].enabled = checked;
      return updated;
    });
  };

  return (
    <div className="px-10">
      <h1 className="text-2xl font-bold mb-6">Notification Settings</h1>
      {settings.map((section, categoryIndex) => (
        <div key={section.category} className="mb-6">
          <h2 className="text-lg font-bold mb-2">{section.category}</h2>
          <div className="space-y-4">
            {section.options.map((option, optionIndex) => (
              <div
                key={option.name}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <span className="text-gray-700">{option.name}</span>
                <Switch
                  checked={option.enabled}
                  onCheckedChange={(checked) =>
                    toggleSwitch(categoryIndex, optionIndex, checked)
                  }
                />
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="mt-6">
        <button className="px-4 py-2 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors">
          Save Changes
        </button>
      </div>
    </div>
  );
}