"use client"

import type React from "react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, Plus } from "lucide-react"
import { useState } from "react"

interface Task {
  id: number
  title: string
  description: string
  completed: boolean
  createdAt: Date
}

export default function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTitle, setNewTitle] = useState<string>("")
  const [newDescription, setNewDescription] = useState<string>("")

  const addTask = (): void => {
    if (newTitle.trim() !== "") {
      const task: Task = {
        id: Date.now(),
        title: newTitle.trim(),
        description: newDescription.trim(),
        completed: false,
        createdAt: new Date(),
      }
      setTasks((prevTasks) => [...prevTasks, task])
      setNewTitle("")
      setNewDescription("")
    }
  }

  const toggleTaskCompletion = (id: number): void => {
    setTasks((prevTasks) => prevTasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const removeTask = (id: number): void => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      addTask()
    }
  }

  const completedCount: number = tasks.filter((task) => task.completed).length
  const totalCount: number = tasks.length

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-gray-800">Todo List</CardTitle>
            <div className="text-center text-sm text-gray-600">
              {completedCount} of {totalCount} tasks completed
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Add Task Section */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Task</h3>
              <div className="space-y-4">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Enter task title..."
                    value={newTitle}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTitle(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full h-12 pl-4 pr-4 text-base border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200 shadow-sm"
                  />
                </div>
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <Input
                      type="text"
                      placeholder="Add description (optional)..."
                      value={newDescription}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewDescription(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="w-full h-12 pl-4 pr-4 text-base border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200 shadow-sm"
                    />
                  </div>
                  <Button
                    onClick={addTask}
                    className="h-12 px-6 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                    disabled={!newTitle.trim()}
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Add Task
                  </Button>
                </div>
              </div>
            </div>

            {/* Tasks List */}
            <div className="space-y-2">
              {tasks.length === 0 ? (
                <div className="text-center py-8 text-gray-500">No tasks yet. Add one above!</div>
              ) : (
                tasks.map((task: Task) => (
                  <div
                    key={task.id}
                    className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 ${
                      task.completed ? "bg-gray-50 border-gray-200" : "bg-white border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <Checkbox
                      id={`task-${task.id}`}
                      checked={task.completed}
                      onCheckedChange={() => toggleTaskCompletion(task.id)}
                    />
                    <label
                      htmlFor={`task-${task.id}`}
                      className={`flex-1 cursor-pointer transition-all duration-200 ${
                        task.completed ? "text-gray-500 line-through" : "text-gray-800"
                      }`}
                    >
                      <div className="font-medium">{task.title}</div>
                      {task.description && (
                        <div className={`text-sm mt-1 ${task.completed ? "text-gray-400" : "text-gray-600"}`}>
                          {task.description}
                        </div>
                      )}
                    </label>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeTask(task.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      aria-label={`Remove task: ${task.title}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              )}
            </div>

            {/* Summary */}
            {tasks.length > 0 && (
              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Total: {totalCount} tasks</span>
                  <span>Remaining: {totalCount - completedCount} tasks</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
