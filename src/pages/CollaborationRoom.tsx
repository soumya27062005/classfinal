import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Users, MessageCircle, CheckCircle, Lightbulb, ThumbsUp, Send, Paperclip } from 'lucide-react';
import { Link } from 'react-router-dom';

const CollaborationRoom = () => {
  const [message, setMessage] = useState('');

  const groupMembers = [
    { id: 1, name: 'Alex', avatar: '👨‍🎓', status: 'online' },
    { id: 2, name: 'Sarah', avatar: '👩‍🎓', status: 'online' },
    { id: 3, name: 'Mike', avatar: '👨‍🎓', status: 'away' },
    { id: 4, name: 'Emma', avatar: '👩‍🎓', status: 'online' },
  ];

  const messages = [
    { id: 1, sender: 'Sarah', avatar: '👩‍🎓', text: 'Has anyone started the math assignment?', time: '10:30 AM', reactions: ['👍', '💡'] },
    { id: 2, sender: 'Alex', avatar: '👨‍🎓', text: 'Yes! Question 3 is tricky though', time: '10:32 AM', reactions: ['✅'] },
    { id: 3, sender: 'Emma', avatar: '👩‍🎓', text: 'I can help with that one', time: '10:33 AM', reactions: ['👍', '💬'] },
  ];

  const tasks = [
    { id: 1, title: 'Complete worksheet problems 1-10', completed: true },
    { id: 2, title: 'Review notes from Chapter 5', completed: true },
    { id: 3, title: 'Submit group presentation outline', completed: false },
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 animate-fade-up">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 rounded-full bg-gradient-primary">
                  <Users className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold">Math Study Group</h1>
                  <p className="text-muted-foreground">4 members • 3 tasks</p>
                </div>
              </div>
            </div>
            <Link to="/">
              <Button variant="outline">Leave Room</Button>
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Main Chat Area */}
          <Card className="md:col-span-2 p-6 flex flex-col h-[600px]">
            <div className="flex items-center justify-between mb-4 pb-4 border-b">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-primary" />
                <h2 className="font-semibold">Group Whispers</h2>
              </div>
              <Badge variant="secondary">Live</Badge>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              {messages.map((msg) => (
                <div key={msg.id} className="p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{msg.avatar}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-sm">{msg.sender}</span>
                        <span className="text-xs text-muted-foreground">{msg.time}</span>
                      </div>
                      <p className="text-sm mb-2">{msg.text}</p>
                      <div className="flex gap-2">
                        {msg.reactions.map((reaction, idx) => (
                          <button
                            key={idx}
                            className="text-sm hover:scale-125 transition-transform"
                          >
                            {reaction}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* AI Hint */}
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                <div className="flex items-start gap-3">
                  <Lightbulb className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="text-sm font-medium text-primary mb-1">Group Hint from Teacher</p>
                    <p className="text-sm text-muted-foreground">
                      For problem 3, try breaking it into smaller steps first
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Input Area */}
            <div className="flex items-center gap-2 pt-4 border-t">
              <Button variant="ghost" size="icon">
                <Paperclip className="h-5 w-5" />
              </Button>
              <Input
                placeholder="Type your whisper..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1"
              />
              <div className="flex gap-1">
                <Button variant="ghost" size="sm" className="text-lg">✅</Button>
                <Button variant="ghost" size="sm" className="text-lg">👍</Button>
                <Button variant="ghost" size="sm" className="text-lg">💡</Button>
                <Button variant="ghost" size="sm" className="text-lg">💬</Button>
              </div>
              <Button>
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </Card>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Members */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Users className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Members</h3>
              </div>
              <div className="space-y-3">
                {groupMembers.map((member) => (
                  <div key={member.id} className="flex items-center gap-3">
                    <div className="relative">
                      <span className="text-2xl">{member.avatar}</span>
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${
                        member.status === 'online' ? 'bg-green-500' : 'bg-yellow-500'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{member.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">{member.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Tasks */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Group Tasks</h3>
              </div>
              <div className="space-y-3">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`p-3 rounded-lg border ${
                      task.completed ? 'bg-primary/5 border-primary/20' : 'bg-muted/30 border-muted'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <div className={`mt-0.5 w-4 h-4 rounded border-2 flex items-center justify-center ${
                        task.completed ? 'bg-primary border-primary' : 'border-muted-foreground'
                      }`}>
                        {task.completed && <CheckCircle className="h-3 w-3 text-primary-foreground" />}
                      </div>
                      <p className={`text-sm flex-1 ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                        {task.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Progress */}
              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Group Progress</span>
                  <span className="font-medium">67%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-gradient-primary h-2 rounded-full transition-all" style={{ width: '67%' }} />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollaborationRoom;
