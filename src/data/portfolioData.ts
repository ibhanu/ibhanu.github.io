export interface AppScreen {
  id: string;
  label: string;
  url: string;
  caption: string;
}

export interface MobileAppProject {
  id: string;
  name: string;
  role: string;
  period: string;
  category: "COMMERCIAL SUPER-APP" | "OPEN-SOURCE PRODUCT";
  tagline: string;
  description: string;
  metrics: { label: string; value: string }[];
  highlights: string[];
  accentColor: string;
  secondaryColor: string;
  appStoreUrl?: string;
  playStoreUrl?: string;
  githubUrl?: string;
  techStack: string[];
  screens: AppScreen[];
}

export interface SdkPlatformTab {
  id: "flutter" | "swift" | "kotlin" | "react-native" | "go";
  label: string;
  packageBadge: string;
  packageUrl: string;
  language: string;
  architectureNote: string;
  code: string;
}

export interface ArchitectureLayer {
  id: string;
  index: number;
  name: string;
  subtitle: string;
  zOffset: number;
  color: string;
  metrics: string;
  details: string[];
  tech: string[];
}

export interface CameraKeyframe {
  stage: number;
  id: string;
  label: string;
  description: string;
  position: [number, number, number];
  lookAt: [number, number, number];
  fov: number;
}

export const PROFILE_DATA = {
  name: "Bhanu Pratap",
  monogram: "BP // 3D",
  title: "Senior Mobile & Systems Architect",
  subtitle: "Creator Economy Platforms • Native OS Bridges • Indic AI SDKs",
  location: "Bengaluru, India",
  email: "pratap.bhanu3434@gmail.com",
  phone: "+91 7089265084",
  github: "https://github.com/ibhanu",
  linkedin: "https://linkedin.com/in/itsbhanupratap",
  resumeUrl: "/Bhanu_Pratap_Resume.pdf",
  heroStatement: "We make high-scale mobile architecture feel effortless.",
  studioPitch:
    "Available for Staff/Principal Mobile Engineering Leadership & Select 0-to-1 Product Architecture Partnerships.",
};

export const HERO_METRICS = [
  {
    value: "500K+",
    label: "App Store Downloads",
    detail: "Shipped across iOS & Android flagship apps",
    arch: "LEFT ARCH // SCALE",
  },
  {
    value: "$25M+",
    label: "Annual & Platform Volume",
    detail: "$5M+/yr BigBang + $20M+ Under25 creator payouts",
    arch: "CENTER ARCH // FINTECH",
  },
  {
    value: "65%",
    label: "Crash Rate Reduction",
    detail: "Slashed from 2.1% → 0.7% via memory & lifecycle profiling",
    arch: "RIGHT ARCH // STABILITY",
  },
  {
    value: "200ms",
    label: "WebSocket Latency",
    detail: "Cut down from 500ms via background Dart isolates",
    arch: "REAL-TIME // ENGINE",
  },
  {
    value: "97.8%",
    label: "SDK Test Coverage",
    detail: "Sarvam AI 4-platform mobile monorepo",
    arch: "SYSTEMS // QUALITY",
  },
];

export const CAMERA_KEYFRAMES: CameraKeyframe[] = [
  {
    stage: 0,
    id: "triptych-wide",
    label: "01 // TRIPTYCH ESTABLISHING SHOT",
    description: "Three architectural portals framing Native OS, 3D Device Core, and Real-Time Telemetry.",
    position: [0, 0.15, 7.6],
    lookAt: [0, 0, 0],
    fov: 42,
  },
  {
    stage: 1,
    id: "portal-dolly",
    label: "02 // PORTAL DOLLY-IN",
    description: "Flying through the center arch directly into the 60 FPS flagship viewport.",
    position: [0, 0.05, 4.7],
    lookAt: [0, 0.05, 0],
    fov: 38,
  },
  {
    stage: 2,
    id: "exploded-orbit",
    label: "03 // EXPLODED NATIVE STACK ORBIT",
    description: "Isometric 45° camera orbit inspecting Z-axis separation from Flutter UI down to Swift/Kotlin Silicon.",
    position: [3.4, 1.35, 5.1],
    lookAt: [0, 0, 0],
    fov: 40,
  },
  {
    stage: 3,
    id: "configurator-pan",
    label: "04 // LIVE APP CONFIGURATOR",
    description: "Studio product angle for inspecting real App Store textures and lighting states.",
    position: [-2.1, 0.2, 4.8],
    lookAt: [-0.2, 0, 0],
    fov: 38,
  },
  {
    stage: 4,
    id: "telemetry-overlook",
    label: "05 // INDIC AI & TELEMETRY FIELD",
    description: "High-angle overlook of the instanced 3D audio-reactive wave field.",
    position: [0, 2.2, 6.8],
    lookAt: [0, -0.3, 0],
    fov: 45,
  },
];

export const ARCHITECTURE_LAYERS: ArchitectureLayer[] = [
  {
    id: "ui-presentation",
    index: 0,
    name: "LAYER 01 // 60 FPS PRESENTATION & SHADERS",
    subtitle: "Flutter Impeller / Skia • Custom Parallax • 30+ Shared Widget System",
    zOffset: 0.9,
    color: "#d900ff",
    metrics: "16.6ms Frame Budget • -30% Dev Cycle Time",
    details: [
      "Standardized 30+ reusable design-system widgets eliminating cross-feature UI regressions.",
      "Eliminated frame jank via repaint boundaries, custom render objects, and shader warm-up.",
      "Custom gesture physics for card discovery (Aura) and multi-depth parallax (Mango).",
    ],
    tech: ["Flutter 3.x", "CustomPainter", "Impeller", "iOS Lockscreen Widgets"],
  },
  {
    id: "domain-state",
    index: 1,
    name: "LAYER 02 // REACTIVE DOMAIN & ISOLATE ENGINE",
    subtitle: "Clean Architecture • BLoC / Riverpod / GetX • Background Threading",
    zOffset: 0.3,
    color: "#af00f1",
    metrics: "500ms → 200ms Socket Latency • +18% D30 Retention",
    details: [
      "Offloaded JSON parsing, WebSocket multiplexing, and media compression to background Dart Isolates.",
      "Unified observability pipeline (Mixpanel, CleverTap, AppsFlyer, Firebase) for cohort segmentation.",
      "Custom A/B testing state hydration with zero cold-start blocking.",
    ],
    tech: ["Dart Isolates", "WebSockets", "Riverpod / BLoC", "Mixpanel & CleverTap"],
  },
  {
    id: "platform-bridge",
    index: 2,
    name: "LAYER 03 // NATIVE PLATFORM CHANNEL BRIDGE",
    subtitle: "MethodChannel • EventChannel • FFI Zero-Copy Audio & Media",
    zOffset: -0.3,
    color: "#ff4800",
    metrics: "Zero-Dependency Core • Real-Time PCM Streaming",
    details: [
      "Engineered bidirectional MethodChannels & EventChannels for native camera/video pipelines.",
      "Built custom payments abstraction layer unifying Cashfree & Razorpay across iOS and Android.",
      "Native audio chunk streaming for Sarvam AI speech-to-text and text-to-speech engines.",
    ],
    tech: ["MethodChannel", "EventChannel", "Dart FFI", "PCM Audio Streams"],
  },
  {
    id: "os-kernel",
    index: 3,
    name: "LAYER 04 // iOS & ANDROID SILICON INTERNALS",
    subtitle: "Swift AVFoundation • Kotlin MediaCodec • DigiLocker & OAuth Deep Links",
    zOffset: -0.9,
    color: "#fbe948",
    metrics: "65% Crash Drop (2.1% → 0.7%) • 75% Faster CI/CD",
    details: [
      "Low-level memory profiling in Xcode Instruments & Android Studio Profiler to slash OOM crashes by 65%.",
      "Deep OS integrations with Instagram Graph API, YouTube Data API, and automated DigiLocker KYC.",
      "Automated Fastlane + GitHub Actions signing, provisioning, and staged store rollouts.",
    ],
    tech: ["Swift / iOS", "Kotlin / Android", "DigiLocker KYC", "Fastlane CI/CD"],
  },
];

export const MOBILE_APPS: MobileAppProject[] = [
  {
    id: "bigbang",
    name: "BigBang.Social",
    role: "Tech Lead App",
    period: "Jul 2023 – Apr 2026",
    category: "COMMERCIAL SUPER-APP",
    tagline: "Creator Economy Monetization Super-App at 500K+ Scale",
    description:
      "Architected India's premier creator monetization platform by Collective Artists Network, driving 500,000+ downloads and processing $5M+ annually via custom multi-gateway payment abstraction layers.",
    metrics: [
      { label: "Downloads", value: "500,000+" },
      { label: "Annual Volume", value: "$5M+" },
      { label: "Crash Reduction", value: "-65% (2.1%→0.7%)" },
      { label: "D30 Retention", value: "+18% Lift" },
    ],
    highlights: [
      "Engineered custom payments abstraction layers over Cashfree & Razorpay handling $5M+ annual creator payouts.",
      "Built deep OS integrations (Instagram, YouTube, DigiLocker) & custom platform channels for real-time native media processing, eliminating manual KYC bottlenecks.",
      "Executed low-level memory profiling & lifecycle optimization, slashing crash rates by 65% (2.1% → 0.7%) and cutting cold-start time.",
      "Mentored a team of 4 engineers in TDD & MVC while building Fastlane + GitHub Actions CI/CD that cut deployment time by 75%.",
    ],
    accentColor: "#af00f1",
    secondaryColor: "#ff4800",
    appStoreUrl: "https://apps.apple.com/us/app/bigbang-social/id6450163388",
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.collectiveartists.bigbangsocial",
    techStack: [
      "Flutter",
      "MethodChannels",
      "Cashfree / Razorpay",
      "DigiLocker KYC",
      "Mixpanel / CleverTap",
      "Fastlane CI/CD",
    ],
    screens: [
      {
        id: "bb-1",
        label: "Brand Collaborations & Creator Hub",
        url: "/screenshots/bigbang-1.jpg",
        caption: "Creator campaign discovery & instant payout tracking",
      },
      {
        id: "bb-2",
        label: "Native Social & Media Analytics",
        url: "/screenshots/bigbang-2.jpg",
        caption: "Deep Instagram & YouTube OAuth insights pipeline",
      },
      {
        id: "bb-3",
        label: "Automated KYC & Creator Wallet",
        url: "/screenshots/bigbang-3.jpg",
        caption: "DigiLocker verified onboarding & Cashfree/Razorpay settlement",
      },
    ],
  },
  {
    id: "under25",
    name: "Under 25 Universe",
    role: "Senior Flutter Developer",
    period: "Oct 2021 – Jun 2023",
    category: "COMMERCIAL SUPER-APP",
    tagline: "India's Largest Student Network & Earning Ecosystem",
    description:
      "Spearheaded the mobile experience for a rapidly scaling student platform supporting 400,000+ users and facilitating over $20M+ in platform earnings, micro-missions, and campus communities.",
    metrics: [
      { label: "Active Users", value: "400,000+" },
      { label: "Platform Earnings", value: "$20M+" },
      { label: "Chat Latency", value: "200ms (-60%)" },
      { label: "Dev Velocity", value: "+30% Faster" },
    ],
    highlights: [
      "Architected a real-time chat system utilizing WebSockets with optimized isolate threading that dropped message latency from 500ms to 200ms.",
      "Built a shared UI component library of 30+ reusable widgets, cutting feature delivery time by 30% and eliminating cross-feature UI bugs.",
      "Optimized critical API & caching layers to maintain a responsive experience in low-bandwidth campus environments.",
      "Directed custom A/B testing pipelines and resolved rendering bottlenecks to sustain fluid 60 FPS scrolling.",
    ],
    accentColor: "#d900ff",
    secondaryColor: "#fbe948",
    appStoreUrl: "https://apps.apple.com/us/app/under-25/id1580357687",
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.under25universe.under25app",
    techStack: [
      "Flutter",
      "WebSockets",
      "Dart Isolates",
      "30+ Widget System",
      "A/B Testing Engine",
      "60 FPS Profiling",
    ],
    screens: [
      {
        id: "u25-1",
        label: "Student Gigs & Missions Feed",
        url: "/screenshots/under25-1.jpg",
        caption: "High-concurrency mission feed serving 400K+ students",
      },
      {
        id: "u25-2",
        label: "200ms Real-Time Campus Spaces",
        url: "/screenshots/under25-2.jpg",
        caption: "WebSocket chat engine with background isolate serialization",
      },
      {
        id: "u25-3",
        label: "Portfolio, XP & Collectibles",
        url: "/screenshots/under25-3.jpg",
        caption: "60 FPS interactive card collectibles and student wallet",
      },
    ],
  },
  {
    id: "aura",
    name: "Aura Dating",
    role: "Creator & Lead Architect",
    period: "Open Source Flagship",
    category: "OPEN-SOURCE PRODUCT",
    tagline: "Find Your Frequency — Full-Stack Flutter + Supabase Dating Engine",
    description:
      "Modern open-source dating application engineered with clean architecture (Data / Domain / Presentation), custom 60 FPS card-swipe gesture physics, real-time Supabase messaging, and freemium paywall workflows.",
    metrics: [
      { label: "Architecture", value: "Clean 3-Layer" },
      { label: "Physics", value: "60 FPS Spring" },
      { label: "Backend", value: "Supabase Realtime" },
      { label: "License", value: "MIT Open Source" },
    ],
    highlights: [
      "Implemented custom card-stack discovery engine with velocity-aware swipe gesture physics and spring snap-back.",
      "Architected real-time chat and instant match notifications powered by Supabase Postgres Changes & RLS.",
      "Built complete freemium paywall logic, blurred likes reveal, and strict separation of data/domain/presentation layers.",
    ],
    accentColor: "#ff4800",
    secondaryColor: "#af00f1",
    githubUrl: "https://github.com/ibhanu/aura",
    techStack: ["Flutter 3.32", "Dart 3.8", "Supabase", "GetX", "Clean Architecture"],
    screens: [
      {
        id: "aura-1",
        label: "Swipe Physics Discovery Deck",
        url: "/screenshots/aura-discovery.png",
        caption: "Custom spring-physics card stack with instant filter pills",
      },
      {
        id: "aura-2",
        label: "Real-Time Match Messaging",
        url: "/screenshots/aura-chat.png",
        caption: "Low-latency Supabase Realtime chat & presence indicators",
      },
      {
        id: "aura-3",
        label: "Frequency Profile & Prompts",
        url: "/screenshots/aura-profile.png",
        caption: "Dark glassmorphic profile architecture & freemium tiers",
      },
    ],
  },
  {
    id: "mango",
    name: "Mango — Mind Architected",
    role: "Creator & Lead Architect",
    period: "Open Source Flagship",
    category: "OPEN-SOURCE PRODUCT",
    tagline: "60 FPS Parallax Self-Affirmation Engine & Native iOS Widgets",
    description:
      "Aesthetic mental-architecture application featuring multi-layered sensor/scroll parallax backgrounds, an evolving mascot streak system, custom typography/theme studio, and native iOS Home/Lockscreen widgets.",
    metrics: [
      { label: "Rendering", value: "60 FPS Parallax" },
      { label: "Native Extensions", value: "iOS WidgetKit" },
      { label: "Engagement", value: "Mascot Streaks" },
      { label: "Themes", value: "Dynamic Studio" },
    ],
    highlights: [
      "Engineered a multi-layer parallax background compositor delivering butter-smooth 60 FPS visual depth.",
      "Built native iOS Home Screen & Lock Screen widgets syncing daily affirmations via App Groups & UserDefaults.",
      "Designed a gamified mascot progression system tied to daily streak completions and custom audio/haptic cues.",
    ],
    accentColor: "#fbe948",
    secondaryColor: "#ff4800",
    githubUrl: "https://github.com/ibhanu/mango",
    techStack: ["Flutter", "iOS WidgetKit", "Parallax Engine", "Custom Shaders", "Haptics"],
    screens: [
      {
        id: "mango-1",
        label: "Parallax Affirmation Canvas",
        url: "/screenshots/mango-home.png",
        caption: "60 FPS ambient scene with streak mascot progression",
      },
      {
        id: "mango-2",
        label: "Dynamic Theme & Typography Gallery",
        url: "/screenshots/mango-themes.png",
        caption: "Curated visual universes with instant shader/lut switching",
      },
      {
        id: "mango-3",
        label: "Native iOS Home & Lock Widgets",
        url: "/screenshots/mango-widget.png",
        caption: "Swift WidgetKit bridge syncing live affirmation state",
      },
    ],
  },
];

export const SARVAM_SDK_TABS: SdkPlatformTab[] = [
  {
    id: "flutter",
    label: "Flutter (Dart)",
    packageBadge: "pub.dev: sarvam + sarvam_flutter_audio",
    packageUrl: "https://github.com/ibhanu/sarvam-mobile",
    language: "dart",
    architectureNote:
      "Clean Architecture Dart SDK + native MethodChannel/EventChannel audio recorder & PCM player.",
    code: `import 'package:sarvam/sarvam.dart';
import 'package:sarvam_flutter_audio/sarvam_flutter_audio.dart';

final sarvam = SarvamClient(apiKey: Env.sarvamKey);
final audioStream = SarvamAudioStreamer(sampleRate: 16000);

// Stream live microphone PCM chunks to Sarvam Indic ASR
await for (final frame in audioStream.capturePcm16()) {
  final transcript = await sarvam.speechToText.transcribeChunk(
    audioBytes: frame,
    languageCode: IndicLanguage.hiIN, // Hindi / Tamil / Kannada / 10+ Indic
    model: 'saaras:v2',
  );
  print('[200ms Stream] \${transcript.text}');
}`,
  },
  {
    id: "swift",
    label: "iOS (SwiftPM)",
    packageBadge: "SwiftPM 0.2.0 • Zero-Dependency Core",
    packageUrl: "https://github.com/ibhanu/sarvam-mobile",
    language: "swift",
    architectureNote:
      "Native Swift concurrency (async/await) + AVAudioEngine low-latency voice capture.",
    code: `import SarvamSDK
import AVFoundation

let client = SarvamClient(configuration: .init(apiKey: ProcessInfo.processInfo.env["SARVAM_KEY"]!))

// Real-time Indic Text-to-Speech with Bulbul-v1 neural voices
let response = try await client.textToSpeech.synthesize(
    TextToSpeechRequest(
        inputs: ["नमस्ते, सारवम एआई मोबाइल एसडीके में आपका स्वागत है।"],
        targetLanguageCode: .hiIN,
        speaker: .meera,
        enablePreprocessing: true
    )
)
try await SarvamAudioPlayer.shared.playBase64Wav(response.audios.first!)`,
  },
  {
    id: "kotlin",
    label: "Android (Kotlin)",
    packageBadge: "Maven / Gradle • Coroutines + Flow",
    packageUrl: "https://github.com/ibhanu/sarvam-mobile",
    language: "kotlin",
    architectureNote:
      "Zero-dependency HttpURLConnection/OkHttp bridge with Kotlin Coroutines Flow for streaming audio.",
    code: `import ai.sarvam.mobile.SarvamClient
import ai.sarvam.mobile.models.TranslateRequest

val client = SarvamClient(apiKey = BuildConfig.SARVAM_API_KEY)

// Indic-first neural translation with Mayura v1
val translation = client.text.translate(
    TranslateRequest(
        input = "Shipping 60 FPS mobile ecosystems at 500K+ scale.",
        sourceLanguageCode = "en-IN",
        targetLanguageCode = "kn-IN", // Kannada
        mode = TranslateMode.FORMAL
    )
)
Log.d("SarvamSDK", "Translated: \${translation.translatedText}")`,
  },
  {
    id: "react-native",
    label: "React Native (TS)",
    packageBadge: "npm: @sarvam-mobile/react-native",
    packageUrl: "https://github.com/ibhanu/sarvam-mobile",
    language: "typescript",
    architectureNote:
      "Monorepo shared TypeScript core (@sarvam-mobile/core) + TurboModule native audio bindings.",
    code: `import { SarvamClient } from '@sarvam-mobile/core';
import { useSarvamVoiceAgent } from '@sarvam-mobile/react-native';

const client = new SarvamClient({ apiKey: process.env.SARVAM_KEY! });

export function IndicVoiceOrb() {
  const { startListening, transcript, latencyMs } = useSarvamVoiceAgent({
    client,
    language: 'ta-IN', // Tamil real-time voice agent
  });
  return <VoiceTrigger onPress={startListening} subtitle={\`\${latencyMs}ms • \${transcript}\`} />;
}`,
  },
  {
    id: "go",
    label: "Go Microservice",
    packageBadge: "github.com/ibhanu/go-template",
    packageUrl: "https://github.com/ibhanu/go-template",
    language: "go",
    architectureNote:
      "Production Clean-Architecture Go service template with JWT auth, Prisma PostgreSQL, and Docker.",
    code: `package http

func (h *Handler) RegisterRoutes(r chi.Router) {
    r.Group(func(r chi.Router) {
        r.Use(middleware.JWTAuth(h.jwtSecret))
        r.Use(middleware.RateLimit(200, time.Minute))

        r.Post("/v1/payouts/settle", h.SettleCreatorPayout)
        r.Get("/v1/telemetry/stream", h.UpgradeWebSocketStream)
    })
}`,
  },
];

export const SYSTEMS_PROJECTS = [
  {
    id: "sarvam-mobile",
    name: "Sarvam AI Mobile SDKs",
    badge: "97.8% COVERAGE • 4 PLATFORMS",
    language: "Swift • Kotlin • Dart • TypeScript",
    description:
      "Official client SDK monorepo for Sarvam AI's Indic-first speech and language platform. Clean Architecture across Android, iOS, React Native, and Flutter with zero-dependency core networking and native audio streaming.",
    highlights: [
      "Published on pub.dev (sarvam, sarvam_flutter_audio), npm (@sarvam-mobile/core, @sarvam-mobile/react-native), and SwiftPM.",
      "97.8% automated unit & integration test coverage with Release-Please CI/CD automation.",
      "Native PCM audio capture & streaming pipelines for 10+ Indian languages.",
    ],
    url: "https://github.com/ibhanu/sarvam-mobile",
    accent: "#af00f1",
  },
  {
    id: "go-template",
    name: "Go Clean-Arch Microservice",
    badge: "PRODUCTION BOILERPLATE",
    language: "Golang • PostgreSQL • Docker",
    description:
      "Production-ready Go microservice architecture engineered to eliminate cold-start setup time for backend services with JWT auth, Prisma ORM, and Docker Compose.",
    highlights: [
      "Strict domain/usecase/repository layering with comprehensive unit test suites.",
      "Pre-wired JWT rotation, structured logging, health checks, and multi-stage Docker builds.",
    ],
    url: "https://github.com/ibhanu/go-template",
    accent: "#ff4800",
  },
  {
    id: "sudoku-solver",
    name: "VR Computer Vision Sudoku Solver",
    badge: "COMPUTER VISION + ML",
    language: "Python • OpenCV • Deep Learning",
    description:
      "Real-time augmented/virtual reality puzzle detector and solver that extracts perspective grids from live camera feeds, recognizes digits via CNN, and projects the solved matrix back in real time.",
    highlights: [
      "Perspective homography warp + adaptive thresholding for skew-resilient grid extraction.",
      "Sub-frame solver projection back onto the live video stream.",
    ],
    url: "https://github.com/ibhanu/sudoku-solver",
    accent: "#fbe948",
  },
];

export const SKILL_CLUSTERS = [
  {
    code: "01 // MOBILE & OS INTERNALS",
    title: "Mobile Systems & Rendering",
    items: [
      "Flutter & Dart (Impeller / Skia 60 FPS)",
      "iOS (Swift, AVFoundation, WidgetKit, SwiftPM)",
      "Android (Kotlin, MediaCodec, NDK / JNI)",
      "Custom Platform Channels (Method / Event / FFI)",
      "React Native & TurboModules",
      "Memory & Lifecycle Profiling (Instruments / Perfetto)",
    ],
  },
  {
    code: "02 // ARCHITECTURE & STATE",
    title: "Scalable App Architecture",
    items: [
      "Clean Architecture (Domain / Data / Presentation)",
      "BLoC, Riverpod, Provider, GetX",
      "Shared Design Systems (30+ Widget Libraries)",
      "Dart Background Isolates & Multithreading",
      "Payment Gateways (Cashfree, Razorpay Abstraction)",
      "Automated KYC & OAuth (DigiLocker, Instagram, YouTube)",
    ],
  },
  {
    code: "03 // BACKEND & REAL-TIME",
    title: "Distributed & Real-Time Stack",
    items: [
      "Golang (Clean Microservices, Chi, JWT)",
      "WebSockets (200ms Low-Latency Chat Engines)",
      "WebRTC & Real-Time PCM Audio Streaming",
      "Supabase (Postgres, Realtime, RLS) & Firebase",
      "REST, GraphQL & Prisma PostgreSQL",
      "Computer Vision (OpenCV, Python ML)",
    ],
  },
  {
    code: "04 // DEVOPS & GROWTH TELEMETRY",
    title: "Release & Observability",
    items: [
      "Fastlane + GitHub Actions CI/CD (-75% Deploy Time)",
      "Mixpanel, CleverTap, AppsFlyer (+18% D30 Retention)",
      "Firebase Crashlytics & Sentry (0.7% Crash Rate)",
      "TDD, 97.8% SDK Coverage & SonarQube",
      "Docker & Docker Compose",
      "Custom A/B Experimentation Pipelines",
    ],
  },
];
