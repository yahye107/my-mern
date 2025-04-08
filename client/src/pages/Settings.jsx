import Header from "@/components/logcommonlayout/Header";
import React from "react";
import { motion } from "framer-motion";
import { Lock, Mail, User, Bell, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Settings = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Account Settings" />

      <main className="max-w-3xl mx-auto px-4 py-8">
        {/* Account Settings Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <User className="h-6 w-6 text-blue-600" />
            <h2 className="text-xl font-semibold">Account Information</h2>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-gray-600">
                Email Address
              </Label>
              <div className="flex gap-4">
                <Input
                  id="email"
                  type="email"
                  defaultValue="user@example.com"
                  className="bg-gray-50 border-gray-200"
                />
                <Button
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  Change Email
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="username" className="text-gray-600">
                Username
              </Label>
              <div className="flex gap-4">
                <Input
                  id="username"
                  defaultValue="john_doe"
                  className="bg-gray-50 border-gray-200"
                />
                <Button
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  Update
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Security Settings Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <Lock className="h-6 w-6 text-green-600" />
            <h2 className="text-xl font-semibold">Security</h2>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="current-password" className="text-gray-600">
                Current Password
              </Label>
              <Input
                id="current-password"
                type="password"
                placeholder="Enter current password"
                className="bg-gray-50 border-gray-200"
              />
            </div>

            <div>
              <Label htmlFor="new-password" className="text-gray-600">
                New Password
              </Label>
              <Input
                id="new-password"
                type="password"
                placeholder="Enter new password"
                className="bg-gray-50 border-gray-200"
              />
            </div>

            <div>
              <Label htmlFor="confirm-password" className="text-gray-600">
                Confirm New Password
              </Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="Confirm new password"
                className="bg-gray-50 border-gray-200"
              />
            </div>

            <Button className="bg-green-600 hover:bg-green-700 text-white">
              Change Password
            </Button>
          </div>
        </motion.div>

        {/* Preferences Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <Palette className="h-6 w-6 text-purple-600" />
            <h2 className="text-xl font-semibold">Preferences</h2>
          </div>

          <div className="space-y-4">
            <div>
              <Label className="text-gray-600">Theme</Label>
              <Select defaultValue="system">
                <SelectTrigger className="bg-gray-50 border-gray-200">
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System Default</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-gray-600">Notifications</Label>
              <div className="flex items-center space-x-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="email-notifications"
                    defaultChecked
                    className="h-4 w-4 text-blue-600 rounded border-gray-300"
                  />
                  <Label htmlFor="email-notifications" className="font-normal">
                    Email
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="sms-notifications"
                    className="h-4 w-4 text-blue-600 rounded border-gray-300"
                  />
                  <Label htmlFor="sms-notifications" className="font-normal">
                    SMS
                  </Label>
                </div>
              </div>
            </div>

            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              Save Preferences
            </Button>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Settings;
