
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: {
				DEFAULT: '1rem',
				sm: '1.5rem',
				md: '2rem',
			},
			screens: {
				sm: '640px',
				md: '768px',
				lg: '1024px',
				xl: '1280px',
				'2xl': '1400px'
			}
		},
		extend: {
			screens: {
				xs: '480px',
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				finance: {
					primary: '#F97316', // Orange for both modes
					secondary: '#FB923C', // Light orange for secondary elements
					accent: '#10B981', // Keeping green for positive growth indicators
					danger: '#EF4444', // Keeping red for negative indicators
					neutral: '#64748B', // Neutral color
					light: '#FFF7ED', // Light orange background for light mode
					dark: '#1A0B06', // Dark orange background for dark mode
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'slide-in': {
					'0%': { transform: 'translateY(10px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'pulse-light': {
					'0%': { boxShadow: '0 0 0 0 rgba(249, 115, 22, 0.2)' }, // Orange theme
					'70%': { boxShadow: '0 0 0 10px rgba(249, 115, 22, 0)' }, // Orange theme
					'100%': { boxShadow: '0 0 0 0 rgba(249, 115, 22, 0)' }, // Orange theme
				},
				'shine': {
					'to': { backgroundPosition: '200% center' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'slide-in': 'slide-in 0.3s ease-out',
				'pulse-light': 'pulse-light 2s infinite',
				'shine': 'shine 3s linear infinite'
			},
			backgroundImage: {
				'gradient-premium': 'linear-gradient(135deg, #0A1929 0%, #1A365D 100%)', // Dark mode
				'gradient-premium-light': 'linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 100%)', // Light mode with orange tint
				'gradient-orange': 'linear-gradient(90deg, #F97316 0%, #FB923C 100%)', // Orange gradient
				'gradient-card': 'linear-gradient(135deg, #1a1a1a 0%, #262626 100%)',
				'gradient-card-light': 'linear-gradient(135deg, #FFFFFF 0%, #FFF7ED 100%)', // Light mode with subtle orange
			},
			spacing: {
				'18': '4.5rem',
				'22': '5.5rem',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
