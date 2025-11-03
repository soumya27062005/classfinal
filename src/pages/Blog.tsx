import { Search, Calendar, User, ArrowRight, TrendingUp, Lightbulb, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const Blog = () => {
  const featuredPost = {
    title: "The Science Behind Silent Learning: Why Less Noise Means More Focus",
    excerpt: "Recent studies show that reducing classroom noise improves concentration by up to 40%. Discover how silent communication is revolutionizing education.",
    author: "Dr. Priya Sharma",
    date: "March 15, 2025",
    category: "Research",
    readTime: "8 min read",
    image: "📚"
  };

  const posts = [
    {
      title: "5 Ways Class Whisper Improves Student Confidence",
      excerpt: "Shy students flourish when they don't have to speak up publicly. Learn how silent messaging empowers every learner.",
      author: "Rajesh Kumar",
      date: "March 12, 2025",
      category: "Best Practices",
      readTime: "5 min read",
      image: "💪"
    },
    {
      title: "Parent-Teacher Communication in the Digital Age",
      excerpt: "How real-time updates are strengthening the home-school connection and improving student outcomes.",
      author: "Meera Patel",
      date: "March 10, 2025",
      category: "Insights",
      readTime: "6 min read",
      image: "👨‍👩‍👧"
    },
    {
      title: "Implementing Class Whisper: A Step-by-Step Guide",
      excerpt: "From setup to launch, here's everything schools need to know about adopting silent communication technology.",
      author: "Admin Team",
      date: "March 8, 2025",
      category: "Guides",
      readTime: "10 min read",
      image: "🚀"
    },
    {
      title: "The Role of Technology in Modern Classroom Management",
      excerpt: "Exploring how edtech tools like Class Whisper are helping teachers maintain discipline without authoritarian approaches.",
      author: "Dr. Amit Verma",
      date: "March 5, 2025",
      category: "Education Tech",
      readTime: "7 min read",
      image: "🎓"
    },
    {
      title: "Mood Tracking: Understanding Student Emotional Wellbeing",
      excerpt: "Why tracking student emotions matters and how it helps create supportive learning environments.",
      author: "Sneha Desai",
      date: "March 3, 2025",
      category: "Mental Health",
      readTime: "6 min read",
      image: "❤️"
    },
    {
      title: "Case Study: How XYZ School Reduced Disruptions by 80%",
      excerpt: "A detailed look at one school's transformation journey with Class Whisper over one academic year.",
      author: "Success Stories Team",
      date: "March 1, 2025",
      category: "Case Studies",
      readTime: "9 min read",
      image: "📊"
    }
  ];

  const categories = ["All", "Research", "Best Practices", "Insights", "Guides", "Education Tech", "Mental Health", "Case Studies"];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <BookOpen className="h-16 w-16 mx-auto mb-6 animate-pulse-glow" />
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-up">
            Class Whisper Insights
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90 animate-fade-up" style={{ animationDelay: "100ms" }}>
            Explore articles on education technology, classroom management, and silent learning
          </p>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Search articles..."
                className="pl-12 h-14 text-lg rounded-2xl shadow-card"
              />
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category, index) => (
                <Badge 
                  key={index}
                  variant={index === 0 ? "default" : "outline"}
                  className="px-4 py-2 text-sm cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-card rounded-3xl overflow-hidden shadow-glow hover:shadow-glow transition-shadow animate-scale-in">
              <div className="grid md:grid-cols-2">
                <div className="bg-gradient-primary flex items-center justify-center text-[200px] p-12">
                  {featuredPost.image}
                </div>
                <div className="p-12">
                  <Badge className="mb-4">{featuredPost.category}</Badge>
                  <h2 className="text-3xl font-bold mb-4">{featuredPost.title}</h2>
                  <p className="text-muted-foreground text-lg mb-6">{featuredPost.excerpt}</p>
                  <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {featuredPost.author}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {featuredPost.date}
                    </div>
                    <div>{featuredPost.readTime}</div>
                  </div>
                  <Button className="bg-gradient-primary shadow-glow">
                    Read Article
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-4xl font-bold">Latest Articles</h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="h-4 w-4" />
                <span>Trending Topics</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <div 
                  key={index}
                  className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-glow transition-all duration-300 hover:-translate-y-2 cursor-pointer animate-fade-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-8xl p-8">
                    {post.image}
                  </div>
                  <div className="p-6">
                    <Badge variant="outline" className="mb-3">{post.category}</Badge>
                    <h3 className="text-xl font-bold mb-3 line-clamp-2">{post.title}</h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {post.date}
                      </div>
                    </div>
                    <Button variant="ghost" className="w-full justify-between">
                      Read More
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More Articles
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-gradient-hero text-primary-foreground rounded-3xl p-12 text-center shadow-glow">
            <Lightbulb className="h-12 w-12 mx-auto mb-6 animate-pulse-glow" />
            <h2 className="text-4xl font-bold mb-4">Stay Updated</h2>
            <p className="text-xl opacity-90 mb-8">
              Get the latest insights on education technology delivered to your inbox
            </p>
            <div className="flex gap-4 max-w-md mx-auto">
              <Input 
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
              <Button variant="secondary" className="shrink-0">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
