import SwiftUI
import Combine

@MainActor
class AppState: ObservableObject {
    @Published var accounts: [IPTVAccount] = []
    @Published var activeAccount: IPTVAccount? = nil
    
    // Live TV Data
    @Published var channels: [LiveChannel] = []
    @Published var liveCategories: [CategoryItem] = []
    @Published var selectedLiveCategory: String = "all"
    
    // VOD Data
    @Published var movies: [VODMovie] = []
    @Published var movieCategories: [CategoryItem] = []
    @Published var selectedMovieCategory: String = "all"
    
    // Series Data
    @Published var series: [SeriesItem] = []
    
    // Navigation Tab
    @Published var selectedTab: Int = 0
    
    // UI Filters
    @Published var searchQuery: String = ""
    @Published var showFavoritesOnly: Bool = false
    
    // Player State
    @Published var nowPlaying: PlayingMediaItem? = nil
    @Published var isPlayerPresented: Bool = false
    
    // Modals
    @Published var isAccountModalPresented: Bool = false
    
    // Loading & Errors
    @Published var isLoading: Bool = false
    @Published var errorMessage: String? = nil
    
    init() {
        loadInitialState()
    }
    
    func loadInitialState() {
        self.accounts = StorageService.shared.getAccounts()
        let activeId = StorageService.shared.getActiveAccountId()
        
        if let active = accounts.first(where: { $0.id == activeId }) {
            self.activeAccount = active
            loadContent(for: active)
        } else if let first = accounts.first {
            self.activeAccount = first
            StorageService.shared.setActiveAccountId(first.id)
            loadContent(for: first)
        } else {
            // First run: auto configure default Sverige 8K account
            let defaultAcc = DemoData.defaultSverigeAccount
            self.accounts = [defaultAcc]
            self.activeAccount = defaultAcc
            StorageService.shared.saveAccount(defaultAcc)
            StorageService.shared.setActiveAccountId(defaultAcc.id)
            loadContent(for: defaultAcc)
        }
    }
    
    func launchDemo() {
        self.activeAccount = DemoData.demoAccount
        self.channels = DemoData.channels
        self.liveCategories = DemoData.liveCategories
        self.movies = DemoData.movies
        self.movieCategories = DemoData.movieCategories
        self.series = DemoData.series
        self.isAccountModalPresented = false
    }
    
    func switchAccount(_ account: IPTVAccount) {
        if account.id == DemoData.demoAccount.id {
            launchDemo()
            return
        }
        self.activeAccount = account
        StorageService.shared.setActiveAccountId(account.id)
        loadContent(for: account)
    }
    
    func addAccount(_ account: IPTVAccount) {
        StorageService.shared.saveAccount(account)
        self.accounts = StorageService.shared.getAccounts()
        switchAccount(account)
    }
    
    func deleteAccount(_ id: String) {
        StorageService.shared.deleteAccount(id: id)
        self.accounts = StorageService.shared.getAccounts()
        if activeAccount?.id == id {
            if let first = accounts.first {
                switchAccount(first)
            } else {
                launchDemo()
            }
        }
    }
    
    func loadContent(for account: IPTVAccount) {
        guard account.id != DemoData.demoAccount.id else {
            launchDemo()
            return
        }
        
        self.isLoading = true
        self.errorMessage = nil
        
        Task {
            do {
                if account.type == .xtream {
                    let liveResult = try await XtreamService.shared.fetchLiveStreams(account: account)
                    let vodResult = try? await XtreamService.shared.fetchVODMovies(account: account)
                    
                    self.channels = liveResult.channels
                    self.liveCategories = liveResult.categories
                    self.movies = vodResult?.movies ?? []
                    self.movieCategories = vodResult?.categories ?? [CategoryItem(id: "all", name: "Alla filmer")]
                } else if account.type == .m3u, let m3uUrl = account.m3uUrl, let url = URL(string: m3uUrl) {
                    let (data, _) = try await URLSession.shared.data(from: url)
                    if let content = String(data: data, encoding: .utf8) ?? String(data: data, encoding: .isoLatin1) {
                        let parsed = M3UParser.parse(content: content)
                        self.channels = parsed.channels
                        self.liveCategories = parsed.categories
                        self.movies = []
                        self.movieCategories = []
                    }
                }
                self.isLoading = false
            } catch {
                self.errorMessage = error.localizedDescription
                self.isLoading = false
            }
        }
    }
    
    func toggleFavorite(id: String) {
        StorageService.shared.toggleFavorite(id: id)
        if let idx = channels.firstIndex(where: { $0.id == id }) {
            channels[idx].isFavorite.toggle()
        }
        if let idx = movies.firstIndex(where: { $0.id == id }) {
            movies[idx].isFavorite.toggle()
        }
    }
    
    func playChannel(_ channel: LiveChannel) {
        guard let url = URL(string: channel.streamUrl) else { return }
        self.nowPlaying = PlayingMediaItem(
            id: channel.id,
            title: channel.name,
            subtitle: channel.epgTitle ?? "LivesÃ¤ndning",
            streamUrl: url,
            posterUrl: channel.logoUrl,
            isLive: true
        )
        self.isPlayerPresented = true
    }
    
    func playMovie(_ movie: VODMovie) {
        guard let url = URL(string: movie.streamUrl) else { return }
        self.nowPlaying = PlayingMediaItem(
            id: movie.id,
            title: movie.name,
            subtitle: "\(movie.year ?? "") â€¢ Betyg: \(movie.rating ?? "N/A")",
            streamUrl: url,
            posterUrl: movie.posterUrl,
            isLive: false
        )
        self.isPlayerPresented = true
    }
}
