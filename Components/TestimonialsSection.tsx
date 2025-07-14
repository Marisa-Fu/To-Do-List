import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Digital Marketing Manager',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1c6?w=150&h=150&fit=crop&crop=face',
      content: 'This app has completely transformed how I manage my daily tasks. The interface is so intuitive!',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Software Developer',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      content: 'Amazing performance and clean design. Exactly what I was looking for in a mobile app.',
      rating: 5
    },
    {
      name: 'Emily Davis',
      role: 'Product Designer',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      content: 'The user experience is outstanding. I recommend this app to all my colleagues.',
      rating: 5
    }
  ];

  return (
    <section id="about" className="py-16 sm:py-24">
      <div className="container px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl">
            What Our Users Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join millions of satisfied users who love our mobile experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="relative border-0 bg-card/50">
              <CardContent className="p-6 space-y-4">
                <Quote className="w-8 h-8 text-muted-foreground/30" />
                
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center space-x-3">
                  <Avatar className="w-10 h-10">
                    <ImageWithFallback
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                    <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm">{testimonial.name}</div>
                    <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
