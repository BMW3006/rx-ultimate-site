# Mpango wa Kazi: Kuunganisha API za GiftedTech kwenye RX Ultimate

Mpango huu unaelezea hatua za kuunganisha API mbalimbali za GiftedTech kwenye kurasa husika za tovuti ya RX Ultimate, kuhakikisha muonekano bora, hali za upakiaji (loading), makosa (errors), na data tupu (empty states).

## 1. Malengo (Scope)
- Kuunganisha API za Soka (Football), AI Hub, Downloader, Tools, na Michezo mingine (Sports).
- Kuimarisha muonekano (UI/UX) kwa kutumia Tailwind CSS na kufuata mada ya giza (Dark Theme).
- Kuhakikisha kila API call inashughulikiwa kwa usahihi kwa kutumia `callAPI` iliyopo.
- Kuongeza vipengele vya mwingiliano (interactive elements) kama tabs, search bars, na fomu za uingizaji (input forms).

## 2. Maeneo Yanayoathiriwa (Affected Areas)
- `src/lib/api.ts`: Hakuna mabadiliko makubwa, kutumika kama kitovu cha API.
- `src/pages/`: Kurasa zote 6 (Dashboard, Football, AIHub, Downloader, Tools, Sports).
- `src/components/Navbar.tsx`: Kurekebisha hali ya link iliyo hai (active state).
- `src/index.css`: Kuongeza mitindo ya loading spinners na hover effects.

## 3. Hatua za Utekelezaji (Ordered Phases)

### Awamu ya 1: Maandalizi ya Mitindo na Utilities (quick_fix_engineer)
- Kurekebisha `src/index.css` ili kuongeza:
    - Loading spinner animation.
    - Mitindo ya ujumbe wa makosa (error messages) na hali tupu (empty states).
    - Madoido ya hover kwenye kadi na vitufe.
- Kurekebisha `src/components/Navbar.tsx` ili kuonyesha link ya sasa (active link) kwa rangi ya Cyan.

### Awamu ya 2: Ukurasa wa Football (frontend_engineer)
- Kuunganisha API za:
    - `/football/livescore` na `/football/livescore2`.
    - `/football/epl/matches`.
    - `/football/laliga/standings`, `/football/bundesliga/standings`, `/football/ucl/standings`.
    - `/football/news`.
    - `/football/team-search` na `/football/player-search`.
- Kutengeneza mfumo wa Tabs (Live, Standings, News, Search).
- Kuonyesha data kwenye majedwali (tables) na gridi (grids).

### Awamu ya 3: Ukurasa wa AI Hub (frontend_engineer)
- Kuunganisha API za:
    - `/ai/gpt4o` na `/ai/gemini` (Chat interface).
    - `/ai/txt2img` (Image generator yenye prompt input na download link).
    - `/tools/songgenerator` (Song generator yenye audio player).
- Kutengeneza Tabs kwa kila huduma ya AI.

### Awamu ya 4: Ukurasa wa Downloader (frontend_engineer)
- Kuunganisha API za kudownload kutoka:
    - YouTube (MP3/MP4), TikTok, Instagram, Facebook, Spotify, Google Drive, na APK.
- Kutengeneza fomu yenye URL input na uteuzi wa ubora (quality selection) pale inapohitajika.
- Kuonyesha link za kupakua (download links) baada ya kufanikiwa.

### Awamu ya 5: Ukurasa wa Tools na Sports (frontend_engineer)
- **Tools:**
    - QR Code Generator, Fancy Text Generator, na Short URL (TinyURL).
- **Sports:**
    - Basketball Live Scores (`/basketball/livescore`).
    - Sports Live Streaming links (`/sports/live`, `/sports/all`).

### Awamu ya 6: Dashboard na Majaribio ya Mwisho (frontend_engineer)
- Kujaza Dashboard na muhtasari wa data muhimu (mfano: Habari za soka za hivi punde, mechi za leo).
- Kufanya majaribio ya mwisho kuhakikisha API zote zinafanya kazi na hakuna hitilafu kwenye UI.

## 4. Wahusika na Majukumu
- **quick_fix_engineer**: Hatua ya 1 (Mitindo ya msingi na Navbar).
- **frontend_engineer**: Hatua za 2 hadi 6 (Uunganishaji wa API na ujenzi wa kurasa).

## 5. Tahadhari (Risks)
- Hakikisha `API_KEY` inatumiwa kwa usahihi kutoka `src/config.ts`.
- Kushughulikia hali ambapo API inaweza kuchelewa au kukataa (error handling).
- Kuhakikisha muonekano ni msikivu (responsive) kwenye simu.
