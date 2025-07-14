import { Smartphone, Zap, Shield, Users, Heart, Cpu } from 'lucide-react';
import { Card, CardContent } from './ui/card';

export function FeaturesSection() {
  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized performance that loads in milliseconds',
      color: 'text-yellow-500'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'End-to-end encryption keeps your data safe',
      color: 'text-green-500'
    },
    {
      icon: Smartphone,
      title: 'Mobile First',
      description: 'Designed specifically for mobile devices',
      color: 'text-blue-500'
    },
    {
      icon: Users,
      title: 'Social Ready',
      description: 'Connect and share with friends instantly',
      color: 'text-purple-500'
    },
    {
      icon: Heart,
      title: 'User Loved',
      description: 'Rated 5 stars by millions of users',
      color: 'text-red-500'
    },
    {
      icon: Cpu,
      title: 'AI Powered',
      description: 'Smart features that learn and adapt',
      color: 'text-cyan-500'
    }
  ];

  return (
    <section id="services" className="py-16 sm:py-24">
      <div className="container px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl">
            Why Choose Our App?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover the features that make our mobile app stand out from the crowd
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 bg-card/50">
              <CardContent className="p-6 text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-muted group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
