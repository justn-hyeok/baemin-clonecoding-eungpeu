# Baemin Clone Coding - Eungpeu

## Tech Stack
- Expo + React Native
- TypeScript
- Emotion Native (@emotion/native)
- Supabase (later)
- expo-router (file-based routing)

## Style Guide
- Primary: #2AC1BC (mint)
- Background: #FFFFFF
- Text: #000000, #666666
- Divider: #F0F0F0
- Icons: @expo/vector-icons (Ionicons)

## App Structure
app/
├── _layout.tsx
├── index.tsx (home)
├── splash.tsx
├── cart.tsx (cart + order)
├── stores/index.tsx (store list)
├── store/[id]/index.tsx (menu list)
├── store/[id]/info.tsx (store info)
├── store/[id]/reviews.tsx (reviews + replies)
├── store/[id]/menu/[menuId].tsx (menu detail, allergy highlight)
├── mypage/index.tsx (my baemin)
├── mypage/support/index.tsx (customer support)
└── mypage/support/chatbot.tsx (AI chatbot)

## Core Features
1. Allergy Detection - show allergy info on menu, red warning if matches user settings
2. Review Replies - nested comments on reviews
3. AI Chatbot - LLM-based customer support chatbot

## Conventions
- Components: PascalCase
- Files: kebab-case or PascalCase
- Styling: Emotion styled components
- Data: mock data first, Supabase later

## Assets
- Category icons: use emoji instead
- Banners: screenshot images OK (private project)
- Food photos: Unsplash or placeholder