import { TrendingUp, Users, Globe, Award } from 'lucide-react';

export function StatsSection() {
  const stats = [
    {
      icon: Users,
      value: '10M+',
      label: 'Active Users',
      description: 'Worldwide community'
    },
    {
      icon: TrendingUp,
      value: '99.9%',
      label: 'Uptime',
      description: 'Reliable service'
    },
    {
      icon: Globe,
      value: '150+',
      label: 'Countries',
      description: 'Global reach'
    },
    {
      icon: Award,
      value: '4.9/5',
      label: 'App Rating',
      description: 'User satisfaction'
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-medium">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
                <div className="text-xs text-muted-foreground/80 hidden sm:block">
                  {stat.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
