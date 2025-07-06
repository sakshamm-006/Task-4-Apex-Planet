"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Plus, Check, Edit, Trash2, StickyNote, CheckSquare } from "lucide-react"

interface Todo {
  id: string
  text: string
  completed: boolean
  createdAt: string
  priority: "low" | "medium" | "high"
}

interface Note {
  id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [notes, setNotes] = useState<Note[]>([])
  const [newTodo, setNewTodo] = useState("")
  const [newNote, setNewNote] = useState({ title: "", content: "" })
  const [editingNote, setEditingNote] = useState<string | null>(null)
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all")
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium")

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedTodos = localStorage.getItem("portfolio-todos")
    const savedNotes = localStorage.getItem("portfolio-notes")

    if (savedTodos) {
      setTodos(JSON.parse(savedTodos))
    }
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes))
    }
  }, [])

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem("portfolio-todos", JSON.stringify(todos))
  }, [todos])

  // Save notes to localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem("portfolio-notes", JSON.stringify(notes))
  }, [notes])

  const addTodo = () => {
    if (newTodo.trim()) {
      const todo: Todo = {
        id: Date.now().toString(),
        text: newTodo.trim(),
        completed: false,
        createdAt: new Date().toISOString(),
        priority,
      }
      setTodos([todo, ...todos])
      setNewTodo("")
    }
  }

  const toggleTodo = (id: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const addNote = () => {
    if (newNote.title.trim() && newNote.content.trim()) {
      const note: Note = {
        id: Date.now().toString(),
        title: newNote.title.trim(),
        content: newNote.content.trim(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      setNotes([note, ...notes])
      setNewNote({ title: "", content: "" })
    }
  }

  const updateNote = (id: string, title: string, content: string) => {
    setNotes(
      notes.map((note) => (note.id === id ? { ...note, title, content, updatedAt: new Date().toISOString() } : note)),
    )
    setEditingNote(null)
  }

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id))
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed
    if (filter === "completed") return todo.completed
    return true
  })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-bold text-xl text-slate-800">Portfolio</div>
            <div className="hidden md:flex space-x-8">
              <Link href="/" className="text-slate-600 hover:text-slate-900 transition-colors">
                Home
              </Link>
              <Link href="/about" className="text-slate-600 hover:text-slate-900 transition-colors">
                About
              </Link>
              <Link href="/todo-app" className="text-slate-900 font-medium">
                To-Do App
              </Link>
              <Link href="/products" className="text-slate-600 hover:text-slate-900 transition-colors">
                Products
              </Link>
              <Link href="/contact" className="text-slate-600 hover:text-slate-900 transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Button variant="ghost" asChild className="mb-8">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Smart To-Do & Notes App</h1>
          <p className="text-slate-600">
            A feature-rich productivity app with local storage persistence. Your data is automatically saved and
            restored between sessions.
          </p>
        </div>

        <Tabs defaultValue="todos" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="todos" className="flex items-center gap-2">
              <CheckSquare className="h-4 w-4" />
              To-Do List
            </TabsTrigger>
            <TabsTrigger value="notes" className="flex items-center gap-2">
              <StickyNote className="h-4 w-4" />
              Notes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="todos" className="space-y-6">
            {/* Add Todo */}
            <Card>
              <CardHeader>
                <CardTitle>Add New Task</CardTitle>
                <CardDescription>Create a new task with priority level</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter a new task..."
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addTodo()}
                    className="flex-1"
                  />
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as "low" | "medium" | "high")}
                    className="px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                  <Button onClick={addTodo}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Filter Todos */}
            <div className="flex gap-2 justify-center">
              <Button variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")} size="sm">
                All ({todos.length})
              </Button>
              <Button
                variant={filter === "active" ? "default" : "outline"}
                onClick={() => setFilter("active")}
                size="sm"
              >
                Active ({todos.filter((t) => !t.completed).length})
              </Button>
              <Button
                variant={filter === "completed" ? "default" : "outline"}
                onClick={() => setFilter("completed")}
                size="sm"
              >
                Completed ({todos.filter((t) => t.completed).length})
              </Button>
            </div>

            {/* Todo List */}
            <div className="space-y-3">
              {filteredTodos.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-8">
                    <p className="text-slate-500">No tasks found. Add one above!</p>
                  </CardContent>
                </Card>
              ) : (
                filteredTodos.map((todo) => (
                  <Card key={todo.id} className={`transition-all ${todo.completed ? "opacity-60" : ""}`}>
                    <CardContent className="flex items-center gap-3 p-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleTodo(todo.id)}
                        className={`p-1 ${todo.completed ? "text-green-600" : "text-gray-400"}`}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <div className="flex-1">
                        <p className={`${todo.completed ? "line-through text-slate-500" : "text-slate-900"}`}>
                          {todo.text}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={getPriorityColor(todo.priority)} variant="secondary">
                            {todo.priority}
                          </Badge>
                          <span className="text-xs text-slate-400">
                            {new Date(todo.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteTodo(todo.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="notes" className="space-y-6">
            {/* Add Note */}
            <Card>
              <CardHeader>
                <CardTitle>Create New Note</CardTitle>
                <CardDescription>Add a new note with title and content</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Note title..."
                  value={newNote.title}
                  onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                />
                <Textarea
                  placeholder="Note content..."
                  value={newNote.content}
                  onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                  rows={4}
                />
                <Button onClick={addNote} className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Note
                </Button>
              </CardContent>
            </Card>

            {/* Notes List */}
            <div className="grid gap-4 md:grid-cols-2">
              {notes.length === 0 ? (
                <Card className="md:col-span-2">
                  <CardContent className="text-center py-8">
                    <p className="text-slate-500">No notes yet. Create one above!</p>
                  </CardContent>
                </Card>
              ) : (
                notes.map((note) => (
                  <Card key={note.id}>
                    <CardHeader className="pb-3">
                      {editingNote === note.id ? (
                        <Input
                          defaultValue={note.title}
                          onBlur={(e) => updateNote(note.id, e.target.value, note.content)}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              updateNote(note.id, e.currentTarget.value, note.content)
                            }
                          }}
                          autoFocus
                        />
                      ) : (
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{note.title}</CardTitle>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm" onClick={() => setEditingNote(note.id)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteNote(note.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </CardHeader>
                    <CardContent>
                      {editingNote === note.id ? (
                        <Textarea
                          defaultValue={note.content}
                          onBlur={(e) => updateNote(note.id, note.title, e.target.value)}
                          rows={4}
                        />
                      ) : (
                        <p className="text-slate-600 whitespace-pre-wrap">{note.content}</p>
                      )}
                      <div className="mt-3 text-xs text-slate-400">
                        Created: {new Date(note.createdAt).toLocaleDateString()}
                        {note.updatedAt !== note.createdAt && (
                          <span className="ml-2">• Updated: {new Date(note.updatedAt).toLocaleDateString()}</span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Features Info */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>App Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">To-Do Features:</h4>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Add tasks with priority levels</li>
                  <li>• Mark tasks as complete/incomplete</li>
                  <li>• Filter by status (all, active, completed)</li>
                  <li>• Delete unwanted tasks</li>
                  <li>• Automatic local storage persistence</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Notes Features:</h4>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Create notes with titles and content</li>
                  <li>• Edit notes inline</li>
                  <li>• Track creation and update dates</li>
                  <li>• Delete notes when no longer needed</li>
                  <li>• Responsive grid layout</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
