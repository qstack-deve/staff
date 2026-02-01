"use client";

import Link from "next/link";
import {
  ArrowRight,
  Code2,
  Database,
  Globe,
  Rocket,
  Shield,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

export default function Home() {
  const { user } = useAuth();
  console.log(user);
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Code2 className="h-5 w-5" />
            </div>
            <span>Quantum Stack</span>
          </div>
          <nav className="hidden gap-6 md:flex">
            <Link
              href="#services"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Services
            </Link>
            <Link
              href="#portfolio"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Portfolio
            </Link>
            <Link
              href="#about"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              About
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/auth/signin">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </Link>
            <Link href="#contact">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative flex min-h-[90vh] flex-col items-center justify-center px-4 pt-20 text-center">
          <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
            <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 space-y-6 max-w-4xl">
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
              Building the Future with{" "}
              <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
                Quantum Speed
              </span>
            </h1>
            <p className="mx-auto max-w-[700px] text-lg text-muted-foreground sm:text-xl">
              We specialize in Web, AI, and Cloud technologies. Transforming
              your ideas into powerful, scalable digital solutions.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="#contact">
                <Button size="lg" className="h-12 px-8 text-base">
                  Start Your Project
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 px-8 text-base"
                >
                  Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 bg-muted/30">
          <div className="container px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Our Expertise
              </h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                Comprehensive technical solutions tailored to your business
                needs.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <ServiceCard
                icon={<Globe className="h-10 w-10 text-primary" />}
                title="Web Development"
                description="Modern, responsive, and high-performance web applications using the latest frameworks."
              />
              <ServiceCard
                icon={<Zap className="h-10 w-10 text-primary" />}
                title="AI & Automation"
                description="Intelligent agents and automation workflows to streamline your operations."
              />
              <ServiceCard
                icon={<Shield className="h-10 w-10 text-primary" />}
                title="Enterprise Security"
                description="Robust security measures to protect your data and infrastructure."
              />
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="py-20">
          <div className="container px-4">
            <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  Selected Work
                </h2>
                <p className="mt-4 text-muted-foreground w-full max-w-xl">
                  A showcase of our recent projects and technical achievements.
                </p>
              </div>
              <Link href="/portfolio">
                <Button variant="ghost" className="group">
                  View All Projects{" "}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <PortfolioCard
                title="FinTech Dashboard"
                category="Web Application"
                image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
              />
              <PortfolioCard
                title="AI Content Generator"
                category="Artificial Intelligence"
                image="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80"
              />
              <PortfolioCard
                title="E-Commerce Platform"
                category="Full Stack"
                image="https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?w=800&q=80"
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 border-t bg-muted/50">
          <div className="container px-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join the future of technology with Quantum Stack. Let's build
              something extraordinary together.
            </p>
            <Button size="lg" className="h-14 px-8 text-lg">
              Contact Us Today
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t py-12 bg-background">
        <div className="container px-4 grid gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-bold text-xl">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Code2 className="h-5 w-5" />
              </div>
              <span>Quantum Stack</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Innovating at the speed of light.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-primary">
                  Web Development
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Mobile Apps
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Cloud Solutions
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="container px-4 mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Quantum Stack Technologies LTD. All
          rights reserved.
        </div>
      </footer>
    </div>
  );
}

function ServiceCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center text-center p-6 rounded-2xl border bg-card hover:shadow-lg transition-all hover:-translate-y-1">
      <div className="mb-4 p-3 rounded-full bg-primary/10">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

function PortfolioCard({
  title,
  category,
  image,
}: {
  title: string;
  category: string;
  image: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-xl border bg-card">
      <div className="aspect-video overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <p className="text-sm font-medium text-primary mb-2">{category}</p>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
    </div>
  );
}
