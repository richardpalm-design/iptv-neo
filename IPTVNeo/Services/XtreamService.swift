import Foundation

class XtreamService {
    static let shared = XtreamService()
    
    private func cleanServerUrl(_ raw: String) -> String {
        var url = raw.trimmingCharacters(in: .whitespacesAndNewlines)
        if !url.hasPrefix("http://") && !url.hasPrefix("https://") {
            url = "http://" + url
        }
        if url.hasSuffix("/") {
            url = String(url.dropLast())
        }
        return url
    }
    
    func authenticate(account: IPTVAccount) async throws -> (status: String, expDate: String?) {
        let server = cleanServerUrl(account.serverUrl)
        guard let url = URL(string: "\(server)/player_api.php?username=\(account.username)&password=\(account.password)") else {
            throw URLError(.badURL)
        }
        
        let (data, response) = try await URLSession.shared.data(from: url)
        guard let httpResponse = response as? HTTPURLResponse, httpResponse.statusCode == 200 else {
            throw URLError(.badServerResponse)
        }
        
        guard let json = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
              let userInfo = json["user_info"] as? [String: Any] else {
            throw URLError(.cannotParseResponse)
        }
        
        let auth = userInfo["auth"] as? Int ?? 0
        let status = userInfo["status"] as? String ?? "Active"
        
        if auth == 0 && status != "Active" {
            throw NSError(domain: "XtreamAuth", code: 401, userInfo: [NSLocalizedDescriptionKey: "Inloggningen misslyckades. Kontrollera användarnamn och lösenord."])
        }
        
        var expDateStr: String? = nil
        if let exp = userInfo["exp_date"] as? String, let time = Double(exp) {
            let date = Date(timeIntervalSince1970: time)
            let formatter = DateFormatter()
            formatter.dateStyle = .medium
            expDateStr = formatter.string(from: date)
        }
        
        return (status, expDateStr)
    }
    
    func fetchLiveStreams(account: IPTVAccount) async throws -> (channels: [LiveChannel], categories: [CategoryItem]) {
        let server = cleanServerUrl(account.serverUrl)
        
        // 1. Categories
        var categories: [CategoryItem] = [CategoryItem(id: "all", name: "Alla kanaler")]
        if let catUrl = URL(string: "\(server)/player_api.php?username=\(account.username)&password=\(account.password)&action=get_live_categories"),
           let (catData, _) = try? await URLSession.shared.data(from: catUrl),
           let catJson = try? JSONSerialization.jsonObject(with: catData) as? [[String: Any]] {
            for item in catJson {
                if let id = item["category_id"] as? String ?? (item["category_id"] as? Int).map(String.init),
                   let name = item["category_name"] as? String {
                    categories.append(CategoryItem(id: id, name: name))
                }
            }
        }
        
        // 2. Streams
        guard let streamUrl = URL(string: "\(server)/player_api.php?username=\(account.username)&password=\(account.password)&action=get_live_streams") else {
            return ([], categories)
        }
        
        let (streamData, _) = try await URLSession.shared.data(from: streamUrl)
        guard let streamJson = try? JSONSerialization.jsonObject(with: streamData) as? [[String: Any]] else {
            return ([], categories)
        }
        
        var channels: [LiveChannel] = []
        for item in streamJson {
            guard let streamId = item["stream_id"] as? Int,
                  let name = item["name"] as? String else { continue }
            
            let catId = (item["category_id"] as? String) ?? (item["category_id"] as? Int).map(String.init) ?? "all"
            let icon = item["stream_icon"] as? String
            let playUrl = "\(server)/live/\(account.username)/\(account.password)/\(streamId).m3u8"
            let id = "xtream_live_\(streamId)"
            
            channels.append(LiveChannel(
                id: id,
                streamId: streamId,
                name: name,
                logoUrl: icon,
                streamUrl: playUrl,
                categoryId: catId,
                epgTitle: "Livesändning",
                epgTime: "Just nu",
                isFavorite: StorageService.shared.isFavorite(id: id)
            ))
        }
        
        return (channels, categories)
    }
    
    func fetchVODMovies(account: IPTVAccount) async throws -> (movies: [VODMovie], categories: [CategoryItem]) {
        let server = cleanServerUrl(account.serverUrl)
        
        var categories: [CategoryItem] = [CategoryItem(id: "all", name: "Alla filmer")]
        if let catUrl = URL(string: "\(server)/player_api.php?username=\(account.username)&password=\(account.password)&action=get_vod_categories"),
           let (catData, _) = try? await URLSession.shared.data(from: catUrl),
           let catJson = try? JSONSerialization.jsonObject(with: catData) as? [[String: Any]] {
            for item in catJson {
                if let id = item["category_id"] as? String ?? (item["category_id"] as? Int).map(String.init),
                   let name = item["category_name"] as? String {
                    categories.append(CategoryItem(id: id, name: name))
                }
            }
        }
        
        guard let streamUrl = URL(string: "\(server)/player_api.php?username=\(account.username)&password=\(account.password)&action=get_vod_streams") else {
            return ([], categories)
        }
        
        let (streamData, _) = try await URLSession.shared.data(from: streamUrl)
        guard let streamJson = try? JSONSerialization.jsonObject(with: streamData) as? [[String: Any]] else {
            return ([], categories)
        }
        
        var movies: [VODMovie] = []
        for item in streamJson {
            guard let streamId = item["stream_id"] as? Int,
                  let name = item["name"] as? String else { continue }
            
            let ext = (item["container_extension"] as? String) ?? "mp4"
            let catId = (item["category_id"] as? String) ?? (item["category_id"] as? Int).map(String.init) ?? "all"
            let icon = item["stream_icon"] as? String
            let rating = item["rating"] as? String
            let playUrl = "\(server)/movie/\(account.username)/\(account.password)/\(streamId).\(ext)"
            let id = "xtream_vod_\(streamId)"
            
            movies.append(VODMovie(
                id: id,
                streamId: streamId,
                name: name,
                posterUrl: icon,
                streamUrl: playUrl,
                categoryId: catId,
                rating: rating,
                year: (item["year"] as? String),
                plot: (item["plot"] as? String),
                isFavorite: StorageService.shared.isFavorite(id: id)
            ))
        }
        
        return (movies, categories)
    }
    
    func fetchSeries(account: IPTVAccount) async throws -> (series: [SeriesItem], categories: [CategoryItem]) {
        let server = cleanServerUrl(account.serverUrl)
        
        var categories: [CategoryItem] = [CategoryItem(id: "all", name: "Alla serier")]
        if let catUrl = URL(string: "\(server)/player_api.php?username=\(account.username)&password=\(account.password)&action=get_series_categories"),
           let (catData, _) = try? await URLSession.shared.data(from: catUrl),
           let catJson = try? JSONSerialization.jsonObject(with: catData) as? [[String: Any]] {
            for item in catJson {
                if let id = item["category_id"] as? String ?? (item["category_id"] as? Int).map(String.init),
                   let name = item["category_name"] as? String {
                    categories.append(CategoryItem(id: id, name: name))
                }
            }
        }
        
        // Load default popular series category
        let targetCat = categories.first(where: { $0.id != "all" })?.id ?? "138"
        guard let streamUrl = URL(string: "\(server)/player_api.php?username=\(account.username)&password=\(account.password)&action=get_series&category_id=\(targetCat)") else {
            return ([], categories)
        }
        
        let (streamData, _) = try await URLSession.shared.data(from: streamUrl)
        guard let streamJson = try? JSONSerialization.jsonObject(with: streamData) as? [[String: Any]] else {
            return ([], categories)
        }
        
        var seriesList: [SeriesItem] = []
        for item in streamJson {
            guard let seriesId = item["series_id"] as? Int,
                  let name = item["name"] as? String else { continue }
            
            let icon = item["cover"] as? String
            let rating = item["rating"] as? String
            let catId = (item["category_id"] as? String) ?? (item["category_id"] as? Int).map(String.init) ?? targetCat
            let id = "xtream_ser_\(seriesId)"
            
            seriesList.append(SeriesItem(
                id: id,
                seriesId: seriesId,
                name: name,
                posterUrl: icon,
                categoryId: catId,
                rating: rating,
                plot: (item["plot"] as? String),
                numSeasons: 1
            ))
        }
        
        return (seriesList, categories)
    }
}
