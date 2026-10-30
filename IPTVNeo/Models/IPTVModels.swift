import Foundation

enum AccountType: String, Codable {
    case xtream
    case m3u
}

struct IPTVAccount: Identifiable, Codable, Equatable {
    var id: String = UUID().uuidString
    var name: String
    var type: AccountType
    var serverUrl: String = ""
    var username: String = ""
    var password: String = ""
    var m3uUrl: String? = nil
    var createdAt: Date = Date()
    var status: String = "Active"
    var expDate: String? = nil

    init(
        id: String = UUID().uuidString,
        name: String,
        type: AccountType,
        serverUrl: String = "",
        username: String = "",
        password: String = "",
        m3uUrl: String? = nil,
        createdAt: Date = Date(),
        status: String = "Active",
        expDate: String? = nil
    ) {
        self.id = id
        self.name = name
        self.type = type
        self.serverUrl = serverUrl
        self.username = username
        self.password = password
        self.m3uUrl = m3uUrl
        self.createdAt = createdAt
        self.status = status
        self.expDate = expDate
    }
}

struct CategoryItem: Identifiable, Hashable {
    let id: String
    let name: String
}

struct LiveChannel: Identifiable, Hashable {
    let id: String
    let streamId: Int
    let name: String
    let logoUrl: String?
    let streamUrl: String
    let categoryId: String
    var epgTitle: String? = nil
    var epgTime: String? = nil
    var isFavorite: Bool = false
}

struct VODMovie: Identifiable, Hashable {
    let id: String
    let streamId: Int
    let name: String
    let posterUrl: String?
    let streamUrl: String
    let categoryId: String
    let rating: String?
    let year: String?
    let plot: String?
    var isFavorite: Bool = false
}

struct SeriesItem: Identifiable, Hashable {
    let id: String
    let seriesId: Int
    let name: String
    let posterUrl: String?
    let categoryId: String
    let rating: String?
    let plot: String?
    var numSeasons: Int = 1
}

struct EpisodeItem: Identifiable, Hashable {
    let id: String
    let episodeId: Int
    let title: String
    let seasonNumber: Int
    let episodeNumber: Int
    let streamUrl: String
    let thumbnailUrl: String?
}

struct PlayingMediaItem: Identifiable, Equatable {
    let id: String
    let title: String
    let subtitle: String?
    let streamUrl: URL
    let posterUrl: String?
    let isLive: Bool
}
