import React, { useState } from 'react';
import { Card, CardContent } from './components/ui/card';
import { Input } from './components/ui/input';
import { Button } from './components/ui/button';
import { motion } from 'framer-motion';

export default function MateraTripPlanner() {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([
    { role: 'bot', content: 'Hi there! Looking for something special in Matera? Ask me anything or explore experiences below.' }
  ]);

  const handleSend = () => {
    if (!query.trim()) return;
    setMessages([...messages, { role: 'user', content: query }, { role: 'bot', content: \`That's a great question! Here's what I found for: "\${query}" (Live integration coming soon...)\` }]);
    setQuery('');
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-3xl font-bold mb-4">🌍 Matera Trip Planner</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {[
          {
            title: 'Sassi di Matera Walking Tour',
            description: 'Explore UNESCO-listed cave dwellings with a guide.',
            url: 'https://www.getyourguide.com/matera-l1060/?utm_source=chatgpt.com'
          },
          {
            title: 'Pasta Cooking Class',
            description: 'Make traditional pasta in a cave cellar kitchen.',
            url: 'https://www.getyourguide.com/matera-l1060/?utm_source=chatgpt.com'
          },
          {
            title: 'Eco-Bus Open Tour',
            description: 'See the city from a panoramic open-top bus.',
            url: 'https://www.getyourguide.com/matera-l1060/?utm_source=chatgpt.com'
          },
          {
            title: 'Murgia Park Tour',
            description: 'Walk the wild side with ancient cave churches.',
            url: 'https://www.getyourguide.com/matera-l1060/?utm_source=chatgpt.com'
          },
          {
            title: 'Mozzarella Tasting',
            description: 'Meet a cheesemaker and sample fresh cheeses.',
            url: 'https://www.getyourguide.com/matera-l1060/?utm_source=chatgpt.com'
          }
        ].map((exp, index) => (
          <Card key={index} className="hover:shadow-xl transition-shadow cursor-pointer">
            <a href={exp.url} target="_blank" rel="noopener noreferrer">
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold mb-2">{exp.title}</h2>
                <p>{exp.description}</p>
              </CardContent>
            </a>
          </Card>
        ))}
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-2">💬 Chat with Your GuideBot</h2>
        <div className="bg-gray-100 p-4 rounded-lg max-w-2xl">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              className={\`mb-2 p-2 rounded-lg \${msg.role === 'bot' ? 'bg-white' : 'bg-blue-100 text-right'}\`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <p><strong>{msg.role === 'bot' ? 'GuideBot' : 'You'}:</strong> {msg.content}</p>
            </motion.div>
          ))}
          <div className="flex items-center gap-2 mt-4">
            <Input
              placeholder="Ask about Matera..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <Button onClick={handleSend}>Send</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
