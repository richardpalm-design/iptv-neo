import Foundation

struct DemoData {
    static let demoAccount = IPTVAccount(
        id: "demo-account",
        name: "IPTV Neo Demo (Nordic & World)",
        type: .xtream,
        serverUrl: "http://demo.iptvneo.app:8080",
        username: "demo_user",
        password: "demo_password",
        status: "Active (Demo)",
        expDate: "Unlimited"
    )
    
    static let liveCategories: [CategoryItem] = [
        CategoryItem(id: "all", name: "Alla kanaler"),
        CategoryItem(id: "nordic", name: "Sverige & Norden"),
        CategoryItem(id: "sports", name: "Sport & Premium"),
        CategoryItem(id: "news", name: "Nyheter & Dokumentär"),
        CategoryItem(id: "world", name: "International")
    ]
    
    static let channels: [LiveChannel] = [
        LiveChannel(
            id: "svt1",
            streamId: 101,
            name: "SVT 1 HD",
            logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/SVT1_logo_2016.svg/320px-SVT1_logo_2016.svg.png",
            streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
            categoryId: "nordic",
            epgTitle: "Rapport & Aktuellt",
            epgTime: "20:00 - 21:00",
            isFavorite: true
        ),
        LiveChannel(
            id: "svt2",
            streamId: 102,
            name: "SVT 2 HD",
            logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/SVT2_logo_2016.svg/320px-SVT2_logo_2016.svg.png",
            streamUrl: "https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8",
            categoryId: "nordic",
            epgTitle: "Vetenskapens värld",
            epgTime: "20:00 - 21:00",
            isFavorite: false
        ),
        LiveChannel(
            id: "tv4",
            streamId: 103,
            name: "TV4 HD",
            logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/TV4_logo_2023.svg/320px-TV4_logo_2023.svg.png",
            streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
            categoryId: "nordic",
            epgTitle: "Nyheterna & Efter fem",
            epgTime: "19:30 - 20:30",
            isFavorite: true
        ),
        LiveChannel(
            id: "sport1",
            streamId: 201,
            name: "Viasat Sport Premium",
            logoUrl: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=200",
            streamUrl: "https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8",
            categoryId: "sports",
            epgTitle: "Premier League: Arsenal vs Man City",
            epgTime: "20:45 - 23:00",
            isFavorite: true
        ),
        LiveChannel(
            id: "eurosport",
            streamId: 202,
            name: "Eurosport 1 HD",
            logoUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=200",
            streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
            categoryId: "sports",
            epgTitle: "Grand Slam Tennis Live",
            epgTime: "18:00 - 21:30",
            isFavorite: false
        ),
        LiveChannel(
            id: "bbc",
            streamId: 301,
            name: "BBC World News HD",
            logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/BBC.svg/320px-BBC.svg.png",
            streamUrl: "https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8",
            categoryId: "news",
            epgTitle: "BBC World News Today",
            epgTime: "20:00 - 20:30",
            isFavorite: false
        ),
        LiveChannel(
            id: "bloomberg",
            streamId: 302,
            name: "Bloomberg TV Global",
            logoUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=200",
            streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
            categoryId: "news",
            epgTitle: "Markets & Global Finance",
            epgTime: "20:00 - 21:00",
            isFavorite: false
        )
    ]
    
    static let movieCategories: [CategoryItem] = [
        CategoryItem(id: "all", name: "Alla filmer"),
        CategoryItem(id: "action", name: "Action & Äventyr"),
        CategoryItem(id: "scifi", name: "Sci-Fi & Thriller"),
        CategoryItem(id: "drama", name: "Drama & Nordic Noir")
    ]
    
    static let movies: [VODMovie] = [
        VODMovie(
            id: "mov1",
            streamId: 501,
            name: "Tears of Steel: Sci-Fi Chronicle",
            posterUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600",
            streamUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
            categoryId: "scifi",
            rating: "8.6",
            year: "2024",
            plot: "I en futuristisk dystopi försöker en grupp forskare rädda mänskligheten med hjälp av artificiell intelligens och tidsförskjutning."
        ),
        VODMovie(
            id: "mov2",
            streamId: 502,
            name: "Big Buck Bunny: The Wild Forest",
            posterUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600",
            streamUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            categoryId: "action",
            rating: "8.1",
            year: "2023",
            plot: "När skogens lugn störs av tre busiga gnagare tar en enorm skogshare saken i egna tassar i en actionfylld komedi."
        ),
        VODMovie(
            id: "mov3",
            streamId: 503,
            name: "Sintel: Dragon Quest Saga",
            posterUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600",
            streamUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
            categoryId: "action",
            rating: "8.9",
            year: "2024",
            plot: "En ensam krigardotter reser genom snöklädda berg och farliga ödemarker för att återförenas med sin förlorade drakunge."
        ),
        VODMovie(
            id: "mov4",
            streamId: 504,
            name: "Nordic Frost: Deep Investigation",
            posterUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600",
            streamUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
            categoryId: "drama",
            rating: "8.4",
            year: "2024",
            plot: "Ett iskallt mysterium skakar en enslig by i norra Sverige där en polisinspektör avslöjar mörka familjehemligheter."
        )
    ]
    
    static let series: [SeriesItem] = [
        SeriesItem(
            id: "ser1",
            seriesId: 601,
            name: "The Quantum Horizon",
            posterUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600",
            categoryId: "scifi",
            rating: "9.1",
            plot: "En expedition bortom solsystemets gränser stöter på anomalier som böjer tid och rum.",
            numSeasons: 2
        ),
        SeriesItem(
            id: "ser2",
            seriesId: 602,
            name: "Stockholm Noir",
            posterUrl: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=600",
            categoryId: "drama",
            rating: "8.7",
            plot: "En undre värld i förändring kolliderar med finanseliten i Stockholms innerstad.",
            numSeasons: 3
        )
    ]
}
