import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, Medal, Award, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Leaderboard = () => {
  const [timeFilter, setTimeFilter] = useState<'week' | 'month' | 'all'>('week');

  const classLeaders = [
    { rank: 1, name: 'Alex Chen', points: 2450, level: 5, title: 'Whisper Leader', avatar: '👨‍🎓' },
    { rank: 2, name: 'Sarah Johnson', points: 2180, level: 5, title: 'Focus Achiever', avatar: '👩‍🎓' },
    { rank: 3, name: 'Mike Williams', points: 1920, level: 4, title: 'Silent Scholar', avatar: '👨‍🎓' },
    { rank: 4, name: 'Emma Davis', points: 1750, level: 4, title: 'Calm Communicator', avatar: '👩‍🎓' },
    { rank: 5, name: 'James Brown', points: 1580, level: 4, title: 'Team Player', avatar: '👨‍🎓' },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Medal className="h-6 w-6 text-amber-700" />;
      default:
        return <Award className="h-6 w-6 text-primary" />;
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 text-center animate-fade-up">
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-full bg-gradient-primary">
              <Trophy className="h-12 w-12 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-2">Leaderboard</h1>
          <p className="text-muted-foreground">Celebrating our silent achievers</p>
        </div>

        {/* Time Filter */}
        <div className="flex justify-center gap-2 mb-6">
          {['week', 'month', 'all'].map((filter) => (
            <Button
              key={filter}
              variant={timeFilter === filter ? 'default' : 'outline'}
              onClick={() => setTimeFilter(filter as any)}
              className="capitalize"
            >
              {filter === 'all' ? 'All Time' : `This ${filter}`}
            </Button>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="class" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="class">Class</TabsTrigger>
            <TabsTrigger value="school">School</TabsTrigger>
            <TabsTrigger value="global">Global</TabsTrigger>
          </TabsList>

          <TabsContent value="class" className="space-y-4">
            {/* Top 3 Podium */}
            <Card className="p-6 bg-gradient-subtle">
              <div className="flex justify-center items-end gap-4 mb-8">
                {/* 2nd Place */}
                <div className="flex flex-col items-center">
                  <div className="text-4xl mb-2">{classLeaders[1].avatar}</div>
                  <Medal className="h-8 w-8 text-gray-400 mb-2" />
                  <p className="font-semibold text-sm text-center">{classLeaders[1].name}</p>
                  <Badge variant="secondary" className="mt-1">{classLeaders[1].points} WP</Badge>
                  <div className="w-24 h-20 bg-gradient-secondary rounded-t-lg mt-2 flex items-center justify-center">
                    <span className="text-2xl font-bold text-secondary-foreground">2</span>
                  </div>
                </div>

                {/* 1st Place */}
                <div className="flex flex-col items-center -mt-4">
                  <div className="text-5xl mb-2">{classLeaders[0].avatar}</div>
                  <Trophy className="h-10 w-10 text-yellow-500 mb-2 animate-pulse-glow" />
                  <p className="font-bold text-center">{classLeaders[0].name}</p>
                  <Badge className="mt-1">{classLeaders[0].points} WP</Badge>
                  <div className="w-24 h-28 bg-gradient-primary rounded-t-lg mt-2 flex items-center justify-center">
                    <span className="text-3xl font-bold text-primary-foreground">1</span>
                  </div>
                </div>

                {/* 3rd Place */}
                <div className="flex flex-col items-center">
                  <div className="text-4xl mb-2">{classLeaders[2].avatar}</div>
                  <Medal className="h-8 w-8 text-amber-700 mb-2" />
                  <p className="font-semibold text-sm text-center">{classLeaders[2].name}</p>
                  <Badge variant="secondary" className="mt-1">{classLeaders[2].points} WP</Badge>
                  <div className="w-24 h-16 bg-gradient-accent rounded-t-lg mt-2 flex items-center justify-center">
                    <span className="text-2xl font-bold text-accent-foreground">3</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Rest of Rankings */}
            <Card className="p-6">
              <div className="space-y-3">
                {classLeaders.slice(3).map((leader) => (
                  <div
                    key={leader.rank}
                    className="flex items-center gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <span className="text-2xl font-bold text-muted-foreground w-8">{leader.rank}</span>
                      <span className="text-3xl">{leader.avatar}</span>
                      <div className="flex-1">
                        <p className="font-semibold">{leader.name}</p>
                        <p className="text-sm text-muted-foreground">{leader.title}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">{leader.points}</p>
                      <p className="text-xs text-muted-foreground">Whisper Points</p>
                    </div>
                    <Badge variant="outline">Level {leader.level}</Badge>
                  </div>
                ))}
              </div>
            </Card>

            {/* Your Rank */}
            <Card className="p-6 border-2 border-primary bg-gradient-subtle">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <TrendingUp className="h-6 w-6 text-primary" />
                  <div>
                    <p className="font-semibold">Your Rank: #12</p>
                    <p className="text-sm text-muted-foreground">Keep going!</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">1250 WP</p>
                  <p className="text-xs text-muted-foreground">+180 this week</p>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="school">
            <Card className="p-12 text-center">
              <Trophy className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">School leaderboard coming soon</p>
            </Card>
          </TabsContent>

          <TabsContent value="global">
            <Card className="p-12 text-center">
              <Trophy className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">Global leaderboard coming soon</p>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <Link to="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
